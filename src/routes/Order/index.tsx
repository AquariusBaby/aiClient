import React, { FC, useState, useEffect } from "react";
import { useParams, useHistory } from 'react-router';
import { Button } from "antd-mobile";
import classnames from "classnames";

import styles from './index.module.scss';

import { getVipOrderStatus } from "../../api/vipService";

const Order: FC = () => {

    const [payStatus, setPayStatus] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const { id }: any = useParams();
    const history = useHistory();

    useEffect(() => {
        // setLoading(true);

        getVipOrderStatus({
            orderNum: id
        }).then((res: any) => {
            // console.log()
            setPayStatus(res?.data?.status);

            // 更新用户数据
        }).finally(() => {
            setLoading(false);
        });
    }, [id]);

    return (
        <div className={styles.orderWrap}>
            {loading ?
                <i className={classnames("icon iconfont icon-icon-test13", styles.searchIcon)} />
                :
                payStatus === 'PAY_SUCCESS'
                    ? <i className={classnames("icon iconfont icon-chenggong", styles.successIcon)} />
                    : <i className={classnames("icon iconfont icon-shibai", styles.errorIcon)} />
            }

            <p className={styles.orderStatus}>
                {
                    loading ? '订单状态查询中...' : payStatus === 'PAY_SUCCESS' ? '支付成功' : '支付失败'
                }
            </p>
            {payStatus && <Button color="primary" className={styles.goHome} onClick={() => history.replace('/home')}>返回首页</Button>}
        </div>
    )
}

export default Order;