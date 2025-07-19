
<div align="center">
  <h1>🚀 React Query 사용자 관리 예제</h1>
  <p>React + React Query(TanStack Query) 기반의 <b>사용자 관리 UI/UX</b> 예제 프로젝트<br/>
  <em>개발 흐름과 컴포넌트 설계, 스타일링, 서버 상태 관리</em></p>

</div>

---

## 프로젝트 구조

```text
src/
├─ config/
│   └─ reactQueryConfig.jsx # React Query 설정 및 QueryClient 구성
├─ hooks/
│   ├─ useUserQueries.js    # 사용자 관련 React Query 커스텀 훅
│   └─ handleAxiosError.js  # Axios 에러 처리 유틸리티
├─ interface/
│   └─ api.js              # API 엔드포인트 상수 정의
├─ pages/
│   └─ zustandApi/
│        ├─ index.jsx         # 라우팅 및 진입점
│        ├─ UserList.jsx      # 사용자 목록 페이지 (React Query 사용)
│        ├─ UserItem.jsx      # 사용자 목록의 각 사용자(행) 컴포넌트
│        ├─ UserDetail.jsx    # 사용자 상세/수정/추가 페이지 (React Query 사용)
│        ├─ user-list.css     # 사용자 목록/상세 스타일
│        └─ flux.png         # Flux 패턴 설명 이미지
├─ store/
│   ├─ checkedStore.js      # 체크박스 상태 관리 (Zustand)
│   └─ notificationStore.js # 알림/메시지 상태 관리 (Zustand)
└─ router/
    └─ index.jsx           # React Router 설정 파일
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

1. **서버 상태 관리 설계(React Query 설정) 및 API 통신 구축**
2. **커스텀 훅 설계(useUserQueries.js) - Query/Mutation 로직 분리**
3. **프로젝트 구조 설계 및 라우팅(index.jsx)**
4. **사용자 목록 UI(UserList.jsx, UserItem.jsx) 개발**
5. **상세/수정/추가 UI(UserDetail.jsx) 개발**
6. **로컬 상태 관리(checkedStore.js, notificationStore.js) - Zustand 보조적 사용**
7. **스타일링(user-list.css) 및 UX 개선**

---

## 단계별 개발 가이드

### 1. 서버 상태 관리 설계(React Query 설정)

- React Query 글로벌 설정: 캐시 시간, 재시도 정책, 네트워크 모드 등
- QueryClient 생성 및 ReactQueryProvider로 앱 감싸기
- 개발/운영 환경별 다른 설정 적용

```jsx
// reactQueryConfig.jsx
export const QUERY_CONFIG = {
  staleTime: 5 * 60 * 1000,        // 5분간 캐시 유지
  gcTime: 10 * 60 * 1000,          // 10분간 캐시 보관
  retry: 3,                        // 실패 시 3번 재시도
  refetchOnWindowFocus: false,     // 윈도우 포커스 시 재요청 비활성화
};

export const ReactQueryProvider = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
```

### 2. 커스텀 훅 설계(useUserQueries.js)

- 사용자 관련 모든 서버 상태 로직을 커스텀 훅으로 분리
- Query Hook: useUsersQuery, useUserQuery
- Mutation Hook: useAddUserMutation, useUpdateUserMutation, useDeleteUsersMutation
- QueryKey Factory 패턴 적용으로 캐시 무효화 최적화

```js
// useUserQueries.js
export const useUsersQuery = () => useQuery({
  queryKey: userKeys.list(),
  queryFn: fetchUsers,
  ...createQueryOptions()
});

export const useAddUserMutation = () => useMutation({
  mutationFn: addUser,
  onSuccess: () => queryClient.invalidateQueries({ queryKey: userKeys.all() }),
  ...createMutationOptions()
});
```

### 3. 라우팅 및 페이지 구조(index.jsx)

- React Router `<Routes>`, `<Route>`로 페이지 이동 구성
- `/zustandApi` : 사용자 목록(UserList)
- `/zustandApi/user/:id` : 상세/수정/추가(UserDetail)

```jsx
<Routes>
  <Route path="/zustandApi" element={<UserList />} />
  <Route path="/zustandApi/user/:id" element={<UserDetail />} />
