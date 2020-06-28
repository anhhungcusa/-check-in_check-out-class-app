import React, { useState, useMemo } from "react";
import "./Profile.css";
import "antd/dist/antd.css";
import { Form, Input, Button, message } from "antd";
import { useStore, useDispatch } from "../../hooks";
import { UserOutlined } from "@ant-design/icons";
import { UserService } from "../../services";
import { actions } from "../../store";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 16, span: 16 },
};
function Profile() {
  const dispatch = useDispatch();
  const store = useStore();
  const [disable, setDisable] = useState(true);
  const [isValidForm, setIsValidForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const initialValues = useMemo(() => {
    const { username, fullname, role } = store.user || {};
    return { username, fullname, role: role.name };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //   console.log("init", initialValues);
  const onFinish = (values) => {
    values.id = store.user._id;
    delete values.role;
    setLoading(true);
    UserService.editUser(values).then((res) => {
      let user = store.user;
      user.fullname = res.user.fullname;
      user.username = res.user.username;
      dispatch(actions.setUser(user));
      setLoading(false);
      setIsValidForm(true);
      setDisable(false);
      message.success(res.message);
    });
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
