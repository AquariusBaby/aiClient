import React, { useState, useEffect } from 'react';
import { Button } from 'antd-mobile';
import classnames from 'classnames';

import { getVipTemp, createVipPayOrder } from '../../api/vipService';

import styles from './index.module.scss';

// WX_JS("公众号支付"),
// WX_NATIVE("扫码支付"),
// WX_H5("H5支付"),
// ALIPAY_PC("支付宝-网站支付"),
// ALIPAY_MOBILE("支付宝-手机支付"),

function getDevice(): number {
    const userAgent = navigator.userAgent;
    if (/(iPhone|Android)/i.test(userAgent)) {
        return 1;
    }
    if (/iPad/i.test(userAgent)) {
        return 2;
    }
    return 3;
}


const VipCenter = () => {

    const [selectedIndex, setSelectedIndex] = useState<number>(-1);
    const [vipPackage, setVipPackage] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        getVipTemp().then((res: any) => {
            setVipPackage(res?.data || []);
        })
    }, [])

    function handleSelect(index: number) {
        setSelectedIndex(index === selectedIndex ? -1 : index);
    }

    async function openVip() {
        if (selectedIndex === -1) return;

        const item: any = vipPackage[selectedIndex];

        setLoading(true);
        const res = await createVipPayOrder({
            tempId: item?.id,
            payType: getDevice() === 1 ? 'ALIPAY_MOBILE' : 'ALIPAY_PC',
        });
        setLoading(false);

        // getDevice() === 1 ? 
        window.location.href = res?.data?.body;
        // : window.open(res?.data?.body, '_blank');
    }

    return (
        <div className={styles.vipCenterWrap}>
            <p className={styles.title}>VIP会员享无限次数</p>
            <div className={styles.vipCenterContent}>
                <div className={styles.desc}>
                    <strong className={styles.bold}>开通VIP会员</strong>
                    <p>会员不消耗次数，无限使用</p>
                </div>
                <ul className={styles.vipTypeList}>
                    {
                        vipPackage.map((item, index) =>
                            <li className={classnames(styles.item, { [styles.selected]: index === selectedIndex })} key={item.id} onClick={() => handleSelect(index)}>
                                <div className={styles.time}>
                                    <strong className={styles.type}>{item?.name}</strong>
                                </div>
                                <div className={styles.discountPrice}>
                                    {/* <span>特价</span> */}
                                    <span className={styles.price}>{item?.money}</span>
                                    <span>元</span>
                                </div>
                                {/* <div className={styles.originPrice}>原价180元</div> */}
                            </li>
                        )
                    }
                </ul>
                <div className={styles.handleBtn}>
                    <Button
                        className={styles.openVipBtn}
                        shape='rounded'
                        disabled={selectedIndex === -1}
                        onClick={openVip}
                        loading={loading}
                        loadingText="正在提交订单"
                    >
                        立即开通会员
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default VipCenter;