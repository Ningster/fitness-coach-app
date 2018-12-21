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
                    && Alert.alert('存取狀態不明確')} 
                {motionService.authStatus === AUTH_STATUS.DENIED 
                    && Alert.alert('存取拒絕, 請您至「設定->隱私權->運動與健身」允許APP存取')} 
                {motionService.authStatus === AUTH_STATUS.RESTRICTED 
                    && Alert.alert('有限制的存取, 請您至「設定->隱私權->運動與健身」允許APP存取')} 
                {motionService.authStatus === AUTH_STATUS.AUTHORIZED 
                    && (this.props.children)} 
            </View>
        );
    }
}
