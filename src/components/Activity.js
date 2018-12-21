import React, {Component} from 'react';
import {View, Text, StatusBar} from 'react-native';
import styled from 'styled-components/native';
import ActivityPopUp from './ActivityPopUp';
import {runHIIT} from '../assets/activitiesInfo';
import SensorComponentWrapper from './SensorComponentWrapper';
import AuthComponentWrapper from './AuthComponentWrapper';
import motionService from '../services/MotionService';
import {observer} from 'mobx-react';

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
        title: '課程訓練',
      };

    state = {
        showActivityPopUp: false,
    }

    onClick = () => {
        motionService.authorize();          // Subscribe to authStatus and sensorAvailability
        motionService.subscribeStepCount();
        this.setState({showActivityPopUp: true});
    }

    closePopUp = () => {
        this.setState({showActivityPopUp: false});
    }

    render() {
    const {navigate} = this.props.navigation;
    return (
        <View>
            <StatusBar
                barStyle="default"
            />
            <StyledTouchableOpacity onPress={this.onClick}>
                <View>
                    <StyledText>開始燃脂跑。HIIT強化   GO!</StyledText>
                </View>
            </StyledTouchableOpacity>
            {this.state.showActivityPopUp ?
                <SensorComponentWrapper> 
                    <AuthComponentWrapper>
                        <ActivityPopUp 
                            closePopUp={this.closePopUp} 
                            activityInfo={runHIIT}
                        /> 
                    </AuthComponentWrapper>
                </SensorComponentWrapper>
                : 
                null
            }
        </View>
    );
    }
}

export default Activity;