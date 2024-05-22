import { useState } from 'react'
import io from 'socket.io-client'

// const socket = io('http://localhost:4000')
// TODDO: vite.config to use proxy
const socket = io('/')

function App() {
	const [message, setMessage] = useState(null)

	const handleSubmit = e => {
		e.preventDefault()

		console.log('input:', message)
		// socket.emit('chat message', input.value)
		// input.value = ''
		// return false
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
		</div>
	)
}

export default App
