import React, {Component} from 'react';
import {View, Text, StatusBar, Dimensions} from 'react-native';
import styled from 'styled-components/native';
import { BarChart, Grid, YAxis, XAxis } from 'react-native-svg-charts'

const StyledViewContainer = styled.View`
    flex: 1;
`;

const StyledViewChartContainer = styled.View`
    flex: 0.4;
    background-color: #36454f;
    align-items: center;
    justify-content: center;
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
        // this.screenDimensions = Dimensions.get('window');
        // this.screenWidth = this.screenDimensions.width
        // this.screenHeight = this.screenDimensions.height
    }

    indexToDay = (value, index) => {
        const dayShift = 6 - this.day;
        const map = {
            0: '日',
            1: '一',
            2: '二',
            3: '三',
            4: '四',
            5: '五',
            6: '六',
        };
        const day = index-dayShift < 0 ? index+7-this.day : index-dayShift;
        return map[day];
    }

    render(){
        const fill = 'rgba(149,175,182, 0.8)'
        const data   = [ 8037, 7111, 7395, 9160, 12000, 5807, 3393 ]
        const contentInset = { top: 30, bottom: 30 }

        return (
            <StyledViewContainer>
                
                <StatusBar
                    barStyle="light-content"
                />
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
                </StyledViewChartContainer>
            </StyledViewContainer>
        );
    }
}

export default StepAnalysis;