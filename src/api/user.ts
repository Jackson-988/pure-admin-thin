import { http } from "@/utils/http";
import { baseUrlApi } from "./utils";

export type UserResult = {
  success: boolean;
  data: {
    /** 头像 */
    avatar: string;
    /** 用户名 */
    username: string;
    /** 昵称 */
    nickname: string;
    /** 当前登录用户的角色 */
    roles: Array<string>;
    /** 按钮级别权限 */
    permissions: Array<string>;
    /** `token` */
    accessToken: string;
    /** 用于调用刷新`accessToken`的接口时所需的`token` */
    refreshToken: string;
    /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
    expires: Date;
  };
};

export type RefreshTokenResult = {
  success: boolean;
  data: {
    /** `token` */
    accessToken: string;
    /** 用于调用刷新`accessToken`的接口时所需的`token` */
    refreshToken: string;
    /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
    expires: Date;
  };
};

export type SimpleResult = {
  code: number;
  message: string;
};

/** 登录 */
// export const getLogin = (data?: object) => {
//   return http.request<UserResult>("post", "/login", { data });
// };

/** 刷新`token` */
export const refreshTokenApi = (data?: object) => {
  return http.request<RefreshTokenResult>("post", baseUrlApi("refresh-token"), {
    data
  });
};

/** 登录 */
export const getLogin = (data?: object) => {
  return http.request<UserResult>("post", baseUrlApi("login"), { data });
};

export const createUserApi = (data?: object) => {
  return http.request<SimpleResult>("post", baseUrlApi("user/admin"), {
    data
  });
};

export const updateUserApi = (id: number, data?: object) => {
  return http.request<SimpleResult>("patch", baseUrlApi(`user/admin/${id}`), {
    data
  });
};

export const deleteUserApi = (id: number) => {
  return http.request<SimpleResult>("delete", baseUrlApi(`user/${id}`));
};

export const updateUserStatusApi = (id: number, status: number) => {
  return http.request<SimpleResult>("patch", baseUrlApi(`user/${id}/status`), {
    data: { status }
  });
};

export const resetUserPasswordApi = (id: number, password: string) => {
  return http.request<SimpleResult>(
    "patch",
    baseUrlApi(`user/${id}/password`),
    {
      data: { password }
    }
  );
};

export const updateUserRolesApi = (id: number, roleIds: number[]) => {
  return http.request<SimpleResult>("patch", baseUrlApi(`user/${id}/roles`), {
    data: { roleIds }
  });
};
