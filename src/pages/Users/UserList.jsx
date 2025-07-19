// React 및 antd 필요한 라이브러리 임포트
import React from "react";
import {
  List,
  Button,
  Alert,
  Spin,
  Space,
  FloatButton,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useUsersQuery, useDeleteUsersMutation } from "../../hooks/useUserQueries";
import { useCheckedStore } from "../../store/checkedStore";
import { useNotificationStore } from "../../store/notificationStore";
import UserItem from "./UserItem";
import "antd/dist/reset.css";
import "./user-list.css";

/**
 * 주요기능요약
 * - React Query를 사용한 사용자 목록 조회 및 표시
 * - 체크박스를 이용한 개별 사용자 선택
 * - 선택된 사용자 삭제 (useMutation 사용)
 * - 새 사용자 추가 버튼
 * - 사용자 클릭 시 상세 페이지로 이동
 */
const UserList = () => {
  const navigate = useNavigate(); // 라우터 네비게이션 훅

  // React Query hooks 사용
  const { data: users = [], isLoading, error } = useUsersQuery();
  const deleteUsersMutation = useDeleteUsersMutation();
  
  // Zustand stores 사용
  const { checked, toggleChecked, clearChecked } = useCheckedStore();
  const { success, error: showError } = useNotificationStore();

  //** Handler 를 구현하는 영역
  /**
   * 선택된 사용자들을 삭제하는 핸들러
   * 삭제 완료 후 성공 메시지 표시
   */
  const handleDelete = async () => {
    try {
      await deleteUsersMutation.mutateAsync(checked);
      success("삭제되었습니다.");
      clearChecked(); // 체크 상태 초기화
    } catch (error) {
      showError("삭제에 실패했습니다.");
    }
  };
  //** Handler 를 구현하는 영역 **//

  // 로딩 중일 때 스피너 표시
  if (isLoading) return <Spin size="large" className="userListSpinner" />;

  // 에러 발생 시 에러 메시지 표시
  if (error) return <Alert type="error" message={error.message} showIcon />;


  // Return JSX
  return (
    <div className="userlist-container">
      <div className="userlist-scroll-hide">
        {/* 사용자 목록 렌더링 */}
        <List
          dataSource={users}
          renderItem={(user) => (
            <UserItem
              user={user}
              checked={checked}
              toggleChecked={toggleChecked}
            />
          )}
        />
      </div>
      
      {/* 새 사용자 추가 플로팅 버튼 */}
      <FloatButton
        icon={<PlusOutlined />}
        type="primary"
        onClick={() => navigate("/users/user/new")}
        tooltip="Add User"
      />
      
      {/* 삭제 버튼 - 리스트 하단에 고정 */}
      <div className="delete-button-container">
        <Space direction="horizontal">
          <Button
            type="primary"
            danger
            disabled={checked.length === 0} // 선택된 사용자가 없으면 비활성화
            loading={deleteUsersMutation.isPending} // 삭제 중일 때 로딩 표시
            onClick={handleDelete}
          >
            Delete ({checked.length})
          </Button>
        </Space>
        
        {/* 삭제 에러 메시지 표시 */}
        {deleteUsersMutation.error && (
          <Alert
            type="error"
            message={deleteUsersMutation.error.message}
            showIcon
            style={{ marginTop: '8px' }}
          />
        )}
      </div>
    </div>
  );
};

export default UserList;