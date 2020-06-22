import React from "react";
import "./Header.css";
import logo from "../../logo.svg";
import { Row, Col } from "antd";
import { Link } from "react-router-dom";

function Header() {
  return (
    <Row className="header">
      <Col span={24}>
        <Row className="c-wrapper">
          <Col span={2}>
            <img src={logo} className="logo" alt="logo" />
          </Col>
          <Col span={2} className="link">
            <div className="home">
              <Link to="/">Home</Link>
            </div>
            <div className="user">
              <Link to="/">User</Link>
            </div>
          </Col>
          <Col span={18} className="username">
            <Link to="/">UserName</Link>
          </Col>
          <Col span={2}>
            {/* <a href="!#">LogOut</a> */}
            <button>Log Out</button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default Header;
