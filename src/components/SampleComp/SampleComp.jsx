import React, { useState } from "react";
import { Button, Spin, FloatButton, Typography, Popconfirm, Dropdown, Space, Steps, Tabs, AutoComplete, Cascader, Card, Badge, Avatar, Divider, List, Segmented, Table, Tag, Flex, Tree, message, Modal, notification, Progress, Watermark, DatePicker, Form, Radio, Input, Switch } from "antd";
import { SearchOutlined, PlusOutlined, EditOutlined, LeftOutlined, RightOutlined, CloseOutlined, CheckOutlined, DownOutlined, MoreOutlined, AppleOutlined, AndroidOutlined, ClockCircleOutlined, CheckCircleOutlined, SyncOutlined, CloseCircleOutlined, ExclamationCircleOutlined, MinusCircleOutlined, AudioOutlined } from "@ant-design/icons";
import radioOptions from '../../values/radioOptions';

const { Title } = Typography;

const menuItems = [
  { key: '1', label: 'Option 1' },
  { key: '2', label: 'Option 2' },
  { key: '3', label: 'Option 3' },
];

const description = 'This is a description.';

const tabItems = [
  {
    key: '1',
    label: 'Tab 1',
    children: 'Content of Tab Pane 1',
  },
  {
    key: '2',
    label: 'Tab 2',
    children: 'Content of Tab Pane 2',
  },
  {
    key: '3',
    label: 'Tab 3',
    children: 'Content of Tab Pane 3',
  },
];

const iconTabItems = [AppleOutlined, AndroidOutlined].map((Icon, i) => {
  const id = String(i + 1);
  return {
    key: id,
    label: `Tab ${id}`,
    children: `Tab ${id}`,
    icon: <Icon />,
  };
});

const onTabChange = (key) => {
  console.log(key);
};

const mockVal = (str, repeat = 1) => ({
  value: str.repeat(repeat),
});

const cascaderOptions = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
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

