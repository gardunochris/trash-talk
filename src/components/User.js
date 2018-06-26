import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import '../styles/User.css';


class User extends Component {
   constructor(props) {
     super(props);

     this.state = {
        username: "",
        loggedin: false
     };

    }

    componentDidMount() {
        this.props.firebase.auth().onAuthStateChanged( user => {
           this.props.setUser(user);

        });
    }

	signIn = () => {
		const provider = new this.props.firebase.auth.GoogleAuthProvider()
		this.props.firebase.auth().signInWithPopup( provider )
		 .then( (result) => {
		 	this.props.setUser(result.user);
		 	this.setState({loggedin : true});
		 });
	}

	signOut = () => {
		this.props.firebase.auth().signOut()
		  .then( () => {
		  	this.props.setUser(null);
			this.setState({loggedout : false});
		  	});
	}


    getUsername = () => {
    	let activeUsername = this.props.activeUser;
    	if (activeUsername !== "") {
    		this.setState({username : activeUsername});
    	}
    	else {
    		this.setState({username : "Guest"});
    	}
    }



  render() {
 		return(
 			<div className="userInfo">
 			    <span className="username">{this.props.activeUser ? this.props.activeUser : "Welcome, Guest"}</span>
 			    { !this.props.activeUser ? <Button onClick={this.signIn} className="signinButton" bsStyle="primary">Sign in To Talk Trash</Button> :
 			    <Button onClick={this.signOut} className="signoutButton" bsStyle="link">Sign out</Button> }

 			</div>
 		);

 	}
 };


 export default User;
