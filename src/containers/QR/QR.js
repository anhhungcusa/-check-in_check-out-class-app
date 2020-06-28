import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import ObjectId from 'bson-objectid';
import QRCode from 'qrcode.react';
import { useRouter, useCountDown } from '../../hooks';
import { SessionService } from '../../services';
import { SpinEffect, NotFound } from '../../components';
import { Button, Space } from 'antd';
import { useMemo } from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import './QR.css';
import { socket } from '../../configs'
import { socketConnections } from '../../constants';
function QR() {
    useEffect(() => {
        socket.open()
        return () => {
            socket.close()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const { state, params, history } = useRouter();
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({ message: null, has: false });
    const timesToChanges = 30000;
    const [codeExpiries, setCodeExpiries] = useState(Date.now() + timesToChanges);
    const codeValues = useMemo(
        () => {
            if (!session) return null;
            const values = {
                codeId: ObjectId().str,
                sessionId: session._id,
                expiries: codeExpiries
            };
            return ({ str: JSON.stringify(values), values });
        },
        [codeExpiries, session]
    ); // ms
    const nextQRCode = () => {
        setCodeExpiries(Date.now() + timesToChanges);
    };
    useEffect(() => {
        if (session) {
            socket.on(socketConnections.qrSession, sessionId => {
                if(sessionId === session._id) {
                    nextQRCode()
                }
            });
        }
    }, [session])
    // auto change qr code in 30s
    useEffect(
        () => {
            let interval = setInterval(() => {
                setCodeExpiries(Date.now() + timesToChanges);
            }, timesToChanges);
            return () => {
                clearInterval(interval);
            };
        },
        [session]
    );

    const countDown = useCountDown({ start: 0, end: timesToChanges / 1000, skip: 1 }, 1000, codeExpiries);

    useEffect(() => {
        if (state && state.session) {
            setSession(state.session);
            return;
        }

        const sessionId = params.id;
        if (!sessionId) {
            setError(true);
            return;
        }
        setLoading(true);
        SessionService.getSessionById(sessionId)
            .then((session) => setSession(session))
            .catch((error) => {
                setError({ has: true, message: error.message });
            })
            .finally((_) => setLoading(false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    if (loading || codeValues === null) return <SpinEffect />;

    // extra
    const goBack = () => history.goBack();
    const extra = <Button onClick={goBack}>Back</Button>;
    if (error.has) return <NotFound title={error.message} extra={extra} />;

    return (
        <div className="inherit d-flex-center qr-page">
            <Space direction="vertical" size="large" align="center">
                <Space align="center" size="middle" className="title">
                    <ArrowLeftOutlined onClick={goBack} />
                    <span>{session && session.name}</span>
                </Space>
                <div className="qr-code-area">
                    <QRCode size={300} value={codeValues.str} />
                </div>
                <div>
                    <Button onClick={nextQRCode}>next QR Code {countDown}</Button>
                </div>
            </Space>
        </div>
    );
}

export default QR;
