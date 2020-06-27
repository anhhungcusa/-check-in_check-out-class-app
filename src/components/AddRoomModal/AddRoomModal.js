import React from "react";
import "./AddRoomModal.css";
import "antd/dist/antd.css";
import {  Modal, Form, Input, Button, message } from "antd";
import { useDispatch } from "../../hooks";
import { RoomService } from "../../services";
import { actions } from "../../store";

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 16, span: 16 },
};

function AddRoomModal({ close, isOpen }) {
  const dispatch = useDispatch();

  const onFinish = (values) => {
    RoomService.createRoom(values).then((res) => {
      dispatch(actions.addRoom(res.room));
      close();
      message.success(res.message);
    });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Modal
      title="Create Room"
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
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input room name!" }]}
        >
          <Input />
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

export default AddRoomModal;
