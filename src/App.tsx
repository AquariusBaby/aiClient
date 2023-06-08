import React, { useEffect, useState } from 'react';
import { SafeArea, Toast } from 'antd-mobile';
import './App.css';
import RouterApp from './router';

import './style/github-markdown.scss';
import './style/highlight.scss';

import { getUserInfo } from './api/mineService';
import UserInfoContext from './store/userInfoContext';

interface GlobalInfoProps {
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

function App() {

  const [globalInfo, setGlobalInfo] = useState<GlobalInfoProps>({});
  const [loginVisible, setLoginVisible] = useState<boolean>(false);

  // 获取登录
  useEffect(() => {
    getUserInfo().then((res: any) => {
      if (res?.code === 200 && res.message === null) {
        setGlobalInfo?.({
          loggedIn: true,
          finised: true,
          ...(res.data || {})
        });
        return;
      }

      setGlobalInfo?.({
        loggedIn: false,
        finised: true,
        ...(res.data || {})
      });
      // Toast.show(res?.message || '网络错误');
    });

  }, []);

  return (
    <div className="App">
      <UserInfoContext.Provider value={{
        globalInfo,
        setGlobalInfo,
        loginVisible,
        setLoginVisible,
      }}>
        {globalInfo?.finised && <RouterApp />}
        <SafeArea position='bottom' />
      </UserInfoContext.Provider>
    </div>
  );
}

export default App;
