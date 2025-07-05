import React, { useState } from "react";
import {
  Button,
  Spin,
  FloatButton,
  Typography,
  Popconfirm,
  Dropdown,
  Space,
  Steps,
  Tabs,
  AutoComplete,
  Cascader,
  Card,
  Badge,
  Avatar,
  Divider,
  List,
  Segmented,
  Table,
  Tag,
  Flex,
  Tree,
  message,
  Modal,
  notification,
  Progress,
  Watermark,
  DatePicker,
  Form,
  Radio,
  Input,
  Switch,
} from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  LeftOutlined,
  RightOutlined,
  CloseOutlined,
  CheckOutlined,
  DownOutlined,
  MoreOutlined,
  AppleOutlined,
  AndroidOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  SyncOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  MinusCircleOutlined,
  AudioOutlined,
} from "@ant-design/icons";
import radioOptions from "../../values/radioOptions";
import menuItems from "../../values/menuItems";
import tabItems from "../../values/tabItems";
import "./SampleComp.css";

const { Title } = Typography;

const description = "This is a description.";

const onTabChange = (key) => {
  console.log(key);
};

const mockVal = (str, repeat = 1) => ({
  value: str.repeat(repeat),
});

const cascaderOptions = [
  {
    value: "zhejiang",
    label: "Zhejiang",
    children: [
      {
        value: "hangzhou",
        label: "Hangzhou",
        children: [
          {
            value: "xihu",
            label: "West Lake",
          },
        ],
      },
    ],
  },
  {
    value: "jiangsu",
    label: "Jiangsu",
    children: [
      {
        value: "nanjing",
        label: "Nanjing",
        children: [
          {
            value: "zhonghuamen",
            label: "Zhong Hua Men",
          },
        ],
      },
    ],
  },
];

const onCascaderChange = (value) => {
  console.log(value);
};

const { Search } = Input;

const onSearch = (value, _e, info) =>
  console.log(info === null || info === void 0 ? void 0 : info.source, value);

const iconTabItems = [AppleOutlined, AndroidOutlined].map((Icon, i) => {
  const id = String(i + 1);
  return {
    key: id,
    label: `Tab ${id}`,
    children: `Tab ${id}`,
    icon: <Icon />,
  };
});

