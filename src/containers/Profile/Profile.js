import React, { useState, useMemo } from "react";
import "./Profile.css";
import "antd/dist/antd.css";
import { Form, Input, Button, message } from "antd";
import { useStore, useDispatch } from "../../hooks";
import { UserOutlined } from "@ant-design/icons";
import { UserService, CookieService, TokenService } from "../../services";
import { actions } from "../../store";
import { jwtDecode } from "../../utils";
import { globals } from "../../configs";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const layoutChangePassword = {
  labelCol: { span: 10 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 16, span: 16 },
};
function Profile() {
  const dispatch = useDispatch();
  const store = useStore();
  const { auth } = store;
  const user = jwtDecode(auth.token);
  const [disable, setDisable] = useState(true);
  // const [disableChangePassword, setDisableChangePassword] = useState(true);
  const [isValidForm, setIsValidForm] = useState(false);
  const [isValidFormPassword, setIsValidFormPassword] = useState(false);

  const [openChangePassword, setOpenChangePassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);

  const initialValues = useMemo(() => {
    const { username, fullname, role } = user || {};
    return { username, fullname, role: role.name };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFinish = (values) => {
    values.id = user._id;
    delete values.role;
    setLoading(true);
    UserService.editUser(values).then((res) => {
      let newUser = { ...user };
      newUser.fullname = res.user.fullname;
      newUser.username = res.user.username;

      dispatch(actions.setUser(newUser));
      TokenService.requireAcceptToken(newUser).then((res) => {
        dispatch(actions.setAuth(res.token));
        CookieService.setCookie(globals.env.COOKIE_KEY, res.token);
      });
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
    setOpenChangePassword(false);
  };
  const onOpenFormChangePassword = () => {
    setOpenChangePassword(true);
  };

  const onFinishChangePasswordFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onFieldChangePassword = () => {
    setIsValidFormPassword(true);
  };
  const onFinishChangePassword = (values) => {
    const a = CookieService.getCookie(globals.env.COOKIE_KEY);
    console.log("a", a);
    values.id = store.user._id;
    setLoadingPassword(true);
    console.log(values);
    UserService.changePassword(values).then((res) => {
      console.log("res", res);
      setLoadingPassword(false);
      setIsValidForm(true);
      message.success(res.message);
    });
  };
  return (
    <div>
      <div className="container">
        <div className="wrapper-avatar">
          <div className="wrapper-icon-avatar">
            <UserOutlined style={{ fontSize: "100px", color: '#fff' }} />
          </div>
          <div className="btn-group">
            <Button className="btn-item" onClick={() => onSetDisable()}>
              Edit Profile
            </Button>
            <Button
              className="btn-item"
              onClick={() => onOpenFormChangePassword()}
            >
              Change Password
            </Button>
          </div>
          <div className="info">
            {!openChangePassword && (
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
                  rules={[
                    { required: true, message: "Please input room name!" },
                  ]}
                >
                  <Input disabled={disable} />
                </Form.Item>

                <Form.Item
                  label="FullName"
                  name="fullname"
                  rules={[
                    { required: true, message: "Please input room name!" },
                  ]}
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
            )}

            {/* form change password */}
            {openChangePassword && (
              <Form
                {...layoutChangePassword}
                initialValues={initialValues}
                name="info"
                onFieldsChange={onFieldChangePassword}
                onFinish={onFinishChangePassword}
                onFinishFailed={onFinishChangePasswordFailed}
              >
                <Form.Item
                  label="Change Password"
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                {
                  <Form.Item {...tailLayout}>
                    <Button
                      disabled={!isValidFormPassword}
                      loading={loadingPassword}
                      type="primary"
                      htmlType="submit"
                    >
                      Submit
                    </Button>
                  </Form.Item>
                }
              </Form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
