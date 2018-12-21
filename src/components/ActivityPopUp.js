import React, {Component} from 'react';
import {Modal, Text, ART, Dimensions, Alert, NativeModules} from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as d3 from "d3";
import {observer} from 'mobx-react';
import timerService from '../services/TimerService';
import {TIMER_STATE} from '../constants/timer';
import {PEDOMETER_STATE} from "../constants/pedometer";
import {TRIGGER} from '../constants/script';
import motionService from '../services/MotionService';

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

@observer
export default class ActivityPopUp extends Component {

    constructor(props){
        super(props);
        this.activityInfo = props.activityInfo;
        this.supervisorScript = this.activityInfo.script.slice(0);
        this.ttsSupervisor = (() => {
            switch(this.activityInfo.trigger){
                case TRIGGER.TIME:
                    return this.timeSupervisor;
                default:
                    throw `Invalid trigger: ${this.activityInfo.trigger}. Only 'time'|'heartRate'|'gps'|'pace' are allowed.`;
            }
        })();
        this.closePopUp = props.closePopUp;
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
        };
        this.TextToSpeechManager = NativeModules.TextToSpeechManager;
    }

    
    onPause = () => {
        this.setState({isPaused: true});
        timerService.setTimerState(TIMER_STATE.PAUSE);
        this.TextToSpeechManager.pauseSpeakingWord();
        motionService.setPedometerState(PEDOMETER_STATE.PAUSE);
    }

    onResume = () => {
        this.setState({isPaused: false});
        timerService.setTimerState(TIMER_STATE.RESUME);
        this.TextToSpeechManager.continueSpeaking();
        motionService.setPedometerState(PEDOMETER_STATE.RESUME);
    }

    onStop = () => {
        this.closePopUp();
        timerService.setTimerState(TIMER_STATE.FINISH);
        this.TextToSpeechManager.stopSpeakingImmediate();
        motionService.setPedometerState(PEDOMETER_STATE.FINISH);
    }

    createFirstTickPath(centroidX, centroidY) {
        // 210度扇型圓
        var lineData = [ 
            { "x": centroidX,   "y": centroidY},  
            { "x": centroidX - (centroidX/(Math.sqrt(6)+Math.sqrt(2)))*(Math.sqrt(3)+2) + 3,  "y": centroidY + (centroidX/(Math.sqrt(6)+Math.sqrt(2)))},
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
          outerRadius: this.centroidX-this.tickLength - 3,
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
        // start: 0.92*PI ; end: 2.08*PI
        path.arc(0,0,this.centroidX - this.tickLength/2 - 3, 0.92 * Math.PI, (0.92+(2.08-0.92)*progress)*Math.PI, false)
        return (
            <ART.Shape 
                d={path.toString()} 
                stroke="#82C3B8"
                strokeWidth={this.tickLength + 3}
                transform={new ART.Transform().translate(this.centroidX, this.centroidY)}
            />
        )
    }

    timeSupervisor(){
        if(this.supervisorScript.length > 0){
            let script = this.supervisorScript[0];
            if(timerService.timePassed >= script.baseline){
                console.log(`timeSupervisor says: ${script.text}`);
                this.TextToSpeechManager.speak(script.text);
                this.supervisorScript.shift();
            }
        }
    }

    componentDidMount(){
        timerService.setTimer(this.activityInfo.timeLength);
        timerService.setTimerState(TIMER_STATE.START);
        motionService.setPedometerState(PEDOMETER_STATE.START);
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
                {motionService.authStatus == 0}
                {timerService.timeIsUp ? (
                    Alert.alert(
                        'Good Job! 課程已結束',
                        null,
                        [
                            {text: 'OK', onPress: this.onStop},
                        ],
                        { cancelable: false }
                    )
                ):(null)}
                
                {/* 不應該放在這裡，應該寫在timer observable被改變之後，因爲他只有講話，並沒有改變畫面 */}
                {/* Mobx應該有reaction可以用 */}
                {this.ttsSupervisor()}
                <StyledViewContainer>
                    <StyledViewTopBar>
                        <Text style={{color: '#ffffff'}}>跑步中</Text>
                    </StyledViewTopBar>
                    <StyledViewMainItemContainer>
                        <ART.Surface width={this.surfaceWidth} height={this.surfaceHeight}>
                            {this.drawTick(210, 42)}
                            {this.drawProgress(timerService.progress)}
                        </ART.Surface>
                        <StyledViewMainValue radius={this.centroidX}>
                            <StyledTextMainItem screenWidth={this.screenDimensions.width}>
                                {timerService.timePassedStr}

                            </StyledTextMainItem>
                        </StyledViewMainValue>
                    </StyledViewMainItemContainer>
                    <StyledViewSubItemContainer>
                        <StyledViewSubItem>
                            <Icon name="speedometer" size={30} color="#a3a1af" />
                            <StyledTextSubItemValue>--'--''</StyledTextSubItemValue>
                            <StyledTextSubItemName>配速</StyledTextSubItemName>
                        </StyledViewSubItem>
                        <StyledViewSubItem>
                            <Icon name="walk" size={30} color="#a3a1af" />
                            <StyledTextSubItemValue>{motionService.serviceStepCount}</StyledTextSubItemValue>
                            <StyledTextSubItemName>步數</StyledTextSubItemName>
                        </StyledViewSubItem>
                        <StyledViewSubItem>
                            <Icon name="fire" size={30} color="#a3a1af" />
                            <StyledTextSubItemValue>--</StyledTextSubItemValue>
                            <StyledTextSubItemName>千卡</StyledTextSubItemName>
                        </StyledViewSubItem>
                    </StyledViewSubItemContainer>
                    <StyledViewControlPanel>
                        {this.state.isPaused == true ? (
                            <StyledViewControlPanelInactive>
                                <StyledBtnPlay
                                    onPress={this.onResume}
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