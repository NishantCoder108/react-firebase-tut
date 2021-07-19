import React, { Component } from "react";
import firebase from "firebase";
import "./App.css";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

firebase.initializeApp({
  apiKey: "AIzaSyCneZyaFcl8ldWXse2W8jq-vECBdHcHOFw",
  authDomain: "react-firebase-tutorial-ee4d7.firebaseapp.com",
  projectId: "react-firebase-tutorial-ee4d7",
  storageBucket: "react-firebase-tutorial-ee4d7.appspot.com",
  messagingSenderId: "706963343245",
  appId: "1:706963343245:web:6bbec857fba65551ce9fc4",
  measurementId: "G-G6DYYFSZLQ",
});

class App extends Component {
  state = { isSignedIn: false };

  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccess: () => false,
    },
  };

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({ isSignedIn: !!user });
      console.log("user", user);
    });
  };

  render() {
    return (
      <div className="App">
        {this.state.isSignedIn ? (
          <>
            <div className="card">
              <h3> Hi {firebase.auth().currentUser.displayName}</h3>
              <img
                alt="profile picture"
                src={firebase.auth().currentUser.photoURL}
              />
              <p>
                 Email: {firebase.auth().currentUser.email} <br />
                Phone Number : {
                  firebase.auth().currentUser.phoneNumber
                } <br /> UID : {firebase.auth().currentUser.uid}
              </p>
              <div>Signed In</div>
              <button onClick={() => firebase.auth().signOut()}>
                Sign Out
              </button>
            </div>
          </>
        ) : (
          <div className="App-header">
            <h1> SIGN IN</h1>
            <StyledFirebaseAuth
              uiConfig={this.uiConfig}
              firebaseAuth={firebase.auth()}
            />
          </div>
        )}
      </div>
    );
  }
}

export default App;
