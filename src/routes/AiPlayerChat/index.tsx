import React, { FC, useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router'
import { Button, TextArea, Space, Divider } from 'antd-mobile'
// import { FileWrongOutline, TravelOutline } from 'antd-mobile-icons'
import classnames from 'classnames';
// import axios from 'axios';
import dayjs from 'dayjs';
// import fetch from 'isomorphic-fetch';

import GConfig from '../../config';

import Header from './components/Header';
import Intro from './components/Intro';
import Dialogue from './components/Dialogue';
import DialogueMultie from './components/DialogueMultie';

import styles from './index.module.scss';

import { getChatHistory, getChatRecord, addNewChat } from '../../api/chatService';
import { getRoleInfo } from '../../api/roleService';

import ChatContext from '../../store/chatContext';

interface ChatHistoryItem {
    name: string;
    id: number;
    createId: number;
    updateId: number;
    userRoleId: number;
}

const defaultAiAvatar = 'https://qny-kaka-dev.kanzhua.com/FqQcnR0RTby3LqOrKlACTf7rPEpm?imageMogr2/thumbnail/120x/crop/120x120';

let controller: any;

const AiPlayerChat: FC = () => {

    const { roleId } = useParams<{ roleId: string }>();

    const [roleInfo, setRoleInfo] = useState<any>({
        dialogue: 'SINGLE'
    });

    // 问题
    const [questionChat, setQuestionChat] = useState<string>("");
    // 历史聊天记录
    const [chatMessageVos, setChatMessageVos] = useState<any[]>([]);

    // 这里是不是需要分页
    const [dialogueList, setDialogueList] = useState<any>([]);
    // 获焦
    const [focused, setFocused] = useState<boolean>(false);
    const chatListRef = useRef<HTMLUListElement>(null);

    // 聊天框历史
    const [chatHistory, setChatHistory] = useState<ChatHistoryItem[]>([]); // 角色所有聊天框
    // 当前对话框ID
    const [selectedTopic, setSelectedTopic] = useState<number>(-1);

    // 回答是否中
    const [isReplaying, setIsReplaying] = useState<boolean>(false);


    useEffect(() => {
        if (!roleId) return;

        // 获取角色信息
        getRoleInfo({
            roleId
        }).then((res) => {
            setRoleInfo(res?.data || {})
        })

        // 获取聊天框列表
        getChatHistory({
            roleId: roleId
        }).then((res: any) => {
            setChatHistory(res?.data || []);

            // 第一次，则新建一个聊天框
            if (res?.data?.length === 0) {

                addNewChat({
                    roleId
                }).then((res: any) => {
                    if (res?.code === 200) {
                        setChatHistory?.((c: any[]) => [{
                            ...res?.data,
                            id: res?.data?.userChatId,
                        }, ...c]);

                        setSelectedTopic?.(res?.data?.userChatId);
                        setChatMessageVos?.([]);
                        setDialogueList?.([]);
                    }
                })

                return;
            }

            // 存在聊天框，则去第一个聊天框
            setSelectedTopic(res?.data?.[0]?.id || -1);

            // 获取第一个聊天框的聊天记录
            getChatRecord({
                userChatId: res?.data?.[0]?.id,
                roleId
            }).then((res: any) => {
                setChatMessageVos?.(res?.data?.chatMessageVos || []);
            })
        });
    }, [roleId]);

    useEffect(() => {
        // 滚动到底部
        chatListRef?.current?.scrollIntoView(false);
    }, [dialogueList]);

    useEffect(() => {
        // 初始化，滚动到底部
        chatMessageVos?.length > 0 && chatListRef?.current?.scrollIntoView(false);
    }, [chatMessageVos])

    // 发起问答
    async function handlePostQuestion(questionChatMessage: string, index?: number, source?: number) {
        // if (index) {
        //     // 来源是历史记录的
        //     if (source === 1) {
        //         setChatMessageVos(c => [c.slice(0, index), {...c[index], context}])
        //     }
        //     // 来源是正在对话的
        //     if (source === 2) {
        //         setDialogueList(c => )
        //     }
        // } else {
        setDialogueList((c: any) => [...c, {
            text: questionChatMessage,
            dateTime: dayjs().format('YYYY-MM-DD HH:mm'),
            inversion: true
        }, {
            text: '',
            dateTime: dayjs().format('YYYY-MM-DD HH:mm'),
        }]);
        // }

        setQuestionChat('');

        // 创建 AbortController 对象
        controller = new AbortController();
        // 创建 AbortSignal 对象
        const signal = controller.signal;

        const token = localStorage.getItem("TOKEN") || '';
        const dateTime = dayjs().format('YYYY-MM-DD HH:mm');

        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', token);

        const response = await fetch(
            (GConfig.isTest || sessionStorage.isTest) ? '/api/chat/questions' : '/api/chat/questions',
            {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                    message: questionChatMessage,
                    userChatId: selectedTopic
                }),
                signal
            }
        );
        if (!response.ok) {
            // this.writing = false
            // app.globalData.util.message(response.statusText)
            return
        }

        const reader = response?.body?.getReader();
        const decoder = new TextDecoder('utf-8');
        let writingText = '';

        while (true) {
            setIsReplaying(true);
            const {
                value,
                done,
            }: any = await reader?.read();

            if (value) {
                let char = decoder.decode(value);

                if (char) {
                    writingText += char || '';

                    setDialogueList((c: any) => [...c.slice(0, c.length - 1), {
                        text: writingText,
                        dateTime
                    }]);
                }
            }

            if (done) {
                setIsReplaying(false);

                // 刷新聊天框记录
                getChatHistory({
                    roleId: roleId
                }).then((res: any) => {
                    setChatHistory(res?.data || []);
                });
                break;
            }
        }
    }

    // 停止输出
    function stopReplay(e: React.MouseEvent<HTMLButtonElement>) {
        e.stopPropagation();
        setIsReplaying(false);

        // 取消 Fetch 请求
        controller.abort();

        // 刷新聊天框记录
        getChatHistory({
            roleId: roleId
        }).then((res: any) => {
            setChatHistory(res?.data || []);
        });
    }

    // 新建话题/清理
    async function handleLeftBtn() {
        // 清理
        if (focused) {
            setQuestionChat('');
            return;
        }

        // 新增话题
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

    return (
        <ChatContext.Provider value={{
            roleInfo,
            setChatMessageVos,
            setDialogueList,
            chatHistory,
            setChatHistory,
            selectedTopic,
            setSelectedTopic
        }}>
            <div className={styles.chatPageWrap}>
                <Header chatName={roleInfo?.name} roleId={roleId} setChatMessageVos={setChatMessageVos} roleInfo={roleInfo} />
                <ul className={styles.chatContentWrap} ref={chatListRef}>
                    {/* 简介 */}
                    <Intro text={roleInfo?.introduce} avatar={roleInfo?.imgUrl || defaultAiAvatar} dateTime={roleInfo.createdDate} setQuestionChat={handlePostQuestion} />
                    {/* 聊天历史记录 */}
                    {
                        chatMessageVos?.map((item: any, index: number) => <DialogueMultie key={index} {...item} avatar={roleInfo?.imgUrl || defaultAiAvatar} index={index} handlePostQuestion={handlePostQuestion} />)
                    }
                    {/* 新增的聊天记录 */}
                    {
                        dialogueList.map((item: any, index: number) => <Dialogue key={index} {...item} avatar={roleInfo?.imgUrl || defaultAiAvatar} index={index} handlePostQuestion={handlePostQuestion} />)
                    }

                </ul>

                {
                    isReplaying &&
                    <Button color='primary' className={styles.stopBtn} onClick={stopReplay}>
                        <Space>
                            <i className={classnames('icon iconfont icon-stopcircle', styles.stopIcon)} />
                            <span>停止输出</span>
                        </Space>
                    </Button>
                }

                <div className={styles.bottomWrap}>
                    <Button className={styles.clearBtn} color='primary' shape='rounded' onClick={handleLeftBtn}>
                        <Space>
                            <i className={"icon iconfont icon-clear-f"} />
                            {focused ? null : '新话题'}
                        </Space>
                    </Button>
                    <div className={classnames(styles.inputWrap, { [styles.focused]: focused })}>
                        <TextArea
                            className={styles.sendContent}
                            placeholder='来说点什么...'
                            value={questionChat}
                            onChange={val => {
                                setQuestionChat(val);
                            }}
                            rows={1}
                            autoSize={{ minRows: 1, maxRows: 5 }}
                            onFocus={() => setFocused(true)}
                            onBlur={() => setFocused(false)}
                        />
                        <Divider direction="vertical" className={styles.line} />
                        <i className={classnames("icon iconfont icon-send", styles.sendBtn)} onClick={() => handlePostQuestion(questionChat)} />
                    </div>
                </div>
            </div>
        </ChatContext.Provider>
    )
}

export default AiPlayerChat;