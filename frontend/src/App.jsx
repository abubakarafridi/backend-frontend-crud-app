import { useEffect, useState } from "react";
import axios from 'axios'

const API_URL = "http://localhost:3000/api/users";

function App() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState('');
  const [updateUser, setUpdateUser] = useState({ id: '', name: ''})

  const fetchUsers = async () => {
    const response = await axios.get(API_URL);
    const content = response.data;

    setUsers(content.data);
  }

  useEffect(()=> {
    fetchUsers();
  }, [])

  const addUser = () => {
    axios.post(API_URL, {name: newUser})
    .then(response => {
      setUsers([...users, response.data]);
      setNewUser('');
      fetchUsers();
    })
    .catch(err => console.log(err))
  }

  const updateUserById = (id) => {
    axios.put(`${API_URL}/${id}`, {name : updateUser.name})
    .then (response => {
      setUsers(users.map(user => (user.id === id ? response.data : user)));
      setUpdateUser({ id : '', name: ''});
      fetchUsers()
    })
    .catch(err => console.error(err))
  }
  
  const deleteUserById = (id) => {
    axios.delete(`${API_URL}/${id}`)
    .then (() => {setUsers(users.filter(user => user.id !== id))})
    .catch(err => console.err(err))
  }

  return (
    <>
    <h1>CRUD Operation with Express and React</h1>

    <input type="text" value={newUser} onChange={(e) => setNewUser(e.target.value)} placeholder="Enter new user"/>
    <button onClick={addUser}>Add User</button>

    {updateUser.id &&
    <div>
      <input type="text" value={updateUser.name} onChange={(e) => setUpdateUser({...updateUser, name: e.target.value})} placeholder="Update user name"/>
      <button onClick={() => updateUserById(updateUser.id)}>Update User</button>
    </div>
    }

    <ul>
      {users.map(user => (
        <li key={user.id}>
          {user.name}
          <button onClick={() => setUpdateUser({id: user.id, name: user.name})}>Edit</button>
          <button onClick={() => deleteUserById(user.id)}>Delete</button>
        </li>
      ))
      }
    </ul>
    </>
  )
}

export default App
