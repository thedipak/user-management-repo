import './App.css';
import axios from "axios";
import { useState, useEffect } from "react";

function App() {

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    getAllUsers();
  }, []);

  // git remote set-url origin git@github.com:ppreyer/first_app.git
  // git remote set-url origin https://github.com/thedipak/user-management-repo.git

  function getAllUsers(){
    axios.get("http://localhost:5000/getUser")
      .then(res => {
        console.log("res",res)
        setAllUsers(res.data);
      } )
      .then(() => console.log("all users", allUsers))
      .catch(err => console.log(err));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      name,
      phone,
      email
    }

    axios.post("http://localhost:5000/setUser", payload)
    .then(res => {
      setName("");
      setPhone("");
      setEmail("");
    })
    .catch(err => console.log(err));

    // YOU CAN ALTERNATIVELY USE FETCH METHOD: 
    // fetch("/api/", {
    //   method: "POST",
    //   data: JSON.stringify(payload)
    // })
    //   .then(response => response.json())
    //   .then(res => {
    //     setName("");
    //     setPhone("");
    //     setEmail("");
    //   })
    //   .catch(err => console.log(err));

  }




  return (
    <div className="container">

      <h1> User's Directory 3 </h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} required placeholder="name*" onChange={e => setName(e.target.value)} />
        <input type="number" value={phone} required placeholder="phone*" onChange={e => setPhone(e.target.value)} />
        <input type="email" value={email} placeholder="email" onChange={e => setEmail(e.target.value)} />
        <button type='submit'> Submit </button>
      </form>

      <h1> All Registered Users</h1>

      { allUsers.length ? allUsers.map((user) =>{
        console.log(user);
        return(
          <div>
            <h3>{user.name}</h3>
          </div>
          )
      }) : null}


    </div>
  );
}

export default App;




