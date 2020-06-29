import React, { useState, useMemo } from 'react'
import './Login.css'
import { Form, Input, Button, message } from 'antd'
import {useRouter, useDispatch} from '../../hooks';
import { Link } from 'react-router-dom';
import { AuthService, CookieService } from '../../services';
import { actions } from '../../store';
import {UserOutlined} from '@ant-design/icons'
import { globals } from '../../configs';
function Login() {
    const router = useRouter();
    const dispatch = useDispatch()
	const [ isValidForm, setIsValidForm ] = useState(false);
	const onChangeFields = (_, allFields) => {
		const isValid = allFields.every((field) => field.errors.length === 0 && field.value);
		setIsValidForm(isValid);
	};

	const [ loading, setLoading ] = useState(false);
	const initialValues = useMemo(() => {
		const { username = '', password = '' } = router.state || {};
		if (username) setIsValidForm(true);
		return { username, password };
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const onFinish = ({ username, password }) => {
        setLoading(true);
        AuthService.login(username, password)
            .then(res => {
                const { from = '/' } = router.state || {};
                const {user, token} = res
				dispatch(actions.setAuth(token))
				CookieService.setCookie(globals.env.COOKIE_KEY, token)
                dispatch(actions.setUser(user))
                router.replace(from)
            }).catch(error => {
                message[error.status](error.message)
                setLoading(false)
            })
	};

    return (
        <div className="login-page inherit d-flex-center ">
            <div className="card ">
                <div className="logo d-flex justify-center ">
                    <UserOutlined />
                </div>
				<h2 className="title ">Login</h2>
				<div className="login-form">
					<Form
						initialValues={initialValues}
						onFieldsChange={onChangeFields}
						scrollToFirstError
						name="login"
						onFinish={onFinish}
					>
                        <Form.Item name="username" 
                            rules={[ { required: true, message: 'username is required' } ]} hasFeedback>
							<Input className="form-input" placeholder="username" />
						</Form.Item>
                        <Form.Item name="password" 
                            hasFeedback rules={[ { required: true, message: 'username is required' } ]}>
							<Input.Password className="form-input" placeholder="password" />
						</Form.Item>
						<Form.Item>
							<Button disabled={!isValidForm} htmlType="submit" loading={loading} className="form-button">
								Login
							</Button>
						</Form.Item>
					</Form>
				</div>
			</div>
			<div className="card">
				<span className="addition">
					Don't have an account? <Link to="/register">Register now!</Link>
				</span>
			</div>
        </div>
    )
}

export default Login