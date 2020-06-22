import React from 'react';
import { Button, Space, Avatar } from 'antd';
import { NavLink } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import './Header.css';
import { CookieService } from '../../services';
import { globals } from '../../configs';
import { useDispatch, useStore } from '../../hooks';
import { actions } from '../../store';
import { NavBar } from '..';
// import { NavBar } from '../NavBar/NavBar';
const Header = ({title = 'Title'}) => {

    const {auth, user} = useStore()
    const dispatch = useDispatch()
	const onLogout = () => {
		dispatch(actions.resetAuth())
		CookieService.removeCookie(globals.env.COOKIE_KEY)
	};
	return (
		<header>
			<div className="top-bar d-flex-between">
				<div className="title">{title}</div>
				<span>
					{auth.isAuthorized ? (
						<Space>
							<span className="user-name">{user ? user.fullname : '...'}</span>
                            <Avatar icon={<UserOutlined />} />
							<Button onClick={onLogout}>Logout</Button>
						</Space>
					) : (
						<NavLink activeClassName="link--active" className="ant-btn link form-button" to="/login">
							Login
						</NavLink>
					)}
				</span>
			</div>
			<NavBar />
		</header>
	);
};

export default Header