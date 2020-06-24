import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useRouter, useCountDown } from '../../hooks'
import { SessionService } from '../../services'
import { SpinEffect, NotFound } from '../../components'
import { Button, Space } from 'antd'
import ObjectId from 'bson-objectid'
import QRCode from 'qrcode.react'
import { useMemo } from 'react'

function QR() {
    const {state, params, history} = useRouter()
    const [session, setSession] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState({message: null, has: false})
    const [codeExpiries, setCodeExpiries] = useState(Date.now())
    const timesToChanges = 30000 // ms
    // auto change qr code in 30s
    useEffect(() => {
        let interval = setInterval(() => {
           setCodeExpiries(time => time + timesToChanges)
        }, timesToChanges)
        return () => {
            clearInterval(interval)
        }
    }, [session])
    const codeValues = useMemo(() => {
        if(!session) return null
        const values = {
            codeId: ObjectId().str,
            sessionId: session._id,
            expiries: codeExpiries
        }
        return JSON.stringify(values)

    }, [codeExpiries, session])
    const nextQRCode = () => {
        setCodeExpiries(time => time + timesToChanges)
    }

    const countDown = useCountDown(
        {start: 0, end: timesToChanges / 1000, skip: 1}, 
        1000, codeExpiries)
    
    useEffect(() => {
        if(state && state.session) {
            setSession(session)
            return
        }

        const sessionId = params.id 
        if(!sessionId) {
            setError(true)
            return
        }
        setLoading(true)
        SessionService.getSessionById(sessionId)
            .then(session => setSession(session))
            .catch(error => {
                setError({has: true, message: error.message})
            }).finally(_ => setLoading(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    if(loading || codeValues === null) return <SpinEffect />

    // extra
    const extra = <Button onClick={() => history.goBack()}>Back</Button>
    if(error.has) return <NotFound title={error.message} extra={extra} />

    return (
        <div className="inherit d-flex-center">
            <Space direction="vertical" size="large" align="center">
                <h1> {session && session.name} </h1>
                <div className="qr-code-area">
                    <QRCode size={300} value={codeValues} />
                </div>
                <div>
                    <Button onClick={nextQRCode}>next QR Code  {countDown}</Button>
                </div>
            </Space>
        </div>
    )
}

export default QR