import React, { FC, useState } from "react";
import { Modal, Input, Button, Form, Toast, Space } from 'antd-mobile';
import md5 from 'blueimp-md5';

import { loginOrRegister } from "../../../../../api/mineService";

import styles from './index.module.scss';

interface EditFormProps {
    setIsEditPwd: (v: boolean) => void;
}

const EditForm: FC<EditFormProps> = ({ setIsEditPwd }) => {

    // const [loginVisible, setLoginVisible] = useState<boolean>(false);
    const [shortCode, setShortCode] = useState<number | null>(null);

    function sendShortCode() {
        // setShortCode()
    }

    const onFinish = (values: any) => {
        // Dialog.alert({
        //   content: <pre>{JSON.stringify(values, null, 2)}</pre>,
        // })
        console.log(values, 'values');
        loginOrRegister({
            phone: values.phone,
            passWord: md5(values.passWord),
            shortCode
        }).then((res: any) => {
            // console.log(res);
            // 登录成功
            if (res.code === 200) {
                Toast.show('修改成功!')
                // localStorage.setItem('TOKEN', res?.data?.jwtToken);
                setIsEditPwd(false);
            }
        })
    }

    return (
        <div className={styles.EditFormWrap}>
            <strong className={styles.title}>修改密码</strong>
            <p className={styles.desc}>请验证手机号后，完成密码修改</p>
            <Form
                className={styles.formWrap}
                onFinish={onFinish}
                footer={
                    <Button block type='submit' color='primary' size='middle'>提交</Button>
                }
            >
                <Form.Item
                    name='phone'
                    // label='手机号'
                    rules={[{ required: true, message: '手机号不能为空' }]}
                >
                    <Input placeholder='请输入手机号' />
                </Form.Item>
                <Form.Item
                    // label='短信验证码'
                    extra={
                        // <a>发送验证码</a>
                        <Button color='primary' fill='none' className={styles.codeBtn} onClick={sendShortCode}>发送验证码</Button>
                    }
                >
                    <Input placeholder='请输入短信验证码' />
                </Form.Item>
                <Form.Item
                    name='passWord'
                    // label='新密码'
                    rules={[{ required: true, message: '密码不能为空' }]}
                >
                    <Input placeholder='请输入新密码' type="password" />
                </Form.Item>
            </Form>

            <div className={styles.forget}>
                <Button color='primary' fill='none' className={styles.forgetBtn} onClick={() => setIsEditPwd(false)}>
                    <div className={styles.forgetBtnContent}>
                        <i className={"icon iconfont icon-icon-test51"} />
                        返回登录
                    </div>
                </Button>
            </div>
        </div>
    )
}

export default EditForm;