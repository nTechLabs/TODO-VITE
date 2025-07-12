# Zustand API 개발 가이드

이 프로젝트는 React와 Zustand를 활용하여 사용자 목록을 관리하는 예제입니다. 아래 단계별 가이드를 따라하면 쉽고 빠르게 zustandApi 기능을 개발할 수 있습니다.

---

## 1. 프로젝트 구조 이해

```
src/
  pages/
    zustandApi/
      index.jsx         # 메인 페이지 (UserList 포함)
      UserList.jsx      # 사용자 목록 컴포넌트
      UserDetail.jsx    # 사용자 상세/수정/추가 컴포넌트
  store/
    userZstore.js      # Zustand 사용자 스토어
```

---

## 2. Zustand 스토어(userZstore.js) 준비

- 사용자 목록, 로딩/에러 상태, CRUD 액션 함수들을 정의합니다.
- `fetchUsers`, `addUser`, `updateUser`, `deleteUsers` 등 비동기 함수 포함.
- 예시:
  ```js
  const useUserZStore = create(
    devtools((set, get) => ({
      users: [],
      fetchUsers: async () => { ... },
      addUser: async (user) => { ... },
      // ...
    }))
  );
  ```

---

## 2-1. Redux DevTools 연동 (devtools 미들웨어 적용)

- 개발 중 상태 변화를 시각적으로 추적하려면 [Redux DevTools](https://github.com/reduxjs/redux-devtools)와 연동하는 것이 좋습니다.
- Zustand의 `devtools` 미들웨어를 사용하면 손쉽게 DevTools를 사용할 수 있습니다.
- 적용 예시:
  ```js
  import { create } from 'zustand';
  import { devtools } from 'zustand/middleware';

  const useUserZStore = create(
    devtools((set, get) => ({
      // ...상태 및 액션 정의...
    }), { name: 'UserZStore' })
  );
  ```
- DevTools 확장 프로그램을 설치하면 브라우저에서 상태 변화를 실시간으로 확인할 수 있습니다.

---

## 3. 사용자 목록(UserList.jsx) 구현

- Zustand 스토어에서 사용자 목록을 받아와 리스트로 렌더링합니다.
- 체크박스 선택, 삭제, 상세 페이지 이동, 새 사용자 추가 버튼 구현.
- 주요 포인트:
  - `useEffect`로 최초 진입 시 `fetchUsers()` 호출
  - 삭제 버튼 클릭 시 `deleteUsers()` 실행
  - 플로팅 버튼으로 `/user/new`로 이동

---

## 4. 사용자 상세(UserDetail.jsx) 구현

- URL 파라미터(id)에 따라 새 사용자 추가/기존 사용자 수정 모드 구분
- 입력값 실시간 유효성 검사(이메일, 전화번호)
- 저장/취소 버튼 구현 및 상태 관리
- 주요 포인트:
  - `useParams`로 id 추출, `isNew` 여부 판단
  - 저장 시 `addUser` 또는 `updateUser` 호출
  - 저장 성공 시 목록으로 이동, 실패 시 에러 메시지 표시

---

## 5. 라우팅(index.jsx 등)

- `/zustandApi`에서 사용자 목록을 보여주고,
- `/zustandApi/user/:id`에서 상세/수정/추가 페이지를 보여줍니다.
- React Router의 `<Routes>`, `<Route>`를 활용해 라우팅 구성

---

## 6. 스타일 및 UI

- Ant Design 컴포넌트 사용 (Form, Input, Button, List 등)
- `user-list.css` 등으로 추가 스타일 적용

---

## 7. 실행 및 테스트

1. 의존성 설치
   ```bash
   npm install
   ```
2. 개발 서버 실행
   ```bash
   npm run dev
   ```
3. 브라우저에서 `http://localhost:5173/zustandApi` 접속

---

## 8. 확장/커스터마이즈 팁

- 사용자 데이터 구조 확장(필드 추가 등)
- API URL 변경 시 `src/interface/api.js`에서 관리
- 상태 관리 로직 커스터마이즈 가능

---

## 참고
- [Zustand 공식문서](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [Ant Design 공식문서](https://ant.design/components/overview/)

---

이 가이드대로 따라하면 zustandApi 기반의 사용자 관리 기능을 빠르게 개발할 수 있습니다!
