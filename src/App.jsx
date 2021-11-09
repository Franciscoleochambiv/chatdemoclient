import React, {useEffect} from "react";
import { Container } from "@material-ui/core";
import {  Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import MainPage from "./pages";
import AuthPage from "./auth";
import ChatPage from "./pages/ChatPage";
import openSocket from "socket.io-client";
import { addNewUser, removeUserOffline } from "./pages/redux/usersSlice";
import { useDispatch, useSelector } from "react-redux";

export const socket = openSocket("http://adryan3.sytes.net:8006/");

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.baseURL = "http://adryan3.sytes.net:8006/";
  if (token) config.headers.authorization = `Bearer ${token}`;
  return config;
});


function App() {
  const isAuthUser = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const dispatch = useDispatch();
  const state = useSelector((state) => state.users);

console.log(state)

/*
  useEffect(() => {
    window.addEventListener("beforeunload", (e) => {
      socket.emit("on-user-disconnect", userId);
    });
  }, []);
 

  useEffect(() => {
    socket.emit("on-user-connect", userId);
    socket.on("on-user-connect", (user) => {
      dispatch(addNewUser(user))
    });
  }, []);

  /*
  useEffect(() => {
    socket.on("on-user-disconnect", (userId) => {
      console.log(state.users)
      const users = state.users.filter((user) => user._id.toString() == userId)
      dispatch(removeUserOffline(users))
    });
  }, []);
  */

  return (
    <Container>
      <ToastContainer />
      <Switch>
        {!isAuthUser ? (
          <Route path="/" component={AuthPage} />
        ) : (
          <>
            <Route exact path="/" component={MainPage} />
            <Route exact path="/chat/:id" component={ChatPage} />
            {/* <Redirect from="/:anyThingElse" to="/" /> */}
          </>
        )}
      </Switch>
    </Container>
  );
}

export default App;
