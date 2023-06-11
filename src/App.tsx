import React, { useEffect, useState } from 'react';
import { SafeArea, Toast } from 'antd-mobile';
import classnames from 'classnames';

import styles from './App.module.scss';
import RouterApp from './router';

import { getDevice, getLayoutTypeByDeviceAndWidth } from './util';

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
  const [devicePlatform, setDevicePlatform] = useState<number>(() => getLayoutTypeByDeviceAndWidth());

  const [leftExpandVisible, setLeftExpandVisible] = useState<boolean>(false);
  const [rightExpandVisible, setRightExpandVisible] = useState<boolean>(false);

  // 获取登录
  useEffect(() => {
    getUserInfo().then((res: any) => {
      if (res?.code === 200 && res.message === null) {
        setGlobalInfo?.({
          loggedIn: true,
          finised: true,
          ...(res.data || {})
        });
        setLeftExpandVisible(() => getLayoutTypeByDeviceAndWidth() >= 2);
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

  useEffect(() => {
    const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';

    function resizeFn() {
      const devicePlatform = getLayoutTypeByDeviceAndWidth();

      setDevicePlatform(devicePlatform);
    }

    // resizeFn();

    window.addEventListener(resizeEvt, resizeFn, false);

    return () => window.removeEventListener(resizeEvt, resizeFn);
  }, [])

  return (
    <>
      <div
        className={
          classnames(
            styles.app,
            {
              [styles.leftPadding]: devicePlatform >= 3 && leftExpandVisible,
              [styles.rightPadding]: devicePlatform >= 3 && rightExpandVisible,
              // [styles.needPadding]: devicePlatform === 3,
            }
          )
        }
        id="app"
      >
        <UserInfoContext.Provider value={{
          globalInfo,
          setGlobalInfo,
          loginVisible,
          setLoginVisible,
          devicePlatform,
          leftExpandVisible,
          setLeftExpandVisible,
          rightExpandVisible,
          setRightExpandVisible
        }}>
          {globalInfo?.finised && <RouterApp />}
        </UserInfoContext.Provider>
      </div>
      <SafeArea position='bottom' />
    </>
  );
}

export default App;
