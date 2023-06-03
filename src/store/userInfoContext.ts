import {createContext} from 'react';

const UserInfoContext = createContext<{
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
    }
    setGlobalInfo?: (v: any) => void;
}>({});

export default UserInfoContext;