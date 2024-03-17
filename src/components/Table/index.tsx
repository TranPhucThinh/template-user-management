/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Table as TableComponent,
  TableColumnsType,
  TablePaginationConfig,
} from "antd";
import React, { useState } from "react";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import type { DragEndEvent } from "@dnd-kit/core";
import { MenuOutlined } from "@ant-design/icons";
import { DndContext } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { Helpers } from "../../utils";

import styles from "./styles.module.scss";

interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  "data-row-key": string;
}

type Props<T extends Record<string, any>> = {
  /** Choose type table */
  type?: "DEFAULT" | "SELECTION" | "DRAG";
  /** Columns of table. Read more info of Columns at: https://ant.design/components/table#column */
  columns: TableColumnsType<T>;
  /** Data record array to be displayed */
  data: T[];
  /** Whether to show all table borders */
  bordered?: boolean;
  /** Loading status of table */
  loading?: boolean;
  /** Pagination with total items */
  pagination: { total: number } | false;
  /**
   An object representing query parameters for data retrieval and pagination control.
   This object allows specifying parameters such as page number and limit.
  */
  query?: Record<string, number | string>;
  /** Whether the table can be scrollable */
  scroll?: object;
  /** Size of table */
  size?: "large" | "middle" | "small";
  /** Set props on per row */
  onRow?: (
    data: T,
    index?: number
  ) => React.HTMLAttributes<any> & React.TdHTMLAttributes<any>;
  /** Table title renderer */
  title?: (currentPageData: ReadonlyArray<T>) => React.ReactNode;
  /** Table footer renderer */
  footer?: (currentPageData: ReadonlyArray<T>) => React.ReactNode;
  /** Expand all rows initially */
  defaultExpandAllRows?: boolean;
  /** Properties for expandable:
   -  onExpand: Callback executed when the row expand icon is clicked
   -  rowExpandable: Enable row can be expandable
  */
  expandable?: {
    onExpand?: (expanded: boolean, record: T) => void;
    rowExpandable?: (record: T) => boolean;
  };
  /** Hide the selectAll checkbox and custom selection */
  hideSelectAll?: boolean;
  /** Callback func to get Page and Limit of table */
  handleGetPageAndLimit?: (res: { page: number; limit: number }) => void;
  /** Callback func when user selected rows change */
  handleOnChange?: (selectedRowKeys: React.Key[], selectedRows: T[]) => void;
  /** Callback func when user select/deselect one row */
  handleOnSelect?: (record: T, selected: boolean, selectedRows: T[]) => void;
  /** Callback func when user select/deselect all rows */
  handleOnSelectAll?: (
    selected: boolean,
    selectedRows: T[],
    changeRows: T[]
  ) => void;
  /** Specifies the key used to indicate a darg column */
  keyShowDrag?: string;
};

const Table = <T extends Record<string, any>>({
  columns,
  data,
  bordered = false,
  type,
  hideSelectAll = false,
  defaultExpandAllRows = false,
  pagination,
  query,
  loading = false,
  scroll,
  size = "large",
  footer,
  expandable,
  onRow,
  title,
  handleGetPageAndLimit,
  handleOnChange,
  handleOnSelect,
  handleOnSelectAll,
  keyShowDrag = "drag",
}: Props<T>): JSX.Element => {
  const [dataSource, setDataSource] = useState(data);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  let component: React.JSX.Element;

  // For table selection: Execute callback handleOnChange func when onChange is called
  const onChangeHandler = (selectedRowKeys: React.Key[], selectedRows: T[]) => {
    setSelectedRowKeys(selectedRowKeys);
    if (handleOnChange) {
      handleOnChange(selectedRowKeys, selectedRows);
    }
  };

  // For table selection: Execute callback handleOnSelect func when onSelect is called
  const onSelectHandler = (record: T, selected: boolean, selectedRows: T[]) => {
    if (handleOnSelect) {
      handleOnSelect(record, selected, selectedRows);
    }
  };

  // For table selection: Execute callback handleOnSelectAll func when onSelectAll is called
  const onSelectAllHandler = (
    selected: boolean,
    selectedRows: T[],
    changeRows: T[]
  ) => {
    if (handleOnSelectAll) {
      handleOnSelectAll(selected, selectedRows, changeRows);
    }
  };

  // Change pagination and send page, limit to parent component by handleGetPageAndLimit func
  const paginationTable = (pagination: { total: number }) =>
    Helpers.paginationFunc({
      pagination,
      query,
      callback: (res: { page: number; limit: number }) => {
        if (handleGetPageAndLimit) {
          handleGetPageAndLimit(res);
        }
      },
    });

  // Properties for row selection.
  const rowSelection = {
    selectedRowKeys,
    hideSelectAll: hideSelectAll,
    onChange: onChangeHandler,
    onSelect: onSelectHandler,
    onSelectAll: onSelectAllHandler,
  };

  // This component represents a single row in the sortable table.
  const Row = ({ children, ...props }: RowProps) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      setActivatorNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({
      id: props["data-row-key"],
    });

    const style: React.CSSProperties = {
      ...props.style,
      transform: CSS.Transform.toString(
        transform && { ...transform, scaleY: 1 }
      ),
      transition,
      ...(isDragging ? { position: "relative", zIndex: 9999 } : {}),
    };

    return (
      <tr {...props} ref={setNodeRef} style={style} {...attributes}>
        {React.Children.map(children, (child) => {
          if ((child as React.ReactElement).key === keyShowDrag) {
            return React.cloneElement(child as React.ReactElement, {
              children: (
                <MenuOutlined
                  ref={setActivatorNodeRef}
                  style={{ touchAction: "none", cursor: "move" }}
                  {...listeners}
                />
              ),
            });
          }
          return child;
        })}
      </tr>
    );
  };

  // Handles the end of a dragging action
  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setDataSource((previous) => {
        const activeIndex = previous.findIndex((i) => i.id === active.id);
        const overIndex = previous.findIndex((i) => i.id === over?.id);
        return arrayMove(previous, activeIndex, overIndex);
      });
    }
  };

  const propsTable = () => ({
    columns,
    dataSource: data,
    bordered,
    rowKey: (record: T) => record?.id,
    defaultExpandAllRows,
    loading,
    scroll,
    size,
    onRow,
    title,
    footer,
  });

  const renderTableDefault = () => {
    return (
      <TableComponent
        {...propsTable()}
        expandable={expandable}
        pagination={
          pagination
            ? (paginationTable(pagination) as TablePaginationConfig)
            : false
        }
      />
    );
  };

  const renderTableSelection = () => {
    return (
      <TableComponent
        {...propsTable()}
        expandable={expandable}
        rowSelection={rowSelection}
        pagination={
          pagination
            ? (paginationTable(pagination) as TablePaginationConfig)
            : false
        }
      />
    );
  };

  const renderTableDrag = () => {
    return (
      <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
        <SortableContext
          items={dataSource.map((i) => i.id)}
          strategy={verticalListSortingStrategy}
        >
          <TableComponent
            {...propsTable()}
            components={{
              body: {
                row: Row,
              },
            }}
            pagination={
              pagination
                ? (paginationTable(pagination) as TablePaginationConfig)
                : false
            }
          />
        </SortableContext>
      </DndContext>
    );
  };

  switch (type) {
    case "DRAG":
      component = renderTableDrag();
      break;

    case "SELECTION":
      component = renderTableSelection();
      break;

    default:
      component = renderTableDefault();
      break;
  }

  return <div className={styles.storybook__table}>{component}</div>;
};

export default Table;
