import React, {Component} from 'react';
import {Modal, Text, ART, Dimensions} from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as d3 from "d3";

const StyledViewContainer = styled.View`
    flex: 1;
    background-color: #36454f;
    paddingTop: 10%;
`;

const StyledViewTopBar = styled.View`
    flex: 1;
    align-items: center;
`;

const StyledViewMainItemContainer = styled.View`
    flex: 6;
    align-items: center;
`;

const StyledViewMainValue = styled.View`
    position: absolute;
    top: ${(props) => props.radius*0.78};
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
    font-size: ${
        (props) => {
            if(props.screenWidth >= 414){
                return 70;
            }else{
                return 50;
            }
        }
    };
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

export default class ActivityPopUp extends Component {

    constructor(props){
        super(props);
        this.closePopUp = this.props.closePopUp;
        this.tickLength = 7;
        this.screenDimensions = Dimensions.get('window');
        this.scale = this.screenDimensions.scale;
        this.surfaceWidth = this.screenDimensions.width*4/5
        this.surfaceHeight = this.screenDimensions.height*6/15
        this.surfaceDiff = this.surfaceWidth > this.surfaceHeight ?  this.surfaceWidth - this.surfaceHeight : null;
        this.centroidX = (this.surfaceWidth)/2;
        this.centroidY = this.surfaceDiff ? (this.surfaceHeight)/2 + (this.surfaceDiff) : (this.surfaceHeight)/2;
        this.state = {
            isPaused: false,
            mainItemValue: 0,
            timer: null,
        };
    }

    
    onPause = () => {
        this.setState({isPaused: true});
        clearInterval(this.state.timer);
    }

    onPlay = () => {
        this.setState({isPaused: false});
        this.setTimer();
    }

    onStop = () => {
        this.closePopUp();
        clearInterval(this.state.timer);
        this.setState({mainItemValue: 0});
    }

    createFirstTickPath(centroidX, centroidY) {
        // 210度扇型圓
        var lineData = [ 
            { "x": centroidX,   "y": centroidY},  
            { "x": centroidX - (centroidX/(Math.sqrt(6)+Math.sqrt(2)))*(Math.sqrt(3)+2),  "y": centroidY + (centroidX/(Math.sqrt(6)+Math.sqrt(2)))},
        ];
        var lineFunction = d3.line()
                            .x(function(d) { return d.x; })
                            .y(function(d) { return d.y; })
                            .curve(d3.curveLinear); 
        return lineFunction(lineData);
    }
    
    drawTick(circleAngle, numberOfTick){
        const tickAngle = circleAngle/numberOfTick;
        const dFirstTick = this.createFirstTickPath(this.centroidX, this.centroidY);
        let arcGenerator = d3.arc();

        // Pie Mask to hide tick arms
        const dCircle = arcGenerator({
          startAngle: 1.5 * Math.PI,
          endAngle: 3.5 * Math.PI,
          innerRadius: 0,
          outerRadius: this.centroidX-this.tickLength,
        });
        return (
            <React.Fragment>
                {
                    [...Array(numberOfTick+1).keys()].map(element => {
                       return <ART.Shape 
                            d={dFirstTick} 
                            stroke="#a3a1af" strokeWidth={1}
                            transform={new ART.Transform().rotate(element*tickAngle, this.centroidX, this.centroidY)}
                            key={element}
                        />
                    })
                }
                <ART.Shape 
                    d={dCircle} 
                    stroke="#36454f"
                    fill="#36454f"
                    transform={new ART.Transform().translate(this.centroidX, this.centroidY)}
                />
            </React.Fragment>
        )
    }

    drawProgress(progress){
        const path = d3.path();
        path.arc(0,0,this.centroidX - this.tickLength/2, 0.92 * Math.PI, progress * Math.PI, false)
        return (
            <ART.Shape 
                d={path.toString()} 
                stroke="#82C3B8"
                strokeWidth={this.tickLength}
                transform={new ART.Transform().translate(this.centroidX, this.centroidY)}
            />
        )
    }

    secToString(sec){
        const hours = Math.floor(sec/3600);
        let remainder = sec % 3600;
        const minutes = Math.floor(remainder/60);
        const secs = remainder % 60;
        const prefix = (time)=>time > 9 ? time : '0'+time ;
        return `${prefix(hours)}:${prefix(minutes)}:${prefix(secs)}`; 
    }

    setTimer(){
        this.setState(
            {timer: setInterval(
                ()=>{
                    this.setState((state, props)=>{
                        return {mainItemValue: state.mainItemValue + 1}
                    });
                }
                , 1000)
            }
        );
    }

    componentDidMount(){
        this.setTimer();
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
                        <ART.Surface width={this.surfaceWidth} height={this.surfaceHeight}>
                            {this.drawTick(210, 42)}
                            {this.drawProgress(1.2)}
                        </ART.Surface>
                        <StyledViewMainValue radius={this.centroidX}>
                            <StyledTextMainItem screenWidth={this.screenDimensions.width}>
                                {this.secToString(this.state.mainItemValue)}
                            </StyledTextMainItem>
                        </StyledViewMainValue>
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