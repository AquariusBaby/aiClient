import React, { FC, useState } from 'react';
import { Form, Button, Input, ImageUploader } from 'antd-mobile';
import { ImageUploadItem } from 'antd-mobile/es/components/image-uploader';

import styles from './index.module.scss'

const SetUpUserInfo: FC = props => {

    const [fileList, setFileList] = useState<ImageUploadItem[]>([]);

    // 模拟上传图片
    async function mockUpload(file: File) {
        return {
            url: URL.createObjectURL(file),
        }
    }

    function onFinish() {

    }

    return (
        <div>
            <Form
                className={styles.formContent}
                layout="horizontal"
                onFinish={onFinish}
                footer={
                    <div className={styles.footer}>
                        <Button className={styles.btn}>
                            退出登录
                        </Button>
                        <Button type='submit' color='primary' className={styles.saveBtn}>
                            保存
                        </Button>
                        <Button className={styles.btn}>
                            取消
                        </Button>
                    </div>
                }
            >
                <Form.Item
                    name='name'
                    label='昵称'
                    rules={[{ required: true, message: '昵称不能为空' }]}
                >
                    <Input onChange={console.log} placeholder='昵称' />
                </Form.Item>
                <Form.Item
                    name='avatar'
                    label='用户头像'
                // rules={[{ required: true, message: '密码不能为空' }]}
                >
                    <ImageUploader
                        value={fileList}
                        onChange={setFileList}
                        upload={mockUpload}
                        multiple={false}
                        maxCount={1}
                    >
                        <div className={styles.customUploadBtn}>+</div>
                    </ImageUploader>
                </Form.Item>
            </Form>
        </div>
    );
};

export default SetUpUserInfo;