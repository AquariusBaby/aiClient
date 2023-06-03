import React, { FC, useState } from "react";
import { Modal, Input, Button, Form, Toast } from 'antd-mobile';
// import md5 from 'blueimp-md5';

// import { loginOrRegister } from "../../../../api/mineService";

// import styles from './index.module.scss';
import LoginForm from './LoginForm';
import EditForm from './EditForm';

const Login: FC<{ updateCategoryInfo: () => void, shareUserId?: string }> = ({ updateCategoryInfo, shareUserId }) => {

    const [loginVisible, setLoginVisible] = useState<boolean>(!!shareUserId);
    const [isEditPwd, setIsEditPwd] = useState<boolean>(false);

    return (
        <>
            <Button color="primary" shape="rounded" size="small" onClick={() => setLoginVisible(true)}>登录/注册</Button>
            <Modal
                // closeOnMaskClick
                visible={loginVisible}
                showCloseButton
                onClose={() => setLoginVisible(false)}
                // className={styles.modalWrap}
                // bodyClassName={styles.modalContent}
                content={
                    !isEditPwd ?
                        <LoginForm setIsEditPwd={setIsEditPwd} setLoginVisible={setLoginVisible} updateCategoryInfo={updateCategoryInfo} shareUserId={shareUserId} />
                        :
                        <EditForm setIsEditPwd={setIsEditPwd} />
                }
            />
        </>
    )
}

export default Login;