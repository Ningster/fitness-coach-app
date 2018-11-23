import React, {Component} from 'react';
import {Modal, Text, ART, View} from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as d3 from "d3";

const StyledViewContainer = styled.View`
    flex: 1;
    background-color: #36454f;
    paddingTop: 50;
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
    position: absolute;
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

const StyledTextMainItem = styled.Text`
    font-size: 80; 
    color: #ffffff;
    font-family: AvenirNextCondensed-Medium;
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

function createFirstTick() {
    var lineData = [ { "x": 200,   "y": 220},  { "x": 15,  "y": 220},];
     var lineFunction = d3.line()
                         .x(function(d) { return d.x; })
                         .y(function(d) { return d.y; })
                         .curve(d3.curveLinear); 
     console.log(lineFunction(lineData));
    return lineFunction(lineData);
   }

export default class ActivityPopUp extends Component {

    constructor(props){
        super(props);
        this.closePopUp = this.props.closePopUp;
        this.state = {
            isPaused: false,
            dFirstTick: createFirstTick(),
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

    drawTick(){
        const circleAngle = 180;
        const numberOfTick = 43;
        const tickAngle = circleAngle/numberOfTick;
        let arcGenerator = d3.arc();
        const dCircle = arcGenerator({
          startAngle: 1.5 * Math.PI,
          endAngle: 2.5 * Math.PI,
          innerRadius: 0,
          outerRadius: 178,
        }); // "M0,-100A100,100,0,0,1,100,0L0,0Z"
        return (
            <React.Fragment>
                {
                    [...Array(numberOfTick+1).keys()].map(element => {
                       return <ART.Shape 
                            d={this.state.dFirstTick} 
                            stroke="#a3a1af" strokeWidth={1}
                            transform={new ART.Transform().rotate(element*tickAngle, 200, 220)}
                            key={element}
                        />
                    })
                }
                <ART.Shape 
                    d={dCircle} 
                    stroke="#36454f"
                    fill="#36454f"
                    transform={new ART.Transform().translate(200, 220)}
                />
            </React.Fragment>
        )
    }

    render(){
        var path = d3.path();
        path.moveTo(40,40);
        path.lineTo(99,10);
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
                        <ART.Surface width={400} height={400}>
                            {this.drawTick()}
                        </ART.Surface>
                        <StyledViewMainItem>
                            <StyledTextMainItem>00:03:21</StyledTextMainItem>
                        </StyledViewMainItem>
                    </StyledViewMainItemContainer>
                    <StyledViewSubItemContainer>
                        <StyledViewSubItem>
                            <Icon name="speedometer" size={30} color="#a3a1af" />
                            <StyledTextSubItemValue>15'21''</StyledTextSubItemValue>
                            <StyledTextSubItemName>配速</StyledTextSubItemName>
                        </StyledViewSubItem>
                        <StyledViewSubItem>
                            <Icon name="walk" size={30} color="#a3a1af" />
                            <StyledTextSubItemValue>33</StyledTextSubItemValue>
                            <StyledTextSubItemName>步數</StyledTextSubItemName>
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