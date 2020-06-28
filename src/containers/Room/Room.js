import React, { useState, useEffect } from "react";
import "./Room.css";
import "antd/dist/antd.css";
import { Table, Space, Button, message } from "antd";
import { formatDate } from "../../utils/moment";
import { AddRoomModal, EditRoomModal } from "../../components";
import { useDispatch, useStore } from "../../hooks";
import { RoomService } from "../../services";
import { actions } from "../../store";
import { Link } from "react-router-dom";

function Room() {
  const dispatch = useDispatch();
  const { rooms } = useStore();

  useEffect(() => {
    RoomService.getRooms().then((res) => {
      dispatch(actions.setRooms(res.rooms));
    });
  }, [dispatch]);
  const [room, setRoom] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const open = () => setIsOpen(true);
  const openEditModal = (record) => {
    setRoom(record);
    setIsOpenEditModal(true);
  };
  const close = () => setIsOpen(false);
  const closeEditModal = () => setIsOpenEditModal(false);

  const handleDeleteRoom = (id) => {
    RoomService.deleteRoom(id).then((res) => {
      dispatch(actions.deleteRoomById(id));
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
            <Link
              className="ant-btn link form-button"
              onClick={() => openEditModal(record)}
            >
              Edit
            </Link>
            <Button
              onClick={() => handleDeleteRoom(text)}
              className="ant-btn link form-button"
            >
              Delete
            </Button>
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
        <EditRoomModal
          isOpen={isOpenEditModal}
          open={openEditModal}
          close={closeEditModal}
          room={room}
        />
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
