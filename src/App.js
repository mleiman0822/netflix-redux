import {useEffect, React} from "react";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { auth } from "./firebase";
import "./App.css";

function App() {
  const user = null;

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      if(userAuth){
        //loggin in 
        console.log(userAuth)
      }else{
        //logged out
      }
    });
    //if component unmounts, we dont want to dupliacte the listener
    //when it cleans up, run unsubscribe function
    return unsubscribe;
  }, [])
  

  return (
    <div className="app">
      <Router>
        {!user ?(
          <LoginScreen/>
        ) : (
          <Routes>
          <Route path="/" element={<HomeScreen />}/>
        </Routes>
        )}

      </Router>
    </div>
  );
}

export default App;
