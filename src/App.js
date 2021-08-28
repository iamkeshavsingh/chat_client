import { useState } from "react";
import { io } from 'socket.io-client';

const SERVER_DOMAIN = 'http://localhost:5000';
const socket = io(SERVER_DOMAIN);

function App() {

  var [name, setName] = useState(null)

  function handleSubmit(e) {
    e.preventDefault();
    socket.emit('join', {
      name: name,
      age: '23'
    }, function (data) {
      console.log(data)
    })
  }


  return (
    <div className="App">
      Hello Client
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" onChange={(e) => setName(e.target.value)} />
        <button type="submit">Join the chat</button>
      </form>
    </div>
  );
}

export default App;
