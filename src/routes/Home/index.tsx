import React, { FC, useEffect, useState, useContext, useCallback } from "react";
import { Button } from "antd-mobile";
import { useHistory, useLocation } from 'react-router-dom';
import classnames from 'classnames';

import Login from './components/Login';
import UserInfo from './components/UserInfo';
import LeftExpand from './components/LeftExpand';

import AiPlayer from './components/AiPlayer';
import CreatePlayer from '../CreatePlayer';

import UserInfoContext from '../../store/userInfoContext';

import { LabelRolePageVo } from "./components/AiPlayer/interface";

import { getAllRoleList } from "../../api/homeService";
import { getDefaultRoleInfo } from "../../api/roleService";


import styles from './index.module.scss';


function parseQueryString(url: string) {
    const queryString = url.split('?')[1];
    if (!queryString) {
        return {};
    }

    const pairs = queryString.split('&');
    const result: any = {};
    pairs.forEach(pair => {
        const [key, value] = pair.split('=');
        result[key] = decodeURIComponent(value || '');
    });

    return result;
}

const Home: FC = () => {

    const { search } = useLocation();
    const { shareUserId }: any = parseQueryString(search);

    const history = useHistory();

    const [createPlayerVisible, setCreatePlayerVisible] = useState<boolean>(false);
    const { globalInfo, setLoginVisible, leftExpandVisible, setLeftExpandVisible } = useContext(UserInfoContext);

    const [categoryInfo, setCategoryInfo] = useState<LabelRolePageVo[]>([]);

    const updateCategoryInfo = useCallback(() => {
        getAllRoleList().then((res: any) => {
            setCategoryInfo(res?.data?.data || [])
        });
    }, []);

    useEffect(() => {
        // getAllRoleList().then((res: any) => {
        //     setCategoryInfo(res?.data?.data || [])
        // });
        updateCategoryInfo();

        // getCategoryInfo().then((res) => {
        //     setCategoryList(res?.data || []);
        // });
    }, [updateCategoryInfo]);

    function handleVipBtn() {
        // if (!globalInfo?.id) {

        // }
        history.push('/vip-center');
    }

    async function getDefaultRole() {
        if (!globalInfo?.loggedIn) {
            setLoginVisible?.(true);
            return;
        }
        const res: any = await getDefaultRoleInfo();

        res?.code === 200 && history.push(`/chat/${res?.data?.id}`);
    }

    return (
        <div className={styles.homeWrap}>

            <div className={styles.headerWrap}>
                <LeftExpand visible={leftExpandVisible} setVisible={setLeftExpandVisible} />
                <span className={styles.placeholder} />
                <i
                    className={classnames("icon iconfont icon-yingchengka", styles.vipIcon)}
                    onClick={handleVipBtn}
                />
                {
                    globalInfo?.id ? <UserInfo userInfo={globalInfo} /> : <Login updateCategoryInfo={updateCategoryInfo} shareUserId={shareUserId} />
                }
            </div>
            <h1 className={styles.headTitle}>Cn-Gpt</h1>
            <h3 className={styles.desc}>与300+AI角色对话，或创建自己的AI角色</h3>
            <div className={styles.mainHandle}>
                <Button color="primary" className={styles.chatBtn} onClick={getDefaultRole}>立即开聊</Button>
                {/* <Button color="primary" className={styles.createBtn} onClick={() => setCreatePlayerVisible(true)}>创建AI角色</Button> */}
                <Button
                    color="primary"
                    className={styles.createBtn}
                    onClick={() => {
                        if (!globalInfo?.loggedIn) {
                            setLoginVisible?.(true);
                            return;
                        }
                        history.push('/createRole/create')
                    }
                    }
                >
                    创建AI角色
                </Button>
            </div>

            {/* AI 角色列表 */}
            <AiPlayer categoryInfo={categoryInfo} />

            {/* 创建AI角色弹窗 */}
            <CreatePlayer createPlayerVisible={createPlayerVisible} setCreatePlayerVisible={setCreatePlayerVisible} updateCategoryInfo={updateCategoryInfo} />

            {/* <p className={styles.filingNumber}>粤ICP备20000589号-5</p> */}
        </div>
    )
}

export default Home;