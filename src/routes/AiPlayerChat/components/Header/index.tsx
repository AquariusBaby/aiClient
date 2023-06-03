import React, { FC, useEffect, useState, useContext } from 'react';
import { NavBar, Modal, Button } from 'antd-mobile';
import classnames from 'classnames';
// import ClipboardJS from 'clipboard'
import CopyToClipboard from '../../../../commonComp/CopyToClipboard';

import LeftExpand from '../../../Home/components/LeftExpand';
// import LeftExpand from '../../../LeftExpand';
import RightExpand from '../../../RightExpand';

import UserInfoContext from '../../../../store/userInfoContext';

import styles from './index.module.scss';


interface HeaderProps {
    chatName?: string
    roleId?: string;
    setChatMessageVos: (v: any[]) => void;
    roleInfo?: any;
}

const Header: FC<HeaderProps> = ({ chatName, roleId, setChatMessageVos, roleInfo }) => {

    const [visible, setVisible] = useState(false);
    const { globalInfo } = useContext(UserInfoContext);


    function share() {
        // Modal.confirm({
        //     title: '分享该角色1',
        //     content: <>
        //         <p>给你分享一个角色【{roleInfo?.name}】</p>
        //         <a href={window.location.href}>{window.location.href}</a>
        //     </>,
        //     closeOnMaskClick: true,
        //     // confirmText: '复制链接',
        //     confirmText: <CopyToClipboard className={styles.copyBtn} text={window.location.href} copyBtnText="复制链接" />,
        //     onConfirm: () => console.log(),
        //     cancelText: null,
        //     // showCloseButton,
        // })
        setVisible(true);
    }

    return (
        <>
            <NavBar
                className={styles.navBarWrap}
                back={<LeftExpand />}
                backArrow={false}
                right={
                    <>
                        <i className={classnames("icon iconfont icon-fenxiang", styles.shareIcon)} onClick={share} />
                        <RightExpand roleId={roleId} />
                    </>
                }
            >{roleInfo?.name}</NavBar>
            <Modal
                closeOnMaskClick
                title="分享该角色"
                visible={visible}
                showCloseButton
                onClose={() => setVisible(false)}
                content={
                    <>
                        <p>给你分享一个角色【{roleInfo?.name}】</p>
                        <p className={styles.link}>{`${window.location.origin}${window.location.pathname}`}</p>
                        <CopyToClipboard className={styles.copyBtn} text={`${window.location.origin}${window.location.pathname}?shareUserId=${globalInfo?.id}`} copyBtnText="复制链接" />
                    </>
                }
            />
        </>
    );
};

export default Header;