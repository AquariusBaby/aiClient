import React, { FC, useEffect, useState } from 'react';
import { TextOutline } from 'antd-mobile-icons'

import { Divider, Modal, Toast, } from 'antd-mobile';

import CopyToClipboard from '../../../../commonComp/CopyToClipboard';

import styles from './index.module.scss';

import { getRoleInfo } from '../../../../api/roleService';

interface PlayerInfoProps {
    roleId?: string;
    roleInfo: any;
}

enum DialogueEnum {
    'SINGLE' = '连续对话模式',
    'CONTINUOUS' = '单词回合模式',
}

type DialogueType = 'SINGLE' | 'CONTINUOUS'

interface RoleInfoProps {
    dialogue: DialogueType;
    temperature?: number;
    name?: string;
    summary?: string;
    introduce?: string;
}

// const Marks = {
//     0: '最精确',
//     25: '较精确',
//     45: '平衡',
//     65: '有创造力',
//     100: '天马行空',
// }

function findIndex(num: number): string {
    if (num === 0) return '最精确';
    if (num === 100) return '天马行空';

    const Marks = ['较精确', '平衡', '有创造力', '有创造力']

    // 定义数组区间
    const intervals = [0, 25, 45, 65, 100];

    for (let i = 0; i < intervals.length - 1; i++) {
        if (num >= intervals[i] && num < intervals[i + 1]) { // 判断数字所在的区间
            console.log(i)
            return Marks[i];
        }
    }
    return '有创造力'; // 如果没有找到对应的区间，则返回 -1
}

const PlayerInfo: FC<PlayerInfoProps> = ({ roleId, roleInfo }) => {


    // const [roleInfo, setRoleInfo] = useState<RoleInfoProps>({
    //     dialogue: 'SINGLE'
    // });

    // useEffect(() => {
    //     roleId && getRoleInfo({
    //         roleId
    //     }).then((res) => {
    //         setRoleInfo(res?.data || {})
    //     })
    // }, [roleId]);

    function copyLink(e: React.MouseEvent<HTMLDivElement>) {
        e.stopPropagation();
        Modal.alert({
            title: '分享改角色',
            closeOnMaskClick: true,
            content: <>
                <p>给你分享一个AI角色【{roleInfo?.name}】</p>
                <a href={window.location.href}>{window.location.href}</a>
            </>,
            showCloseButton: true,
            confirmText: <CopyToClipboard className={styles.copyBtn} text={window.location.href} copyBtnText="复制链接" />,
            onConfirm: () => {
                // const bool = document.execCommand('copy', window.location.href);
                // bool && Toast.show({ content: '复制成功' });
            }
        })
    }

    return (
        <div className={styles.roleInfoWrap}>
            <strong className={styles.title}>基础信息</strong>
            <p className={styles.item}>创建者： </p>
            {/* <p className={styles.item}>对话模式： {DialogueEnum[roleInfo?.dialogue || 'SINGLE']}</p> */}
            <p className={styles.item}>对话模式： {roleInfo?.dialogue === 'CONTINUOUS' ? DialogueEnum['CONTINUOUS'] : DialogueEnum['SINGLE']}</p>
            <p className={styles.item}>联想能力： {findIndex((roleInfo?.temperature || 0) * 100)}（参数{roleInfo?.temperature || 0}）</p>

            <Divider />

            <strong className={styles.title}>角色分享链接</strong>
            <div className={styles.link} onClick={copyLink}>
                <a href={window.location.href}>{window.location.href}</a>
                <TextOutline />
            </div>

            <Divider />

            <strong className={styles.title}>角色简介</strong>
            <p className={styles.item}>{roleInfo?.summary}</p>

            <Divider />

            <strong className={styles.title}>使用介绍</strong>
            <p className={styles.item}>{roleInfo?.introduce}</p>
        </div>
    );
};

export default PlayerInfo;