import React, { FC, useEffect, useState, useContext } from 'react';
import { Input, Button } from 'antd-mobile';
import dayjs from 'dayjs';

import CopyToClipboard from '../../../../../commonComp/CopyToClipboard';

import styles from './index.module.scss';

import UserInfoContext from '../../../../../store/userInfoContext';

const InviteFriend: FC = props => {

    const [rewardList, setRewardList] = useState<{
        name: string,
        time: string,
        count: number
    }[]>([]);

    const { globalInfo } = useContext(UserInfoContext);

    useEffect(() => {

        setRewardList([{
            name: '天天',
            time: '1682771395709',
            count: 12
        }])
    }, []);

    return (
        <div className={styles.inviteFriendWrap}>
            <strong className={styles.intro}>每邀请 <span className={styles.blue}>1位好友</span> 成功注册，奖励 <span className={styles.blue}>100条</span> 聊天机会</strong>

            <div className={styles.copyLink}>
                <Input value={`${window.location.origin}${window.location.pathname}?shareUserId=${globalInfo?.id}`} readOnly className={styles.link} />
                <CopyToClipboard className={styles.copyBtn} text={`${window.location.origin}${window.location.pathname}?shareUserId=${globalInfo?.id}`} copyBtnText="复制链接" />
            </div>

            <p className={styles.result}>您已经邀请了0人，共奖励0条聊天机会</p>

            {/* <p className={styles.record}>奖励记录（只显示最近10条信息）</p> */}

            {/* <ul>
                <li>
                    <span>用户</span>
                    <span>注册时间</span>
                    <span>奖励条数</span>
                </li>
                {
                    rewardList.map((item, index) =>
                        <li key={index}>
                            <span>{item.name}</span>
                            <span>{dayjs(item.time).format('YYYY-MM-DD')}</span>
                            <span>{item.count}</span>
                        </li>
                    )
                }
            </ul> */}
        </div>
    );
};

export default InviteFriend;