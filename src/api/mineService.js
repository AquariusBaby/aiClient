import io from "./io";

export function getUserInfo(o) {
  return io({
    method: "get",
    url: "/api/user/info",
    testUrl: "/api/user/info",
    data: o,
  });
}

export function getUserFriends(o) {
  return io({
    method: "get",
    url: "/api/role/find/user/role",
    testUrl: "/api/role/find/user/role",
    data: o,
  });
}

export function loginOrRegister(o) {
  return io({
    method: "post",
    url: "/api/user/login",
    testUrl: "/api/user/login",
    data: o,
  });
}

// : Promise<{
//   message: string;
//   status: string;
//   code: number;
//   data: any;
// }>
