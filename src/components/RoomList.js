import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import '../styles/RoomList.css';
import Ionicon from 'react-ionicons';


class RoomList extends Component {
  constructor(props) {
    super(props);
    var currentThis = this;
    this.createRoom = this.createRoom.bind(currentThis);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      rooms: [],
      newRoomName: ''
    };
    this.roomsRef = this.props.firebase.database().ref('rooms');
    this.roomsRef.on('child_removed', snapshot  => {
      this.setState({ rooms: this.state.rooms.filter( room => room.key !== snapshot.key )  })
    });
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) })
    });
  }

  createRoom(e){
    e.preventDefault();
    if (this.state.newRoomName === ''){
      alert('Name of New Room cannot be empty');
    } else {
      this.roomsRef.push({
        name: this.state.newRoomName
      });
      e.target.reset();
      this.setState({newRoomName:""});
    }
  }

  setRoom(room, e){
    e.preventDefault();
    this.props.setActiveRoom(room);
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({newRoomName: e.target.value});
  }

  removeRoom(room, e) {
    e.preventDefault();
    this.roomsRef.child(room.key).remove();
  }

  render() {
    const roomForm = (

      <form onSubmit={this.createRoom}>

        <input
          type="text"
          placeholder='#Example'
          value={this.props.createRoom}
          onChange={this.handleChange}
        />
        <br />
        <Button className="roomcreate" type="submit" bsSize="large" bsStyle="primary">Create Room</Button>

      </form>
    )

    let room_list = this.state.rooms.map( (room, index) =>
    <a href={room.name} key={index}>
      <li key={index}>
        <h4 id="Room-Names" onClick={ (e)=> this.setRoom(room, e) } className="room-name">{ room.name }
          {' '} <button id="Delete-Button" onClick={ (e) => this.removeRoom(room, e) } className=" remove-room-button">  <Ionicon icon="md-trash" fontSize="20px" />

          </button></h4>
      </li>
    </a>
    )

    return (
      <div>
      <p>Join A Room To Start Talking Trash:</p>
        <ul className="list_of_room_names" >
          {room_list}
          <br />
          Create A New #TrashTalk Room:
          {roomForm}
        </ul>
      </div>
    );
  }
}

export default RoomList;
