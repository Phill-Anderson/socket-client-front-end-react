import { useState, useEffect } from 'react'
import { io } from "socket.io-client";
const socket = io('http://localhost:5000')
const useSocketService = () => {
    const [connectionStatus, setConnectionStatus] = useState('холбогдоогүй')

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

        socket.emit('callback turshilt', '1', { name: 'updated' }, (response) => {
            console.log(response.status)
        })

        socket.emit('hey', 'front талаас мэдээлэл дамжууллаа')

        /*  let count = 0
         setInterval(() => {
             socket.volatile.emit('ping', ++count)
         }, 1000); */
        socket.emit('one time', 'нэг удаа ажиллах сокет')

        //backend талд нь сокетод validation тавьсан
        socket.emit('user:create', { username: 'phill', email: 'test@gmail.com' }, (response) => {
            console.log(response)
        })
        /*    socket.on('listenAllClients', (arg) => {
               console.log(arg)
           }) */
        return () => {
            socket.disconnect()
        }
    }, [])
    return [connectionStatus, socket]
}

export default useSocketService
