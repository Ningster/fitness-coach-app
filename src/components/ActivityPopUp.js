import React, {Component} from 'react';
import {Modal, Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const StyledViewContainer = styled.View`
    flex: 1;
    background-color: #36454f;
    paddingTop: 40;
`;

const StyledViewTopBar = styled.View`
    flex: 1;
    align-items: center;
`;

const StyledViewMainItemContainer = styled.View`
    flex: 6;
    align-items: center;
    justify-content: center;
`;

const StyledViewMainItem = styled.View`
    flex-direction: row;
    align-items: baseline;
`;

const StyledViewSubItemContainer = styled.View`
    flex: 4;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

const StyledViewSubItem = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

const StyledViewControlPanel = styled.View`
    flex: 4;
    justify-content: center;
`;

const StyledViewControlPanelActive = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

const StyledViewControlPanelInactive = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
`;

const StyledTextSubItemValue = styled.Text`
    color: #ffffff;
    font-size: 25;
    font-family: AvenirNextCondensed-Medium;
    margin-top: 20;
    margin-bottom: 20; 
`;

const StyledTextSubItemName = styled.Text`
    color: #a3a1af;
`;

const StyledBtnControlPanel = styled.TouchableOpacity`
    border-width: 1;
    border-color: rgba(0,0,0,0.2);
    align-items: center;
    justify-content: center;
    width: 100;
    height: 100;
    background-color: #fff;
    border-radius: 100;
`

const StyledBtnPause = styled(StyledBtnControlPanel)`
    background-color: #fff;
`

const StyledBtnPlay = styled(StyledBtnControlPanel)`
    background-color: #2db4aa;
`

const StyledBtnStop = styled(StyledBtnControlPanel)`
    background-color: #f95995;
`

export default class ActivityPopUp extends Component {

    constructor(props){
        super(props);
        this.closePopUp = this.props.closePopUp;
        this.state = {
            isPaused: false,
        };

    }


    onPause = () => {
        this.setState({isPaused: true});
    }

    onPlay = () => {
        this.setState({isPaused: false});
    }

    onStop = () => {
        this.closePopUp();
    }

    render(){
        return (
            <Modal
                animationType="slide"
                transparent={this.state.isVisible}
                visible={true}
                onRequestClose={() => {
                Alert.alert('Modal has been closed.');
            }}>
                <StyledViewContainer>
                    <StyledViewTopBar>
                        <Text style={{color: '#ffffff'}}>跑步中</Text>
                    </StyledViewTopBar>
                    <StyledViewMainItemContainer>
                        <StyledViewMainItem>
                            <Text style={{fontSize: 90, color: '#ffffff', fontFamily: 'AvenirNextCondensed-Medium'}}>33</Text>
                            <Text style={{color: '#ffffff'}}>  步</Text>
                        </StyledViewMainItem>
                    </StyledViewMainItemContainer>
                    <StyledViewSubItemContainer>
                        <StyledViewSubItem>
                            <Icon name="speedometer" size={30} color="#a3a1af" />
                            <StyledTextSubItemValue>15'21''</StyledTextSubItemValue>
                            <StyledTextSubItemName>配速</StyledTextSubItemName>
                        </StyledViewSubItem>
                        <StyledViewSubItem>
                            <Icon name="timer" size={30} color="#a3a1af" />
                            <StyledTextSubItemValue>00:01:07</StyledTextSubItemValue>
                            <StyledTextSubItemName>用時</StyledTextSubItemName>
                        </StyledViewSubItem>
                        <StyledViewSubItem>
                            <Icon name="fire" size={30} color="#a3a1af" />
                            <StyledTextSubItemValue>4</StyledTextSubItemValue>
                            <StyledTextSubItemName>千卡</StyledTextSubItemName>
                        </StyledViewSubItem>
                    </StyledViewSubItemContainer>
                    <StyledViewControlPanel>
                        {this.state.isPaused == true ? (
                            <StyledViewControlPanelInactive>
                                <StyledBtnPlay
                                    onPress={this.onPlay}
                                >
                                    <Icon name={"play"}  size={30} color="#fff" />
                                    <Text style={{color:"#fff"}}>繼續</Text>
                                </StyledBtnPlay>
                                <StyledBtnStop
                                    onPress={this.onStop}
                                >
                                    <Icon name={"stop"}  size={30} color="#fff" />
                                    <Text style={{color:"#fff"}}>結束</Text>
                                </StyledBtnStop>
                            </StyledViewControlPanelInactive>
                        ):(
                            <StyledViewControlPanelActive>
                                <StyledBtnPause
                                    onPress={this.onPause}
                                >
                                    <Icon name={"pause"}  size={30} color="#36454f" />
                                    <Text>暫停</Text>
                                </StyledBtnPause>
                            </StyledViewControlPanelActive>
                        )}
                    </StyledViewControlPanel>
                </StyledViewContainer>
            </Modal>
        )
    }
}