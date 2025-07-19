// React 라이브러리 임포트
import React from "react";
import UserList from "./UserList";

/**
 * Zustand API 예제 메인 페이지
 * 사용자 목록을 표시하는 컨테이너 컴포넌트
 */
const ZustandApi = () => {
  return (
    <div>
      {/* 페이지 제목 */}
      <h2>Users (React-Query + Zustand Example)</h2>
      {/* 사용자 목록 컴포넌트 */}
      <UserList />
    </div>
  );
};

export default ZustandApi;
