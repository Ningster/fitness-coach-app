import React, { Component } from 'react';
import { Animated, ART, Easing, View } from 'react-native';
import Svg,{
    Circle,
    Path,
} from 'react-native-svg';
import * as d3 from "d3";

class Progress extends Component {

    render(){
        const { progress, createCirclePath, ...props } = this.props;
        const d = createCirclePath(progress);
        return (
            <ART.Shape
                d={d} 
                {...props}
            />
        );
    }

}

const AnimatedProgress = Animated.createAnimatedComponent(Progress);

class ProgressRingView extends Component {

    constructor(props){
        super(props);
        this.radius = props.radius || 50;
        this.ringWidth = props.ringWidth || 5;
        this.progressWidth = props.progressWidth || 10;
        this.progress = props.progress || 0.87;
        this.progressColor = props.progressColor || "#37a59d";
        this.ringColor = props.ringColor || "#a3a1af";
        this.surfaceLength = this.ringWidth > this.progressWidth ? this.radius + this.ringWidth:this.radius + this.progressWidth;
        this.state = {
            progress: new Animated.Value(0.1), // So you can use setValue() later
        }
    }
    
    runAnimation(){
        Animated.timing(
            this.state.progress,
            {
                toValue: this.progress,
            }
        ).start();
    }

    componentDidMount(){
        this.runAnimation();
    }

    createCirclePath = (progress) => {
        const path = d3.path();
        // path.arc(x, y, radius, startAngle, endAngle[, anticlockwise])
        path.arc(0,0,this.radius, 1.5 * Math.PI, (1.5+2*progress)*Math.PI, false)
        return path.toString();
    }

    render(){
        return(
            <View 
                style={{
                    // borderWidth:5,
                }}
            >
                <ART.Surface width={this.surfaceLength*2} height={this.surfaceLength*2}>
                    <ART.Shape 
                        d={this.createCirclePath(1)} 
                        stroke={this.ringColor}
                        strokeWidth={this.ringWidth}
                        transform={new ART.Transform().translate(this.surfaceLength, this.surfaceLength)}
                    />
                    <AnimatedProgress 
                        progress={this.state.progress}
                        createCirclePath={this.createCirclePath}
                        stroke={this.progressColor}
                        strokeWidth={this.progressWidth}
                        transform={new ART.Transform().translate(this.surfaceLength, this.surfaceLength)}
                    />
                </ART.Surface>
                
            </View>
        );
    }
}

export default ProgressRingView;