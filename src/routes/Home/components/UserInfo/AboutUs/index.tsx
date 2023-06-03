import React, { FC } from 'react';
import { Divider, Image } from 'antd-mobile';
import classnames from 'classnames';

import styles from './index.module.scss'

const AboutUs: FC = props => {
    return (
        <div className={styles.aboutUsWrap}>
            <div className={styles.main}>
                <i className={classnames('icon iconfont icon-xiaomi', styles.chatIcon)}></i>
                <div className={styles.text}>
                    <strong className={styles.title}>Cn-Gpt</strong>
                    <p className={styles.desc}>与300+AI角色对话，或创建自己的AI角色</p>
                    </div>
            </div>
            
            <Divider />

            <strong className={styles.other}>其他信息</strong>
            <p className={styles.email}>联系邮箱：XXXXX</p>
            <p className={styles.wxNumber}>官方公众号</p>

            <Image className={styles.img} />
        </div>
    );
};

export default AboutUs;