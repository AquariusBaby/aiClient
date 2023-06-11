import React, { FC, useEffect, useState, useContext } from "react";
import { Popup, Divider, List, Image, Button, Space, Ellipsis } from 'antd-mobile';
import classnames from "classnames";
import { useHistory, useParams } from "react-router-dom";

import CreatePlayer from '../../../CreatePlayer';

import { getUserFriends } from '../../../../api/mineService';

import UserInfoContext from "../../../../store/userInfoContext";

import styles from './index.module.scss';

interface LeftExpandProps {
    visible: boolean,
    // setVisible?: (v: boolean) => void;
    setVisible?: React.Dispatch<React.SetStateAction<boolean>>;
}

const LeftExpand: FC<LeftExpandProps> = ({ visible, setVisible }) => {

    const history = useHistory();
    const { roleId }: { roleId?: string } = useParams();

    // const [visible, setVisible] = useState<boolean>(false);
    const [createPlayerVisible, setCreatePlayerVisible] = useState<boolean>(false);
    const [playerList, setPlayerList] = useState<any[]>([]);

    const { globalInfo = {}, setLoginVisible, devicePlatform, setLeftExpandVisible } = useContext(UserInfoContext);

    const appDom = document.getElementById('app')

    useEffect(() => {
        globalInfo?.loggedIn &&
            getUserFriends().then((res: any) => {
                if (res.code !== 200) return;
                setPlayerList(res?.data || []);
            });
    }, [globalInfo?.loggedIn]);

    // useEffect(() => {
    //     return () => setLeftExpandVisible?.(false);
    // }, [])

    function handleCreatePlayer() {
        setVisible?.(false);
        setCreatePlayerVisible(true);
    }

    return (
        <>
            <i
                className={classnames(`icon iconfont ${visible ? 'icon-List-1' : 'icon-liebiao'}`, styles.leftExpandIcon)}
                onClick={() => {
                    if (!globalInfo?.loggedIn) {
                        // 打开登录弹窗
                        setLoginVisible?.(true);
                        return;
                    }
                    setVisible?.(c => !c);
                }}
            />
            <Popup
                visible={visible}
                mask={devicePlatform === 1}
                onMaskClick={() => {
                    setVisible?.(false)
                }}
                position='left'
            // getContainer={appDom}
            >
                <div className={styles.expandContentWrap}>
                    <div className={styles.expandContent}>
                        <h2 className={styles.title} onClick={() => history.push('/')}>Cn-Gpt</h2>
                        <Divider className={styles.line} />
                        <div className={styles.handle}>
                            <span className={styles.friend}>AI 好友</span>
                            <Button
                                fill='none'
                                onClick={() => {
                                    history.push('/createRole/create');
                                    setLeftExpandVisible?.(false);
                                }}
                            >
                                <div className={styles.handleBtn}>
                                    <i className={classnames("icon iconfont icon-zengjia", styles.handleBtnIcon)} />
                                    <span>创建</span>
                                </div>
                            </Button>
                        </div>
                        <List className={styles.playerList}>
                            {Array.isArray(playerList) && playerList?.map(player => (
                                <List.Item
                                    key={player.id}
                                    className={classnames(styles.playerItem, { [styles.active]: roleId === String(player.id) })}
                                    prefix={
                                        <Image
                                            src={player?.imgUrl || 'https://qny-kaka-dev.kanzhua.com/FqQcnR0RTby3LqOrKlACTf7rPEpm?imageMogr2/thumbnail/120x/crop/120x120'}
                                            style={{ borderRadius: 20 }}
                                            fit='cover'
                                            width={40}
                                            height={40}
                                        />
                                    }
                                    // description={player?.introduce}
                                    description={<Ellipsis className={styles.desc} rows={1} content={player?.summary} />}
                                    onClick={() => {
                                        setVisible?.(false);
                                        history.push(`/chat/${player.id}`)
                                    }}
                                    arrow={false}
                                >
                                    {player?.name}
                                </List.Item>
                            ))}
                        </List>
                        <div className={styles.useInfo}>
                            <Image
                                src={globalInfo.avatar || 'https://c.aichat.la/default-avatar.png'}
                                style={{ borderRadius: 20 }}
                                fit='cover'
                                width={40}
                                height={40}
                            />
                            <span className={styles.name}>{globalInfo?.name}</span>
                            {/* <Button fill='none'>
                            <i className="icon iconfont icon-find1" />
                        </Button> */}
                        </div>
                    </div>
                </div>
            </Popup>

            {/* 创建AI角色弹窗 */}
            <CreatePlayer createPlayerVisible={createPlayerVisible} setCreatePlayerVisible={setCreatePlayerVisible} />
        </>
    )

}

export default LeftExpand;