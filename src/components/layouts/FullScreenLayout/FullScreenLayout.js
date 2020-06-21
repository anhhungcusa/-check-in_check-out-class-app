import React from 'react'
import './FullScreenLayout.css'
function FullScreenLayout({children}) {

    return (
        <div className="full-screen">
            {children}
        </div>
    )
}

export default FullScreenLayout