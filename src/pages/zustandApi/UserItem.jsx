import React from "react";
import { List, Checkbox } from "antd";
import { useNavigate } from "react-router-dom";

const UserItem = ({ user, checked, toggleChecked }) => {
  const navigate = useNavigate();
  return (
    <List.Item key={user.id} className="user-list-item">
      <div
        className="user-list-item-content"
        onClick={() => navigate(`/zustandApi/user/${user.id}`)}
      >
        {/* 체크박스 컨테이너 */}
        <div className="user-list-checkbox">
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
          className="user-list-meta"
        />
      </div>
    </List.Item>
  );
};

export default UserItem;
