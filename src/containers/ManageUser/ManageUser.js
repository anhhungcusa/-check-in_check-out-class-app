import React from 'react'
import './ManageUser.css'
import {useStore, useDispatch} from '../../hooks'
import { Table, message, Button } from 'antd'
import { useEffect } from 'react'
import { UserService } from '../../services'
import { actions } from '../../store'
import moment from 'moment'
import {roles} from '../../constants'
import { useState } from 'react'

export default function ManageUser() {
    const {users} = useStore()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [loadingForDelete, setLoadingForDelete] = useState({})
    useEffect(() => {
        if(users === null) {
            setLoading(true)
            UserService.getUser()
                .then(({users}) => {
                    dispatch(actions.setUsers(users))
                }).catch(error => {
                    message.error(error.message)
                }).finally(_ => setLoading(false))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const onDeleteUser = (userId, username) => {
        setLoadingForDelete(state => ({...state, [userId]: true}))
        UserService.deleteUserById(userId, username)
            .then(res => {
                message.success(res.message)
                dispatch(actions.deleteUserById(userId))
            }).catch(error => {
                message.error(error.message)
            }).finally(_ => {
                setLoadingForDelete(state => ({...state, [userId]: false}))
            })
    }
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
        {
            key: 'action',
            title: 'action',
            align: 'center',
            dataIndex: 'role',
            render: (dataIndex, user) => (
                <Button 
                    loading={loadingForDelete[user._id]} 
                    onClick={() => onDeleteUser(user._id)}>delete {loadingForDelete[user._id]} </Button>
                )
        }
        
    ]
    return (
        <div className="manage-users container">
            <Table
                    bordered
                    rowKey={user => user._id}
                    dataSource={users}
                    loading={loading}
                    columns={columns}
                />
        </div>
    )
}