/* eslint-disable @typescript-eslint/no-explicit-any */
import { Select as SelectComponent } from "antd";
import { head, includes, last } from "lodash";
import { CSSProperties, ReactNode, useState } from "react";

import { Helpers } from "@greenglobal/greencore.fe.utils";

import Empty from "../Empty";

type Props = {
  /** Whether to show clear button */
  allowClear?: boolean;
  /** Data for the Select component */
  data: object[];
  /** Whether the current search will be cleared on selecting an item. Only applies when mode is set to multiple */
  autoClearSearchValue?: boolean;
  /** Whether disabled select */
  disabled?: boolean;
  /** The className of dropdown menu */
  popupClassName?: string;
  /** Indicate loading state */
  loading?: boolean;
  /** Mapping of option keys to their corresponding display labels */
  options?: [string, string];
  /** The value of the Select */
  value?: string | string[] | number | number[];
  /** Array of disabled option values */
  disabledOptions?: string[] | number[];
  /** Content to display when no matching options found */
  notFoundContent?: ReactNode;
  /** Content to display when no data is available */
  descriptionEmptyData?: ReactNode;
  /** Placeholder text */
  placeholder?: string;
  /** Inline style object for custom styling */
  style?: CSSProperties;
  /** Whether to enable multiple selection */
  multiple?: boolean;
  /** Size of the Select component */
  size?: "large" | "middle" | "small";
  /** Variant of the Select component */
  variant?: "outlined" | "borderless" | "filled";
  /** Inline style object for customizing dropdown menu */
  dropdownStyle?: CSSProperties;
  /** Callback function triggered when the Select component loses focus */
  onBlur?: () => void;
  /** Callback function triggered when the clear button is clicked */
  onClear?: () => void;
  /** Callback function triggered when the dropdown menu is scrolled */
  onPopupScroll?: () => void;
  /** Callback function triggered when an option is selected */
  handleChangeOption?: (value: string | string[] | number | number[]) => void;
  /** Callback function triggered when an option is deselected. Only called for multiple */
  handleDeselected?: (value: string | number) => void;
  /** Callback function triggered when user inputs in search box */
  handleSearch?: (value: string) => void;
};

const { Option } = SelectComponent;

/** Select component to select value from options. */
const Select = ({
  allowClear = false,
  data,
  autoClearSearchValue = true,
  disabled = false,
  popupClassName,
  loading = false,
  options = ["id", "name"],
  value,
  disabledOptions,
  notFoundContent,
  descriptionEmptyData,
  placeholder = "Chọn",
  style,
  multiple = false,
  size = "middle",
  variant = "outlined",
  dropdownStyle,
  onBlur,
  onClear,
  onPopupScroll,
  handleChangeOption,
  handleDeselected,
  handleSearch,
}: Props) => {
  const [valueSelected, setValueSelected] = useState<
    string | string[] | number | number[] | undefined
  >(value);

  const filterOptionHandle = (
    input: string,
    option?: {
      key: string;
      value: string | number;
      disabled: boolean;
      children: string;
    }
  ) => {
    const { slugify } = Helpers;

    if (!option) return false;
    // Check if slugify method is defined
    if (!slugify) return false;

    const { children } = option;

    // Check if children is defined
    if (!children) return false;

    const inputSlug = slugify(input);
    const childrenSlug = slugify(children);

    // Check if slugs are created successfully
    if (!inputSlug || !childrenSlug) return false;

    return childrenSlug.indexOf(inputSlug) >= 0;
  };

  const onChangeOption = (value: string | string[] | number | number[]) => {
    setValueSelected(value);
    if (handleChangeOption) {
      handleChangeOption(value);
    }
  };

  const onDeselect = (value: string | number) => {
    if (handleDeselected) {
      handleDeselected(value);
    }
  };

  const onSearch = (value: string) => {
    if (handleSearch) {
      handleSearch(value);
    }
  };

  return (
    <SelectComponent
      allowClear={allowClear}
      style={style}
      autoClearSearchValue={autoClearSearchValue}
      filterOption={filterOptionHandle}
      notFoundContent={
        notFoundContent || <Empty description={descriptionEmptyData} simple />
      }
      placeholder={placeholder}
      disabled={disabled}
      loading={loading}
      popupClassName={popupClassName}
      dropdownStyle={dropdownStyle}
      value={valueSelected}
      showSearch
      mode={multiple ? "multiple" : undefined}
      size={size}
      variant={variant}
      onChange={onChangeOption}
      onBlur={onBlur}
      onClear={onClear}
      onDeselect={onDeselect}
      onPopupScroll={onPopupScroll}
      onSearch={onSearch}
    >
      {data.map((item: { [key: string]: any }) => (
        <Option
          key={item[`${head(options)}`]}
          value={item[`${head(options)}`]}
          disabled={includes(disabledOptions, item[`${head(options)}`])}
        >
          {item[`${last(options)}`]}
        </Option>
      ))}
    </SelectComponent>
  );
};

export default Select;
