import React, { useState, useMemo } from 'react'
import './RegisterAccount.css'
import { Form, Input, Button, message, Checkbox } from 'antd'
import {useRouter} from '../../hooks';
import { Link } from 'react-router-dom';
import { AuthService } from '../../services';
import {UserOutlined} from '@ant-design/icons'
function RegisterAccount() {
    const router = useRouter();
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
	const plainOptions = ['student', 'teacher'];
	const [role, setRole] = useState(plainOptions[0])
	const onChangeRole = (checkedValues) => {
		if(checkedValues.length === 0) return
		const checked = checkedValues.find(value => value !== role)
		setRole(checked)
	}
	const onFinish = ({ username, password, fullname }) => {
        setLoading(true);
        AuthService.register(username, password, fullname, role)
            .then(res => {
                message.success(res.message)
                router.push({
                    pathname: '/login',
                    state: {
                        username, password
                    }
                })
            }).catch(error => {
                message[error.status](error.message)
                setLoading(false)
            })
	};

    return (
        <div className="register-account-page inherit d-flex-center ">
            <div className="card ">
                <div className="logo d-flex justify-center ">
                    <UserOutlined />
                </div>
				<h2 className="title ">Register</h2>
				<div className="register-account-form">
					<Form
						initialValues={initialValues}
						onFieldsChange={onChangeFields}
						scrollToFirstError
						name="register-account"
						onFinish={onFinish}
					>
                        <Form.Item name="username" 
                            rules={[ { required: true, message: 'username is required' } ]} hasFeedback>
							<Input className="form-input" placeholder="username" />
						</Form.Item>
                        <Form.Item name="fullname" 
                            hasFeedback rules={[ { required: true, message: 'fullname is required' } ]}>
                        <Input className="form-input" placeholder="fullname" />
						</Form.Item>
                        <Form.Item name="password" 
                            hasFeedback rules={[ { required: true, message: 'username is required' } ]}>
							<Input.Password className="form-input" placeholder="password" />
						</Form.Item>
                        <Form.Item>
								<Checkbox.Group onChange={onChangeRole} value={[role]} options={plainOptions} />
						</Form.Item>
						<Form.Item>
							<Button disabled={!isValidForm} htmlType="submit" loading={loading} className="form-button">
								Register
							</Button>
						</Form.Item>
					</Form>
				</div>
			</div>
			<div className="card">
				<span className="addition">
					You have an account? <Link to="/login">Login now!</Link>
				</span>
			</div>
        </div>
    )
}

export default RegisterAccount