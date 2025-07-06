import React, { useEffect } from "react";
import { List, Checkbox, Button, Alert, Spin, Space, FloatButton, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import useUserZStore from "./userZstore";
import "antd/dist/reset.css";
import "./user-list.css";

const UserList = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const {
    users,
    isLoading,
    isError,
    error,
    checked,
    deleteError,
    fetchUsers,
    toggleChecked,
    deleteUsers,
  } = useUserZStore();

  useEffect(() => {
    if (users.length === 0) fetchUsers();
  }, [fetchUsers, users.length]);

  const handleDelete = async () => {
    await deleteUsers();
    messageApi.success("삭제되었습니다.");
  };

  if (isLoading) return <Spin size="large" className="userListSpinner" />;
  if (isError)
    return <Alert type="error" message={error} showIcon />;

  return (
    <div className="userListContainer">
      {contextHolder}
      <List
        dataSource={users}
        renderItem={user => (
          <List.Item
            key={user.id}
            onClick={e => {
              if (e.target.type !== "checkbox")
                navigate(`/zustandApi/user/${user.id}`);
            }}
            style={{ cursor: "pointer" }}
          >
            <div className="userListCheckboxContainer">
              <Checkbox
                checked={checked.includes(user.id)}
                onChange={() => toggleChecked(user.id)}
                onClick={e => e.stopPropagation()}
              />
            </div>
            <List.Item.Meta
              title={user.name}
              description={user.email}
            />
          </List.Item>
        )}
      />
      <FloatButton
        icon={<PlusOutlined />}
        type="primary"
        className="userListFloatButton"
        onClick={() => navigate("/zustandApi/user/new")}
        tooltip="Add User"
      />
      <Space direction="horizontal" className="deleteButtonRow">
        <Button
          type="primary"
          danger
          disabled={checked.length === 0}
          onClick={handleDelete}
        >
          Delete
        </Button>
      </Space>
      {deleteError && (
        <Alert type="error" message={deleteError} showIcon className="deleteAlert" />
      )}
    </div>
  );
};

export default UserList;
