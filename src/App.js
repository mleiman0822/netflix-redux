import { useEffect, React } from "react";
import { useDispatch, useSelector } from "react-redux";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import ProfileScreen from "./screens/ProfileScreen";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { auth } from "./firebase";
import { logout, login, selectUser } from "./features/userSlice";
import "./App.css";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        //pass in payload to login method in redux
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
          })
        );
      } else {
        //when logout method in redux is dispatched, user is logged out
        dispatch(logout());
      }
    });
    //if component unmounts, we dont want to dupliacte the listener
    //when it cleans up, run unsubscribe function
    return unsubscribe;
  }, []);

  return (
    <div className="app">
      <Router>
        {!user ? (
          <LoginScreen />
        ) : (
          <Routes>
            <Route path="/profile" element={<ProfileScreen/>}/>
            <Route path="/" element={<HomeScreen />} />
          </Routes>
        )}
        {console.log(user)}
      </Router>
    </div>
  );
}

export default App;
