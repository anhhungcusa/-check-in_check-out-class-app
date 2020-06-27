import React, { useState, useEffect } from "react";
import "./Room.css";
import "antd/dist/antd.css";
import { Table, Space, Button } from "antd";
import { formatDate } from "../../utils/moment";
import { AddRoomModal } from "../../components";
import { useDispatch, useStore } from "../../hooks";
import { RoomService } from "../../services";
import { actions } from "../../store";
import { Link } from "react-router-dom";

function Room() {
  const dispatch = useDispatch();
  const { rooms } = useStore();
  console.log('rooms', rooms)
  useEffect(() => {
    RoomService.getRooms().then((res) => {
      dispatch(actions.setRooms(res.rooms));
    });
  }, [dispatch]);
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const columns = [
    {
      title: "#",
      width: 50,
      dataIndex: "_id",
      key: "_id",
      render: (text, record, index) => <Space size="small">{index + 1}</Space>,
    },
    {
      title: "Name",
      width: 250,
      key: "name",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Create",
      width: 250,
      dataIndex: "createAt",
      key: "createAt",
      render: (text, record, index) => (
        <Space size="middle">{formatDate(text)}</Space>
      ),
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "_id",
      render: (text, record) => {
        return (
          <Space size="middle">
            <Link className="ant-btn link form-button" to={`/rooms/${text}`}>
              Edit
            </Link>
            <Link className="ant-btn link form-button" to={`/rooms/${text}`}>
              Delete
            </Link>
          </Space>
        );
      },
    },
  ];

  return (
    <div className="body">
      <div className="container pt-3">
        <div className="create-btn">
          <Button onClick={open} type="primary">
            Create Room
          </Button>
        </div>
        <AddRoomModal isOpen={isOpen} open={open} close={close} />
        <div className="listRoom">
          <Table
            bordered
            rowKey={(record) => record._id}
            columns={columns}
            dataSource={rooms}
            scroll={{ y: 300 }}
          />
        </div>
      </div>
    </div>
  );
}

export default Room;
