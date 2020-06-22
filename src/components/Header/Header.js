import React from "react";
import "./Header.css";
import logo from "../../logo.svg";
import { Row, Col } from "antd";

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
              <a href="!#">Home</a>
            </div>
            <div className="user">
              <a href="!#">User</a>
            </div>
          </Col>
          <Col span={18} className="username">
            <a href="!#">UserName</a>
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
