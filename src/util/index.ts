
export function getDevice(): number {
    const userAgent = navigator.userAgent;
    if (/(iPhone|Android)/i.test(userAgent)) {
        return 1;
    }
    if (/iPad/i.test(userAgent)) {
        return 2;
    }
    return 3;
}

export function getLayoutTypeByDeviceAndWidth(): number {
    const userAgent = navigator.userAgent;
    // 手机
    if (/(iPhone|Android)/i.test(userAgent)) {
        return 1;
    }
    // iPad， 最多支持一个
    if (/iPad/i.test(userAgent)) {
        return 2;
    }
    const screenWidth = document.body.clientWidth;
    const referenceWidth = 1000;
    // 电脑屏幕小于1000px，开局需要支持一个，聊天页右边的自行支持
    if (screenWidth < referenceWidth) {
        return 3;
    }
    // 电脑屏幕大于1000px，开局两个都要支持
    return 4;
}

