import React, { useState } from "react";
import { List, Checkbox, Spin, Alert, Typography, FloatButton, Modal, Input, Form, Button, Switch } from "antd";
import { useQuery } from "@tanstack/react-query";
import { PlusOutlined } from "@ant-design/icons";
import { fetchTodos } from "./api";

const TodoList = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });
  const [checkedIds, setCheckedIds] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [todoItems, setTodoItems] = useState([]);
  const [editTodo, setEditTodo] = useState(null);

  if (isLoading) return <Spin size="large" style={{ display: "block", margin: "40px auto" }} />;
  if (isError) return <Alert type="error" message={error.message} showIcon />;

  const handleToggle = (id) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleAddTodo = (values) => {
    setTodoItems((prev) => [
      { id: Date.now(), title: values.title, completed: false },
      ...prev,
    ]);
    setModalOpen(false);
    form.resetFields();
  };

  const handleItemClick = (item) => {
    setEditTodo(item);
    setModalOpen(true);
    form.setFieldsValue({ title: item.title, completed: item.completed });
  };

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      if (editTodo) {
        setTodoItems((prev) =>
          prev.map((todo) =>
            todo.id === editTodo.id ? { ...todo, ...values } : todo
          )
        );
      } else {
        handleAddTodo(values);
      }
      setModalOpen(false);
      setEditTodo(null);
      form.resetFields();
    });
  };

  // Combine fetched todos and local todos
  const allTodos = [...todoItems, ...(data || [])];

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 24 }}>
      <Typography.Title level={3} style={{ textAlign: "center" }}>ToDo List</Typography.Title>
      <List
        bordered
        dataSource={allTodos}
        renderItem={item => {
          const isCompleted = item.completed || checkedIds.includes(item.id);
          return (
            <List.Item style={{ justifyContent: 'flex-start' }} onClick={() => handleItemClick(item)}>
              <Checkbox
                checked={isCompleted}
                disabled={item.completed}
                onChange={e => { e.stopPropagation(); !item.completed && handleToggle(item.id); }}
                style={{ marginRight: 16 }}
              />
              <span>{item.title}</span>
            </List.Item>
          );
        }}
      />
      <FloatButton
        icon={<PlusOutlined />}
        type="primary"
        style={{ right: 24, bottom: 80 }}
        onClick={() => { setEditTodo(null); setModalOpen(true); }}
        tooltip="Add Todo"
      />
      <Modal
        title={editTodo ? "Edit Todo" : "Add Todo"}
        open={modalOpen}
        onCancel={() => { setModalOpen(false); setEditTodo(null); form.resetFields(); }}
        onOk={handleModalOk}
        okText={editTodo ? "Save" : "Add"}
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical">
          <Form.Item name="title" label="Todo" rules={[{ required: true, message: 'Please enter a todo item' }]}> 
            <Input placeholder="Enter todo item" />
          </Form.Item>
          <Form.Item name="completed" label="Completed" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TodoList;
