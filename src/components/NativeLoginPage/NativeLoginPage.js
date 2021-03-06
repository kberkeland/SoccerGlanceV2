import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, ScrollView, TextInput, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import NativeLoginForm from './NativeLoginForm.js';

class NativeLoginPage extends Component {

    static navigationOptions = { title: 'Soccer Glance' };

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <View style={styles.loginContainer}>
                    <Text style={styles.heading}>Please log in or register</Text>
                </View>
                <View style={styles.formContainer}>
                    <NativeLoginForm navigation={this.props.navigation} />
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const mapStoreToProps = reduxStore => ({
    reduxStore,
});

export default connect(mapStoreToProps)(NativeLoginPage);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#F5FCFF'
        backgroundColor: '#2c3e50',
    },
    loginContainer:{
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center',
        color: 'black',
    },
    logo: {
        position: 'absolute',
        width: 300,
        height: 100
    },
    title:{
        color: "#FFF",
        marginTop: 120,
        width: 180,
        textAlign: 'center',
        opacity: 0.9
    },
    heading: {
        textAlign: 'center',
        fontSize: 50
    },
});