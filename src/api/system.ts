import { http } from "@/utils/http";
import { baseUrlApi } from "./utils";

type Result = {
  code: number;
  message: string;
  data?: Array<any>;
};

type ResultTable = {
  code: number;
  message: string;
  data?: {
    /** 列表数据 */
    list: Array<any>;
    /** 总条目数 */
    total?: number;
    /** 每页显示条目个数 */
    pageSize?: number;
    /** 当前页数 */
    currentPage?: number;
  };
};

type SimpleResult = {
  code: number;
  message: string;
};

/** 获取系统管理-用户管理列表 */
export const getUserList = (data?: object) => {
  return http.request<ResultTable>("post", baseUrlApi("user/list"), { data });
};

/** 系统管理-用户管理-获取所有角色列表 */
export const getAllRoleList = () => {
  return http.request<Result>("get", baseUrlApi("roles/list-all-role"));
};

/** 系统管理-用户管理-根据userId，获取对应角色id列表（userId：用户id） */
export const getRoleIds = (data?: object) => {
  return http.request<Result>("post", baseUrlApi("roles/list-role-ids"), {
    data
  });
};

/** 获取系统管理-角色管理列表 */
export const getRoleList = (data?: object) => {
  return http.request<ResultTable>("post", baseUrlApi("role"), { data });
};

/** 新增角色 */
export const createRoleApi = (data?: object) => {
  return http.request<SimpleResult>("post", baseUrlApi("role/create"), {
    data
  });
};

/** 修改角色 */
export const updateRoleApi = (id: number, data?: object) => {
  return http.request<SimpleResult>("patch", baseUrlApi(`role/${id}`), {
    data
  });
};

/** 修改角色状态 */
export const updateRoleStatusApi = (id: number, status: number) => {
  return http.request<SimpleResult>("patch", baseUrlApi(`role/${id}/status`), {
    data: { status }
  });
};

/** 删除角色 */
export const deleteRoleApi = (id: number) => {
  return http.request<SimpleResult>("delete", baseUrlApi(`role/${id}`));
};

/** 获取系统管理-菜单管理列表 */
export const getMenuList = (data?: object) => {
  return http.request<any>("post", baseUrlApi("menu"), { data });
};

/** 获取系统管理-部门管理列表 */
export const getDeptList = (data?: object) => {
  return http.request<Result>("post", baseUrlApi("dept"), { data });
};

/** 获取系统监控-在线用户列表 */
export const getOnlineLogsList = (data?: object) => {
  return http.request<ResultTable>("post", "/online-logs", { data });
};

/** 获取系统监控-登录日志列表 */
export const getLoginLogsList = (data?: object) => {
  return http.request<ResultTable>("post", "/login-logs", { data });
};

/** 获取系统监控-操作日志列表 */
export const getOperationLogsList = (data?: object) => {
  return http.request<ResultTable>("post", "/operation-logs", { data });
};

/** 获取系统监控-系统日志列表 */
export const getSystemLogsList = (data?: object) => {
  return http.request<ResultTable>("post", "/system-logs", { data });
};

/** 获取系统监控-系统日志-根据 id 查日志详情 */
export const getSystemLogsDetail = (data?: object) => {
  return http.request<Result>("post", "/system-logs-detail", { data });
};

/** 获取角色管理-权限-菜单权限 */
export const getRoleMenu = (data?: object) => {
  return http.request<Result>("post", baseUrlApi("role-menu"), { data });
};

/** 获取角色管理-权限-菜单权限-根据角色 id 查对应菜单 */
export const getRoleMenuIds = (data?: object) => {
  return http.request<Result>("post", baseUrlApi("role-menu-ids"), {
    data
  });
};

/** 保存角色管理-权限-菜单权限 */
export const saveRoleMenu = (data?: object) => {
  return http.request<Result>("post", baseUrlApi("role-menu-save"), {
    data
  });
};
