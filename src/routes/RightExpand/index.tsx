import React, { FC, useEffect, useState, useContext } from "react";
import { Popup, Button, List, Image, Tabs, Ellipsis } from 'antd-mobile';
import classnames from 'classnames';

// import CreatePlayer from '../CreatePlayer';
import styles from './index.module.scss';
import PlayerInfo from './components/PlayerInfo'
import HistoryTopic from './components/HistoryTopic'

import { getChatHistory, getChatRecord } from '../../api/chatService';

import ChatContext from "../../store/chatContext";
import UserInfoContext from "../../store/userInfoContext";

interface RightExpandProps {
    roleId?: string
    // setChatMessageVos: (v: any[]) => void;
    // roleInfo: any;
    visible: boolean,
    // setVisible?: (v: boolean) => void;
    setVisible?: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ChatHistoryItem {
    name: string;
    id: number;
    createId: number;
    updateId: number;
    userRoleId: number;
}

const defaultAiAvatar = 'https://qny-kaka-dev.kanzhua.com/FqQcnR0RTby3LqOrKlACTf7rPEpm?imageMogr2/thumbnail/120x/crop/120x120';

const RightExpand: FC<RightExpandProps> = ({ roleId, visible, setVisible }) => {

    // const [visible, setVisible] = useState<boolean>(false);

    const [createPlayerVisible, setCreatePlayerVisible] = useState<boolean>(false);

    // const [chatHistory, setChatHistory] = useState<ChatHistoryItem[]>([]); // 角色所有聊天框
    // const [selectedTopic, setSelectedTopic] = useState<number>(-1);

    const { devicePlatform } = useContext(UserInfoContext);
    const { roleInfo, setChatMessageVos, setDialogueList, selectedTopic, setSelectedTopic } = useContext(ChatContext);

    // 获取聊天框列表
    // useEffect(() => {
    //     getChatHistory({
    //         roleId: roleId
    //     }).then((res: any) => {
    //         // console.log(res, 'cc')
    //         setChatHistory(res?.data || []);
    //         setSelectedTopic(res?.data?.[0]?.id || -1);
    //     });

    // }, [roleId])

    // 获取角色信息


    function handleCreatePlayer() {
        setVisible?.(false);
        setCreatePlayerVisible(true);
    }

    // 切换聊天框
    function toggleChatItem(id: number) {

        // chatMessageVos();
        getChatRecord({
            userChatId: id,
            roleId
        }).then((res: any) => {
            setChatMessageVos?.(res?.data?.chatMessageVos || []);
            setDialogueList?.([]);
        })
    }

    return (
        <>
            <i className={classnames(`icon iconfont ${visible ? 'icon-category' : 'icon-bofangjilu'}`, styles.historyIcon)} onClick={() => setVisible?.(c => !c)} />
            <Popup
                visible={visible}
                onMaskClick={() => {
                    setVisible?.(false)
                }}
                mask={devicePlatform === 1}
                position='right'
                className={styles.roleInfoPopWrap}
            >
                <div className={styles.roleInfoPopContainer}>
                    <div className={styles.roleInfo}>
                        <Image className={styles.avatar} src={roleInfo?.imgUrl || defaultAiAvatar} />
                        <div className={styles.info}>
                            <p className={styles.name}>{roleInfo?.name}</p>
                            <Ellipsis className={styles.desc} content={roleInfo?.summary} />
                        </div>
                        <span className={styles.placeholder} />
                    </div>
                    <Tabs>
                        <Tabs.Tab title='历史话题' key='fruits'>
                            <HistoryTopic roleId={roleId} toggleChatItem={toggleChatItem} />
                        </Tabs.Tab>
                        <Tabs.Tab title='角色信息' key='vegetables'>
                            <PlayerInfo roleId={roleId} roleInfo={roleInfo} />
                        </Tabs.Tab>
                    </Tabs>
                </div>
            </Popup>
        </>
    )

}

export default RightExpand;