import React, { useState, useEffect } from "react";
import "./BodySessionPage.css";
import "antd/dist/antd.css";
import { Table, Space } from "antd";
import { formatDate, format } from "../../utils/moment";
import AddSessionModal from "../AddSessionModal/AddSessionModal";
import { useDispatch, useStore } from "../../hooks";
import { UserService, RoomService, SessionService } from "../../services";
import { actions } from "../../store";
import { NavLink, Link } from "react-router-dom";

function BodySessionPage() {
  const dispatch = useDispatch();
  const { user, rooms, sessions, users } = useStore();
  useEffect(() => {
    SessionService.getSessions().then((doc) => {
      dispatch(actions.setSessions(doc.sessions));
    });
  }, [dispatch]);
  useEffect(() => {
    UserService.getUser().then((doc) => {
      dispatch(actions.setUsers(doc.users));
    });
  }, [dispatch]);
  useEffect(() => {
    RoomService.getRooms().then((doc) => {
      dispatch(actions.setRooms(doc.rooms));
    });
  }, [dispatch]);
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const getUserNameById = (id) => {
    if(!users) return '...'
    const result = users.find((item) => item._id === id);
    if (!result) return "RoBot";
    return result.fullname;
  };
  const getRoomNameById = (id) => {
    const result = rooms && rooms.find((item) => item._id === id);
    if (!result) return "RoBot";
    return result.name;
  };

  const columns = [
    {
      title: "#",
      width: 50,
      dataIndex: "_id",
      key: "_id",
      render: (text, record, index) => <Space size="small">{index + 1}</Space>,
    },
    {
      title: "startAt",
      width: 200,
      dataIndex: "startAt",
      key: "startAt",
      render: (text, record, index) => (
        <Space size="small">{formatDate(text)}</Space>
      ),
      sorter: (a, b) => format(a.startAt) - format(b.startAt),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "endAt",
      width: 200,
      dataIndex: "endAt",
      key: "endAt",
      render: (text, record, index) => (
        <Space size="middle">{formatDate(text)}</Space>
      ),
    },
    {
      title: "name",
      width: 150,
      key: "name",
      dataIndex: "name",
      defaultSortOrder: ["ascend"],
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "host",
      dataIndex: "hostId",
      width: 100,
      key: "hostId",
      render: (text, record) => (
        <Space size="middle">{getUserNameById(text)}</Space>
      ),
      filters: [{ text: "For Me", value: `${user._id}` }],
      onFilter: (value, record) => record.hostId.includes(value),
    },
    {
      title: "room",
      width: 100,
      dataIndex: "roomId",
      key: "roomId",
      render: (text, record) => (
        <Space size="middle">{getRoomNameById(text)}</Space>
      ),
      filters:
        rooms &&
        rooms.map((item) => {
          var obj = {};
          obj.value = item._id;
          obj.text = item.name;
          return obj;
        }),
      onFilter: (value, record) => record.roomId.includes(value),
      ellipsis: true,
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "_id",
      render: (text, record) => {
        return (
        <Space size="middle">
          <NavLink
            activeClassName="link"
            className="ant-btn link form-button"
            to="/"
          >
            View
          </NavLink>
          <NavLink
            activeClassName="link"
            className="ant-btn link form-button"
            to="/"
          >
            Edit
          </NavLink>
          <NavLink
            activeClassName="link"
            className="ant-btn link form-button"
            to="/"
          >
            Delete
          </NavLink>
          <Link
            className="ant-btn link form-button"
            to={{
              pathname: `/sessions/${text}/qr`,
              state: {
                session: record
              },
            }}
          >
            QR
          </Link>
        </Space>
      )},
    },
  ];

  return (
    <div className="body">
      <div className="container pt-3">
        <div className="create-btn">
          <button onClick={open}>Create Session</button>
        </div>
        <AddSessionModal isOpen={isOpen} open={open} close={close} />
        <div className="listSession">
          <Table
            bordered
            rowKey={(record) => record._id}
            columns={columns}
            dataSource={sessions}
            scroll={{ y: 300 }}
          />
        </div>
      </div>
    </div>
  );
}

export default BodySessionPage;
