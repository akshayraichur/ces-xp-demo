import React from "react";
import NavBar from "./Components/NavBar";
import { Register } from "./Screens/Register/Register";
import { Signin } from "./Screens/Signin/Signin";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Signin />
    </div>
  );
}

export default App;
