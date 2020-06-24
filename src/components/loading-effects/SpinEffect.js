import React from 'react'
import {Spin} from 'antd'

function SpinEffect({tip, size="large"}) {

    return (
        <div className={`inherit d-flex-center`}>
            <Spin size={size} tip={tip} />
        </div>
    )
}

export default SpinEffect