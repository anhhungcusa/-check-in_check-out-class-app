import React, { useState, useMemo } from "react";
import "./Profile.css";
import "antd/dist/antd.css";
import { Form, Input, Button } from "antd";
import { useStore } from "../../hooks";
import { UserOutlined } from "@ant-design/icons";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 16, span: 16 },
};
function Profile() {
  const store = useStore();
  const [disable, setDisable] = useState(true);
  const [isValidForm, setIsValidForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const initialValues = useMemo(() => {
    const { username, fullname , role } = store.user || {};
    return { username, fullname, role: role.name };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //   console.log("init", initialValues);
  const onFinish = (values) => {
    console.log("values", values);
    setLoading(true);
    // UserService.
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onFieldChange = () => {
    setIsValidForm(true);
  };
  const onSetDisable = () => {
    setDisable(false);
  };
  return (
    <div>
      <div className="container">
        <div className="wrapper-avatar">
          <div className="wrapper-icon-avatar">
            <UserOutlined style={{ fontSize: "100px" }} />
          </div>
          <Button onClick={() => onSetDisable()}>Edit Profile</Button>
          <div className="info">
            <Form
              {...layout}
              initialValues={initialValues}
              name="info"
              onFieldsChange={onFieldChange}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                label="UserName"
                name="username"
                rules={[{ required: true, message: "Please input room name!" }]}
              >
                <Input disabled={disable} />
              </Form.Item>

              <Form.Item
                label="FullName"
                name="fullname"
                rules={[{ required: true, message: "Please input room name!" }]}
              >
                <Input disabled={disable} />
              </Form.Item>

              <Form.Item label="Role" name="role">
                <Input disabled />
              </Form.Item>
              {!disable && (
                <Form.Item {...tailLayout}>
                  <Button
                    disabled={!isValidForm}
                    loading={loading}
                    type="primary"
                    htmlType="submit"
                  >
                    Submit
                  </Button>
                </Form.Item>
              )}
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
