import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Button ,StyleSheet ,StatusBar} from 'react-native';
import { connect } from 'react-redux';

// create a component
class NativeLoginForm extends Component {
    state = {
        username: '',
        password: '',
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content"/>
                <TextInput style = {styles.input} 
                            autoCapitalize="none" 
                            onSubmitEditing={() => this.passwordInput.focus()} 
                            autoCorrect={false} 
                            keyboardType='email-address' 
                            returnKeyType="next" 
                            placeholder='Username' 
                            onChangeText={(username) => this.setState({username})}
                            placeholderTextColor='rgba(225,225,225,0.7)'/>

                <TextInput style = {styles.input}   
                           returnKeyType="go" ref={(input)=> this.passwordInput = input} 
                           placeholder='Password' 
                           placeholderTextColor='rgba(225,225,225,0.7)'
                           onChangeText={(password) => this.setState({password})}
                           secureTextEntry/>
                <TouchableOpacity style={styles.buttonContainer} onPress={this.loginUser}>
                    <Text style={styles.buttonText}>LOGIN</Text>
                </TouchableOpacity> 
                <TouchableOpacity style={styles.registerButtonContainer} onPress={this.registerUser}>
                    <Text style={styles.buttonText}>REGISTER</Text>
                </TouchableOpacity> 
            </View>
        );
    }

    loginUser = async () => {
        if (this.state.username && this.state.password) {
            // console.log(`Username: ${this.state.username} Password: ${this.state.password}`);
            this.props.dispatch({
                type: 'LOGIN',
                payload: {
                    username: this.state.username,
                    password: this.state.password,
                },
            });
            this.checkUserStatus();
        } else {
            this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
        }
    }; // end loginUser

    registerUser = () => {
        if (this.state.username && this.state.password) {
            this.props.dispatch({
                type: 'REGISTER',
                payload: {
                    username: this.state.username,
                    password: this.state.password,
                },
            });
            this.checkUserStatus();
        } else {
            this.props.dispatch({type: 'REGISTRATION_INPUT_ERROR'});
        }
    }; // end registerUser

    checkUserStatus = () => {
        // userToken = await 
        // this.props.navigation.navigate(userToken ? 'App' : 'Auth');
        setTimeout(() => {
            // console.log(`User id: ${this.props.reduxStore.user.id}`);
            // console.log(JSON.stringify(this.props.reduxStore.user));
            // this.props.navigation.navigate('App');
            if (this.props.reduxStore.user.id) {
                this.props.navigation.navigate('App');
            } else {
                Alert.alert('Login failed', 'Please try again');
            }            
        }, 2000);
    }
}

const styles = StyleSheet.create({
    container: {
     padding: 20
    },
    input:{
        height: 40,
        backgroundColor: 'rgba(225,225,225,0.2)',
        marginBottom: 10,
        padding: 10,
        color: '#fff'
    },
    buttonContainer:{
        backgroundColor: '#2980b6',
        paddingVertical: 15
    },
    registerButtonContainer:{
        backgroundColor: '#7DD8F2',
        paddingVertical: 15
    },
    buttonText:{
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700'
    }, 
    loginButton:{
      backgroundColor:  '#2980b6',
       color: '#fff'
    }
   
});

const mapStoreToProps = reduxStore => ({
    reduxStore,
});

export default connect(mapStoreToProps)(NativeLoginForm);