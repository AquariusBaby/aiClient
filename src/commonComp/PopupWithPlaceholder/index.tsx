import React, { FC, ReactNode } from 'react';
import { Popup } from 'antd-mobile';
import { PopupProps } from 'antd-mobile';

interface PopupWithPlaceholderProps {
    children?: ReactNode | string;
}

const PopupWithPlaceholder: FC<PopupWithPlaceholderProps & PopupProps> = ({ children, ...reset }) => {

    return (
        <Popup {...reset}>
            {children}
        </Popup>
    )
}

export default PopupWithPlaceholder;