</Routes>
```

### 4. 사용자 목록 UI(UserList.jsx, UserItem.jsx)

- UserList: React Query의 useUsersQuery로 사용자 목록 받아와 `<List>`로 렌더링
- UserItem: 각 사용자 행, 체크박스/이름/이메일 등 표시, 클릭 시 상세로 이동
- 플로팅 버튼(+)으로 새 사용자 추가, 삭제 버튼으로 선택 사용자 삭제
- React Query의 isLoading, isError 상태로 로딩/에러 UI 처리
- 스크롤 UX: `.userlist-scroll-hide` 클래스로 스크롤바 숨김 및 세로 스크롤 유지

### 5. 상세/수정/추가 UI(UserDetail.jsx)

- URL 파라미터(id)로 새 사용자/기존 사용자 모드 구분
- useUserQuery로 기존 사용자 정보 조회, useAddUserMutation/useUpdateUserMutation로 저장
- 입력값 실시간 유효성 검사(이메일, 전화번호 등)
- React Query의 optimistic update 패턴 적용
- 저장/취소 버튼, 저장 성공 시 목록 이동, 실패 시 에러 메시지
- 서버에서 사용자 정보 비동기 로딩 시 스피너(Spin)로 UX 개선

### 6. 로컬 상태 관리(Zustand 보조적 사용)

- checkedStore.js: 사용자 목록의 체크박스 선택 상태 관리
- notificationStore.js: 토스트 메시지, 알림 상태 관리
- 서버 상태는 React Query, UI 상태는 Zustand로 역할 분리

```js
// checkedStore.js
export const useCheckedStore = create((set) => ({
  checkedUsers: [],
  setCheckedUsers: (users) => set({ checkedUsers: users }),
  clearCheckedUsers: () => set({ checkedUsers: [] }),
}));
```

### 7. 스타일링(user-list.css) 및 UX 개선

- 리스트, 버튼, 체크박스, 플로팅 버튼 등 UI 요소 스타일링
- `.userlist-scroll-hide` 클래스로 스크롤바 숨기고 세로 스크롤만 유지
- 반응형 레이아웃 및 여백 조정

### 8. 서버 상태 및 UX 마무리

- React Query의 캐싱, 백그라운드 업데이트, 에러 재시도 등 활용
- 삭제, 저장, 에러 등 주요 액션에 메시지/알림(Toast) 표시
- 로딩/에러/빈 목록 등 다양한 상태에 맞는 UI 처리
- Optimistic Update로 즉각적인 사용자 경험 제공
- 접근성(aria-label 등)과 모바일 대응도 고려

---

## 개발 팁 & 참고

- Ant Design 컴포넌트 적극 활용(Form, List, Button, Spin 등)
- React Query의 캐싱과 백그라운드 업데이트로 성능 최적화
- 서버 상태(React Query)와 클라이언트 상태(Zustand) 역할 분리
- 코드 분리: 목록/행/상세/스타일 파일을 명확히 분리
- 커스텀 훅으로 비즈니스 로직과 UI 로직 분리
- QueryKey Factory 패턴으로 캐시 무효화 최적화
- [React Query 공식문서](https://tanstack.com/query/latest)
- [Zustand 공식문서](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [Ant Design 공식문서](https://ant.design/components/overview/)

---

## React Query vs Zustand

이 프로젝트는 **서버 상태 관리**와 **클라이언트 상태 관리**를 분리한 하이브리드 접근법을 사용합니다:

### React Query (TanStack Query)
- **서버 상태 관리**: 사용자 데이터 CRUD, API 통신
- **장점**: 캐싱, 백그라운드 업데이트, 에러 처리, 낙관적 업데이트
- **사용 영역**: 사용자 목록, 상세 정보, 추가/수정/삭제

### Zustand
- **클라이언트 상태 관리**: UI 상태, 임시 데이터
- **장점**: 간단한 API, 적은 보일러플레이트, 선택적 구독
- **사용 영역**: 체크박스 선택 상태, 알림 메시지, 모달 상태

### 하이브리드 접근법의 장점
- 각 도구의 강점을 최대한 활용
- 서버 상태는 React Query로 효율적 관리
- 단순한 UI 상태는 Zustand로 가벼운 관리
- 코드의 역할과 책임이 명확하게 분리

---

## Flux 패턴과 React Query

**Flux**는 Facebook에서 제안한 단방향 데이터 흐름(One-way Data Flow) 아키텍처 패턴입니다. React와 함께 상태 관리를 체계적으로 하기 위해 고안되었습니다.

### 전통적인 Flux 패턴
- 데이터 흐름: View → Action → Dispatcher → Store → State → View
- 장점: 데이터 흐름이 단방향이므로 버그 추적이 쉽고 예측 가능
- Redux, Zustand 등은 Flux 패턴의 원칙을 따르거나 변형한 라이브러리

### React Query와 Flux 패턴
React Query는 **서버 상태 관리**에 특화된 새로운 패러다임을 제시합니다:

- **서버 상태와 클라이언트 상태 분리**: 서버에서 오는 데이터는 별도로 관리
- **선언적 데이터 페칭**: 컴포넌트에서 필요한 데이터를 선언적으로 요청
- **자동 캐싱 및 동기화**: 서버 상태의 캐싱, 백그라운드 업데이트, 재시도 등 자동 처리
- **Optimistic Update**: 사용자 경험 향상을 위한 낙관적 업데이트

### 현대적 상태 관리 패턴
```
서버 상태 (React Query): API ↔ Cache ↔ Component
클라이언트 상태 (Zustand): Component ↔ Store ↔ Component
```

이 하이브리드 접근법으로 각각의 강점을 살려 더 효율적이고 유지보수 가능한 애플리케이션을 구축할 수 있습니다.

---

이 가이드대로 따라가면 **React Query와 Zustand를 조합한 현대적인 상태 관리**로 유지보수성과 UX가 뛰어난 사용자 관리 UI를 단계적으로 완성할 수 있습니다.
