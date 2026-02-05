import { http } from "@/utils/http";
import { baseUrlApi } from "./utils";

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

export type DeptListResult = {
  success: boolean;
  data: DeptEntity[];
};

export type DeptDetailResult = {
  success: boolean;
  data: DeptEntity | null;
};

export type DeptMutationResult = {
  success: boolean;
  data: DeptEntity;
};

export const getDeptListApi = () => {
  return http.request<DeptListResult>("get", baseUrlApi("depts"));
};

export const getDeptDetail = (id: number) => {
  return http.request<DeptDetailResult>("get", baseUrlApi(`depts/${id}`));
};

export const createDept = (data: Partial<DeptEntity>) => {
  return http.request<DeptMutationResult>("post", baseUrlApi("depts"), {
    data
  });
};

export const updateDept = (id: number, data: Partial<DeptEntity>) => {
  return http.request<DeptMutationResult>("patch", baseUrlApi(`depts/${id}`), {
    data
  });
};

export const deleteDept = (id: number) => {
  return http.request<{ success: boolean; data: null }>(
    "delete",
    baseUrlApi(`depts/${id}`)
  );
};
