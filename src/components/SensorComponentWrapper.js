import React, { Component } from 'react';
import { View, Alert, Text } from 'react-native';
import { observer } from 'mobx-react';
import motionService from '../services/MotionService';

@observer
export default class SensorComponentWrapper extends React.Component {

    render() {
        return (
            <View>
                {motionService.sensorStatus === null && null}
                {motionService.sensorStatus === false && Alert.alert('您的手機沒有計步器裝置，無法啟用此課程。')}
                {motionService.sensorStatus === true && (this.props.children)}
            </View>
        );
    }
}
