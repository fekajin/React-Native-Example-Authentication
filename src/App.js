import React, { Component } from 'react';
import firebase from 'firebase';
import { View } from 'react-native';
import { Header, Button, Spinner, CardSection } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
    state = { loggedIn: null };

    componentWillMount() {
        firebase.initializeApp({
            apiKey: 'AIzaSyBWCUNLnf6H5jc7ljrJrmSOjIvcgJ196YE',
            authDomain: 'authentication-fb1df.firebaseapp.com',
            databaseURL: 'https://authentication-fb1df.firebaseio.com',
            projectId: 'authentication-fb1df',
            storageBucket: 'authentication-fb1df.appspot.com',
            messagingSenderId: '135155830144'
        });

        firebase.auth().onAuthStateChanged((user) => {         
              if (user) {
                  this.setState({ loggedIn: true });
              } else {
                  this.setState({ loggedIn: false });
              }
        });
    }

    renderContent() {
        switch (this.state.loggedIn) {
        case true:
            return (
            <CardSection>
                <Button onPress={() => firebase.auth().signOut()}>
                Log Out</Button>
            </CardSection>
            );
         case false:
            return <LoginForm />;
        default:
            return (
                <View>
                     <Spinner size="large" />
                </View>
            );
        }
    }


    render() {
        return (
            <View>
                <Header headerText='Yetkilendirme' />
                {this.renderContent()}
            </View>
        );
    }
}

export default App;
