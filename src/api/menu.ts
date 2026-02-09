import { http } from "@/utils/http";
import { baseUrlApi } from "./utils";
import type { ApiResult } from "./types";

export type MenuEntity = {
  id: number;
  name: string;
  path: string;
  order: number;
  redirect?: string | null;
  component?: string | null;
  meta?: Record<string, any> | null;
};

export const getMenuList = () => {
  return http.request<ApiResult<MenuEntity[]>>("get", baseUrlApi("menus"));
};

export const getMenuDetail = (id: number) => {
  return http.request<ApiResult<MenuEntity | null>>(
    "get",
    baseUrlApi(`menus/${id}`)
  );
};

export const createMenu = (data: Partial<MenuEntity>) => {
  return http.request<ApiResult<MenuEntity>>("post", baseUrlApi("menus"), {
    data
  });
};

export const updateMenu = (id: number, data: Partial<MenuEntity>) => {
  return http.request<ApiResult<MenuEntity>>(
    "patch",
    baseUrlApi(`menus/${id}`),
    {
      data
    }
  );
};

export const deleteMenu = (id: number) => {
  return http.request<ApiResult<null>>("delete", baseUrlApi(`menus/${id}`));
};
