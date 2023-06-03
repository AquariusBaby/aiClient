import React, { FC, useState, useEffect } from "react";
import { Tabs, Image, Ellipsis } from "antd-mobile";
import { useHistory } from 'react-router-dom'
import classnames from "classnames";

import { LabelRolePageVo, Response, RoleVo } from './interface';

import styles from './index.module.scss';

import { getAllRoleList } from "../../../../api/homeService";

const tabHeight = 42;

export interface CategoryItemProps {
    createdDate?: string;
    createdId?: number;
    id?: number;
    locked?: boolean;
    name: string;
    sort?: number;
    updateDate?: string;
    updateId?: number;
}

/**
 * 属性
 */
export enum Attribute {
    Default = "DEFAULT",
    Private = "PRIVATE",
    Public = "PUBLIC",
}

/**
 * 对话模式
 */
export enum Dialogue {
    Continuous = "CONTINUOUS",
    Single = "SINGLE",
}

/**
* 智能角色表
*/
export interface RoleItem {
    /**
     * 属性
     */
    attribute?: Attribute;
    createdDate?: string;
    createdId?: number;
    /**
     * 对话模式
     */
    dialogue?: Dialogue;
    id?: number;
    /**
     * 图片url
     */
    imgUrl?: string;
    /**
     * 自我介绍
     */
    introduce: string;
    /**
     * 标签id
     */
    labelId: number;
    /**
     * 标签名称
     */
    labelName?: string;
    /**
     * labelSort
     */
    labelSort?: number;
    /**
     * 是否锁定
     */
    locked?: number;
    /**
     * 姓名
     */
    name: string;
    /**
     * 关键词
     */
    prompt: string;
    /**
     * 是否被推荐
     */
    recommend?: number;
    /**
     * 排序
     */
    sort?: number;
    /**
     * 简介
     */
    summary: string;
    /**
     * 精准度
     */
    temperature?: number;
    updateDate?: string;
    updateId?: number;
}

const AiPlayer: FC<{ categoryInfo: LabelRolePageVo[] }> = ({ categoryInfo }) => {
    const [activeKey, setActiveKey] = useState<string>('0');
    // const [categoryList, setCategoryList] = useState<CategoryItemProps[]>([]);
    // const [roleList, setRoleList] = useState<RoleItem[]>([]);

    // const [categoryInfo, setCategoryInfo] = useState<LabelRolePageVo[]>([]);
    const history = useHistory();

    // const { run: handleScroll } = useThrottleFn(
    //     () => {
    //         let currentKey = tabItems[0].key
    //         for (const item of tabItems) {
    //             const element = document.getElementById(`anchor-${item.key}`)
    //             if (!element) continue
    //             const rect = element.getBoundingClientRect()
    //             if (rect.top <= tabHeight) {
    //                 currentKey = item.key
    //             } else {
    //                 break
    //             }
    //         }
    //         setActiveKey(currentKey)
    //     },
    //     {
    //         leading: true,
    //         trailing: true,
    //         wait: 100,
    //     }
    // )

    // useEffect(() => {
    //     window.addEventListener('scroll', handleScroll)
    //     return () => {
    //         window.removeEventListener('scroll', handleScroll)
    //     }
    // }, []);

    useEffect(() => {
        // getAllRoleList().then((res: any) => {
        //     setCategoryInfo(res?.data?.data || [])
        // });

        // getCategoryInfo().then((res) => {
        //     setCategoryList(res?.data || []);
        // });
    }, []);

    function toggleLabel(LabelId?: number) {
        // getRoleList({
        //     LabelId
        // }).then((res: any) => {
        //     setRoleList(res?.data || []);
        // })
    }

    // 进入相应的chat聊天框
    function toChat(id?: string | number) {
        history.push(`/chat/${id}`)
    }

    return (
        <div className={styles.tabsContainer}>
            <Tabs
                activeKey={activeKey}
                onChange={key => {
                    // document.getElementById(`anchor-${key}`)?.scrollIntoView()
                    // window.scrollTo({
                    //     top: window.scrollY - tabHeight,
                    // })
                    setActiveKey(key);
                    // toggleLabel(categoryList[Number(key)]?.id);
                }}
            >
                {/* {categoryList.map((item: CategoryItemProps, index: number) => (
                    <Tabs.Tab
                        className={classnames(styles.categoryItem, { [styles.selected]: String(index) === activeKey })}
                        title={item?.name}
                        key={String(index)}
                    >
                        <div className={styles.categoryContent}>
                            <h2 className={styles.categoryTitle}>{item?.name}</h2>
                            <ul className={styles.playerList}>
                                {
                                    roleList?.map((role: RoleItem, index: number) =>
                                        <li
                                            key={role.id}
                                            className={styles.playerItem}
                                            onClick={() => toChat(role.id)}
                                        >
                                            <Image src={role.imgUrl} className={styles.avatar} />
                                            <div className={styles.robotContent}>
                                                <strong>{role.name}</strong>
                                                <Ellipsis content={role.introduce} />
                                            </div>
                                        </li>
                                    )
                                }
                            </ul>
                        </div>
                    </Tabs.Tab>
                ))} */}
                {Array.isArray(categoryInfo) &&
                    categoryInfo?.map((item: LabelRolePageVo, index: number) => (
                        <Tabs.Tab
                            className={classnames(styles.categoryItem, { [styles.selected]: String(index) === activeKey })}
                            title={item?.labelVo?.name}
                            key={String(index)}
                        >
                            <div className={styles.categoryContent}>
                                <h2 className={styles.categoryTitle}>{item?.labelVo?.name}</h2>
                                <ul className={styles.playerList}>
                                    {
                                        item?.roleVos?.map((role: RoleVo, index: number) =>
                                            <li
                                                key={role.id}
                                                className={styles.playerItem}
                                                onClick={() => toChat(role.id)}
                                            >
                                                <Image src={role?.imgUrl || "https://qny-kaka-dev.kanzhua.com/FqQcnR0RTby3LqOrKlACTf7rPEpm?imageMogr2/thumbnail/120x/crop/120x120"} className={styles.avatar} />
                                                <div className={styles.robotContent}>
                                                    <Ellipsis content={role.name} rows={2} className={styles.robotName} />
                                                    <Ellipsis content={role.introduce} className={styles.introduce} />
                                                </div>
                                            </li>
                                        )
                                    }
                                </ul>
                            </div>
                        </Tabs.Tab>
                    ))}
            </Tabs>
            <div className={styles.filingNumber} onClick={() => window.location.href = "https://beian.miit.gov.cn/"}>粤ICP备20000589号-5</div>
        </div>
    )
}

export default AiPlayer;