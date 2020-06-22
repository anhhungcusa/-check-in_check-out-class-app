import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import './NavBar.css';
import { useRouter } from '../../hooks';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';

const NavBar = () => {
    const [currentItem, setCurrentItem] = useState('/');
    const router = useRouter();
    useEffect(
        () => {
            const pathname = router.pathname;
            setCurrentItem(pathname);
            // eslint-disable-next-line react-hooks/exhaustive-deps
        },
        [router.pathname]
    );
    return (
        <div className="top-nav">
            <Menu selectedKeys={[currentItem]} mode="horizontal" theme="dark">
                <Menu.Item
                    key="/"
                    className="top-nav__item"
                    icon={<HomeOutlined />}
                >
                    <Link className="nav-link" to="/" />
					Home
				</Menu.Item>
                <Menu.Item
                    key="/manage-giveaways"
                    className="top-nav__item"
                    icon={<UserOutlined />}
                >
                    <Link className="nav-link" to="/manage-giveaways" />
                        User
                    </Menu.Item>
            </Menu>
        </div>
    );
};

export default NavBar