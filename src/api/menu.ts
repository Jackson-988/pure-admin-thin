import { http } from "@/utils/http";
import { baseUrlApi } from "./utils";

export type MenuEntity = {
  id: number;
  name: string;
  path: string;
  order: number;
  acl: string;
  redirect?: string | null;
  component?: string | null;
  meta?: Record<string, any> | null;
};

export type MenuListResult = {
  success: boolean;
  data: MenuEntity[];
};

export type MenuDetailResult = {
  success: boolean;
  data: MenuEntity | null;
};

export type MenuMutationResult = {
  success: boolean;
  data: MenuEntity;
};

export const getMenuList = () => {
  return http.request<MenuListResult>("get", baseUrlApi("menus"));
};

export const getMenuDetail = (id: number) => {
  return http.request<MenuDetailResult>("get", baseUrlApi(`menus/${id}`));
};

export const createMenu = (data: Partial<MenuEntity>) => {
  return http.request<MenuMutationResult>("post", baseUrlApi("menus"), {
    data
  });
};

export const updateMenu = (id: number, data: Partial<MenuEntity>) => {
  return http.request<MenuMutationResult>("patch", baseUrlApi(`menus/${id}`), {
    data
  });
};

export const deleteMenu = (id: number) => {
  return http.request<{ success: boolean; data: null }>(
    "delete",
    baseUrlApi(`menus/${id}`)
  );
};
