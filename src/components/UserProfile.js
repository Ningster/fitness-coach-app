import React, {Component} from 'react';
import {View, Text} from 'react-native';

class UserProfile extends Component {
    static navigationOptions = {
        title: '我',
      };
      render() {
        const {navigate} = this.props.navigation;
        return (
            <View>
                <Text>User Profile</Text>
            </View>
        );
      }
}

export default UserProfile;