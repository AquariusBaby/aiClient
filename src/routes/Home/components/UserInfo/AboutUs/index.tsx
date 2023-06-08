import React, { FC, useContext } from 'react';
import { Divider, Image, Button, Toast, Space } from 'antd-mobile';
import { SearchOutline } from 'antd-mobile-icons'
import classnames from 'classnames';

import UserInfoContext from '../../../../../store/userInfoContext';

import styles from './index.module.scss'

const AboutUs: FC = props => {

    const { setGlobalInfo, setLoginVisible } = useContext(UserInfoContext);

    function loginOut() {
        // 退出登录
        Toast.show('退出成功!');
        localStorage.removeItem('TOKEN');
        setLoginVisible?.(false);

        setGlobalInfo?.({
            loggedIn: false,
            finised: true,
            // ...(res.data || {})
        });
    }

    return (
        <div className={styles.aboutUsWrap}>
            <div className={styles.main}>
                <i className={classnames('icon iconfont icon-xiaomi', styles.chatIcon)}></i>
                <div className={styles.text}>
                    <strong className={styles.title}>Cn-Gpt</strong>
                    <p className={styles.desc}>与300+AI角色对话，或创建自己的AI角色</p>
                </div>
            </div>

            <Divider />

            <strong className={styles.other}>其他信息</strong>
            <p className={styles.email}>联系邮箱：XXXXX</p>
            {/* <p className={styles.wxNumber}>官方公众号</p>

            <Image className={styles.img} /> */}
            <Button className={styles.loginOutBtn} onClick={loginOut}>
                退出登录
            </Button>
        </div>
    );
};

export default AboutUs;