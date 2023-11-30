import React from 'react';
import { Tooltip } from 'antd';

const CustomToolTip = ({ title, children, condition, placement = 'topLeft' }) => {
    return condition ? (
        <Tooltip title={title} placement={placement}>
            <div className='ellipsis-container'>
                {children}
            </div>
        </Tooltip>
    ) : (
        children
    );
};

export default CustomToolTip;
