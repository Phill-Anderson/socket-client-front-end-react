import { useState, useEffect } from 'react'
import { io } from "socket.io-client";
const socket = io('http://localhost:5000')
const useSocketService = () => {
    const [connectionStatus, setConnectionStatus] = useState(null)

    useEffect(() => {
        socket.on('connect', () => {
            if (socket.connected) {
                setConnectionStatus('realTime сервистэй холбогдсон')
            }
        })
        socket.on("disconnect", (reason) => {
            setConnectionStatus(`realTime сервистэй холболт салсан. Шалтгаан ${reason}`)
        })

        socket.on('hello', (arg) => {
            console.log(arg)
        })

        return () => {
            socket.disconnect()
        }
    }, [])
    return [connectionStatus, socket]
}

export default useSocketService
