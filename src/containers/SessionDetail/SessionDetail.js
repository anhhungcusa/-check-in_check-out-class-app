import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import "./SessionDetail.css";
import { Table, Space } from "antd";
import { formatDate } from "../../utils/moment";
import { useDispatch, useStore, useRouter } from "../../hooks";
import {
  UserService,
  CheckInCheckOutService,
} from "../../services";
import { actions } from "../../store";

function SessionDetail() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [checkList, setCheckList] = useState(null);
  const { users } = useStore();
  const { id } = router.params;

  useEffect(() => {
    CheckInCheckOutService.getCheckinById(id).then((res) => {
      console.log('res', res.checkins)
      setCheckList(res.checkins);
    });
  }, [dispatch, id]);

  useEffect(() => {
    UserService.getUser().then((doc) => {
      dispatch(actions.setUsers(doc.users));
    });
  }, [dispatch]);

  console.log("checkList", checkList);

  const getUserNameById = (id) => {
    const result = users && users.find((item) => item._id === id);
    if (!result) return "RoBot";
    return result.fullname;
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
      title: "Participant Name",
      width: 150,
      key: "userId",
      dataIndex: "userId",
      render: (text, record) => (
        <Space size="middle">{getUserNameById(text)}</Space>
      ),
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Check in",
      width: 200,
      dataIndex: "checkinAt",
      key: "checkinAt",
      render: (text, record, index) => (
        <Space size="middle">{formatDate(text)}</Space>
      ),
    },
    {
      title: "Check out",
      width: 200,
      dataIndex: "checkoutAt",
      key: "checkoutAt",
      render: (text, record, index) => (
        <Space size="middle">{text ? formatDate(text) : 'Null'}</Space>
      ),
    },
  ];
  return (
    <div className="container detail-session">
      <Table
        bordered
        rowKey={(record) => record._id}
        columns={columns}
        dataSource={checkList && checkList}
        scroll={{ y: 300 }}
      />
    </div>
  );
}

export default SessionDetail;
