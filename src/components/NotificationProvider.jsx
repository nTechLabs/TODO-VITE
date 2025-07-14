import React, { useEffect } from 'react';
import { message } from 'antd';
import { useNotificationStore } from '../store/notificationStore';

const NotificationProvider = ({ children }) => {
  const { notifications, removeNotification } = useNotificationStore();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    notifications.forEach(notification => {
      const { id, type, message: msg } = notification;
      
      messageApi[type](msg);
      
      // 알림이 표시되면 스토어에서 제거
      setTimeout(() => {
        removeNotification(id);
      }, 100);
    });
  }, [notifications, messageApi, removeNotification]);

  return (
    <>
      {contextHolder}
      {children}
    </>
  );
};

export default NotificationProvider;
