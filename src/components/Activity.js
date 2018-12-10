import React, {Component} from 'react';
import {View, Text} from 'react-native';
import styled from 'styled-components/native';
import ActivityPopUp from './ActivityPopUp';
import {runHIIT} from '../assets/activitiesInfo';

const StyledTouchableOpacity = styled.TouchableOpacity`
    width: 100%;
    justifyContent: center;
    alignItems: center;
    backgroundColor: #37a59d;
    padding: 20px;
`;

const StyledText = styled.Text`
    color: #fff;
    font-weight: bold;
`;

class Activity extends Component {
    static navigationOptions = {
        title: '運動',
      };

    state = {
        showActivityPopUp: false,
    }

    onClick = () => {
        this.setState({showActivityPopUp: true});
    }

    closePopUp = () => {
        this.setState({showActivityPopUp: false});
    }

    render() {
    const {navigate} = this.props.navigation;
    return (
        <View>
            <StyledTouchableOpacity onPress={this.onClick}>
                <View>
                    <StyledText>開始燃脂跑。HIIT強化   GO!</StyledText>
                </View>
            </StyledTouchableOpacity>
            {this.state.showActivityPopUp ? 
                <ActivityPopUp 
                    closePopUp={this.closePopUp} 
                    activityInfo={runHIIT}
                /> 
                : 
                null
            }
        </View>
    );
    }
}

export default Activity;