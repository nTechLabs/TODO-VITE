import React from "react";
import { List, Checkbox } from "antd";
import { useNavigate } from "react-router-dom";

const UserItem = ({ user, checked, toggleChecked }) => {
  const navigate = useNavigate();
  return (
    <List.Item key={user.id} style={{ cursor: "pointer" }}>
      <div
        style={{ display: "flex", alignItems: "center", width: "100%" }}
        onClick={() => navigate(`/zustandApi/user/${user.id}`)}
      >
        {/* 체크박스 컨테이너 */}
        <div>
          <Checkbox
            checked={checked.includes(user.id)}
            onChange={(e) => {
              e.stopPropagation();
              toggleChecked(user.id);
            }}
          />
        </div>
        {/* 사용자 정보 표시 */}
        <List.Item.Meta
          title={user.name}
          description={
            <div>
              <div>{user.email}</div>
              <div>{user.phone}</div>
              <div>{user.company?.name || user.company || ''}</div>
            </div>
          }
          style={{ marginLeft: 8 }}
        />
      </div>
    </List.Item>
  );
};

export default UserItem;
