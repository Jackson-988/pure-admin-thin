import { http } from "@/utils/http";
import { baseUrlApi } from "./utils";
import type { ApiResult, PageResult } from "./types";

/** 获取系统管理-用户管理列表 */
export const getUserList = (data?: object) => {
  return http.request<ApiResult<PageResult<any>>>(
    "post",
    baseUrlApi("user/list"),
    { data }
  );
};

/** 系统管理-用户管理-获取所有角色列表 */
export const getAllRoleList = () => {
  return http.request<ApiResult<Array<any>>>(
    "get",
    baseUrlApi("roles/list-all-role")
  );
};

/** 系统管理-用户管理-根据userId，获取对应角色id列表（userId：用户id） */
export const getRoleIds = (data?: object) => {
  return http.request<ApiResult<Array<number>>>(
    "post",
    baseUrlApi("roles/list-role-ids"),
    {
      data
    }
  );
};

/** 获取系统管理-角色管理列表 */
export const getRoleList = (data?: object) => {
  return http.request<ApiResult<PageResult<any>>>("post", baseUrlApi("role"), {
    data
  });
};

/** 新增角色 */
export const createRoleApi = (data?: object) => {
  return http.request<ApiResult<null>>("post", baseUrlApi("role/create"), {
    data
  });
};

/** 修改角色 */
export const updateRoleApi = (id: number, data?: object) => {
  return http.request<ApiResult<null>>("patch", baseUrlApi(`role/${id}`), {
    data
  });
};

/** 修改角色状态 */
export const updateRoleStatusApi = (id: number, status: number) => {
  return http.request<ApiResult<null>>(
    "patch",
    baseUrlApi(`role/${id}/status`),
    {
      data: { status }
    }
  );
};

/** 删除角色 */
export const deleteRoleApi = (id: number) => {
  return http.request<ApiResult<null>>("delete", baseUrlApi(`role/${id}`));
};

/** 获取系统管理-菜单管理列表 */
export const getMenuList = (data?: object) => {
  return http.request<ApiResult<Array<any>>>("post", baseUrlApi("menu"), {
    data
  });
};

/** 获取系统管理-部门管理列表 */
export const getDeptList = (data?: object) => {
  return http.request<ApiResult<Array<any>>>("post", baseUrlApi("dept"), {
    data
  });
};

export const getOnlineLogsList = (data?: object) => {
  return http.request<ApiResult<PageResult<any>>>(
    "post",
    baseUrlApi("online-logs"),
    { data }
  );
};

export const offlineOnlineUser = (data?: object) => {
  return http.request<ApiResult<boolean>>(
    "post",
    baseUrlApi("online-logs-offline"),
    {
      data
    }
  );
};

export const getLoginLogsList = (data?: object) => {
  return http.request<ApiResult<PageResult<any>>>(
    "post",
    baseUrlApi("login-logs"),
    { data }
  );
};

export const getOperationLogsList = (data?: object) => {
  return http.request<ApiResult<PageResult<any>>>(
    "post",
    baseUrlApi("operation-logs"),
    {
      data
    }
  );
};

export const getSystemLogsList = (data?: object) => {
  return http.request<ApiResult<PageResult<any>>>(
    "post",
    baseUrlApi("system-logs"),
    { data }
  );
};

export const getSystemLogsDetail = (data?: object) => {
  return http.request<ApiResult<any>>(
    "post",
    baseUrlApi("system-logs-detail"),
    {
      data
    }
  );
};

/** 获取角色管理-权限-菜单权限 */
export const getRoleMenu = (data?: object) => {
  return http.request<ApiResult<any>>("post", baseUrlApi("role-menu"), {
    data
  });
};

/** 获取角色管理-权限-菜单权限-根据角色 id 查对应菜单 */
export const getRoleMenuIds = (data?: object) => {
  return http.request<ApiResult<number[]>>(
    "post",
    baseUrlApi("role-menu-ids"),
    {
      data
    }
  );
};

/** 保存角色管理-权限-菜单权限 */
export const saveRoleMenu = (data?: object) => {
  return http.request<ApiResult<null>>("post", baseUrlApi("role-menu-save"), {
    data
  });
};
