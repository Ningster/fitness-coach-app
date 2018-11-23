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
    // console.log(this.state.dAttribute);
    // const path = ART.Path();
    // path.moveTo(1,1); //将起始点移动到(1,1) 默认(0,0)
    // path.lineTo(300,1); //连线到目标点(300,1)
    const path = new ART.Path()
    .moveTo(50,1)
    .arc(0,99,25)
    .arc(0,-99,25)
    .close();
    console.log(path);

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
        {this.state.showActivityPopUp ? <ActivityPopUp closePopUp={this.closePopUp}/> : null}
      </StyledViewContainer>
    );
  }
}
