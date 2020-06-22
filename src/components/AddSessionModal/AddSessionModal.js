import React from "react";
import "./AddSessionModal.css";
import "antd/dist/antd.css";
import {
  Menu,
  Dropdown,
  message,
  Modal,
  Form,
  Input,
  Button,
  DatePicker,
} from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 16, span: 16 },
};

function handleMenuClick(e) {
  message.info("Click on menu item.");
  console.log("click", e);
}

const host = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key="1" icon={<UserOutlined />}>
      1st menu item
    </Menu.Item>
    <Menu.Item key="2" icon={<UserOutlined />}>
      2nd menu item
    </Menu.Item>
    <Menu.Item key="3" icon={<UserOutlined />}>
      3rd item
    </Menu.Item>
  </Menu>
);

const room = (
  <Menu  onClick={handleMenuClick} defaultSelectedKeys={["1"]}>
    <Menu.Item key="1" icon={<UserOutlined />}>
      1st menu item
    </Menu.Item>
    <Menu.Item key="2" icon={<UserOutlined />}>
      2nd menu item
    </Menu.Item>
    <Menu.Item key="3" icon={<UserOutlined />}>
      3rd item
    </Menu.Item>
  </Menu>
);

function AddSessionModal({ close, isOpen }) {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  function onChange(date, dateString) {
    console.log(date, dateString);
  }

  return (
    <Modal
      title="Create Session"
      visible={isOpen}
      footer={null}
      onCancel={close}
    >
      <Form
        {...layout}
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="startAt"
          name="startAt"
          rules={[{ required: true, message: "Please input field startAt!" }]}
        >
          <DatePicker onChange={onChange} />
        </Form.Item>

        <Form.Item
          label="endAt"
          name="endAt"
          rules={[{ required: true, message: "Please input field endAt!" }]}
        >
          <DatePicker onChange={onChange} />
        </Form.Item>

        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Host"
          name="host"
          rules={[{ required: true, message: "Please select host!" }]}
        >
          <Dropdown overlay={host}>
            <Button>
              Select Host <DownOutlined />
            </Button>
          </Dropdown>
        </Form.Item>

        <Form.Item
          label="Room"
          name="room"
          rules={[{ required: true, message: "Please select room!" }]}
        >
          <Dropdown overlay={room}>
            <Button>
              Select Room <DownOutlined />
            </Button>
          </Dropdown>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddSessionModal;
