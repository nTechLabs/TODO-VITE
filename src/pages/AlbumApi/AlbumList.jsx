import React, { useState } from "react";
import { List, Spin, Alert, Typography, FloatButton, Modal, Input, Form, Button, Space } from "antd";
import { useQuery } from "@tanstack/react-query";
import { PlusOutlined } from "@ant-design/icons";
import { ALBUMS_API_URL } from "../../api/api";

const fetchAlbums = async () => {
  const res = await fetch(ALBUMS_API_URL);
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
};

const AlbumList = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["albums"],
    queryFn: fetchAlbums,
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [albumItems, setAlbumItems] = useState([]);
  const [editAlbum, setEditAlbum] = useState(null);

  if (isLoading) return <Spin size="large" style={{ display: "block", margin: "40px auto" }} />;
  if (isError) return <Alert type="error" message={error.message} showIcon />;

  const handleAddAlbum = (values) => {
    setAlbumItems((prev) => [
      { id: Date.now(), title: values.title },
      ...prev,
    ]);
    setModalOpen(false);
    form.resetFields();
  };

  const handleItemClick = (item) => {
    if (item.readonly) return;
    setEditAlbum(item);
    setModalOpen(true);
    form.setFieldsValue({ title: item.title });
  };

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      if (editAlbum) {
        setAlbumItems((prev) =>
          prev.map((album) =>
            album.id === editAlbum.id ? { ...album, ...values } : album
          )
        );
      } else {
        handleAddAlbum(values);
      }
      setModalOpen(false);
      setEditAlbum(null);
      form.resetFields();
    });
  };

  const handleDelete = () => {
    setAlbumItems((prev) => prev.filter((album) => album.id !== editAlbum.id));
    setModalOpen(false);
    setEditAlbum(null);
    form.resetFields();
  };

  // Combine fetched albums (readonly) and local albums
  const readonlyAlbums = (data || []).map((a) => ({ ...a, readonly: true }));
  const allAlbums = [...albumItems, ...readonlyAlbums];

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 24 }}>
      <Typography.Title level={3} style={{ textAlign: "center" }}>Album List</Typography.Title>
      <List
        bordered
        dataSource={allAlbums}
        renderItem={item => (
          <List.Item
            style={{ justifyContent: 'flex-start', cursor: item.readonly ? 'default' : 'pointer' }}
            onClick={() => handleItemClick(item)}
          >
            <span>{item.title}</span>
            {item.readonly && <span style={{ color: '#aaa', marginLeft: 8 }}>(readonly)</span>}
          </List.Item>
        )}
      />
      <FloatButton
        icon={<PlusOutlined />}
        type="primary"
        style={{ right: 24, bottom: 80 }}
        onClick={() => { setEditAlbum(null); setModalOpen(true); }}
        tooltip="Add Album"
      />
      <Modal
        title={editAlbum ? "Edit Album" : "Add Album"}
        open={modalOpen}
        onCancel={() => { setModalOpen(false); setEditAlbum(null); form.resetFields(); }}
        onOk={handleModalOk}
        okText={editAlbum ? "Save" : "Add"}
        cancelText="Cancel"
        footer={editAlbum ? [
          <Button key="delete" danger onClick={handleDelete}>Delete</Button>,
          <Button key="cancel" onClick={() => { setModalOpen(false); setEditAlbum(null); form.resetFields(); }}>Cancel</Button>,
          <Button key="save" type="primary" onClick={handleModalOk}>Save</Button>,
        ] : null}
      >
        <Form form={form} layout="vertical" onFinish={editAlbum ? handleModalOk : handleAddAlbum}>
          <Form.Item name="title" label="Album Title" rules={[{ required: true, message: 'Please enter an album title' }]}> 
            <Input placeholder="Enter album title" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AlbumList;
