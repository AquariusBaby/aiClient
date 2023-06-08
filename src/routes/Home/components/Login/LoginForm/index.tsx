import React, { FC, useState, useContext } from "react";
import { Modal, Input, Button, Form, Toast } from 'antd-mobile';
import md5 from 'blueimp-md5';

import { loginOrRegister, getUserInfo } from "../../../../../api/mineService";
import userInfoContext from '../../../../../store/userInfoContext';

import styles from './index.module.scss';

interface LoginFormProps {
    setIsEditPwd: (v: boolean) => void;
    setLoginVisible: (v: boolean) => void;
    updateCategoryInfo: () => void;
    shareUserId?: string;
}

const LoginForm: FC<LoginFormProps> = ({ setIsEditPwd, setLoginVisible, updateCategoryInfo, shareUserId }) => {

    // const [loginVisible, setLoginVisible] = useState<boolean>(false);
    // const [isEditPwd, setIsEditPwd] = useState<boolean>(false);
    const { setGlobalInfo } = useContext(userInfoContext);

    async function onFinish(values: any) {
        // Dialog.alert({
        //   content: <pre>{JSON.stringify(values, null, 2)}</pre>,
        // })
        // console.log(values, 'values');

        const res: any = await loginOrRegister({
            phone: values.phone,
            passWord: md5(values.passWord),
            shareUserId
        });

        // 登录失败
        if (res.code !== 200 || res.message !== null) {
            Toast.show(res?.message || '网络错误');
            setGlobalInfo?.({
                loggedIn: false,
                finised: true,
                // ...(res.data || {})
            });
            return;
        }

        // 登录成功
        Toast.show('登录成功!');
        localStorage.setItem('TOKEN', res?.data?.jwtToken);
        setLoginVisible(false);

        // 获取用户信息，并存入store
        getUserInfo().then((res: any) => {
            if (res.code !== 200 || res.message !== null) {
                return;
            }
            // setGlobalInfo?.(res.data || {});
            setGlobalInfo?.({
                loggedIn: true,
                finised: true,
                ...(res.data || {})
            });
            // 更新分类
            updateCategoryInfo();
        })


        // if (res.code === 200) {
        //     Toast.show('登录成功!')
        //     localStorage.setItem('TOKEN', res?.data?.jwtToken);
        //     setLoginVisible(false);

        //     // 获取用户信息，并存入store
        //     getUserInfo().then((res: any) => {
        //         if (res.code !== 200) {
        //             return;
        //         }
        //         setGlobalInfo?.(res.data || {});
        //         // 更新分类
        //         updateCategoryInfo();
        //     })
        // }
    }

    return (
        <div className={styles.loginFormWrap}>
            <strong className={styles.title}>欢迎来到Ai Chat</strong>
            <p className={styles.desc}>请输入手机号进行登录或注册</p>
            <Form
                className={styles.formWrap}
                onFinish={onFinish}
                footer={
                    <Button block type='submit' color='primary' size='middle'>
                        登录/注册
                    </Button>
                }
            >
                <Form.Item
                    name='phone'
                    // label='手机号/邮箱'
                    rules={[{ required: true, message: '手机号不能为空' }]}
                >
                    <Input onChange={console.log} placeholder='手机号/邮箱' />
                </Form.Item>
                <Form.Item
                    name='passWord'
                    // label='密码'
                    rules={[{ required: true, message: '密码不能为空' }]}
                >
                    <Input onChange={console.log} placeholder='请输入密码' type="password" />
                </Form.Item>
            </Form>

            <div className={styles.protocol}>
                <span>登录即同意</span>
                <Button color='primary' fill='none' className={styles.protocolBtn}>《AiChat服务协议》</Button>
            </div>
            <div className={styles.forget}>
                <Button color='primary' fill='none' className={styles.forgetBtn} onClick={() => setIsEditPwd(true)}>忘记密码？</Button>
            </div>
        </div>
    )
}

export default LoginForm;