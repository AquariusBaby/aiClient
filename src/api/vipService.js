import io from "./io";

/** 获取VIP套餐 */
export function getVipTemp(o) {
    return io({
        method: "get",
        url: "/api/order/temp/findAll",
        testUrl: "/api/order/temp/findAll",
        params: o,
    });
}


/** 创建VIP订单 */
export function createVipPayOrder(o) {
    return io({
        method: "post",
        url: "/api/pay/create",
        testUrl: "/api/pay/create",
        data: o,
    });
}

/** 获取订单支付状态 */
export function getVipOrderStatus(o) {
    return io({
        method: "get",
        url: "/api/order/detail/get",
        testUrl: "/api/order/detail/get",
        params: o,
    });
}




// /** 创建VIP订单 */
// export function createVipPayOrder(o) {
//     return io({
//         method: "get",
//         url: "/api/pay/create",
//         testUrl: "/api/pay/create",
//         params: o,
//     });
// }


