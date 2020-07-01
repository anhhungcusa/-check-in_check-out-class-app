import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import './NavBar.css';
import { useRouter, useRequireRole } from '../../hooks';
import { HomeOutlined, UserOutlined, ScanOutlined, AppstoreOutlined } from '@ant-design/icons';
import { roles } from '../../constants';

const NavBar = () => {
	const [ currentItem, setCurrentItem ] = useState('/');
	const router = useRouter();
	const requireRoles = useRequireRole();
	useEffect(
		() => {
			const pathname = router.pathname;
			setCurrentItem(pathname);
			// eslint-disable-next-line react-hooks/exhaustive-deps
		},
		[ router.pathname ]
	);
	return (
		<div className="top-nav">
			<Menu selectedKeys={[ currentItem ]} mode="horizontal" theme="dark">
				<Menu.Item key="/" className="top-nav__item" icon={<HomeOutlined />}>
					<Link className="nav-link" to="/" />
					Home
				</Menu.Item>
				{requireRoles([ roles.admin ]) && (
					<Menu.Item key="/users" className="top-nav__item" icon={<UserOutlined />}>
						<Link className="nav-link" to="/users" />
						Manage User
					</Menu.Item>
				)}
				{requireRoles([ roles.admin, roles.teacher ]) && (
					<Menu.Item key="/rooms" className="top-nav__item" icon={<AppstoreOutlined />}>
						<Link className="nav-link" to="/rooms" />
						Manage Room
					</Menu.Item>
				)}
				{requireRoles([ roles.student ]) && (
					<Menu.Item key="/scan" className="top-nav__item" icon={<ScanOutlined />}>
						<Link className="nav-link" to="/scan" />
						Scan
					</Menu.Item>
				)}
			</Menu>
		</div>
	);
};

export default NavBar;
