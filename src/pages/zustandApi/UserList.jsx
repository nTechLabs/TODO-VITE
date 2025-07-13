// React 및 필요한 라이브러리 임포트
import React, { useEffect } from "react";
import {
  List,
  Button,
  Alert,
  Spin,
  Space,
  FloatButton,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import useUserZStore from "../../store/userZstore";
import UserItem from "./UserItem";
import "antd/dist/reset.css";
import "./user-list.css";

/**
 * 사용자 목록을 표시하는 컴포넌트
 * - 사용자 목록 조회 및 표시
 * - 개별 사용자 선택 (체크박스)
 * - 선택된 사용자 삭제
 * - 새 사용자 추가 버튼
 * - 사용자 클릭 시 상세 페이지로 이동
 */
const UserList = () => {
  const navigate = useNavigate(); // 라우터 네비게이션 훅
  const [messageApi, contextHolder] = message.useMessage(); // Ant Design 메시지 API
  const store = useUserZStore(); // Zustand 스토어 훅

  // 스토어에서 필요한 상태와 함수들 구조분해 할당
  const {
    users, // 사용자 목록
    isLoading, // 로딩 상태
    isError, // 에러 상태
    errorMsg, // 에러 메시지
    checked, // 체크된 사용자 ID 목록
    fetchUsers, // 사용자 목록 가져오기 함수
    toggleChecked, // 체크 상태 토글 함수
    deleteUsers, // 사용자 삭제 함수
  } = store;

  // ZustandApi 페이지 진입 시 항상 사용자 목록을 가져오도록 수정
  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * 선택된 사용자들을 삭제하는 핸들러
   * 삭제 완료 후 성공 메시지 표시
   */
  const handleDelete = async () => {
    await deleteUsers();
    messageApi.success("삭제되었습니다.");
  };

  // 로딩 중일 때 스피너 표시
  if (isLoading) return <Spin size="large" className="userListSpinner" />;

  // 에러 발생 시 에러 메시지 표시
  if (isError) return <Alert type="error" message={errorMsg} showIcon />;

  return (
    <div>
      {contextHolder} {/* 메시지 컨텍스트 홀더 */}
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
      {/* 새 사용자 추가 플로팅 버튼 */}
      <FloatButton
        icon={<PlusOutlined />}
        type="primary"
        onClick={() => navigate("/zustandApi/user/new")}
        tooltip="Add User"
      />
      {/* 삭제 버튼 */}
      <Space direction="horizontal">
        <Button
          type="primary"
          danger
          disabled={checked.length === 0} // 선택된 사용자가 없으면 비활성화
          onClick={handleDelete}
        >
          Delete
        </Button>
      </Space>
      {/* 삭제 에러 메시지 표시 */}
      {errorMsg && (
        <Alert
          type="error"
          message={errorMsg}
          showIcon
        />
      )}
    </div>
  );
};

export default UserList;
