import React, { FC, useEffect, useState, useContext } from 'react';
import { Button, Input, Popover, Modal, Toast, Ellipsis } from 'antd-mobile';
import { DeleteOutline, MessageOutline } from 'antd-mobile-icons';
import classnames from 'classnames';

import styles from './index.module.scss'

import { addNewChat, delChat } from '../../../../api/chatService';

import ChatContext from '../../../../store/chatContext';

interface ChatHistoryItem {
    name: string;
    id: number;
    createId: number;
    updateId: number;
    userRoleId: number;
}

interface HistoryTopicProps {
    // chatHistory: ChatHistoryItem[];
    // setChatHistory: (c: any) => void;
    roleId?: string;
    // selectedTopic: number;
    // setSelectedTopic: (v: number) => void;
    toggleChatItem: (v: number) => void;
}

const HistoryTopic: FC<HistoryTopicProps> = ({  roleId, toggleChatItem }) => {

    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [editValue, setEditValue] = useState<string>('');

    const { chatHistory, setChatHistory, selectedTopic, setSelectedTopic, setChatMessageVos, setDialogueList } = useContext(ChatContext)

    async function createNewChat() {
        const res: any = await addNewChat({
            roleId
        });
        
        if (res?.code === 200) {
            setChatHistory?.((c: any[]) => [{
                ...res?.data,
                id: res?.data?.userChatId,
            }, ...c]);
            setSelectedTopic?.(res?.data?.userChatId);
            setChatMessageVos?.([]);
            setDialogueList?.([]);
        }
    }

    function batchSelect() {
        // setIsEdit(false);
    }

    function editTopic(index: number) {
        // setIsEdit(true);
        setEditValue(chatHistory[index]?.name);
    }

    async function delTopic(index: number, id?: number) {
        if (chatHistory?.length === 1) return;

        const res: any = await delChat([id]);

        if (res?.code === 200) {
            setChatHistory?.((c: ChatHistoryItem[]) => [...c.slice(0, index), ...c.slice(index + 1)]);
        }
    }

    function saveTopic(index: number) {
        // setIsEdit(false);
        /* eslint-disable */
        // setChatHistory((c: ChatHistoryItem[]) =>
        //     [...c.slice(0, index),
        //     {
        //         ...c[index],
        //         name: editValue
        //     },
        //     ...c.slice(index + 1)
        //     ]
        // )
    }

    return (
        <div className={styles.historyTopicWrap}>
            <div className={styles.handle}>
                <Button color='primary' shape='rounded' fill='outline' className={styles.createTopic} onClick={createNewChat}>新建话题</Button>
                <div className={styles.iconHandle} onClick={batchSelect}>
                    <i className={classnames('icon iconfont icon-bx-message-x', styles.closeMessageIcon)} />
                </div>
            </div>

            <ul className={styles.topicList}>
                {
                    chatHistory?.map((item: any, index: number) =>
                        <li
                            key={item?.id}
                            className={classnames(styles.topicItem, { [styles.selected]: selectedTopic === item?.id })}
                            onClick={() => {
                                if (selectedTopic === item?.id) return;

                                // 切换聊天框
                                setSelectedTopic?.(item?.id);
                                // setIsEdit(false);
                                // 更新该聊天框对应的历史聊天记录
                                toggleChatItem(item?.id);
                            }}
                        >
                            <MessageOutline className={styles.messageIcon} />
                            {
                                selectedTopic === item?.id && isEdit
                                    ? <Input className={styles.topicInput} value={editValue} defaultValue="新聊天框" />
                                    : <Ellipsis className={styles.topicName} content={item?.name || '新聊天框'} />
                            }
                            {
                                selectedTopic === item?.id &&
                                <>
                                    {
                                        isEdit
                                            ? <i className={classnames('icon iconfont icon-save', styles.saveIcon)} onClick={() => saveTopic(index)} />
                                            :
                                            <>

                                                <i className={classnames('icon iconfont icon-icon-test14', styles.editIcon)} onClick={() => editTopic(index)} />
                                                {chatHistory?.length > 1 && <DeleteOutline className={styles.delIcon} onClick={() => delTopic(index, item?.id)} />}
                                            </>
                                    }
                                </>
                            }
                        </li>
                    )
                }
            </ul>
        </div>
    );
};

export default HistoryTopic;