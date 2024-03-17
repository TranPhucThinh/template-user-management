import { PAGINATION } from "./variables";

export default class Helpers {
  static paginationFunc = ({
    pagination,
    query,
    callback,
  }: {
    pagination: { total: number };
    query?: Record<string, number | string>;
    callback?: ({ page, limit }: { page: number; limit: number }) => void;
  }) => ({
    size: "default",
    total: pagination?.total,
    pageSize: query?.limit || PAGINATION.PAGE_SIZE,
    defaultCurrent: Number(query?.page || PAGINATION.PAGE),
    current: Number(query?.page || PAGINATION.PAGE),
    hideOnSinglePage: pagination?.total <= 10,
    showSizeChanger: PAGINATION.SHOW_SIZE_CHANGER,
    pageSizeOptions: PAGINATION.PAGE_SIZE_OPTIONS,
    locale: { items_per_page: PAGINATION.PER_PAGE_TEXT },
    onChange: (page: number, size: number) => {
      if (callback) {
        callback({ page, limit: size });
      }
    },
    onShowSizeChange: (current: number, size: number) => {
      if (callback) {
        callback({ page: current, limit: size });
      }
    },
    showTotal: (total: number, [start, end]: number[]) =>
      `Hiển thị ${start}-${end} trong ${total}`,
  });
}
