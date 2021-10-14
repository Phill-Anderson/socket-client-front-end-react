import React, { useEffect } from 'react'
import { io } from 'socket.io-client'

const socket = io('http://localhost:8000', {
    withCredentials: true,
    extraHeaders: {
        'Access-Control-Allow-Origin': '*'
    }
})
const SocketClient = () => {

    useEffect(() => {
        socket.on('connect', () => {
            if (socket.connected) {
                console.log(`client тал socket server-тэй холбогдсон`, socket.id)
            } else {
                console.log(`socket service холбогдоогүй ...`)
            }
        })
    }, [])
    return (
        <div>

        </div>
    )
}

export default SocketClient
