import React, {Component} from 'react';
import {View, Text, StatusBar,} from 'react-native';
import styled from 'styled-components/native';
import { BarChart, Grid, YAxis, XAxis, LineChart } from 'react-native-svg-charts';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const StyledViewContainer = styled.View`
    flex: 1;
`;

const StyledViewChartContainer = styled.View`
    flex: 1;
    background-color: #36454f;
    padding: 15px 15px 15px 15px;
`;

const StyledViewChartHeader = styled.View`
    flex:1;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

const StyledViewChartBody = styled.View`
    flex:6;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

const StyledViewChartFooter = styled.View`
    flex:1;
`;

const StyledTextSubItemValue = styled.Text`
    color: #ffffff;
    font-size: 15;
    font-family: AvenirNextCondensed-Medium;
`;

class StepAnalysis extends Component{

    // Configure the navigator header of the screen.
    static navigationOptions = {
        title: '行走',
        headerStyle: {
            backgroundColor: '#36454f',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };

    constructor(props){
        super(props);
        this.day = new Date().getDay();
    }

    indexToDay = (value, index) => {
        const dayDiff = 6 - this.day;
        const map = {
            0: '日',
            1: '一',
            2: '二',
            3: '三',
            4: '四',
            5: '五',
            6: '六',
        };
        const day = index-dayDiff < 0 ? index+7-dayDiff : index-dayDiff;
        return map[day];
    }

    render(){
        const fill = 'rgba(149,175,182, 0.8)'
        const data   = [ 8037, 7111, 7395, 9160, 0, 5807, 3393 ]
        const contentInset = { top: 30, bottom: 30 }

        return (
            <StyledViewContainer>
                
                <StatusBar
                    barStyle="light-content"
                />
                <Swiper style={{}} showsButtons={false} loop={false}>
                <StyledViewChartContainer>
                        <StyledViewChartHeader>
                            <View style={{flex:1}} />
                            <XAxis
                                style={{ 
                                    flex: 8,
                                }}
                                data={ data }
                                formatLabel={this.indexToDay}
                                svg={{ fontSize: 12, fill: '#fff' }}
                                contentInset={{ left: 35, right: 35 }}
                            />
                        </StyledViewChartHeader>
                        <StyledViewChartBody>
                            <YAxis
                                style={{ 
                                    flex: 1,
                                }}
                                data={ data }
                                contentInset={ contentInset }
                                svg={{
                                    fill: '#fff',
                                    fontSize: 12,
                                }}
                                numberOfTicks={ 2 }
                                formatLabel={ (value)=>{
                                    const kValue = Math.floor(value / 1000);
                                    return `${kValue}K`
                                } }
                            />
                            <BarChart
                                style={{ 
                                    flex: 8,
                                }}
                                data={ data }
                                svg={{ fill }}
                                contentInset={ contentInset }
                                numberOfTicks={ 2 }
                                spacingInner={ 0.3 }
                                spacingOuter={ 0.5 }
                            >
                                <Grid 
                                    svg={{ 
                                        stroke:"white",
                                        strokeWidth:1,
                                    }} 
                                />
                            </BarChart>
                        </StyledViewChartBody>
                        <StyledViewChartFooter />
                    </StyledViewChartContainer>
                    <StyledViewChartContainer>
                        <StyledViewChartHeader>
                            <Icon name="walk" size={30} color="#fe746d" />
                            <StyledTextSubItemValue> 最近7天步數</StyledTextSubItemValue>
                        </StyledViewChartHeader>
                        <StyledViewChartBody>
                            <YAxis
                                style={{ 
                                    flex: 1,
                                }}
                                data={ data }
                                contentInset={ contentInset }
                                svg={{
                                    fill: '#fff',
                                    fontSize: 12,
                                }}
                                numberOfTicks={ 2 }
                                formatLabel={ (value)=>{
                                    const kValue = Math.floor(value / 1000);
                                    return `${kValue}K`
                                } }
                            />
                            <LineChart
                                style={{ flex: 8, }}
                                data={ data }
                                svg={{ stroke: fill, strokeWidth: 5 }}
                                contentInset={ contentInset }
                                numberOfTicks={ 2 }
                            >
                                <Grid 
                                    svg={{ 
                                        stroke:'white',
                                        strokeWidth:1,
                                    }} 
                                />
                            </LineChart>
                        </StyledViewChartBody>
                        <StyledViewChartFooter/>
                    </StyledViewChartContainer>

                </Swiper>
                <View style={{flex:1.2,}}>
                    {/* <Text> some words </Text> */}
                </View>
            </StyledViewContainer>
        );
    }
}

export default StepAnalysis;