import { createContext } from 'react';

const UserInfoContext = createContext<{
    /** 用户信息 */
    globalInfo?: {
        /** 用户ID */
        id?: number;
        /** 用户名称 */
        name?: string;
        /** 用户可用剩余次数 */
        userCount?: number;
        /** 用户手机号 */
        phone?: number;
        /** 是否VIP */
        isVip?: boolean;
        /** 用户头像 */
        avatar?: string;
        /** 是否已登录 */
        loggedIn?: boolean;
        /** 是否请求完登录接口 */
        finised?: boolean;
    };
    setGlobalInfo?: (v: any) => void;
    loginVisible?: boolean;
    setLoginVisible?: (v: boolean) => void;
    devicePlatform?: number;
    leftExpandVisible: boolean;
    rightExpandVisible: boolean;
    setLeftExpandVisible?: React.Dispatch<React.SetStateAction<boolean>>;
    setRightExpandVisible?: React.Dispatch<React.SetStateAction<boolean>>;
}>({
    leftExpandVisible: false,
    rightExpandVisible: false,
});

export default UserInfoContext;