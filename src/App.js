import React, { useImperativeHandle, useState } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Form from "./components/Form.jsx";
import Nav from "./components/Navbar/Nav.jsx";
import Register from "./components/Register/Register.jsx";
import Login from "./components/Login/Login.jsx";
import "./main.css";
import PostCard from "./components/Post/PostCard.jsx";
import Redirect from "./components/Error/Error.jsx";

function App() {
  const [comments, setComments] = useState([]);
  const [approvedComments, setApprovedComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [LoggedIn, setLoggedIn] = useState(false);
  const [display, setDisplay] = useState(false);
  return (
    <BrowserRouter>
      <Nav LoggedIn={LoggedIn} setLoggedIn={setLoggedIn} />
      <div className="App">
        <Routes>
          <Route
            path="/register"
            element={<Register LoggedIn={LoggedIn} setLoggedIn={setLoggedIn} />}
          />
          <Route
            path="/login"
            element={<Login LoggedIn={LoggedIn} setLoggedIn={setLoggedIn} />}
          />
          <Route
            path="/comments"
            element={
              <Form
                comments={comments}
                setComments={setComments}
                display={display}
                setDisplay={setDisplay}
                approvedComments={approvedComments}
                setApprovedComments={setApprovedComments}
              />
            }
          />
          <Route
            path="/"
            element={
              <PostCard
                display={display}
                setDisplay={setDisplay}
                posts={posts}
                setPosts={setPosts}
              />
            }
          />
          <Route
            path="*" element={<Redirect /> }
            />
         
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
