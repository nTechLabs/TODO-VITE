import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export const useCheckedStore = create(
  devtools(
    (set, get) => ({
      checked: [],
      
      toggleChecked: (userId) => {
        const currentChecked = get().checked;
        const isChecked = currentChecked.includes(userId);
        
        set(
          {
            checked: isChecked
              ? currentChecked.filter(id => id !== userId)
              : [...currentChecked, userId]
          },
          false,
          'toggleChecked'
        );
      },
      
      clearChecked: () => set({ checked: [] }, false, 'clearChecked'),
      
      setChecked: (checkedIds) => set({ checked: checkedIds }, false, 'setChecked'),
    }),
    {
      name: 'checked-store',
    }
  )
);
