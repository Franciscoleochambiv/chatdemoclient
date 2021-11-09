import openSocket from 'socket.io-client'

const socket = openSocket('http://localhost:8006/')

export default socket