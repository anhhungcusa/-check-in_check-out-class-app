import React, { useState } from "react";
import "./Body.css";
import "antd/dist/antd.css";
import { Table, Space } from "antd";
import { formatDate } from "../../utils/moment";
import AddSessionModal from "../AddSessionModal/AddSessionModal";

// get user name by id
const getUserNameById = (id) => {
  // User is data User get from DataProvider
  var User = [];
  const result = User.find((item) => item._id === id);
  if (!result) return "RoBot";
  return result.fullname;
};

const columns = [
  {
    title: "#",
    dataIndex: "_id",
    key: "_id",
    render: (text, record, index) => <Space size="middle">{index + 1}</Space>,
  },
  {
    title: "startAt",
    dataIndex: "startAt",
    key: "startAt",
    render: (text, record, index) => (
      <Space size="middle">{formatDate(text)}</Space>
    ),
  },
  {
    title: "endAt",
    dataIndex: "endAt",
    key: "endAt",
    render: (text, record, index) => (
      <Space size="middle">{formatDate(text)}</Space>
    ),
  },
  {
    title: "name",
    key: "name",
    dataIndex: "name",
  },
  {
    title: "host",
    dataIndex: "hostId",
    key: "hostId",
    render: (text, record) => (
      <Space size="middle">{getUserNameById(text)}</Space>
    ),
  },
  {
    title: "room",
    dataIndex: "roomId",
    key: "roomId",
    render: (text, record) => (
      <Space size="middle">{getUserNameById(text)}</Space>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <Space size="middle">
        <a href="!#">View</a>
        <a href="!#">Edit</a>
        <a href="!#">Delete</a>
      </Space>
    ),
  },
];

// mock data
const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
];

function Body() {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <div className="body">
      <div className="container pt-3">
        <div className="create-btn">
          <button onClick={open}>Create Session</button>
        </div>
        <AddSessionModal isOpen={isOpen} open={open} close={close} />
        <div className="listSession">
          <Table columns={columns} dataSource={data} scroll={{ y: 300 }} />
        </div>
      </div>
    </div>
  );
}

export default Body;
