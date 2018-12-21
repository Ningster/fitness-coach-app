import React, {Component} from 'react';
import {View, StatusBar, TouchableOpacity, Animated, Dimensions, Easing, TouchableHighlight} from 'react-native';
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
import HeartBeatAnim from './HeartBeatAnim';
import ProgressRing from './ProgressRing';
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

const StyledViewMainContainer = styled.View`
    height: 350;
    align-items: center;
    justify-content: center;
    border-bottom-width: 1px;
    border-bottom-color: #d7d7db;
`;

const StyledViewSubContainer = styled.View`
    flex-direction: row;
    height: 200;
`;

const StyledViewSubItem = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    border-bottom-width: 1px;
    border-bottom-color: #d7d7db;
`;

const StyledViewSubItemLeft = styled(StyledViewSubItem)`
    border-right-width: 1px;
    border-right-color: #d7d7db;
`;

const StyledTextItemValue = styled(StyledText)`
    font-size: 30;
    color: #36454f;
`;

const StyledTextItemUnit = styled(StyledText)`
    font-size: 20;
    color: #a3a1af;
`;

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
                <StyledViewMainContainer>
                    <TouchableHighlight 
                        onPress={() => this.navigation.navigate('StepAnalysis')}
                        underlayColor={"#ebeaf0"}
                    >
                        <React.Fragment>
                            <ProgressRing 
                                radius={80} 
                                ringWidth={5} 
                                progressWidth={10} 
                                progress={0.87}
                                progressColor={"#37a59d"}
                            >
                                <Icon name="run-fast" size={70} color="#37a59d" />
                            </ProgressRing>
                            <View 
                                style={{
                                    flexDirection: 'row', 
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <StyledTextItemValue>
                                    4,521
                                </StyledTextItemValue>
                                <StyledTextItemUnit> </StyledTextItemUnit>
                                <StyledTextItemUnit>
                                    步
                                </StyledTextItemUnit>
                            </View>
                        </React.Fragment>
                    </TouchableHighlight>
                </StyledViewMainContainer>
                <StyledViewSubContainer>
                    <StyledViewSubItemLeft>
                        <Icon name="speedometer" size={60} color="#46abc1" />
                        <View 
                            style={{
                                flexDirection: 'row', 
                                alignItems: 'center',
                            }}
                        >
                            <StyledTextItemValue>
                                5.02
                            </StyledTextItemValue>
                            <StyledTextItemUnit> </StyledTextItemUnit>
                            <StyledTextItemUnit>
                                分/公里
                            </StyledTextItemUnit>
                        </View>
                    </StyledViewSubItemLeft>
                    <StyledViewSubItem>
                        <HeartBeatAnim>
                            <Icon name="heart-outline" size={60} color="#f95995" />
                        </HeartBeatAnim>
                        <View 
                            style={{
                                flexDirection: 'row', 
                                alignItems: 'center',
                            }}
                        >
                            <StyledTextItemValue>
                                60
                            </StyledTextItemValue>
                            <StyledTextItemUnit> </StyledTextItemUnit>
                            <StyledTextItemUnit>
                                bpm
                            </StyledTextItemUnit>
                        </View>
                    </StyledViewSubItem>
                </StyledViewSubContainer>
            </View>    
        );
    }
}

export default UserProfile;