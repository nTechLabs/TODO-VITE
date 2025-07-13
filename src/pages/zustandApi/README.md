
<div align="center">
  <h1>🦊 Zustand 사용자 관리 예제</h1>
  <p>React + Zustand 기반의 <b>사용자 관리 UI/UX</b> 예제 프로젝트<br/>
  <em>개발 흐름과 컴포넌트 설계, 스타일링, 상태관리</em></p>

</div>

---

## 프로젝트 구조

```text
src/
├─ interface/
│   └─ api.js           # API 통신 함수 모음
├─ pages/
│   └─ zustandApi/
│        ├─ index.jsx         # 라우팅 및 진입점
│        ├─ UserList.jsx      # 사용자 목록 페이지
│        ├─ UserItem.jsx      # 사용자 목록의 각 사용자(행) 컴포넌트
│        ├─ UserDetail.jsx    # 사용자 상세/수정/추가 페이지
│        └─ user-list.css     # 사용자 목록/상세 스타일
├─ store/
│   └─ userZstore.js    # Zustand 사용자 스토어
└─ route/
    └─ index.js         # React Router 설정 파일
```

---

## 실행 및 개발

1. 의존성 설치

   ```bash
   npm install
   ```

2. 개발 서버 실행

   ```bash
   npm run dev
   ```

3. 브라우저에서 접속: [http://localhost:5173/zustandApi](http://localhost:5173/zustandApi)

---

## 전체 개발 순서

1. **상태 관리 설계(userZstore.js) 및 전역 스토어 구축**
2. **프로젝트 구조 설계 및 라우팅(index.jsx)**
3. **사용자 목록 UI(UserList.jsx, UserItem.jsx) 개발**
4. **상세/수정/추가 UI(UserDetail.jsx) 개발**
5. **스타일링(user-list.css) 및 UX 개선**

---

## 단계별 개발 가이드

### 1. 상태 관리 설계(userZstore.js)

- 사용자 목록, 로딩/에러 상태, CRUD 액션 함수(fetchUsers, addUser, updateUser, deleteUsers, getUserById 등) 정의
- Redux DevTools 연동(devtools 미들웨어)

```js
const useUserZStore = create(
  devtools((set, get) => ({
    users: [],
    fetchUsers: async () => { /* 사용자 목록 불러오기 */ },
    addUser: async (user) => { /* 새 사용자 추가 */ },
    updateUser: async (user) => { /* 사용자 정보 수정 */ },
    deleteUsers: async () => { /* 여러 사용자 삭제 */ },
    getUserById: async (id) => { /* 서버에서 사용자 정보 조회 */ },
  }))
);
```

### 2. 라우팅 및 페이지 구조(index.jsx)

- React Router `<Routes>`, `<Route>`로 페이지 이동 구성
- `/zustandApi` : 사용자 목록(UserList)
- `/zustandApi/user/:id` : 상세/수정/추가(UserDetail)

```jsx
<Routes>
  <Route path="/zustandApi" element={<UserList />} />
  <Route path="/zustandApi/user/:id" element={<UserDetail />} />
</Routes>
```

### 3. 사용자 목록 UI(UserList.jsx, UserItem.jsx)

- UserList: Zustand에서 사용자 목록(users) 받아와 `<List>`로 렌더링
- UserItem: 각 사용자 행, 체크박스/이름/이메일 등 표시, 클릭 시 상세로 이동
- 플로팅 버튼(+)으로 새 사용자 추가, 삭제 버튼으로 선택 사용자 삭제
- 스크롤 UX: `.userlist-scroll-hide` 클래스로 스크롤바 숨김 및 세로 스크롤 유지

### 4. 상세/수정/추가 UI(UserDetail.jsx)

- URL 파라미터(id)로 새 사용자/기존 사용자 모드 구분
- 입력값 실시간 유효성 검사(이메일, 전화번호 등)
- 저장/취소 버튼, 저장 성공 시 목록 이동, 실패 시 에러 메시지
- 서버에서 사용자 정보 비동기 로딩 시 스피너(Spin)로 UX 개선

### 5. 스타일링(user-list.css) 및 UX 개선

- 리스트, 버튼, 체크박스, 플로팅 버튼 등 UI 요소 스타일링
- `.userlist-scroll-hide` 클래스로 스크롤바 숨기고 세로 스크롤만 유지
- 반응형 레이아웃 및 여백 조정

### 6. 상태 관리 및 UX 마무리

- 삭제, 저장, 에러 등 주요 액션에 메시지/알림(Toast) 표시
- 로딩/에러/빈 목록 등 다양한 상태에 맞는 UI 처리
- 접근성(aria-label 등)과 모바일 대응도 고려

---

## 개발 팁 & 참고

- Ant Design 컴포넌트 적극 활용(Form, List, Button, Spin 등)
- 상태 변화에 따라 UI가 자연스럽게 반응하도록 설계
- 코드 분리: 목록/행/상세/스타일 파일을 명확히 분리
- 필요시 커스텀 훅, 유틸 함수 등으로 코드 재사용성 향상
- [Zustand 공식문서](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [Ant Design 공식문서](https://ant.design/components/overview/)

---

## Flux 패턴이란?

**Flux**는 Facebook에서 제안한 단방향 데이터 흐름(One-way Data Flow) 아키텍처 패턴입니다. React와 함께 상태 관리를 체계적으로 하기 위해 고안되었습니다.

- 데이터 흐름: View → Action → Reducer → Store → State → View
- 장점: 데이터 흐름이 단방향이므로 버그 추적이 쉽고 예측 가능, 상태 변경이 명확하게 추적됨
- Redux, Zustand 등은 Flux 패턴의 원칙을 따르거나 변형한 라이브러리입니다.
- Zustand는 Flux의 단방향 데이터 흐름을 간단한 API로 구현할 수 있게 해줍니다.

---

이 가이드대로 따라가면 유지보수성과 UX가 뛰어난 사용자 관리 UI를 단계적으로 완성할 수 있습니다.
