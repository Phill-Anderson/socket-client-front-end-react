import { useState, useEffect } from 'react'
import { TextField } from '@material-ui/core'
import useSocketService from './socket/useSocketService'

function App() {
  const [connectionStatus, socket] = useSocketService()

  const [state, setState] = useState({ message: '', name: '' })
  const [chat, setChat] = useState([])
  useEffect(() => {
    socket.on('message', ({ name, message }) => {
      setChat([...chat, { name, message }])
    })

  })
  const onTextChange = e => {
    setState({ ...state, [e.target.name]: e.target.value })
  }


  const onMessageSubmit = (e) => {
    e.preventDefault()
    const { name, message } = state
    socket.emit('message', { name, message })
    setState({ message: '', name })
  }
  const renderChat = () => {
    return chat.map(({ name, message }, index) => {
      <div key={index}>
        <h3>{name}: <span>{message}</span></h3>
      </div>
    })
  }
  return (
    <>
      <h5 style={{ textAlign: 'center' }}>{connectionStatus}</h5>
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
          {renderChat()}
        </div>
      </div>
    </>
  );
}

export default App;