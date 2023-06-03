import React, { FC, useState, useEffect } from "react";
import { Popup, Form, Button, Input, TextArea, Slider, Radio, Toast, Picker } from "antd-mobile";
import classnames from "classnames";

import AvatarSelect from "./AvatarSelect";

import { createRole } from "../../api/roleService";
import { getCategoryInfo } from "../../api/homeService";

import styles from './index.module.scss';

const Marks = {
    0: '最精确',
    25: '较精确',
    45: '平衡',
    65: '有创造力',
    100: '天马行空',
}

interface CreatePlayerProps {
    createPlayerVisible: boolean;
    setCreatePlayerVisible: (v: boolean) => void;
    updateCategoryInfo?: () => void;
}

const CreatePlayer: FC<CreatePlayerProps> = ({ createPlayerVisible, setCreatePlayerVisible, updateCategoryInfo }) => {

    const [labelList, setLabelList] = useState<any[]>([]);
    const [labelVisible, setLabelVisible] = useState<boolean>(false);

    useEffect(() => {
        getCategoryInfo().then((res: any) => {
            // setLabelList(res?.data || []);
            const list = res?.data?.map((item: any) => ({
                ...item,
                label: item.name,
                value: item.id
            }));

            setLabelList(list || []);
        })
    }, [])

    const onFinish = (values: any) => {
        console.log(values, 'values')

        createRole({
            ...values,
            // labelId: values.labelId[0],
        }).then((res: any) => {
            if (res.code !== 200) return;

            setCreatePlayerVisible(false);
            Toast.show('创建成功!');

            // 更新分类
            updateCategoryInfo?.();
        })
    }

    return (
        <Popup
            visible={createPlayerVisible}
            // showCloseButton
            // title="创建AI角色"
            // onClose={() => setCreatePlayerVisible(false)}
            onMaskClick={() => {
                setCreatePlayerVisible(false)
            }}
            position='right'
            bodyStyle={{ width: '90vw' }}
        // content={

        // }
        >
            <div className={styles.createRoleWrap}>
                <div className={styles.header}>
                    <i className={classnames("icon iconfont icon-icon-test51", styles.backIcon)} onClick={() => setCreatePlayerVisible(false)} />
                    <strong className={styles.title}>创建AI角色</strong>
                </div>
                <Form
                    className={styles.formContent}
                    onFinish={onFinish}
                    layout='horizontal'
                    footer={
                        <div className={styles.bottomWrap}>
                            <button type='submit' className={styles.createBtn}>
                                创建角色
                            </button>
                        </div>
                    }
                >
                    {/* <Form.Item
                            name='labelId'
                            label='所属标签'
                            rules={[{ required: true, message: '所属标签不能为空' }]}
                            trigger={'onConfirm'}
                            onClick={() => setLabelVisible(true)}
                            arrow={
                                <i className={classnames("icon iconfont icon-icon-test53", styles.selectLabelIcon)} />
                            }
                        >
                            <Picker
                                visible={labelVisible}
                                columns={[labelList]}
                                onClose={() => setLabelVisible(false)}
                            >
                                {
                                    (value) => <>{value[0]?.label}</>
                                }
                            </Picker>
                        </Form.Item> */}
                    <Form.Item
                        name='name'
                        label='角色名称'
                        rules={[{ required: true, message: '角色名称不能为空' }]}
                    >
                        <Input placeholder='如翻译助理、健身教练等' />
                    </Form.Item>
                    <Form.Item
                        name='imgUrl'
                        label='头像'
                        trigger={'onUpload'}
                        rules={[{ required: true, message: '头像不能为空' }]}
                    >
                        <AvatarSelect />
                    </Form.Item>
                    <Form.Item
                        name='prompt'
                        label='关键词'
                        rules={[{ required: true, message: '关键词不能为空' }]}
                    >
                        {/* <TextArea onChange={console.log} placeholder='请输入角色设定的Prompt，参考格式\n如下：\n角色：小红书文案助手' /> */}
                        <Input placeholder='如翻译、健身等' />
                    </Form.Item>
                    <Form.Item
                        name='introduce'
                        label='自我介绍'
                        rules={[{ required: true, message: '自我介绍不能为空' }]}
                    >
                        <TextArea onChange={console.log} placeholder='请输入自我介绍' />
                    </Form.Item>
                    <Form.Item
                        name='summary'
                        label='角色简介'
                        rules={[{ required: true, message: '角色简介不能为空' }]}
                    >
                        <TextArea onChange={console.log} placeholder='请输入角色简介' />
                    </Form.Item>

                    <Form.Item
                        name='temperature'
                        label='联想能力'
                    // rules={[{ required: true, message: '密码不能为空' }]}
                    >
                        <Slider marks={Marks} ticks step={1} popover />
                    </Form.Item>
                    <Form.Item
                        name='dialogue'
                        label='对话模式'
                    // rules={[{ required: true, message: '密码不能为空' }]}
                    >
                        <Radio.Group defaultValue='SINGLE'>
                            <Radio value='SINGLE'>连续对话模式</Radio>
                            <Radio value='CONTINUOUS'>单词回合模式</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        name='attribute'
                        label='角色可见性'
                    // rules={[{ required: true, message: '密码不能为空' }]}
                    >
                        <Radio.Group defaultValue='PRIVATE'>
                            <Radio value='PRIVATE'>私密</Radio>
                            <Radio value='PUBLIC'>公开发布</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Form>
                {/* <div className={styles.bottomWrap}>
                        <button type='submit' className={styles.createBtn}>
                            创建角色
                        </button>
                    </div> */}
            </div>
        </Popup>
    )
}

export default CreatePlayer;
