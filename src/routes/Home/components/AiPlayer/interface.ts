/**
 * BizPageVo«LabelRolePageVo»
 */
export interface Response {
    data?: LabelRolePageVo[];
    total?: number;
}

/**
 * LabelRolePageVo
 */
export interface LabelRolePageVo {
    labelSort?: number;
    /**
     * 标签数据
     */
    labelVo?: LabelVo;
    /**
     * 角色数据
     */
    roleVos?: RoleVo[];
}

/**
 * 标签数据
 *
 * LabelVo
 */
export interface LabelVo {
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
 * <p>
 * 智能角色表
 * </p>
 *
 * RoleVo
 */
export interface RoleVo {
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