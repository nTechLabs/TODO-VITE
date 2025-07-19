import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";
import { USERS_API_URL } from "../interface/api";
import { createQueryOptions, createMutationOptions } from "../config/reactQueryConfig.jsx";
import { handleAxiosError } from "./handleAxiosError";

/**
 * 사용자 관리를 위한 React Query 커스텀 훅
 * 사용자 목록 조회, 추가, 수정, 삭제 기능을 제공
 */

// QueryKey Factory
export const userKeys = {
  all: () => ["users"],
  list: (filters = {}) => [...userKeys.all(), "list", filters],
  detail: (id) => [...userKeys.all(), "detail", id],
};

// 사용자 목록을 가져오는 Query Hook
export const useUsersQuery = (filters = {}) => {
  return useQuery({
    queryKey: userKeys.list(filters),
    queryFn: async () => {
      try {
        const response = await axios.get(USERS_API_URL);
        return response.data;
      } catch (error) {
        handleAxiosError(error, '사용자 목록 조회');
      }
    },
    ...createQueryOptions(),
  });
};

// 특정 사용자를 가져오는 Query Hook
export const useUserQuery = (id) => {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: async () => {
      try {
        const response = await axios.get(`${USERS_API_URL}/${id}`);
        return response.data;
      } catch (error) {
        handleAxiosError(error, '사용자 조회');
      }
    },
    ...createQueryOptions({ enabled: !!id }), // id가 있을 때만 쿼리 실행
  });
};

// 사용자 삭제 Mutation Hook
export const useDeleteUsersMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userIds) => {
      try {
        // 체크된 모든 사용자에 대해 병렬로 삭제 요청
        await Promise.all(
          userIds.map(async (id) => {
            await axios.delete(`${USERS_API_URL}/${id}`);
          })
        );
      } catch (error) {
        handleAxiosError(error, '사용자 삭제');
      }
    },
    ...createMutationOptions({
      onSuccess: () => {
        // 삭제 성공 시 사용자 목록 쿼리 무효화하여 새로 가져오기
        queryClient.invalidateQueries({ queryKey: userKeys.all() });
      },
    }),
  });
};

// 사용자 추가 Mutation Hook
export const useAddUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (user) => {
      try {
        const response = await axios.post(USERS_API_URL, user);
        return response.data;
      } catch (error) {
        handleAxiosError(error, '사용자 추가');
      }
    },
    ...createMutationOptions({
      onSuccess: () => {
        // 추가 성공 시 사용자 목록 쿼리 무효화하여 새로 가져오기
        queryClient.invalidateQueries({ queryKey: userKeys.all() });
      },
    }),
  });
};

// 사용자 수정 Mutation Hook
export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (user) => {
      try {
        const response = await axios.put(`${USERS_API_URL}/${user.id}`, user);
        return response.data;
      } catch (error) {
        handleAxiosError(error, '사용자 수정');
      }
    },
    ...createMutationOptions({
      onSuccess: (data) => {
        // 수정 성공 시 해당 사용자 쿼리와 사용자 목록 쿼리 무효화
        queryClient.invalidateQueries({ queryKey: userKeys.detail(data.id) });
        queryClient.invalidateQueries({ queryKey: userKeys.all() });
      },
    }),
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
