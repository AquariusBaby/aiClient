import React, { FC, useState } from 'react';
import { ImageUploader } from 'antd-mobile';
import { ImageUploadItem } from 'antd-mobile/es/components/image-uploader';
import classnames from 'classnames';

import styles from './index.module.scss'

interface AvatarSelectProps {
    value?: any;
    onUpload?: (v: string) => void
}

const AvatarSelect: FC<AvatarSelectProps> = ({ value, onUpload }) => {

    const [avatarList, setAvatarList] = useState(() => [
        { name: '文字', bgColor: 'rgb(146, 115, 238)' },
        { name: '文字', bgColor: 'rgb(114, 143, 237)' },
        { name: '文字', bgColor: 'rgb(11234, 192, 230)' },
        { name: '文字', bgColor: 'rgb(0, 204, 149)' },
        { name: '文字', bgColor: 'rgb(237, 110, 168)' },
        { name: '文字', bgColor: 'rgb(242, 100, 111)' },
        { name: '文字', bgColor: 'rgb(250, 140, 23)' }
    ]);

    const [selectAvatarItem, setSelectAvatarItem] = useState<number>(-1);


    const [fileList, setFileList] = useState<ImageUploadItem[]>([]);

    const upload = (file: File): Promise<ImageUploadItem> => {
        return new Promise((res, rej) => {
            // 创建 FileReader 对象
            const reader = new FileReader();
            // 读取文件内容，将其转换为 Base64
            reader.onload = function(event: any) {
                const base64String = event.target.result;

                onUpload?.(base64String);
                
                res({
                    url: base64String,
                })
            };
            reader.readAsDataURL(file);
        })    
    }

    function updateAvatarList(event: any, index: number) {
        // console.log(event.target.value, 'sss');
        // onChange(index);
        setAvatarList(c => [...c.slice(0, index), { name: event.target.value, bgColor: c[index].bgColor }, ...c.slice(index + 1)]);
    }

    return (
        <ul className={styles.AvatarSelectWrap}>
            <li className={classnames(styles.avatarItem, styles.custom)}>
                <ImageUploader
                    value={fileList}
                    onChange={setFileList}
                    upload={upload}
                    multiple={false}
                    maxCount={1}
                >
                    <div className={styles.customUploadBtn}>+</div>
                </ImageUploader>
            </li>
            {/* {
                avatarList.map((avatarItem, index) =>
                    <li
                        key={index}
                        onClick={() => setSelectAvatarItem(index)}
                        className={classnames(styles.avatarItem, { [styles.selected]: selectAvatarItem === index })}
                        style={{ backgroundColor: avatarItem.bgColor }}
                    >
                        <input value={avatarItem.name} onChange={(event) => updateAvatarList(event, index)} className={styles.input} />
                    </li>
                )
            } */}
        </ul>
    );
};

export default AvatarSelect;