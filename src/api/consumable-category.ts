import { http } from "@/utils/http";
import { baseUrlApi } from "./utils";

export type CategoryResult = {
  success: boolean;
  data: {
    id: number;
    name: string;
    sort: number;
    parentId?: number;
    children?: CategoryResult["data"][];
    createTime: string;
    updateTime: string;
  };
};

export type CreateCategoryData = {
  name: string;
  sort?: number;
  parentId?: number;
};

export const getCategories = () => {
  return http.request<any>("get", baseUrlApi("consumables/categories"));
};

export const createCategory = (data: CreateCategoryData) => {
  return http.request<CategoryResult>(
    "post",
    baseUrlApi("consumables/categories"),
    { data }
  );
};

export const updateCategory = (id: number, data: CreateCategoryData) => {
  return http.request<CategoryResult>(
    "patch",
    baseUrlApi(`consumables/categories/${id}`),
    { data }
  );
};

export const deleteCategory = (id: number) => {
  return http.request<any>(
    "delete",
    baseUrlApi(`consumables/categories/${id}`)
  );
};
