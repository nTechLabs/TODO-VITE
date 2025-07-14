# TODO-VITE: Zustand 기반 사용자 관리 UI/UX 프로젝트

이 프로젝트는 React, Zustand, Ant Design, React Router, Vite를 활용한 사용자 관리 UI/UX 예제입니다. 상태 관리, 라우팅, CRUD, 스타일링, UX 개선 등 실전 개발 흐름을 단계별로 안내합니다.

---

## Getting Started

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

---

## Project Structure

```
src/
  components/      # Reusable UI components
  pages/           # Page components (route targets)
  store/           # Zustand store and slices
  styles/          # CSS and theme files
  values/          # Static data and options
  router/          # React Router setup
```

---

## 주요 기술 스택

- React 18
- Zustand (상태 관리)
- React Router v6
- Ant Design (UI 컴포넌트)
- Vite (빌드 도구)

---

## 주요 기능

- 사용자 목록/상세/수정/추가 UI
- 전역 상태 관리(Zustand)
- 서버 연동 CRUD 예시
- 반응형 UI 및 UX 개선

---

## 폴더별 주요 파일

- `src/pages/zustandApi/` : 사용자 관리 주요 페이지
- `src/store/userZstore.js` : 사용자 상태 관리 스토어
- `src/components/` : 공통 UI 컴포넌트
- `src/styles/user-list.css` : 사용자 목록 스타일

---

## Zustand 기반 사용자 관리 UI/UX 개발 가이드

이 가이드는 `index.jsx`, `UserList.jsx`, `UserItem.jsx`, `UserDetail.jsx`, `user-list.css` 파일을 활용하여 사용자 관리 UI/UX를 단계적으로 개발하는 방법을 안내합니다.

### 1. 전체 개발 순서 개요

1. **상태 관리 설계(userZstore.js) 및 전역 스토어 구축**
2. **프로젝트 구조 설계 및 라우팅(index.jsx)**
3. **사용자 목록 UI(UserList.jsx, UserItem.jsx) 개발**
4. **상세/수정/추가 UI(UserDetail.jsx) 개발**
5. **스타일링(user-list.css) 및 UX 개선**

---

### 2. 단계별 개발 가이드

#### 2-1. 라우팅 및 페이지 구조(index.jsx)
- `/zustandApi` : 사용자 목록 페이지(UserList)
- `/zustandApi/user/:id` : 사용자 상세/수정/추가 페이지(UserDetail)
- React Router의 `<Routes>`, `<Route>`를 사용해 라우팅을 구성합니다.
- 예시:
  ```jsx
  <Routes>
    <Route path="/zustandApi" element={<UserList />} />
    <Route path="/zustandApi/user/:id" element={<UserDetail />} />
  </Routes>
  ```

#### 2-2. 사용자 목록 UI(UserList.jsx, UserItem.jsx)
- **UserList.jsx**
  - Zustand 스토어에서 사용자 목록(users)과 체크 상태(checked) 등 상태를 받아옵니다.
  - `useEffect`로 진입 시 `fetchUsers()` 호출.
  - `<List>` 컴포넌트로 사용자 목록을 렌더링.
  - 각 행은 `<UserItem />`으로 분리하여 관리.
  - 플로팅 버튼(+)으로 새 사용자 추가, 삭제 버튼으로 선택 사용자 삭제.
  - 스크롤 UX: `.userlist-scroll-hide` 클래스로 스크롤바 숨김 및 세로 스크롤 유지.
- **UserItem.jsx**
  - 각 사용자 정보를 행 단위로 렌더링.
  - 체크박스, 이름, 이메일 등 표시.
  - 클릭 시 상세 페이지로 이동.

#### 2-3. 사용자 상세/수정/추가 UI(UserDetail.jsx)
- URL 파라미터(id)에 따라 새 사용자/기존 사용자 모드 구분.
- 입력값 실시간 유효성 검사(이메일, 전화번호 등).
- 저장/취소 버튼 구현 및 상태 관리.
- 저장 성공 시 목록으로 이동, 실패 시 에러 메시지 표시.
- 서버에서 사용자 정보 비동기 로딩 시 스피너(Spin)로 UX 개선.

#### 2-4. 스타일링(user-list.css)
- 리스트, 버튼, 체크박스, 플로팅 버튼 등 UI 요소 스타일링.
- `.userlist-scroll-hide` 클래스로 스크롤바 숨기고 세로 스크롤만 유지.
- 반응형 레이아웃 및 여백 조정.

#### 2-5. 상태 관리 및 UX 마무리
- 삭제, 저장, 에러 등 주요 액션에 메시지/알림(Toast) 표시.
- 로딩/에러/빈 목록 등 다양한 상태에 맞는 UI 처리.
- 접근성(aria-label 등)과 모바일 대응도 고려.

---

### 3. 개발 팁 및 참고
- Ant Design 컴포넌트(Form, List, Button, Spin 등) 적극 활용
- 상태 변화에 따라 UI가 자연스럽게 반응하도록 설계
- 코드 분리: 목록/행/상세/스타일 파일을 명확히 분리
- 필요시 커스텀 훅, 유틸 함수 등으로 코드 재사용성 향상

