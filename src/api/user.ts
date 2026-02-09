import { http } from "@/utils/http";
import { baseUrlApi } from "./utils";
import type { ApiResult } from "./types";

export type LoginData = {
  avatar: string;
  username: string;
  nickname: string;
  roles: Array<string>;
  permissions: Array<string>;
  accessToken: string;
  refreshToken: string;
  expires: Date | string;
};

export type TokenData = {
  accessToken: string;
  refreshToken: string;
  expires: Date | string;
};

/** 登录 */
// export const getLogin = (data?: object) => {
//   return http.request<UserResult>("post", "/login", { data });
// };

/** 刷新`token` */
export const refreshTokenApi = (data?: object) => {
  return http.request<ApiResult<TokenData>>(
    "post",
    baseUrlApi("refresh-token"),
    {
      data
    }
  );
};

/** 登录 */
export const getLogin = (data?: object) => {
  return http.request<ApiResult<LoginData>>("post", baseUrlApi("login"), {
    data
  });
};

export const createUserApi = (data?: object) => {
  return http.request<ApiResult<null>>("post", baseUrlApi("user/admin"), {
    data
  });
};

export const updateUserApi = (id: number, data?: object) => {
  return http.request<ApiResult<null>>(
    "patch",
    baseUrlApi(`user/admin/${id}`),
    {
      data
    }
  );
};

export const deleteUserApi = (id: number) => {
  return http.request<ApiResult<null>>("delete", baseUrlApi(`user/${id}`));
};

export const updateUserStatusApi = (id: number, status: number) => {
  return http.request<ApiResult<null>>(
    "patch",
    baseUrlApi(`user/${id}/status`),
    {
      data: { status }
    }
  );
};

export const resetUserPasswordApi = (id: number, password: string) => {
  return http.request<ApiResult<null>>(
    "patch",
    baseUrlApi(`user/${id}/password`),
    {
      data: { password }
    }
  );
};

export const updateUserRolesApi = (id: number, roleIds: number[]) => {
  return http.request<ApiResult<null>>(
    "patch",
    baseUrlApi(`user/${id}/roles`),
    {
      data: { roleIds }
    }
  );
};
