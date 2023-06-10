import './App.css';
import axios from "axios";
import { useState, useEffect } from "react";

function App() {

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [response, setResponse] = useState("");


  function handleSubmit(e) {
    e.preventDefault();
    const obj = {
      name,
      phone,
      email
    }
    console.log(obj);

    axios.get("http://localhost:5000/getUser")
    .then(res => {
      console.log("inside then", res);
      setResponse(res.data.message.email);
      setName("");
      setPhone("");
      setEmail("");
    })
    .catch(err => console.log(err));
  }
  return (
    <div className="container">
      <h1> User's Directory </h1>
      <input type="text" value={name} placeholder="name" onChange={e => setName(e.target.value)} />
      <input type="number" value={phone} placeholder="phone" onChange={e => setPhone(e.target.value)} />
      <input type="email" value={email} placeholder="email" onChange={e => setEmail(e.target.value)} />
      <button onClick={handleSubmit}> Submit </button>
      { response? <h2> {response} </h2> : null}
    </div>
  );
}

export default App;
