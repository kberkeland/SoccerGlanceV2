import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';

class DetailPage extends Component {
    static navigationOptions = { title: 'Details' };

    render() {
        return (
            <View style={styles.container}>
                <Text>Detail Page!</Text>
            </View>
        )
    }
}

const mapStoreToProps = reduxStore => ({
    reduxStore,
});

export default connect(mapStoreToProps)(DetailPage);

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderWidth: 1,
        backgroundColor: '#F5FCFF',
        margin: 10
    },
    card: {
        borderWidth: 3,
        borderRadius: 3,
        borderColor: '#000',
        width: 100,
        height: 100,
        margin: 5
    },
});