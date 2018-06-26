import React, { Component } from 'react';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';
import './App.css';
import * as firebase from 'firebase';
import {Grid, Col, Row} from 'react-bootstrap';


var config = {
    apiKey: "AIzaSyAEuTQ1cH2p_vmRxAJR0eMWdX8vUXGHH1g",
    authDomain: "trash-talk-3e51e.firebaseapp.com",
    databaseURL: "https://trash-talk-3e51e.firebaseio.com",
    projectId: "trash-talk-3e51e",
    storageBucket: "trash-talk-3e51e.appspot.com",
    messagingSenderId: "759946315155"
  };
  firebase.initializeApp(config);

  class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      activeRoom: "",
      activeRoomName: "",
      activeUser: ""
    }
  }

  setActiveRoom(r) {
    this.setState({ activeRoom : r.key });
    this.setState({ activeRoomName: r.name });
  }

  setUser(user) {
    if (user !== null) {
      console.log("setUser"+user.displayName);
      this.setState({ activeUser: user.displayName});
    }
    else {
      this.setState({ activeUser: null});
    }
  }

  render() {
    return (
      <Grid className="App" fluid>

          <Row>
            <User
                firebase = {firebase}
                setUser = {(user) => this.setUser(user)}
                activeUser = {this.state.activeUser}
            />
          </Row>
          <Row className="content">
            <Col sm={3} className="rooms">
              <h1>#TrashTalk</h1>
              <h4>Defend Your Team</h4>
            <RoomList
                firebase = {firebase}
                activeRoom = {this.state.activeRoom}
                activeRoomName = {this.state.activeRoomName}
                setActiveRoom = {(r) => this.setActiveRoom(r)}
            />
            </Col>
            <Col sm={9} className="messages">
            <MessageList
                firebase = {firebase}
                activeRoom = {this.state.activeRoom}
                activeRoomName = {this.state.activeRoomName}
                activeUser = {this.state.activeUser}
            />
            </Col>
            <footer className="container-fluid">
  <p>©2018 TrashTalk LLC.</p>
</footer>

          </Row>
      </Grid>
    );
  }
}

export default App;
