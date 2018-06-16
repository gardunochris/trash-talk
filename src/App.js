import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList.js';

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
  render() {
    return (
      <div className="App">
        <main>
          <RoomList firebase={firebase}/>
        </main>
      </div>
    );
  }
}

export default App;