---

이 가이드대로 따라가면 유지보수성과 UX가 뛰어난 사용자 관리 UI를 단계적으로 완성할 수 있습니다.

---

## 참고

- [Ant Design](https://ant.design/components/overview/)
- [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [React Router](https://reactrouter.com/en/main)

---

## License

MIT
------------------------------------------------------------
nTechLabs: pages/zustandApi 에서 zustand 를 사용한 부분과 react query를 사용한 부분에 대해 설명해줘

Workspace: Collecting workspace information현재 workspace의 zustandApi 폴더에는 두 가지 다른 상태 관리 방식이 구현되어 있습니다:

## 1. Zustand 방식 (기존 구현)

### 상태 관리: `useUserZStore`
```js
const useUserZStore = create(
  devtools((set, get) => ({
    users: [],
    isLoading: false,
    isError: false,
    errorMsg: "",
    checked: [],
    fetchUsers: async () => { /* API 호출 */ },
    addUser: async (user) => { /* 사용자 추가 */ },
    updateUser: async (user) => { /* 사용자 수정 */ },
    deleteUsers: async () => { /* 사용자 삭제 */ },
  }))
);
```

### 컴포넌트에서 사용
- `UserList.jsx`에서 Zustand 스토어를 직접 사용
- `UserDetail.jsx`에서 CRUD 작업 수행

## 2. React Query 방식 (현재 활성화된 구현)

### 현재 `UserList.jsx`에서 사용되는 방식:
```jsx
// React Query hooks 사용
const { data: users = [], isLoading, error } = useUsersQuery();
const deleteUsersMutation = useDeleteUsersMutation();
const { checked, toggleChecked, clearChecked } = useCheckedUsers();
```

### 주요 차이점:

#### Zustand 방식:
- **전역 상태**: 모든 데이터가 Zustand 스토어에 저장
- **수동 캐싱**: 개발자가 직접 상태 업데이트 관리
- **단순한 API**: `useUserZStore()`로 모든 상태/액션 접근

#### React Query 방식:
- **서버 상태 관리**: 서버 데이터를 자동으로 캐싱하고 동기화
- **자동 캐싱**: 데이터 무효화, 백그라운드 업데이트 자동 처리
- **분리된 관심사**: 
  - 서버 상태: React Query (`useUsersQuery`, `useDeleteUsersMutation`)
  - 클라이언트 상태: 커스텀 훅 (`useCheckedUsers`)

### 현재 구현의 장점:

1. **성능 최적화**: React Query가 자동으로 중복 요청 방지, 캐싱 처리
2. **에러 처리**: `deleteUsersMutation.error`로 상세한 에러 상태 제공
3. **로딩 상태**: `deleteUsersMutation.isPending`으로 실시간 로딩 표시
4. **자동 동기화**: 데이터 변경 시 자동으로 UI 업데이트

이 구조는 서버 상태 관리는 React Query에게 맡기고, 단순한 UI 상태만 별도로 관리하는 현대적인 접근 방식을 따르고 있습니다.

nTechLabs: zustand 를 사용하는 부분은 모두 비활성화 된건지 확인해줘

GitHub Copilot: 현재 `UserList.jsx` 파일을 확인해보니, **Zustand는 완전히 비활성화되어 있습니다**.

## 현재 상태 확인:

### 1. Import 부분
```jsx
// React Query 훅들만 import되어 있음
import { useUsersQuery, useDeleteUsersMutation, useCheckedUsers } from "../../hooks/useUserQueries";

// Zustand 스토어 import 없음 (비활성화)
// import { useUserZStore } from "../../store/userZstore";
```

### 2. 상태 관리 부분
```jsx
// React Query 방식만 사용
const { data: users = [], isLoading, error } = useUsersQuery();
const deleteUsersMutation = useDeleteUsersMutation();
const { checked, toggleChecked, clearChecked } = useCheckedUsers();

// Zustand 방식은 사용되지 않음
// const { users, isLoading, error, deleteUsers, checked, toggleChecked } = useUserZStore();
```

### 3. 삭제 핸들러
```jsx
// React Query mutation 사용
const handleDelete = async () => {
  try {
    await deleteUsersMutation.mutateAsync(checked);
    // ...
  } catch (error) {
    // ...
  }
};

// Zustand 방식은 사용되지 않음
// const handleDelete = () => deleteUsers();
```

## 결론:
✅ **Zustand는 완전히 비활성화**되어 있고, 현재는 **React Query 방식만 활성화**되어 있습니다.

- 모든 데이터 fetching: `useUsersQuery()`
- 삭제 작업: `useDeleteUsersMutation()`
- 체크 상태 관리: `useCheckedUsers()` (커스텀 훅)

Zustand 관련 코드는 userZstore.js 파일에 여전히 존재하지만, 현재 컴포넌트에서는 전혀 사용되지 않고 있습니다.

nTechLabs: zustandApi 에서 zustand 를 사용할만한 부분이 있는지 확인해줘

GitHub Copilot: 현재 `UserList.jsx` 코드를 보면, **Zustand를 사용할 만한 부분이 있습니다**:

## Zustand 적용 가능한 부분:

### 1. **체크 상태 관리** (현재 커스텀 훅 사용)
```jsx
// 현재: React Query + 커스텀 훅
const { checked, toggleChecked, clearChecked } = useCheckedUsers();
```

이 부분은 Zustand로 관리하기 적합합니다:

````javascript
import { create } from 'zustand';

const useCheckedStore = create((set) => ({
  checked: [],
  toggleChecked: (userId) => 
    set((state) => ({
      checked: state.checked.includes(userId)
        ? state.checked.filter(id => id !== userId)
        : [...state.checked, userId]
    })),
  clearChecked: () => set({ checked: [] }),
}));
````

### 2. **메시지 상태 관리**
```jsx
// 현재: Ant Design 메시지 API 직접 사용
const [messageApi, contextHolder] = message.useMessage();
```

Zustand로 전역 알림 상태 관리 가능:

````javascript
import { create } from 'zustand';

const useNotificationStore = create((set) => ({
  notifications: [],
  addNotification: (type, message) => 
    set((state) => ({
      notifications: [...state.notifications, { type, message, id: Date.now() }]
    })),
  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter(n => n.id !== id)
    })),
}));
````

