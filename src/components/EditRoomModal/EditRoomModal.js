import React, { useMemo } from "react";
import "./EditRoomModal.css";
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

function EditRoomModal({ close, isOpen, room }) {
  const dispatch = useDispatch();

  const initialValues = useMemo(() => {
    if (!room) return null;
    let { name } = room;
    return { name };
  }, [room]);

  const onFinish = (values) => {
    values.id = room._id;
    RoomService.editRoom(values).then((res) => {
      dispatch(actions.editRoomById(res.room));
      close();
      message.success(res.message);
    });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Modal title="Edit Room" visible={isOpen} footer={null} onCancel={close}>
      {isOpen && room && (
        <Form
          initialValues={initialValues}
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
      )}
    </Modal>
  );
}

export default EditRoomModal;
