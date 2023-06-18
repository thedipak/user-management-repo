import './App.css';
import Form from "./components/Form.jsx";
import UserTable from "./components/UserTable.jsx";

function App() {

  return (
    <div className="container">

      <h1> User Directory</h1>

      <Form />
    
      <UserTable/>

    </div>
  );
}

export default App;




