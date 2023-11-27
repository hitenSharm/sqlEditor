import { notification } from "antd"

const openNotification = (type,message,desc)=>{
    notification[type]({
        message,desc
    });
};

export default openNotification;