import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';

import { Header, Button, Card, CardSection, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {

    state = { loggedIn: null };

    componentWillMount() {
        firebase.initializeApp({
            apiKey: 'AIzaSyC8lfNCea4bjzPPd2T6OI2NElIqgvksbNY',
            authDomain: 'geniusclub-d42ea.firebaseapp.com',
            databaseURL: 'https://geniusclub-d42ea.firebaseio.com',
            projectId: 'geniusclub-d42ea',
            storageBucket: 'geniusclub-d42ea.appspot.com',
            messagingSenderId: '817859667998'
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
                    <View style={{
                        flexDirection: 'row',
                        }}
                    >
                        <Button onPress={() => firebase.auth().signOut()}>
                            Log Out
                        </Button>
                    </View>
                );
            case false:
                return <LoginForm />;
            default:
                return <Spinner size="large" />;
        }

    }

    render() {
        return (
            <View>
                <Header headerText='Authentication' />
                {this.renderContent()}
            </View>
        );
    }
}

export default App;

