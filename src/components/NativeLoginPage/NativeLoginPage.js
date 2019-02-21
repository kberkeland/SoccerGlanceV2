import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, ScrollView, TextInput, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import NativeLoginForm from './NativeLoginForm.js';


class NativeLoginPage extends Component {

    static navigationOptions = { title: 'Please sign in or register' };

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <View style={styles.loginContainer}>
                    <Text>This is a login page</Text>
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
        backgroundColor: '#2c3e50',
    },
    loginContainer:{
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
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
}
});