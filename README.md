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