const SampleComp = () => {
  const [value, setValue] = useState('');
  const [options, setOptions] = useState([]);
  const [anotherOptions, setAnotherOptions] = useState([]);
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState('horizontal');

  const getPanelValue = (searchText) =>
    !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)];

  const onSelect = (data) => {
    console.log('onSelect', data);
  };

  const onChange = (data) => {
    setValue(data);
  };

  const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
  ];

  // Table columns and data for Table demo
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, { tags }) => (
        <>
          {tags.map(tag => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
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
      title: 'Action',
      key: 'action',
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
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];

  // Tree data for Tree demo
  const treeData = [
    {
      title: 'parent 1',
      key: '0-0',
      children: [
        {
          title: 'parent 1-0',
          key: '0-0-0',
          children: [
            {
              title: 'leaf',
              key: '0-0-0-0',
            },
            {
              title: 'leaf',
              key: '0-0-0-1',
            },
          ],
        },
        {
          title: 'parent 1-1',
          key: '0-0-1',
          children: [
            {
              title: 'leaf',
              key: '0-0-1-0',
            },
          ],
        },
      ],
    },
  ];

  const onTreeSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };
  const onTreeCheck = (checkedKeys, info) => {
    console.log('onCheck', checkedKeys, info);
  };

  // Ant Design message demo
  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'This is a prompt message for success, and it will disappear in 3 seconds',
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
      message: 'Notification Title',
      description:
        'A function will be be called after the notification is closed (automatically after the "duration" time of manually).',
      btn,
      key,
      onClose: () => {},
    });
  };

  // Popconfirm with confirm/cancel handlers demo
  const confirm = e => {
    console.log(e);
    message.success('Click on Yes');
  };
  const cancel = e => {
    console.log(e);
    message.error('Click on No');
  };

  const onFormLayoutChange = ({ layout }) => {
    setFormLayout(layout);
  };

  return (
    <div style={{ textAlign: "left", marginTop: 32, marginLeft: 20, marginRight: 20, width: '100%', maxWidth: '100vw', boxSizing: 'border-box' }}>
      <Button type="default" style={{ border: "1.5px solid #1890ff", color: "#1890ff" }}>
        Outlined Button
      </Button>
      <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
        <Button icon={<SearchOutlined />} />
        <Button icon={<SearchOutlined />}>Search</Button>
      </div>
      <div style={{ marginTop: 16 }}>
        <Spin />
      </div>
      <Button type="primary" block style={{ marginTop: 16, width: '97%' }}>
        Block Button
      </Button>
      <FloatButton.Group shape="circle" style={{ right: 40, bottom: 44 }}>
        <FloatButton icon={<PlusOutlined />} />
        <FloatButton icon={<EditOutlined />} />
        <FloatButton icon={<SearchOutlined />} />
      </FloatButton.Group>
      <div style={{ marginTop: 24, textAlign: "center", display: "flex", justifyContent: "center", gap: 16 }}>
        <LeftOutlined style={{ fontSize: 24 }} />
        <RightOutlined style={{ fontSize: 24 }} />
        <CloseOutlined style={{ fontSize: 24 }} />
        <CheckOutlined style={{ fontSize: 24 }} />
      </div>
      <div style={{ marginTop: 40, whiteSpace: "nowrap" }}>
        <Title level={1} style={{ marginBottom: 0, whiteSpace: "nowrap" }}>h1. Ant Design</Title>
        <Title level={2}>h2. Ant Design</Title>
        <Title level={3}>h3. Ant Design</Title>
        <Title level={4}>h4. Ant Design</Title>
        <Title level={5}>h5. Ant Design</Title>
      </div>
      <div style={{ marginTop: 32 }}>
        <div style={{ fontWeight: 500 }}>Ant Design (default)</div>
        <div style={{ color: '#8c8c8c', marginTop: 8 }}>Ant Design (secondary)</div>
        <div style={{ color: '#52c41a', marginTop: 8 }}>Ant Design (success)</div>
        <div style={{ color: '#faad14', marginTop: 8 }}>Ant Design (warning)</div>
        <div style={{ color: '#ff4d4f', marginTop: 8 }}>Ant Design (danger)</div>
        <div style={{ color: '#bfbfbf', marginTop: 8 }}>Ant Design (disabled)</div>
      </div>
      <div style={{ marginTop: 24 }}>
        <a href="#" style={{ color: '#1677ff', fontSize: 16 }}>
          Ant Design (Link)
        </a>
      </div>
      <div style={{ marginTop: 32,marginRight: 40 }}>
        <div style={{ textAlign: 'center' }}>Center Text</div>
        <div style={{ textAlign: 'left' }}>Left Text</div>
        <div style={{ textAlign: 'right' }}>Right Text</div>
      </div>
      <div style={{ marginTop: 32 }}>
        <Popconfirm title="Are you sure delete this task?" okText="Yes" cancelText="No">
          <Button>Confirm</Button>
        </Popconfirm>
      </div>
      <div style={{ marginTop: 24 }}>
        <Dropdown
          menu={{ items: menuItems }}
          placement="bottomLeft"
          trigger={["click"]}
        >
          <Button style={{ width: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            Button <DownOutlined style={{ fontSize: 14, marginLeft: 8 }} />
          </Button>
        </Dropdown>
      </div>
      <div style={{ marginTop: 24 }}>
        <Space.Compact style={{ width: 150 }}>
          <Button style={{ flex: 1, borderTopRightRadius: 0, borderBottomRightRadius: 0 }}>Dropdown</Button>
          <Dropdown menu={{ items: menuItems }} placement="bottomRight" trigger={["click"]}>
            <Button style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderLeft: 'none' }} icon={<MoreOutlined />} />
          </Dropdown>
        </Space.Compact>
      </div>
      <div style={{ marginTop: 32 }}>
        <Steps
          current={1}
          items={[
            {
              title: 'Finished',
              description,
            },
            {
              title: 'In Progress',
              description,
              subTitle: 'Left 00:00:08',
            },
            {
              title: 'Waiting',
              description,
            },
          ]}
        />
      </div>
      <div style={{ marginTop: 40 }}>
        <Tabs defaultActiveKey="1" items={tabItems} onChange={onTabChange} />
      </div>
      <div style={{ marginTop: 40 }}>
        <Tabs
          defaultActiveKey="2"
          items={iconTabItems}
        />
      </div>
      <div style={{ marginTop: 40 }}>
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
      <div style={{ marginTop: 40 }}>
        <Cascader options={cascaderOptions} onChange={onCascaderChange} placeholder="Please select" style={{ width: 220 }} />
      </div>
      <div style={{ marginTop: 40 }}>
        <Space direction="vertical" size={16}>
          <Card title="Default size card" extra={<a href="#">More</a>} style={{ width: 300 }}>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
        </Space>
      </div>
      <div style={{ marginTop: 40 }}>
        <Space size="middle">
          <Badge count={5}>
            <Avatar shape="square" size="large" />
          </Badge>
          <Badge count={0} showZero>
            <Avatar shape="square" size="large" />
          </Badge>
          <Badge count={<ClockCircleOutlined style={{ color: '#f5222d' }} />}>
            <Avatar shape="square" size="large" />
          </Badge>
        </Space>
      </div>
      <div style={{ marginTop: 40 }}>
        <Divider orientation="left">Default Size</Divider>
        <List
          header={<div>Header</div>}
          footer={<div>Footer</div>}
          bordered
          dataSource={data}
          renderItem={item => (
            <List.Item>
              <Typography.Text mark>[ITEM]</Typography.Text> {item}
            </List.Item>
          )}
        />
      </div>
      <div style={{ marginTop: 40 }}>
        <Segmented
          options={['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly']}
          onChange={value => {
            console.log(value); // string
          }}
        />
      </div>
      <div style={{ marginTop: 40 }}>
        <Table columns={columns} dataSource={tableData} />
      </div>
      <div style={{ marginTop: 40 }}>
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
      <div style={{ marginTop: 40 }}>
        <Divider orientation="left">Tree</Divider>
        <Tree
          checkable
          defaultExpandedKeys={['0-0-0', '0-0-1']}
          defaultSelectedKeys={['0-0-1']}
          defaultCheckedKeys={['0-0-0', '0-0-1']}
          onSelect={onTreeSelect}
          onCheck={onTreeCheck}
          treeData={treeData}
        />
      </div>
      <div style={{ marginTop: 40 }}>
        {contextHolder}
        <Button onClick={success}>Customized display duration</Button>
      </div>
      <div style={{ marginTop: 40 }}>
        <Button type="primary" onClick={showModal}>
          Open Modal
        </Button>
        <Modal
          title="Basic Modal"
          closable={{ 'aria-label': 'Custom Close Button' }}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>
      <div style={{ marginTop: 40 }}>
        {notificationContextHolder}
        <Button type="primary" onClick={openNotification}>
          Open the notification box
        </Button>
      </div>
      <div style={{ marginTop: 40 }}>
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
      <div style={{ marginTop: 40, marginRight: 40 }}>
        <Flex gap="small" vertical>
          <Progress percent={30} />
          <Progress percent={50} status="active" />
          <Progress percent={70} status="exception" />
          <Progress percent={100} />
          <Progress percent={50} showInfo={false} />
        </Flex>
      </div>
      <div style={{ marginTop: 40 }}>
        <Watermark content="Sk Hynix X0159750">
          <div style={{ height: 300 }} />
        </Watermark>
      </div>
      <div style={{ marginTop: 40 }}>
        <Space direction="vertical">
          <DatePicker onChange={onChange} />
        </Space>
      </div>
      <div style={{ marginTop: 40 }}>
        <Form
          layout={formLayout}
          form={form}
          initialValues={{ layout: formLayout }}
          onValuesChange={onFormLayoutChange}
          style={{ maxWidth: formLayout === 'inline' ? 'none' : 600 }}
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
      <div style={{ marginTop: 40 }}>
        <Space direction="vertical">
          <Search placeholder="input search text" onSearch={onSearch} enterButton />
        </Space>
      </div>
      <div style={{ marginTop: 40, marginRight: 40 }}>
        <Flex vertical gap="middle">
          <Radio.Group block options={radioOptions} defaultValue="Apple" />
          <Radio.Group
            block
            options={radioOptions}
            defaultValue="Apple"
            optionType="button"
            buttonStyle="solid"
          />
          <Radio.Group block options={radioOptions} defaultValue="Pear" optionType="button" />
        </Flex>
        <div style={{ marginTop: 24 }}>
          <Switch defaultChecked />
          <br />
          <Switch size="small" defaultChecked />
        </div>
      </div>
    </div>
  );
};

export default SampleComp;