const SampleComp = () => {
  const [value, setValue] = useState("");
  const [options, setOptions] = useState([]);
  const [anotherOptions, setAnotherOptions] = useState([]);
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState("horizontal");

  const getPanelValue = (searchText) =>
    !searchText
      ? []
      : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)];

  const onSelect = (data) => {
    console.log("onSelect", data);
  };

  const onChange = (data) => {
    setValue(data);
  };

  const data = [
    "Racing car sprays burning fuel into crowd.",
    "Japanese princess to wed commoner.",
    "Australian walks 100km after outback crash.",
    "Man charged over missing wedding girl.",
    "Los Angeles battles huge wildfires.",
  ];

  // Table columns and data for Table demo
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];
  const tableData = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
  ];

  // Tree data for Tree demo
  const treeData = [
    {
      title: "parent 1",
      key: "0-0",
      children: [
        {
          title: "parent 1-0",
          key: "0-0-0",
          children: [
            {
              title: "leaf",
              key: "0-0-0-0",
            },
            {
              title: "leaf",
              key: "0-0-0-1",
            },
          ],
        },
        {
          title: "parent 1-1",
          key: "0-0-1",
          children: [
            {
              title: "leaf",
              key: "0-0-1-0",
            },
          ],
        },
      ],
    },
  ];

  const onTreeSelect = (selectedKeys, info) => {
    console.log("selected", selectedKeys, info);
  };
  const onTreeCheck = (checkedKeys, info) => {
    console.log("onCheck", checkedKeys, info);
  };

  // Ant Design message demo
  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: "success",
      content:
        "This is a prompt message for success, and it will disappear in 3 seconds",
      duration: 3,
    });
  };

  // Modal demo state and handlers
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Ant Design notification demo
  const [api, notificationContextHolder] = notification.useNotification();
  const openNotification = () => {
    const key = `open${Date.now()}`;
    const btn = (
      <Space>
        <Button type="link" size="small" onClick={() => api.destroy()}>
          Destroy All
        </Button>
        <Button type="primary" size="small" onClick={() => api.destroy(key)}>
          Confirm
        </Button>
      </Space>
    );
    api.open({
      message: "Notification Title",
      description:
        'A function will be be called after the notification is closed (automatically after the "duration" time of manually).',
      btn,
      key,
      onClose: () => {},
    });
  };

  // Popconfirm with confirm/cancel handlers demo
  const confirm = (e) => {
    console.log(e);
    message.success("Click on Yes");
  };
  const cancel = (e) => {
    console.log(e);
    message.error("Click on No");
  };

  const onFormLayoutChange = ({ layout }) => {
    setFormLayout(layout);
  };

  return (
    <div className="samplecomp-root">
      <Button type="default" className="samplecomp-btn-outlined">
        Outlined Button
      </Button>
      <div className="samplecomp-flex-gap">
        <Button icon={<SearchOutlined />} />
        <Button icon={<SearchOutlined />}>Search</Button>
      </div>
      <div className="samplecomp-spin">
        <Spin />
      </div>
      <Button type="primary" block className="samplecomp-btn-block">
        Block Button
      </Button>
      <FloatButton.Group shape="circle" className="samplecomp-float-btn-group">
        <FloatButton icon={<PlusOutlined />} />
        <FloatButton icon={<EditOutlined />} />
        <FloatButton icon={<SearchOutlined />} />
      </FloatButton.Group>
      <div className="samplecomp-icon-row">
        <LeftOutlined style={{ fontSize: 24 }} />
        <RightOutlined style={{ fontSize: 24 }} />
        <CloseOutlined style={{ fontSize: 24 }} />
        <CheckOutlined style={{ fontSize: 24 }} />
      </div>
      <div className="samplecomp-title-row">
        <Title level={1} className="samplecomp-title-h1">
          h1. Ant Design
        </Title>
        <Title level={2}>h2. Ant Design</Title>
        <Title level={3}>h3. Ant Design</Title>
        <Title level={4}>h4. Ant Design</Title>
        <Title level={5}>h5. Ant Design</Title>
      </div>
      <div className="samplecomp-color-row">
        <div style={{ fontWeight: 500 }}>Ant Design (default)</div>
        <div style={{ color: "#8c8c8c", marginTop: 8 }}>
          Ant Design (secondary)
        </div>
        <div style={{ color: "#52c41a", marginTop: 8 }}>
          Ant Design (success)
        </div>
        <div style={{ color: "#faad14", marginTop: 8 }}>
          Ant Design (warning)
        </div>
        <div style={{ color: "#ff4d4f", marginTop: 8 }}>
          Ant Design (danger)
        </div>
        <div style={{ color: "#bfbfbf", marginTop: 8 }}>
          Ant Design (disabled)
        </div>
      </div>
      <a href="#" className="samplecomp-link">
        Ant Design (Link)
      </a>
      <div className="samplecomp-align-row">
        <div style={{ textAlign: "center" }}>Center Text</div>
        <div style={{ textAlign: "left" }}>Left Text</div>
        <div style={{ textAlign: "right" }}>Right Text</div>
      </div>
      <div className="samplecomp-popconfirm-row">
        <Popconfirm
          title="Are you sure delete this task?"
          okText="Yes"
          cancelText="No"
        >
          <Button>Confirm</Button>
        </Popconfirm>
      </div>
      <div className="samplecomp-dropdown-row">
        <Dropdown
          menu={{ items: menuItems }}
          placement="bottomLeft"
          trigger={["click"]}
        >
          <Button
            style={{
              width: 120,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Button <DownOutlined style={{ fontSize: 14, marginLeft: 8 }} />
          </Button>
        </Dropdown>
      </div>
      <div className="samplecomp-dropdown-row">
        <Space.Compact style={{ width: 150 }}>
          <Button
            style={{
              flex: 1,
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
            }}
          >
            Dropdown
          </Button>
          <Dropdown
            menu={{ items: menuItems }}
            placement="bottomRight"
            trigger={["click"]}
          >
            <Button
              style={{
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                borderLeft: "none",
              }}
              icon={<MoreOutlined />}
            />
          </Dropdown>
        </Space.Compact>
      </div>
      <div className="samplecomp-steps-row">
        <Steps
          current={1}
          items={[
            { title: "Finished", description },
            { title: "In Progress", description, subTitle: "Left 00:00:08" },
            { title: "Waiting", description },
          ]}
        />
      </div>
      <div className="samplecomp-tabs-row">
        <Tabs defaultActiveKey="1" items={tabItems} onChange={onTabChange} />
      </div>
      <div className="samplecomp-tabs-row">
        <Tabs defaultActiveKey="2" items={iconTabItems} />
      </div>
      <div className="samplecomp-autocomplete-row">
        <AutoComplete
          options={options}
          style={{ width: 200 }}
          onSelect={onSelect}
          onSearch={(text) => setOptions(getPanelValue(text))}
          placeholder="input here"
        />
        <br />
        <br />
        <AutoComplete
          value={value}
          options={anotherOptions}
          style={{ width: 200 }}
          onSelect={onSelect}
          onSearch={(text) => setAnotherOptions(getPanelValue(text))}
          onChange={onChange}
          placeholder="control mode"
        />
      </div>
      <div className="samplecomp-cascader-row">
        <Cascader
          options={cascaderOptions}
          onChange={onCascaderChange}
          placeholder="Please select"
          style={{ width: 220 }}
        />
      </div>
      <div className="samplecomp-card-row">
        <Space direction="vertical" size={16}>
          <Card
            title="Default size card"
            extra={<a href="#">More</a>}
            style={{ width: 300 }}
          >
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
        </Space>
      </div>
      <div className="samplecomp-badge-row">
        <Space size="middle">
          <Badge count={5}>
            <Avatar shape="square" size="large" />
          </Badge>
          <Badge count={0} showZero>
            <Avatar shape="square" size="large" />
          </Badge>
          <Badge count={<ClockCircleOutlined style={{ color: "#f5222d" }} />}>
            <Avatar shape="square" size="large" />
          </Badge>
        </Space>
      </div>
      <div className="samplecomp-list-row">
        <Divider orientation="left">Default Size</Divider>
        <List
          header={<div>Header</div>}
          footer={<div>Footer</div>}
          bordered
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <Typography.Text mark>[ITEM]</Typography.Text> {item}
            </List.Item>
          )}
        />
      </div>
      <div className="samplecomp-segmented-row">
        <Segmented
          options={["Daily", "Weekly", "Monthly", "Quarterly", "Yearly"]}
          onChange={(value) => {
            console.log(value); // string
          }}
        />
      </div>
      <div className="samplecomp-table-row">
        <Table columns={columns} dataSource={tableData} />
      </div>
      <div className="samplecomp-tag-row">
        <Divider orientation="left">With icon</Divider>
        <Flex gap="4px 0" wrap>
          <Tag icon={<CheckCircleOutlined />} color="success">
            success
          </Tag>
          <Tag icon={<SyncOutlined spin />} color="processing">
            processing
          </Tag>
          <Tag icon={<CloseCircleOutlined />} color="error">
            error
          </Tag>
          <Tag icon={<ExclamationCircleOutlined />} color="warning">
            warning
          </Tag>
          <Tag icon={<ClockCircleOutlined />} color="default">
            waiting
          </Tag>
          <Tag icon={<MinusCircleOutlined />} color="default">
            stop
          </Tag>
        </Flex>
      </div>
      <div className="samplecomp-tree-row">
        <Divider orientation="left">Tree</Divider>
        <Tree
          checkable
          defaultExpandedKeys={["0-0-0", "0-0-1"]}
          defaultSelectedKeys={["0-0-1"]}
          defaultCheckedKeys={["0-0-0", "0-0-1"]}
          onSelect={onTreeSelect}
          onCheck={onTreeCheck}
          treeData={treeData}
        />
      </div>
      <div className="samplecomp-message-row">
        {contextHolder}
        <Button onClick={success}>Customized display duration</Button>
      </div>
      <div className="samplecomp-modal-row">
        <Button type="primary" onClick={showModal}>
          Open Modal
        </Button>
        <Modal
          title="Basic Modal"
          closable={{ "aria-label": "Custom Close Button" }}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>
      <div className="samplecomp-notification-row">
        {notificationContextHolder}
        <Button type="primary" onClick={openNotification}>
          Open the notification box
        </Button>
      </div>
      <div className="samplecomp-popconfirm-delete-row">
        <Popconfirm
          title="Delete the task"
          description="Are you sure to delete this task?"
          onConfirm={confirm}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <Button danger>Delete</Button>
        </Popconfirm>
      </div>
      <div className="samplecomp-progress-row">
        <Flex gap="small" vertical>
          <Progress percent={30} />
          <Progress percent={50} status="active" />
          <Progress percent={70} status="exception" />
          <Progress percent={100} />
          <Progress percent={50} showInfo={false} />
        </Flex>
      </div>
      <div className="samplecomp-watermark-row">
        <Watermark content="Sk Hynix X0159750">
          <div style={{ height: 300 }} />
        </Watermark>
      </div>
      <div className="samplecomp-datepicker-row">
        <Space direction="vertical">
          <DatePicker onChange={onChange} />
        </Space>
      </div>
      <div className="samplecomp-form-row">
        <Form
          layout={formLayout}
          form={form}
          initialValues={{ layout: formLayout }}
          onValuesChange={onFormLayoutChange}
          style={{ maxWidth: formLayout === "inline" ? "none" : 600 }}
        >
          <Form.Item label="Form Layout" name="layout">
            <Radio.Group value={formLayout}>
              <Radio.Button value="horizontal">Horizontal</Radio.Button>
              <Radio.Button value="vertical">Vertical</Radio.Button>
              <Radio.Button value="inline">Inline</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Field A">
            <Input placeholder="input placeholder" />
          </Form.Item>
          <Form.Item label="Field B">
            <Input placeholder="input placeholder" />
          </Form.Item>
          <Form.Item>
            <Button type="primary">Submit</Button>
          </Form.Item>
        </Form>
      </div>
      <div className="samplecomp-search-row">
        <Space direction="vertical">
          <Search
            placeholder="input search text"
            onSearch={onSearch}
            enterButton
          />
        </Space>
      </div>
      <div className="samplecomp-radio-row">
        <Flex vertical gap="middle">
          <Radio.Group block options={radioOptions} defaultValue="Apple" />
          <Radio.Group
            block
            options={radioOptions}
            defaultValue="Apple"
            optionType="button"
            buttonStyle="solid"
          />
          <Radio.Group
            block
            options={radioOptions}
            defaultValue="Pear"
            optionType="button"
          />
        </Flex>
        <div className="samplecomp-switch-row">
          <Switch defaultChecked />
          <br />
          <Switch size="small" defaultChecked />
        </div>
      </div>
      <div className="samplecomp-dynamic-textfields-row" style={{ margin: '32px 0' }}>
        <DynamicTextFields />
      </div>
    </div>
  );
};

