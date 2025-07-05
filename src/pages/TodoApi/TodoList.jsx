import React, { useState } from "react";
import { List, Checkbox, Spin, Alert, Typography } from "antd";
import { useQuery } from "@tanstack/react-query";
import { fetchTodos } from "./api";

const TodoList = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });
  const [checkedIds, setCheckedIds] = useState([]);

  if (isLoading) return <Spin size="large" style={{ display: "block", margin: "40px auto" }} />;
  if (isError) return <Alert type="error" message={error.message} showIcon />;

  const handleToggle = (id) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 24 }}>
      <Typography.Title level={3} style={{ textAlign: "center" }}>ToDo List</Typography.Title>
      <List
        bordered
        dataSource={data}
        renderItem={item => {
          const isCompleted = item.completed || checkedIds.includes(item.id);
          return (
            <List.Item style={{ justifyContent: 'flex-start' }}>
              <Checkbox
                checked={isCompleted}
                disabled={item.completed}
                onChange={() => !item.completed && handleToggle(item.id)}
                style={{ marginRight: 16 }}
              />
              <span>{item.title}</span>
            </List.Item>
          );
        }}
      />
    </div>
  );
};

export default TodoList;
