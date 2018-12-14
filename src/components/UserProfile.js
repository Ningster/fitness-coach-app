import React, {Component} from 'react';
import {View, StatusBar, TouchableOpacity, Animated, Dimensions, Easing} from 'react-native';
import styled from 'styled-components/native';
import Svg,{
    Circle,
    Ellipse,
    G,
    Text,
    TSpan,
    TextPath,
    Path,
    Polygon,
    Polyline,
    Line,
    Rect,
    Use,
    Image,
    Symbol,
    Defs,
    LinearGradient,
    RadialGradient,
    Stop,
    ClipPath,
    Pattern,
    Mask,
} from 'react-native-svg';
import HeartBeatView from './HeartBeatView';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const StyledViewItemContainer = styled.View`
    background-color: #37a59d;
    margin: 2%;
    border-radius: 5px;
    padding: 0 20px 0 20px;
`;

const StyledViewItem = styled(StyledViewItemContainer)`
    height: 200px;
    justify-content: space-around;
`;

const StyledViewItemHeader = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

const StyledViewItemValue = styled.View`
    flex-direction: row;
    align-items: center;
`;

const StyledText = styled.Text`
    font-family: AvenirNextCondensed-Medium;
`;

const StyledTextPrimary = styled(StyledText)`
    color: #ffffff;
`;

const StyledTextSecondary = styled(StyledText)`
    color: #eeeeee;
`;

const StyledTextTitle = styled(StyledTextPrimary)`
    font-size: 25;
`;

const StyledTextValue = styled(StyledTextPrimary)`
    font-size: 40;
    margin-right: 20;
`;

const StyledTextDescription = styled(StyledTextSecondary)`
    font-size: 15;
`;

function Triangle({ vertices, color, delay }){
    const pathData = [
        'M', vertices[0][0], vertices[0][1],
        'L', vertices[1][0], vertices[1][1],
        'L', vertices[2][0], vertices[2][1],
        'Z',
    ].join(' ');

    // CSS animation doesn't work in React Native
    // const styles = {
    //     animation: "bounce 1.2s ease both infinite",
    //     transformOrigin: '50% 100%',
    //     animationDelay: `${ delay }ms`,
    // }

    return (
        <Path style={ styles } d={ pathData } fill="white" strokeWidth="8" stroke={ color }/>
    );
}

class UserProfile extends Component {
    
    // Configure the navigator header of the screen.
    static navigationOptions = {
        title: '數字面板',
        // headerStyle: {
        //     backgroundColor: '#36454f',
        // },
        // headerTintColor: '#fff',
        // headerTitleStyle: {
        //     fontWeight: 'bold',
        // },
    };

    constructor(props){
        super(props);
        this.navigation = props.navigation;
        this.width = Dimensions.get('window').width;
    }

    render() {
        // const {navigate} = this.props.navigation;
        return (
            <View>
                <StatusBar
                    barStyle="default"
                />
                <StyledViewItem>
                    <StyledViewItemHeader>
                        <StyledTextTitle>行走</StyledTextTitle>
                        <TouchableOpacity onPress={()=>this.navigation.navigate('StepAnalysis')}>
                            <StyledTextDescription>運動歷史   > </StyledTextDescription>
                        </TouchableOpacity>
                    </StyledViewItemHeader>
                    <StyledViewItemValue>
                        <StyledTextValue>---</StyledTextValue>
                        <StyledTextDescription>步</StyledTextDescription>
                    </StyledViewItemValue>
                </StyledViewItem>
                
                <View style={{height: 200, alignItems:'center', justifyContent:'center'}}>
                    <HeartBeatView defaultScale={1} zoomScale={1.15}>
                        {/* <Svg height={60} width={60}>
                            <Triangle vertices={[[0,60], [30,0], [60,60]]} color="#FF3049" delay={ 220 } />
                        </Svg> */}
                        <Icon name="heart-outline" size={60} color="#f95995" />
                    </HeartBeatView>
                </View>
            </View>    
        );
    }
}

export default UserProfile;