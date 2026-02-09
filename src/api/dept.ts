import { http } from "@/utils/http";
import { baseUrlApi } from "./utils";
import type { ApiResult } from "./types";

export type DeptEntity = {
  id: number;
  parentId: number;
  name: string;
  principal?: string | null;
  phone?: string | null;
  email?: string | null;
  sort: number;
  status: number;
  remark?: string | null;
  createTime: string | Date;
  updateTime: string | Date;
};

export const getDeptListApi = () => {
  return http.request<ApiResult<DeptEntity[]>>("get", baseUrlApi("depts"));
};

export const getDeptDetail = (id: number) => {
  return http.request<ApiResult<DeptEntity | null>>(
    "get",
    baseUrlApi(`depts/${id}`)
  );
};

export const createDept = (data: Partial<DeptEntity>) => {
  return http.request<ApiResult<DeptEntity>>("post", baseUrlApi("depts"), {
    data
  });
};

export const updateDept = (id: number, data: Partial<DeptEntity>) => {
  return http.request<ApiResult<DeptEntity>>(
    "patch",
    baseUrlApi(`depts/${id}`),
    {
      data
    }
  );
};

export const deleteDept = (id: number) => {
  return http.request<ApiResult<null>>("delete", baseUrlApi(`depts/${id}`));
};
