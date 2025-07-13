// Zustand와 필요한 라이브러리 임포트
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import axios from "axios";
import { USERS_API_URL } from "../interface/api";

/**
 * 사용자 관리를 위한 Zustand 스토어
 * 사용자 목록 조회, 추가, 수정, 삭제 기능을 제공
 */
const useUserZStore = create(
  devtools(
    (set, get) => ({
      // === 상태 변수들 ===
      users: [], // 사용자 목록 배열
      isLoading: false, // 데이터 로딩 상태
      isError: false, // 에러 발생 여부
      errorMsg: "", // 모든 에러 메시지 통합
      checked: [], // 체크된 사용자 ID 배열 (삭제용)
      saveStatus: null, // 저장 상태 ('success' | 'error' | null)
      loading: false, // 저장/수정 로딩 상태
      // === 액션 함수들 ===

      /**
       * 서버에서 사용자 목록을 가져오는 비동기 함수
       * 로딩 상태를 관리하고 에러 처리를 수행
       */
      fetchUsers: async () => {
        set({ isLoading: true, isError: false, errorMsg: "" });
        try {
          const res = await fetch(USERS_API_URL);
          if (!res.ok) throw new Error("Network response was not ok");
          const data = await res.json();
          set({ users: data, isLoading: false });
        } catch (err) {
          set({ isError: true, errorMsg: err.message, isLoading: false });
        }
      },

      /**
       * ID로 특정 사용자를 찾는 함수
       * @param {string|number} id - 사용자 ID
       * @returns {Object|undefined} 찾은 사용자 객체 또는 undefined
       */
      // [사용자 조회 함수 사용 가이드]
      // findUserById: (id) => get().users.find((u) => String(u.id) === String(id))
      //   - 사용 목적: 이미 로컬 상태(users 배열)에 데이터가 있을 때 빠르게 찾고 싶을 때 사용 (비동기 아님)
      //   - 예시: 목록에서 상세로 이동 시, 이미 users가 채워져 있으면 findUserById로 바로 조회
      //   - 사용 예시:
      //     const findUserById = useUserZStore((state) => state.findUserById);
      //     const user = findUserById(id);

      // getUserById: async (id) => { ... }
      //   - 사용 목적: 서버에서 항상 최신 정보를 받아오고 싶을 때 사용 (비동기)
      //   - 예시: 상세 페이지 진입 시, 서버에서 직접 사용자 정보를 받아와야 할 때
      //   - 사용 예시:
      //     const getUserById = useUserZStore((state) => state.getUserById);
      //     useEffect(() => {
      //       (async () => {
      //         const data = await getUserById(id);
      //         setUser(data);
      //       })();
      //     }, [id]);
      // ⚠️ 주의: getUserById와 같은 async 함수를 selector로 직접 사용하면 무한 렌더링이 발생할 수 있습니다.
      //   반드시 이벤트 핸들러나 useEffect 등에서 호출하세요.
      getUserById: async (id) => {
        try {
          const res = await axios.get(`${USERS_API_URL}/${id}`);
          return res.data;
        } catch (err) {
          set({ isError: true, errorMsg: err.message, isLoading: false });
        }
      },

      /**
       * 사용자 체크 상태를 토글하는 함수 (삭제용)
       * @param {string|number} id - 사용자 ID
       */
      toggleChecked: (id) =>
        set((state) => ({
          checked: state.checked.includes(id)
            ? state.checked.filter((c) => c !== id)
            : [...state.checked, id],
        })),

      /**
       * 체크된 사용자들을 삭제하는 비동기 함수
       * 각 사용자에 대해 DELETE 요청을 보내고 로컬 상태 업데이트
       */
      deleteUsers: async () => {
        set({ errorMsg: "" });
        try {
          // 체크된 모든 사용자에 대해 병렬로 삭제 요청
          await Promise.all(
            get().checked.map(async (id) => {
              await axios.delete(`${USERS_API_URL}/${id}`);
            })
          );
          // 로컬 상태에서 삭제된 사용자들 제거
          set((state) => ({
            users: state.users.filter((u) => !state.checked.includes(u.id)),
            checked: [],
          }));
        } catch (e) {
          set({ errorMsg: e?.message || "삭제에 실패했습니다." });
        }
      },

      /**
       * 새로운 사용자를 추가하는 비동기 함수
       * @param {Object} user - 추가할 사용자 정보
       */
      addUser: async (user) => {
        set({ loading: true, errorMsg: "" });
        try {
          const res = await axios.post(USERS_API_URL, user);
          // 새 사용자를 배열 맨 앞에 추가
          set((state) => ({
            users: [res.data, ...state.users],
            saveStatus: "success",
            loading: false,
          }));
        } catch (e) {
          set({
            errorMsg: e?.message || "저장 실패",
            saveStatus: "error",
            loading: false,
          });
        }
      },

      /**
       * 기존 사용자 정보를 수정하는 비동기 함수
       * @param {Object} user - 수정할 사용자 정보 (id 포함)
       */
      updateUser: async (user) => {
        set({ loading: true, errorMsg: "" });
        try {
          await axios.put(`${USERS_API_URL}/${user.id}`, user);
          // 해당 사용자 정보를 배열에서 찾아 업데이트
          set((state) => ({
            users: state.users.map((u) =>
              u.id === user.id ? { ...u, ...user } : u
            ),
            saveStatus: "success",
            loading: false,
          }));
        } catch (e) {
          set({
            errorMsg: e?.message || "수정 실패",
            saveStatus: "error",
            loading: false,
          });
        }
      },
    }),
    { name: "UserZStore" }
  )
);

export default useUserZStore;
