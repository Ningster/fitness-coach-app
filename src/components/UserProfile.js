import React, {Component} from 'react';
import {View, Text, StatusBar, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';

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

class UserProfile extends Component {
    
    // Configure the navigator header of the screen.
    static navigationOptions = {
        title: '我',
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
            </View>
        );
    }
}

export default UserProfile;