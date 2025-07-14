import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";
import { USERS_API_URL } from "../interface/api";

/**
 * 사용자 관리를 위한 React Query 커스텀 훅
 * 사용자 목록 조회, 추가, 수정, 삭제 기능을 제공
 */

// 사용자 목록을 가져오는 Query Hook
export const useUsersQuery = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await fetch(USERS_API_URL);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
    gcTime: 10 * 60 * 1000, // 10분간 캐시 보관
  });
};

// 특정 사용자를 가져오는 Query Hook
export const useUserQuery = (id) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      const response = await axios.get(`${USERS_API_URL}/${id}`);
      return response.data;
    },
    enabled: !!id, // id가 있을 때만 쿼리 실행
  });
};

// 사용자 삭제 Mutation Hook
export const useDeleteUsersMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userIds) => {
      // 체크된 모든 사용자에 대해 병렬로 삭제 요청
      await Promise.all(
        userIds.map(async (id) => {
          await axios.delete(`${USERS_API_URL}/${id}`);
        })
      );
    },
    onSuccess: () => {
      // 삭제 성공 시 사용자 목록 쿼리 무효화하여 새로 가져오기
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

// 사용자 추가 Mutation Hook
export const useAddUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (user) => {
      const response = await axios.post(USERS_API_URL, user);
      return response.data;
    },
    onSuccess: () => {
      // 추가 성공 시 사용자 목록 쿼리 무효화하여 새로 가져오기
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

// 사용자 수정 Mutation Hook
export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (user) => {
      const response = await axios.put(`${USERS_API_URL}/${user.id}`, user);
      return response.data;
    },
    onSuccess: (data) => {
      // 수정 성공 시 해당 사용자 쿼리와 사용자 목록 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ["user", data.id] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

// 체크된 사용자들을 관리하는 커스텀 훅
export const useCheckedUsers = () => {
  const [checked, setChecked] = useState([]);

  const toggleChecked = (id) => {
    setChecked((prev) =>
      prev.includes(id)
        ? prev.filter((c) => c !== id)
        : [...prev, id]
    );
  };

  const clearChecked = () => setChecked([]);

  return { checked, toggleChecked, clearChecked };
};
