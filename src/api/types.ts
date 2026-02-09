export type ApiResult<T = null> = {
  code: number;
  message: string;
  data: T;
};

export type PageResult<T> = {
  list: T[];
  total: number;
  pageSize: number;
  currentPage: number;
};
