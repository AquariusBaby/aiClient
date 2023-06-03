import io from "./io";

// export function getDefaultConfig(o) {
//   return io({
//     methods: "get",
//     url: "",
//     testUrl: "/mock/defaultConfig.json",
//     data: o,
//   });
// }

export function getCategoryInfo(o) {
  return io({
    methods: "get",
    url: "/api/label/findAll",
    testUrl: "/api/label/findAll",
    params: o,
  });
}

export function getRoleList(o) {
  return io({
    methods: "get",
    url: "/api/role/findByLabel",
    testUrl: "/api/role/findByLabel",
    params: o,
  });
}

export function getAllRoleList(o) {
  return io({
    methods: "get",
    url: "/api/label/findLabelRole",
    testUrl: "/api/label/findLabelRole",
    params: o,
  });
}
