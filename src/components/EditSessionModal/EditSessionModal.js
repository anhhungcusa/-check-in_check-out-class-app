import React, { useEffect, useMemo } from "react";
import "./EditSessionModal.css";
import "antd/dist/antd.css";
import { Select, Modal, Form, Input, Button, DatePicker, message } from "antd";
import { useDispatch, useStore } from "../../hooks";
import { RoomService, SessionService } from "../../services";
import { actions } from "../../store";
import moment from "moment";

const { Option } = Select;
const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 16, span: 16 },
};

function EditSessionModal({ close, isOpen, session }) {
  const dispatch = useDispatch();
  const { user, rooms } = useStore();

  useEffect(() => { 
    RoomService.getRooms().then((res) => {
      dispatch(actions.setRooms(res.rooms));
    });
  }, [dispatch]);

  const initialValues = useMemo(() => {
    if (!session) return null;
    let { startAt, endAt, name, roomId } = session;
    startAt = moment(startAt);
    endAt = moment(endAt);
    return { startAt, endAt, name, roomId };
  }, [session]);

  const onFinish = (values) => {
    values.id = session._id;
    console.log('values', values)
    SessionService.editSession(values).then((res) => {
      console.log('rs', res.session)
      dispatch(actions.editSession(res.session));
      close();
      message.success(res.message);
    });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Modal title="Edit Session" visible={isOpen} footer={null} onCancel={close}>
      {isOpen && session && (
        <Form
          initialValues={initialValues}
          {...layout}
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="startAt"
            label="StartAt"
            rules={[{ required: true, message: "Please input field startAt!" }]}
          >
            <DatePicker showTime />
          </Form.Item>

          <Form.Item
            label="EndAt"
            name="endAt"
            rules={[{ required: true, message: "Please input field endAt!" }]}
          >
            <DatePicker showTime />
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
      )}
    </Modal>
  );
}

export default EditSessionModal;
