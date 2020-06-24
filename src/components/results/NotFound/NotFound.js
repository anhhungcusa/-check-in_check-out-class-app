import React from 'react'
import { Result, Button } from 'antd'
import { useRouter } from '../../../hooks'

function NotFound({ 
    title = 'Sorry, the resource you visited does not exist.',
    extra
}) {
    const {push} = useRouter()
    const onGoHome = () => {
        push('/')
    }

    return (
        <div className="inherit d-flex-center">
            <Result
                status="404"
                // title={title}
                subTitle={title}
                extra={
                    extra ? extra : (
                        <Button onClick={onGoHome} type="primary">Back Home</Button>
                    )}
            />
        </div>
    )
}

export default NotFound