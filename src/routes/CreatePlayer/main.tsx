import React, { FC, useState, useEffect } from "react";
import { useHistory } from 'react-router'
import { Popup, Form, Button, Input, TextArea, Slider, Radio, Toast } from "antd-mobile";
import classnames from "classnames";

import AvatarSelect from "./AvatarSelect";

import { createRole } from "../../api/roleService";
// import { getCategoryInfo } from "../../api/homeService";

import styles from './main.module.scss';

const Marks = {
    0: '最精确',
    25: '较精确',
    45: '平衡',
    65: '有创造力',
    100: '天马行空',
}

// interface CreatePlayerProps {
//     createPlayerVisible: boolean;
//     setCreatePlayerVisible: (v: boolean) => void;
//     updateCategoryInfo?: () => void;
// }

const CreatePlayer: FC = () => {

    const [formData, setFormData] = useState({
        name: '',
        imgUrl: null,
        prompt: '',
        introduce: '',
        summary: '',
        temperature: 0,
        dialogue: 'SINGLE',
        attribute: 'PRIVATE',
    });
    // const [errorArr, setErrArr] = useState([0, 0, 0, 0, 0]);
    const [activeErrTip, setActiveErrTip] = useState(false);

    const history = useHistory();

    function changeFormData({ key, value }: { key: string; value: string | number | [number, number] }) {
        setFormData(c => ({
            ...c,
            [key]: value
        }))
    }

    function onFinish() {
        let flag = false;
        setActiveErrTip(true);

        for (const [key, value] of Object.entries(formData)) {
            if (key === 'name' && String(value)?.trim()?.length === 0) {
                flag = true;
            }
            if (key === 'imgUrl' && !value) {
                flag = true;
            }
            if (key === 'prompt' && String(value)?.trim()?.length === 0) {
                flag = true;
            }
            if (key === 'introduce' && String(value)?.trim()?.length === 0) {
                flag = true;
            }
            if (key === 'summary' && String(value)?.trim()?.length === 0) {
                flag = true;
            }
        }

        if (flag) return;

        setActiveErrTip(false);

        createRole({
            ...formData
        }).then((res: any) => {
            if (res.code !== 200) return;

            // setCreatePlayerVisible(false);
            history.goBack();

            Toast.show('创建成功!');

            // 更新分类
            // updateCategoryInfo?.();
        })
    }

    return (
        <div className={styles.createRoleWrap}>
            <div className={styles.header}>
                <i className={classnames("icon iconfont icon-icon-test51", styles.backIcon)} onClick={() => history.goBack()} />
                <strong className={styles.title}>创建AI角色</strong>
            </div>

            <ul className={styles.formContent}>
                <li className={styles.formItem}>
                    <strong className={styles.label}>角色名称</strong>
                    <Input className={classnames(styles.value, styles.name)} placeholder='如翻译助理、健身教练等' value={formData?.name} onChange={(value) => changeFormData({ key: 'name', value })} />
                    {/* <p className={styles.errTip}>{errorArr[0] === 1 ? '请输入角色名称' : ''}</p> */}
                    <p className={styles.errTip}>{activeErrTip && String(formData?.name)?.trim()?.length === 0 ? '请输入角色名称' : ''}</p>
                </li>
                <li className={styles.formItem}>
                    <strong className={styles.label}>头像</strong>
                    <div className={classnames(styles.value, styles.avatar)}>
                        <AvatarSelect value={formData?.imgUrl} onUpload={(value) => changeFormData({ key: 'imgUrl', value })} />
                    </div>
                    {/* <p className={styles.errTip}>{errorArr[1] === 1 ? '请上传头像' : ''}</p> */}
                    <p className={styles.errTip}>{activeErrTip && !formData?.imgUrl ? '请上传头像' : ''}</p>
                </li>
                <li className={styles.formItem}>
                    <strong className={styles.label}>角色设定Prompt</strong>
                    <TextArea
                        className={classnames(styles.value, styles.prompt)}
                        placeholder='请输入角色设定的Prompt，参考格式\n如下：\n角色：小红书文案助手'
                        rows={4}
                        showCount
                        value={formData?.prompt}
                        onChange={(value) => changeFormData({ key: 'prompt', value })}
                    />
                    {/* <p className={styles.errTip}>{errorArr[2] === 1 ? '请输入角色设定Prompt' : ''}</p> */}
                    <p className={styles.errTip}>{activeErrTip && String(formData?.prompt)?.trim()?.length === 0 ? '请输入角色设定Prompt' : ''}</p>
                </li>
                <li className={styles.formItem}>
                    <strong className={styles.label}>自我介绍</strong>
                    <TextArea
                        className={classnames(styles.value, styles.prompt)}
                        placeholder='请输入自我介绍'
                        rows={2}
                        showCount
                        value={formData?.introduce}
                        onChange={(value) => changeFormData({ key: 'introduce', value })}
                    />
                    {/* <p className={styles.errTip}>{errorArr[3] === 1 ? '请输入自我介绍' : ''}</p> */}
                    <p className={styles.errTip}>{activeErrTip && String(formData?.introduce)?.trim()?.length === 0 ? '请输入自我介绍' : ''}</p>
                </li>
                <li className={styles.formItem}>
                    <strong className={styles.label}>角色简介</strong>
                    <TextArea
                        className={classnames(styles.value, styles.prompt)}
                        placeholder='请输入角色简介'
                        rows={2}
                        showCount
                        value={formData?.summary}
                        onChange={(value) => changeFormData({ key: 'summary', value })}
                    />
                    {/* <p className={styles.errTip}>{errorArr[4] === 1 ? '请输入角色简介' : ''}</p> */}
                    <p className={styles.errTip}>{activeErrTip && String(formData?.summary)?.trim()?.length === 0 ? '请输入角色简介' : ''}</p>
                </li>
                <li className={styles.formItem}>
                    <div className={styles.label}>联想能力</div>
                    <Slider
                        className={classnames(styles.value)}
                        marks={Marks}
                        ticks
                        step={1}
                        popover
                        value={formData?.temperature}
                        onChange={(value) => changeFormData({ key: 'temperature', value })}
                    />
                    <p className={styles.errTip} />
                </li>
                <li className={styles.formItem}>
                    <div className={styles.label}>对话模式</div>
                    <div className={classnames(styles.value)}>
                        <Radio.Group
                            // defaultValue='SINGLE'
                            value={formData?.dialogue}
                            onChange={(value) => changeFormData({ key: 'dialogue', value })}
                        >
                            <Radio className={styles.radio} value='SINGLE'>连续对话模式</Radio>
                            <Radio className={styles.radio} value='CONTINUOUS'>单词回合模式</Radio>
                        </Radio.Group>
                    </div>
                    <p className={styles.errTip} />
                </li>
                <li className={styles.formItem}>
                    <div className={styles.label}>角色可见性</div>
                    <div className={classnames(styles.value)}>
                        <Radio.Group
                            value={formData?.attribute}
                            onChange={(value) => changeFormData({ key: 'attribute', value })}
                        >
                            <Radio className={styles.radio} value='PRIVATE'>私密</Radio>
                            <Radio className={styles.radio} value='PUBLIC'>公开发布</Radio>
                        </Radio.Group>
                    </div>
                    <p className={styles.errTip} />
                </li>
            </ul>

            <div className={styles.bottomWrap}>
                <button type='submit' className={styles.createBtn} onClick={onFinish}>
                    创建角色
                </button>
            </div>
        </div>
    )
}

export default CreatePlayer;
