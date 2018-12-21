import React, { Component } from 'react';
import { View, Alert, Text } from 'react-native';
import { observer } from 'mobx-react';
import motionService from '../services/MotionService';
import { AUTH_STATUS } from "../constants/authStatus";

@observer
export default class AuthComponentWrapper extends React.Component {
    render() {
        return (
            <View>
                {motionService.authStatus === AUTH_STATUS.NOT_DETERMINED 
                    && motionService.pedometerStopUpdates()} 
                {motionService.authStatus === AUTH_STATUS.DENIED 
                    && Alert.alert('無法存取您的運動資訊, 請您至「設定->隱私權->運動與健身」開放權限')} 
                {motionService.authStatus === AUTH_STATUS.RESTRICTED 
                    && Alert.alert('無法完整存取您的運動資訊, 請您至「設定->隱私權->運動與健身」開放權限')} 
                {/* {motionService.authStatus === AUTH_STATUS.AUTHORIZED 
                    && (motionService.pedometerStartUpdates())}  */}
                {motionService.authStatus === AUTH_STATUS.AUTHORIZED 
                    && (this.props.children)} 
            </View>
        );
    }
}
