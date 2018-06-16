import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      rooms: []
    };

    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) });
    });
  }

  render() {
    return (
      <section className="room">
    <h1>Trash Talk</h1>
    <h2>Defend Your Position To The Death Here:</h2>
    <h3>Pick A Room Below & Start Trash Talking Now!</h3>
    <div>
    {this.state.rooms.map((room, index) =>
      <li key={index}>{room.name}</li>
    )}
    </div>


      </section>
    );
  }
}

export default RoomList;
