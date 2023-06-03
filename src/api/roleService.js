import io from "./io";

/** 创建新角色 */
export function createRole(o) {
  return io({
    method: "post",
    url: "/api/role/add",
    testUrl: "/api/role/add",
    data: o,
  });
}

/** 创建新角色 */
export function getRoleInfo(o) {
  return io({
    method: "get",
    url: "/api/role/find",
    testUrl: "/api/role/find",
    params: o,
  });
}

/** 获取默认角色 */
export function getDefaultRoleInfo(o) {
  return io({
    method: "get",
    url: "/api/role/find/default",
    testUrl: "/api/role/find/default",
    params: o,
  });
}

