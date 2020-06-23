import React, { useEffect } from "react";
import "./AddSessionModal.css";
import "antd/dist/antd.css";
import { Select, Modal, Form, Input, Button, DatePicker, message } from "antd";
import { useDispatch, useStore } from "../../hooks";
import { UserService, RoomService, SessionService } from "../../services";
import { actions } from "../../store";

const { Option } = Select;
const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 16, span: 16 },
};

function AddSessionModal({ close, isOpen }) {
  const dispatch = useDispatch();
  const { user, rooms } = useStore();
  useEffect(() => {
    UserService.getUser().then((doc) => {
      dispatch(actions.setUsers(doc.users));
    });
  }, [dispatch]);
  useEffect(() => {
    RoomService.getRooms().then((doc) => {
      dispatch(actions.setRooms(doc.rooms));
    });
  }, [dispatch]);

  const onFinish = (values) => {
    values.hostId = user._id;
    SessionService.createSession(values).then((doc) => {
      dispatch(actions.addSession(doc.session));
      close();
      message.success(doc.message);
    });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

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
          <DatePicker />
        </Form.Item>

        <Form.Item
          label="endAt"
          name="endAt"
          rules={[{ required: true, message: "Please input field endAt!" }]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Room"
          name="roomId"
          rules={[{ required: true, message: "Please select room!" }]}
        >
          <Select placeholder="Select Room" style={{ width: 120 }}>
            {rooms &&
              rooms.map((item, index) => (
                <Option key={index} value={item._id}>
                  {item.name}
                </Option>
              ))}
          </Select>
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
