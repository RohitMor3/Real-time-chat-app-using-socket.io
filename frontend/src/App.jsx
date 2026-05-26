import { useEffect, useState } from 'react'
import {io} from 'socket.io-client'
import './App.css'

const socket = io('http://localhost:3000',{
  transports: ['websocket'],
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
})

function App() {
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')
  const [username, setUsername] = useState('')
  const [isUsernameSet, setIsusernameSet] = useState(false)
 
  useEffect(()=> {
    socket.on('receiveMessage', (data) =>{
      setMessages([...messages, data])
    })
  }, [messages])

  const sendMessage = () => {
    if(message.trim()){
      socket.emit('sendMessage', message)
      setMessage('')
    }
  }

  const setUser = () => {
    if (username.trim()){
      socket.emit('setUsername', username)
      setIsusernameSet(true)
    }
  }

  return (
    <>
      <div className='bg-pink-50 text-balck w-screen h-screen text-center'>
        <h1 className='text-4xl m-5'>Real-time chat App using socket.io </h1>
        { ! isUsernameSet ? (
          <div className='w-96 m-auto'>
            <input type='text' value={username} className='w-1/2 m-5 border border-blue-200 p-3 rounded' placeholder='enter your username...' onChange={(e) => {
          setUsername(e.target.value)
        }}/>
        <button className='bg-blue-500 text-white p-2 rounded-lg' onClick={setUser}> start chatting </button>
      </div>
      ) : (
        <>
          <div className='message-container m-auto w-4xl'>
          {
            messages && messages.map((msg, index)=>{
              return(
                <p key={index} className='bg-blue-200 p-5 rounded m-2 w-fit'>
                <strong>{msg.username} : </strong>{msg.message}</p>
              )
            })
          }
        </div>
        <input type='text' value={message} className='w-1/2 m-5 border border-blue-200 p-3 rounded' placeholder='enter your message...' onChange={(e) => {
          setMessage(e.target.value)
        }}/>
        <button className='bg-blue-500 text-white p-5 rounded-lg' onClick={sendMessage}> send </button> 
      </>
       )}

    </div>
 
    </>
  )
}

export default App
