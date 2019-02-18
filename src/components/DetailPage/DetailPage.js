import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { connect } from 'react-redux';

class DetailPage extends Component {

    // componentDidMount() {
    //     const action = {type: 'FETCH_TEAMS'};
    //     this.props.dispatch(action);
    // }

    static navigationOptions = { title: 'Details' };

    render() {

        return (
            <View style={styles.container}>
                <Text style={styles.heading}>Detail Page!</Text>
                    <View style={styles.card}>
                        <Text style={styles.cardText}>{this.props.reduxStore.detail.name}</Text>
                        <Text style={styles.cardText}>{this.props.reduxStore.detail.record}</Text>
                    </View>
                    {this.props.reduxStore.teams.map((teams, i) => (
                            <Text key={i}>{teams.id}{teams.name}</Text>
                    ))}
                    <FlatList
                        data={[
                            {key: 'One'},
                            {key: 'Two'},
                            {key: 'Three'},
                            {key: 'Four'},
                            {key: 'Five'},
                        ]}
                        renderItem={({ item }) => (
                            <Text>
                                {item.key}
                            </Text>
                        )} 
                    />
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    card: {
        borderWidth: 3,
        borderRadius: 3,
        borderColor: '#000',
        justifyContent: 'center',
        width: 100,
        height: 100,
        margin: 5
    },
    heading: {
        textAlign: 'center',
        fontSize: 20
    },
    cardText: {
        textAlign: 'center',
    },
});