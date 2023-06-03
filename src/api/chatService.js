import io from "./io";

// export function getChatRobotInfo(o) {
//   return io({
//     method: "get",
//     url: "",
//     testUrl: "/mock/chatRobotInfo.json",
//     data: o,
//   });
// }


export function getAllChatRecord(o) {
  return io({
    method: "get",
    url: "/api/chat/chatByRole",
    testUrl: "/api/chat/chatByRole",
    params: o,
  });
}

// 提问
// export function postQuestion(o) {
//   return io({
//     method: "post",
//     url: "/api/chat/questions",
//     testUrl: "/api/chat/questions",
//     responseType: "stream",
//     // params: o,
//     data: o,
//   });
// }

// 获取该角色所有聊天框
export function getChatHistory(o) {
  return io({
    method: "get",
    url: "/api/chat/findByRoleId",
    testUrl: "/api/chat/findByRoleId",
    params: o,
  });
}

// 新增聊天框
export function addNewChat(o) {
  return io({
    method: "post",
    url: "/api/chat/add/userChat",
    testUrl: "/api/chat/add/userChat",
    params: o,
  });
}

// 获取聊天框的聊天记录
export function getChatRecord(o) {
  return io({
    method: "get",
    url: "/api/chat/chatById",
    testUrl: "/api/chat/chatById",
    params: o,
  });
}

// 删除聊天框
export function delChat(o) {
  return io({
    method: "post",
    url: "/api/chat/deleteChats",
    testUrl: "/api/chat/deleteChats",
    data: o,
  });
}



// export function getAllChatRole(o) {
//   return io({
//     method: "get",
//     url: "/chat/findByRoleId",
//     testUrl: "/chat/findByRoleId",
//     params: o,
//   });
// }

// export function getCinemaMovieListForDate(o) {
//     return io({
//         method: 'get',
//         url: '',
//         testUrl: '/mock/cinemaMovieList.json',
//         data: o
//     })
// }
