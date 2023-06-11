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
    // chatName?: string
    roleId?: string;
    setChatMessageVos: (v: any[]) => void;
    roleInfo?: any;
}

const Header: FC<HeaderProps> = ({ roleId, setChatMessageVos, roleInfo }) => {

    const [visible, setVisible] = useState(false);
    const { globalInfo, leftExpandVisible, setLeftExpandVisible, rightExpandVisible, setRightExpandVisible } = useContext(UserInfoContext);

    useEffect(() => {
        return () => setRightExpandVisible?.(false);
    }, []);

    return (
        <>
            <NavBar
                className={styles.navBarWrap}
                back={<LeftExpand visible={leftExpandVisible} setVisible={setLeftExpandVisible} />}
                backArrow={false}
                right={
                    <>
                        <i className={classnames("icon iconfont icon-fenxiang", styles.shareIcon)} onClick={() => setVisible(true)} />
                        <RightExpand roleId={roleId} visible={rightExpandVisible} setVisible={setRightExpandVisible} />
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
                getContainer={document.body}
            />
        </>
    );
};

export default Header;