### 3. **혼합 접근 방식의 이점**

현재 구조에서 **React Query + Zustand 조합**이 적절한 이유:

- **React Query**: 서버 상태 관리 (users 데이터, API 호출)
- **Zustand**: 클라이언트 상태 관리 (checked 상태, UI 상태)

### 4. **추천 구조**

````jsx
import { useUsersQuery, useDeleteUsersMutation } from "../../hooks/useUserQueries";
import { useCheckedStore } from "../../store/checkedStore";
import { useNotificationStore } from "../../store/notificationStore";

const UserList = () => {
  // React Query: 서버 상태
  const { data: users = [], isLoading, error } = useUsersQuery();
  const deleteUsersMutation = useDeleteUsersMutation();
  
  // Zustand: 클라이언트 상태
  const { checked, toggleChecked, clearChecked } = useCheckedStore();
  const { addNotification } = useNotificationStore();

  const handleDelete = async () => {
    try {
      await deleteUsersMutation.mutateAsync(checked);
      addNotification('success', '삭제되었습니다.');
      clearChecked();
    } catch (error) {
      addNotification('error', '삭제에 실패했습니다.');
    }
  };
  
  // ...rest of component
};
````

## 결론:
✅ **Zustand 적용 가능한 부분**: 체크 상태, 알림 상태 등 순수 클라이언트 상태
✅ **React Query 유지**: 서버 데이터 fetching 및 캐싱
✅ **혼합 접근**: 각 도구의 장점을 활용한 최적의 구조

이렇게 하면 서버 상태와 클라이언트 상태를 명확히 분리하여 관리할 수 있습니다.

nTechLabs: 체크상태관리와 메시지 상태관리부분을 zustand로 변경해줘

GitHub Copilot: 체크 상태 관리와 메시지 상태 관리를 Zustand로 변경해드리겠습니다.

## 1. Zustand Store 생성

### 체크 상태 관리 Store
````javascript
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export const useCheckedStore = create(
  devtools(
    (

nTechLabs: 체크상태관리와 메시지 상태관리부분을 zustand로 변경해줘

GitHub Copilot: 체크 상태 관리와 메시지 상태 관리를 Zustand로 변경해드리겠습니다.

## 1. 체크 상태 관리 Store 생성 

Made changes.

## 2. 메시지 상태 관리 Store 생성 

Made changes.

## 3. UserList.jsx 컴포넌트 수정 
```


Made changes.


```

```


Made changes.


```

```


Made changes.


```

```


Made changes.


```
## 4. 알림 메시지 표시 컴포넌트 생성 

Made changes.

## 5. App.jsx에 NotificationProvider 적용 
```


Made changes.


```
## 6. message import 제거 
```


Made changes.


```
## 완료! 변경사항 요약

✅ **체크 상태 관리를 Zustand로 변경**:
- `useCheckedStore` 생성
- `toggleChecked`, `clearChecked`, `setChecked` 액션 포함

✅ **메시지 상태 관리를 Zustand로 변경**:
- `useNotificationStore` 생성
- `success`, `error`, `info`, `warning` 편의 메서드 포함

✅ **UserList.jsx 컴포넌트 수정**:
- `useCheckedUsers` 훅 → `useCheckedStore` Zustand 스토어로 변경
- `messageApi` → `useNotificationStore`의 `success`, `error` 메서드로 변경

✅ **글로벌 알림 시스템 구축**:
- `NotificationProvider` 컴포넌트 생성
- `App.jsx`에 NotificationProvider 적용

이제 체크 상태와 메시지 상태가 모두 Zustand로 관리되며, 전역적으로 사용할 수 있습니다!