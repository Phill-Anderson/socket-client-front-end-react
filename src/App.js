import { useState, useEffect } from 'react'
import { TextField } from '@material-ui/core'
import useSocketService from './socket/useSocketService'
import { io } from "socket.io-client";
const socket = io('http://localhost:5000')
function App() {
  const [connectionStatus] = useSocketService()

  const [state, setState] = useState({ message: '', name: '' })
  const [chats, setChats] = useState([])
  /*   useEffect(() => {
      socket.on('message', ({ name, message }) => {
        setChat([...chat, { name, message }])
        console.log(`${name} -- ${message}`)
      })
    }) */
  useEffect(() => {
    console.log(`chats:`, chats)
  }, [chats])

  const onTextChange = e => {
    setState({ ...state, [e.target.name]: e.target.value })
  }


  const onMessageSubmit = (e) => {
    e.preventDefault()
    const { name, message } = state
    socket.emit('message', { name, message }, (response) => {
      const { name, message } = response
      setChats([...chats, { name, message }])
    })
    setState({ message: '', name })
  }

  return (
    <>
      <h5 style={{ textAlign: 'center' }}>{connectionStatus}</h5>
      <pre> {JSON.stringify(chats)}</pre>
      <div className="card">
        <form onSubmit={onMessageSubmit}>
          <h1>Мессэж</h1>
          <div className="name-field">
            <TextField name="name" onChange={e => onTextChange(e)} value={state.name} label="Нэр" />
          </div>
          <div>
            <TextField name="message" onChange={e => onTextChange(e)} value={state.message} id="outlined-multiline-static" variant="outlined" label="Мэссэж" />
          </div>
          <button>Send Message</button>
        </form>
        <div className='render-chat'>
          <h1>Chat Log</h1>
          {
            chats.length > 0 ? chats.map((el, index) => {
              const { name, message } = el
              return (
                <div key={index}>{name} : {message}</div>
              )
            })
              :
              'энэ chats массивт юу ч алга'
          }
        </div>
      </div>
    </>
  );
}

export default App;
