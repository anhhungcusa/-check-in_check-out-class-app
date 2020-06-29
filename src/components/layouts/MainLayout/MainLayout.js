import React from 'react'
import { HeaderV2 } from '../..'

function MainLayout({children}) {

    return (
        <div className="main-layout">
            <HeaderV2 title="QR team" />
            {children}
        </div>
    )
}

export default MainLayout