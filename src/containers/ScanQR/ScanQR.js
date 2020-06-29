import React from 'react'
import { useState } from 'react';
import QrReader from 'react-qr-reader'
import "./ScanQR.css"
import { SpinEffect } from '../../components'
import { useRouter } from '../../hooks'
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import { CheckInCheckOutService } from '../../services';
import { message, notification, Space } from 'antd';
import { parseObjectFromJson } from '../../utils';
function ScanQR() {
    const { history } = useRouter()
    const goBack = () => {
        history.goBack()
    }
    const [codeValues, setCodeValues] = useState(null)
    useEffect(() => {
        if (codeValues) {
            const { codeId, sessionId, expiries } = parseObjectFromJson(codeValues) || {}
            if (!codeId || !sessionId || !expiries) {
                message.error('QR code is not valid')
                return setCodeValues(null)
            }
            CheckInCheckOutService.checking(codeId, sessionId, expiries)
                .then(({ session, message }) => {
                    const { name, room } = session || {}
                    notification.success({
                        message: message,
                        description: (
                            <Space direction="vertical" align="start">
                                <b>Session: {name}</b>
                                <b>Room: {room}</b>
                            </Space>
                        ),
                    })
                    goBack()
                }).catch(error => {
                    message.error(error.message, 2)
                    setCodeValues(null)
                })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [codeValues])

    const handleScan = (data) => {
        if (data) {
            setCodeValues(data)
        }
    }
    const handleError = err => {
        console.error(err)
    }
    return (
        <div className="inherit d-flex-center scan-qr-page">
            {
                codeValues === null ? (
                    <QrReader
                        delay={100}
                        onError={handleError}
                        onScan={handleScan}
                        className="scanner"
                    />
                ) : (
                        <SpinEffect tip="checking..." />
                    )
            }
            <ArrowLeftOutlined className="go-back" onClick={goBack} />
        </div>
    )
}

export default ScanQR