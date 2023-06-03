import React, { useEffect, useState } from 'react';
import { SafeArea } from 'antd-mobile';
import './App.css';
import RouterApp from './router';

import './style/github-markdown.scss';
import './style/highlight.scss';

import { getUserInfo } from './api/mineService';
import UserInfoContext from './store/userInfoContext'

function App() {

  const [globalInfo, setGlobalInfo] = useState({});

  // 获取登录
  useEffect(() => {
    getUserInfo().then((res: any) => {
      if (res?.code === 200) {
        setGlobalInfo(res.data || {})
      }
    })
  }, []);

  // target="_blank"

  return (
    <div className="App">
      <UserInfoContext.Provider value={{
        globalInfo,
        setGlobalInfo
      }}>
        <RouterApp />
        <SafeArea position='bottom' />
      </UserInfoContext.Provider>
    </div>
  );
}

export default App;
