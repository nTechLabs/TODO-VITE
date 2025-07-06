import React, { useEffect, useState } from "react";
import { List, Checkbox, Button, Alert, Spin, Space, FloatButton, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { USERS_API_URL } from "../../api/api";
import "antd/dist/reset.css";
import "./user-list.css";

const fetchUsersApi = async () => {
  const res = await fetch(USERS_API_URL);
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
};

const UserList = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [checked, setChecked] = useState([]);
  const [deleteError, setDeleteError] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsersApi()
      .then((data) => {
        setUsers(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError(true);
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  const handleToggle = (id) => {
    setChecked((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleDelete = async () => {
    setDeleteError("");
    try {
      await Promise.all(
        checked.map(async (id) => {
          await axios.delete(`${USERS_API_URL}/${id}`);
        })
      );
      setUsers((prev) => prev.filter((u) => !checked.includes(u.id)));
      setChecked([]);
      messageApi.success("삭제되었습니다.");
    } catch (e) {
      setDeleteError(e?.message || "삭제에 실패했습니다.");
    }
  };

  if (isLoading) return <Spin size="large" style={{ display: "block", margin: "40px auto" }} />;
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
            <div style={{ marginLeft: 20, marginRight: 16 }}>
              <Checkbox
                checked={checked.includes(user.id)}
                onChange={() => handleToggle(user.id)}
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
        style={{ right: 24, bottom: 80 }}
        onClick={() => navigate("/zustandApi/user/new")}
        tooltip="Add User"
      />
      <Space direction="horizontal" style={{ marginTop: 16 }} className="deleteButtonRow">
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
