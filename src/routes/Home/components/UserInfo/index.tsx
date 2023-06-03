import React, { FC, useEffect, useState } from 'react';
import { Button, Modal, Tabs, Space } from 'antd-mobile';
import classnames from 'classnames';

import SetUpUserInfo from './SetUpUserInfo';
import AboutUs from './AboutUs';
import InviteFriend from './InviteFriend';

import styles from './index.module.scss'

const UserInfo: FC<any> = ({ userInfo }) => {

    const [visible, setVisible] = useState<boolean>(false);

    return (
        <>
            <Button
                color='primary'
                shape='rounded'
                size='small'
                onClick={() => setVisible(true)}
                className={styles.userBtn}
            >
                <span>{userInfo?.name}</span>
                <i className={classnames("icon iconfont icon-icon-test17", styles.icon)} />
            </Button>
            <Modal
                className={styles.userInfoWrap}
                title="用户设置"
                visible={visible}
                showCloseButton
                onClose={() => setVisible(false)}
                bodyClassName={styles.userInfoContent}
                content={
                    <>
                        <Tabs defaultActiveKey={'inviteFriend'}>
                            {/* <Tabs.Tab className={styles.tabItem} title='用户设置' key='userSetUp'>
                                <SetUpUserInfo />
                            </Tabs.Tab> */}
                            <Tabs.Tab className={styles.tabItem} title='邀请好友' key='inviteFriend'>
                                <InviteFriend />
                            </Tabs.Tab>
                            <Tabs.Tab className={styles.tabItem} title='关于我们' key='aboutUs'>
                                <AboutUs />
                            </Tabs.Tab>
                        </Tabs>
                    </>
                }
            />
        </>
    );
};

export default UserInfo;