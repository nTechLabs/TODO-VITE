import React from "react";
import { List, Checkbox } from "antd";
import { useNavigate } from "react-router-dom";

const UserItem = ({ user, checked, toggleChecked }) => {
  const navigate = useNavigate();
  return (
    <List.Item key={user.id} className="user-list-item">
      {/* 체크박스 컨테이너 - 클릭해도 이동하지 않음 */}
      <div className="user-list-checkbox">
        <Checkbox
          checked={checked.includes(user.id)}
          onChange={() => toggleChecked(user.id)}
        />
      </div>
      {/* 사용자 정보 표시 - 클릭하면 상세페이지로 이동 */}
      <div
        className="user-list-item-content"
        onClick={() => navigate(`/zustandApi/user/${user.id}`)}
      >
        <List.Item.Meta
          title={user.name}
          description={
            <div>
              <div>{user.email}</div>
              <div>{user.phone}</div>
              <div>{user.company?.name || user.company || ''}</div>
              {user.address && (
                <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                  📍 {user.address.city}, {user.address.street}
                  {user.address.suite && `, ${user.address.suite}`}
                </div>
              )}
            </div>
          }
          className="user-list-meta"
        />
      </div>
    </List.Item>
  );
};

export default UserItem;
