import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export const useNotificationStore = create(
  devtools(
    (set, get) => ({
      notifications: [],
      
      addNotification: (type, message, duration = 3000) => {
        const id = Date.now();
        const notification = { id, type, message, duration };
        
        set(
          (state) => ({
            notifications: [...state.notifications, notification]
          }),
          false,
          'addNotification'
        );
        
        // 자동으로 알림 제거
        setTimeout(() => {
          get().removeNotification(id);
        }, duration);
      },
      
      removeNotification: (id) => {
        set(
          (state) => ({
            notifications: state.notifications.filter(n => n.id !== id)
          }),
          false,
          'removeNotification'
        );
      },
      
      clearAllNotifications: () => set({ notifications: [] }, false, 'clearAllNotifications'),
      
      // 편의 메서드들
      success: (message, duration) => get().addNotification('success', message, duration),
      error: (message, duration) => get().addNotification('error', message, duration),
      info: (message, duration) => get().addNotification('info', message, duration),
      warning: (message, duration) => get().addNotification('warning', message, duration),
    }),
    {
      name: 'notification-store',
    }
  )
);
