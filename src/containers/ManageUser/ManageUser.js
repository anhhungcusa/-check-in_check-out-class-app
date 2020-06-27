import React from 'react'
import './ManageUser.css'
import {useStore, useDispatch} from '../../hooks'
import { Table, message, Space } from 'antd'
import { useEffect } from 'react'
import { UserService } from '../../services'
import { actions } from '../../store'
import moment from 'moment'
import {roles} from '../../constants'

export default function ManageUser() {
    const {users} = useStore()
    const dispatch = useDispatch()
    useEffect(() => {
        if(users === null) {
            UserService.getUser()
                .then(({users}) => {
                    dispatch(actions.setUsers(users))
                }).catch(error => {
                    message.error(error.message)
                })
        }
    }, [])
    const columns = [
        {
            key: 'username',
            title: 'username',
            dataIndex: 'username',
            align: 'center',
        },
        {
            key: 'fullname',
            title: 'fullname',
            dataIndex: 'fullname',
            align: 'center',
        },
        {
            key: 'role',
            title: 'role',
            dataIndex: 'role',
            align: 'center',
            filters: roles.values().map(role => ({text: role, value: role})),
            onFilter: (value, record, a, b) => {
                const roleName = record.role && record.role.name
                if(!roleName) return false
                return roleName === value 
            },
            render: role => role ? role.name : 'not found'
        },
        {
            key: 'createdAt',
            title: 'create',
            dataIndex: 'createdAt',
            align: 'center',
            render: date => moment(date).format('DD/MM/YYYY - ss:mm:HH'),
            sorter: (a,b) => moment(a.createdAt).valueOf() - moment(b.createdAt).valueOf(),
        },
        {
            key: 'updatedAt',
            title: 'update',
            dataIndex: 'updatedAt',
            align: 'center',
            render: date => moment(date).format('DD/MM/YYYY - ss:mm:HH'),
            sorter: (a,b) => moment(a.createdAt).valueOf() - moment(b.createdAt).valueOf(),
        },
        // {
        //     key: 'action',
        //     title: 'action',
        //     align: 'center',
        //     dataIndex: 'role',
        //     render: (dataIndex, record) => {

        //         return (
        //             <Space direction='horizontal'>

        //             </Space>
        //      1   )
        //     }
        // }
        
    ]
    return (
        <div className="manage-users container">
            <Table
                    bordered
                    rowKey={user => user._id}
                    dataSource={users}
                    loading={users === null ? true : false}
                    columns={columns}
                />
        </div>
    )
}