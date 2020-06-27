import React, { useState, useEffect } from "react";
import "./BodySessionPage.css";
import "antd/dist/antd.css";
import { Table, Space, Button, message } from "antd";
import { formatDate, format, checkTimeSessionValid } from "../../utils/moment";
import AddSessionModal from "../AddSessionModal/AddSessionModal";
import { useDispatch, useStore, useRequireRole } from "../../hooks";
import { UserService, RoomService, SessionService } from "../../services";
import { actions } from "../../store";
import { Link } from "react-router-dom";
import { roles } from "../../constants";

function BodySessionPage() {
  const dispatch = useDispatch();
  const requireRoles = useRequireRole()
  const { user, rooms, sessions, users } = useStore();
  useEffect(() => {
    SessionService.getSessions().then((res) => {
      dispatch(actions.setSessions(res.sessions));
    });
  }, [dispatch]);
  useEffect(() => {
    UserService.getUser().then((res) => {
      dispatch(actions.setUsers(res.users));
    });
  }, [dispatch]);
  useEffect(() => {
    RoomService.getRooms().then((res) => {
      dispatch(actions.setRooms(res.rooms));
    });
  }, [dispatch]);

  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const getUserNameById = (id) => {
    if (!users) return "...";
    const result = users.find((item) => item._id === id);
    if (!result) return "RoBot";
    return result.fullname;
  };
  const getRoomNameById = (id) => {
    const result = rooms && rooms.find((item) => item._id === id);
    if (!result) return "RoBot";
    return result.name;
  };
  const handleDeleteSession = (id) => {
    SessionService.deleteSession(id).then((res) => {
      dispatch(actions.deleteSession(id));
      message.success(res.message);
    });
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
      title: "StartAt",
      width: 200,
      dataIndex: "startAt",
      key: "startAt",
      render: (text, record, index) => (
        <Space size="small">{formatDate(text)}</Space>
      ),
      sorter: (a, b) => format(a.startAt) - format(b.startAt),
    },
    {
      title: "EndAt",
      width: 200,
      dataIndex: "endAt",
      key: "endAt",
      render: (text, record, index) => (
        <Space size="middle">{formatDate(text)}</Space>
      ),
    },
    {
      title: "Name",
      width: 150,
      key: "name",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Host",
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
      title: "Room",
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
    },
  ];
  if(requireRoles([roles.teacher])) {
    columns.push({
      title: "Action",
      key: "_id",
      dataIndex: "_id",
      render: (text, record) => {
        return (
          <Space size="middle">
            <Link className="ant-btn link form-button" to={`/sessions/${text}`}>
              View
            </Link>
            <Link className="ant-btn link form-button" to="/">
              Edit
            </Link>
            <Button
              className="ant-btn link form-button"
              onClick={() => handleDeleteSession(text)}
            >
              Delete
            </Button>
            <Link
              disabled={checkTimeSessionValid(text, sessions)}
              className="ant-btn link form-button"
              to={{
                pathname: `/sessions/${text}/qr`,
                state: {
                  session: record,
                },
              }}
            >
              QR
            </Link>
          </Space>
        );
      },
    })
  }

  return (
    <div className="body">
      <div className="container pt-3">
        <div className="create-btn">
          {
            requireRoles([roles.teacher]) && (
              <Button onClick={open} type="primary">
                Create Session
              </Button>
            )
          }
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
