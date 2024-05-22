import { useEffect, useState } from 'react'
import io from 'socket.io-client'

// const socket = io('http://localhost:4000')
// TODDO: vite.config to use proxy
const socket = io('/')

function App() {
	const [message, setMessage] = useState(null)
	const [messages, setMessages] = useState([])

	const handleSubmit = e => {
		e.preventDefault()

		socket.emit('chat message', message)

		setMessages([...messages, message])
		setMessage('')
	}

	useEffect(() => {
		socket.on('chat message', msg => {
			reciveMessage(msg)
		})

		return () => {
			socket.off('chat message')
		}
	}, [messages])

	const reciveMessage = msg => {
		setMessages(prev => [...prev, msg])
	}

	return (
		<div>
			<h1>Socket.io Chat</h1>

			<form
				action=''
				id='form'
				onSubmit={e => handleSubmit(e)}
			>
				<input
					id='input'
					onChange={e => setMessage(e.target.value)}
					placeholder='Enter message'
					autoComplete='off'
				/>
				<button>Send</button>
			</form>

			<div>
				<ul id='messages'>
					{messages.map((msg, i) => (
						<li key={i}>{msg}</li>
					))}
				</ul>
			</div>
		</div>
	)
}

export default App
