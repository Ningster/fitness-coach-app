import React, {Component} from 'react';
import {View, Text} from 'react-native';
import styled from 'styled-components/native';
import { BarChart, Grid } from 'react-native-svg-charts'

class StepAnalysis extends Component{
    render(){
        const fill = 'rgb(134, 65, 244)'
        const data   = [ 50, 10, 40, 95, -4, -24, null, 85, undefined, 0, 35, 53, -53, 24, 50, -20, -80 ]

        return (
            <View>
                <BarChart
                    style={{ height: 200 }}
                    data={ data }
                    svg={{ fill }}
                    contentInset={{ top: 30, bottom: 30 }}
                >
                    <Grid/>
                </BarChart>
            </View>
        );
    }
}

export default StepAnalysis;