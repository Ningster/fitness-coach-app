/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, View, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import ActivityPopUp from './src/components/ActivityPopUp';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const StyledViewContainer = styled.View`
    flex: 1;
    display: flex;
    justifyContent: center;
    alignItems: center;
`;

const StyledViewContent = styled.View`
    flex: 1;
    display: flex;
    justifyContent: center;
    alignItems: center;
`;

const StyledTouchableOpacity = styled.TouchableOpacity`
    width: 100%;
    justifyContent: center;
    alignItems: center;
    backgroundColor: #37a59d;
    padding: 20px;
`;

const StyledTextWelcome = styled.Text`
    font-size: 20;
    margin: 10px;
    text-align: center;
`;

const StyledTextInstruction = styled.Text`
    color: #333333;
    text-align: center;
`;

const StyledText = styled.Text`
    color: #fff;
    font-weight: bold;
`;


type Props = {};
export default class App extends Component<Props> {

  state = {
    showActivityPopUp: false,
  }

  onClick = () => {
    this.setState({showActivityPopUp: true});
  }

  closePopUp = () => {
    this.setState({showActivityPopUp: false});
  }

  render() {
    return (
      <StyledViewContainer>

        <StyledViewContent>
          <StyledTextWelcome>Welcome to React Native!</StyledTextWelcome>
          <StyledTextInstruction>To get started, edit App.js</StyledTextInstruction>
          <StyledTextInstruction>{instructions}</StyledTextInstruction>
        </StyledViewContent>
        <StyledTouchableOpacity onPress={this.onClick}>
          <View>
            <StyledText>開始燃脂跑。HIIT強化   GO!</StyledText>
          </View>
        </StyledTouchableOpacity>
        {this.state.showActivityPopUp ? <ActivityPopUp closePopUp={this.closePopUp} courseTimeLength={180}/> : null}
      </StyledViewContainer>
    );
  }
}
