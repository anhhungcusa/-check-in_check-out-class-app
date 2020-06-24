import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { Table, Space } from "antd";
import { formatDate } from "../../utils/moment";
import { useDispatch, useStore, useRouter } from "../../hooks";
import { SessionService, UserService } from "../../services";
import { actions } from "../../store";

function SessionDetail() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [session, setSession] = useState(null);
  const { users } = useStore();
  const { id } = router.params;

  useEffect(() => {
    SessionService.getSession(id).then((doc) => setSession(doc.session));
  }, [dispatch, id]);
  useEffect(() => {
    UserService.getUser().then((doc) => {
      dispatch(actions.setUsers(doc.users));
    });
  }, [dispatch]);

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
      defaultSortOrder: ["ascend"],
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
        <Space size="middle">{formatDate(text)}</Space>
      ),
    },
  ];
  return (
    <div>
      <Table
        bordered
        rowKey={(record) => record._id}
        columns={columns}
        dataSource={session && session.participantIds}
        scroll={{ y: 300 }}
      />
    </div>
  );
}

export default SessionDetail;