const DynamicTextFields = () => {
  const [fields, setFields] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalParentId, setModalParentId] = useState(null);
  const [modalValue, setModalValue] = useState("");
  const [jsonResult, setJsonResult] = useState(null);
  const [saveModalOpen, setSaveModalOpen] = useState(false);

  // 트리 구조로 필드 관리
  const addField = (parentId = null, value = "") => {
    const newField = { id: Date.now() + Math.random(), value, children: [] };
    if (!parentId) {
      setFields([...fields, newField]);
    } else {
      setFields(addChild(fields, parentId, newField));
    }
  };

  // 재귀적으로 parentId에 child 추가
  const addChild = (nodes, parentId, child) => {
    return nodes.map(node => {
      if (node.id === parentId) {
        return { ...node, children: [...node.children, child] };
      } else if (node.children && node.children.length > 0) {
        return { ...node, children: addChild(node.children, parentId, child) };
      } else {
        return node;
      }
    });
  };

  // 엔터 입력 시 루트에 추가
  const handleInputKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      addField(null, inputValue);
      setInputValue("");
    }
  };

  // 필드 값 변경 (트리 구조)
  const handleFieldChange = (id, value) => {
    setFields(updateField(fields, id, value));
  };
  const updateField = (nodes, id, value) => {
    return nodes.map(node => {
      if (node.id === id) {
        return { ...node, value };
      } else if (node.children && node.children.length > 0) {
        return { ...node, children: updateField(node.children, id, value) };
      } else {
        return node;
      }
    });
  };

  // 필드 삭제 (트리 구조)
  const handleDelete = (id) => {
    setFields(deleteField(fields, id));
  };
  const deleteField = (nodes, id) => {
    return nodes
      .filter(node => node.id !== id)
      .map(node => ({
        ...node,
        children: node.children ? deleteField(node.children, id) : [],
      }));
  };

  // 필드 추가 (오른쪽 + 아이콘, child로 추가, modal)
  const handleAdd = (id) => {
    setModalParentId(id);
    setModalValue("");
    setModalOpen(true);
  };

  const handleModalOk = () => {
    if (modalValue.trim()) {
      addField(modalParentId, modalValue);
      setModalOpen(false);
      setModalParentId(null);
      setModalValue("");
    }
  };

  const handleModalCancel = () => {
    setModalOpen(false);
    setModalParentId(null);
    setModalValue("");
  };

  // 저장 버튼 클릭 시 트리 -> id, parentId, value json 변환
  const handleSave = () => {
    const result = [];
    const traverse = (nodes, parentId = null) => {
      nodes.forEach(node => {
        result.push({ id: node.id, parentId, value: node.value });
        if (node.children && node.children.length > 0) {
          traverse(node.children, node.id);
        }
      });
    };
    traverse(fields);
    setJsonResult(result);
    setSaveModalOpen(true);
  };

  // 트리 구조 렌더링
  const INDENT = 24; // 들여쓰기 px
  const BUTTONS_WIDTH = 80; // 버튼 영역 고정폭(px)
  const FIELD_ROW_MAX = 400; // 전체 row 최대폭(px)
  const renderFields = (nodes, level = 0) => (
    <div>
      {nodes.map(field => (
        <div
          key={field.id}
          style={{
            marginBottom: 8,
            marginLeft: INDENT,
            width: `calc(100% - ${INDENT}px)`,
            maxWidth: FIELD_ROW_MAX - INDENT,
            transition: 'max-width 0.2s',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <Input
              value={field.value}
              onChange={e => handleFieldChange(field.id, e.target.value)}
              style={{
                flex: 1,
                minWidth: 40,
                maxWidth: `calc(100% - ${BUTTONS_WIDTH}px)`,
                marginRight: 8,
                transition: 'max-width 0.2s',
              }}
            />
            <div style={{ display: 'flex', gap: 4, minWidth: BUTTONS_WIDTH, justifyContent: 'flex-end' }}>
              <Button
                icon={<PlusOutlined />}
                onClick={() => handleAdd(field.id)}
                style={{ marginRight: 4 }}
              />
              <Button
                icon={<CloseOutlined />}
                danger
                onClick={() => handleDelete(field.id)}
              />
            </div>
          </div>
          {field.children && field.children.length > 0 && (
            <div style={{ marginTop: 8 }}>
              {renderFields(field.children, level + 1)}
            </div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <Card
      title="동적 트리 텍스트필드"
      style={{ maxWidth: 480, margin: '0 auto', padding: 0, borderRadius: 12, boxShadow: '0 2px 8px #f0f1f2' }}
      bodyStyle={{ padding: 24 }}
    >
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
        <Input
          placeholder="Enter text and press Enter"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={handleInputKeyDown}
          style={{ maxWidth: 320, marginRight: 8 }}
        />
        <Button type="primary" onClick={handleSave}>저장</Button>
      </div>
      {renderFields(fields)}
      <Modal
        title="Add Child Field"
        open={modalOpen}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="Add"
        cancelText="Cancel"
        width={320}
        bodyStyle={{ padding: 16 }}
        destroyOnClose
      >
        <Input
          placeholder="Enter child value"
          value={modalValue}
          onChange={e => setModalValue(e.target.value)}
          onPressEnter={handleModalOk}
          autoFocus
        />
      </Modal>
      <Modal
        title="저장된 JSON 데이터"
        open={saveModalOpen}
        onOk={() => setSaveModalOpen(false)}
        onCancel={() => setSaveModalOpen(false)}
        okText="확인"
        cancelText="닫기"
        width={400}
        bodyStyle={{ padding: 16 }}
        destroyOnClose
      >
        <pre style={{ background: '#f6f6f6', padding: 12, borderRadius: 6, margin: 0 }}>
          {JSON.stringify(jsonResult, null, 2)}
        </pre>
      </Modal>
    </Card>
  );
};

export default SampleComp;
