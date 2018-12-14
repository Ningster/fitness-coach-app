import React, { Component } from 'react';
import { Animated, ART } from 'react-native';
import Svg,{
    Circle,
    Path,
} from 'react-native-svg';
import * as d3 from "d3";

class ProgressRingView extends Component {

    constructor(props){
        super(props);
        this.radius = props.radius || 50;
        this.ringWidth = props.ringWidth || 5;
        this.progressWidth = props.progressWidth || 10;
        this.progress = props.progress || 0.87;
        this.progressColor = props.progressColor || "#37a59d";
        this.surfaceLength = this.ringWidth > this.progressWidth ? this.radius + this.ringWidth:this.radius + this.progressWidth;
        // this.defaultScale = props.defaultScale || 1;
        // this.zoomScale = props.zoomScale || 1.15;
        this.state = {
            scale: new Animated.Value(0), // So you can use setValue() later
        }
    }
    
    runAnimation(){
        Animated.timing(
            // this.state.progress,
            // {
            //     toValue: this.state.progress.setValue(this.progress)
            // }
            this.state.scale,
            {
                toValue: 5,
            }
        ).start();
        
        console.log("animationstarts");
    }

    // componentDidMount(){
    //     this.runAnimation();
    // }

    generateProgressArcPath(progress){
        const path = d3.path();
        // path.arc(x, y, radius, startAngle, endAngle[, anticlockwise])
        path.arc(0,0,this.radius, 1.5 * Math.PI, (1.5+2*progress)*Math.PI, false)
        return path.toString();
    }

    render(){
        console.log(this.progress);
        return(
            <Animated.View 
                style={{
                    borderWidth:5,
                    // transform: [
                    //     {scale: this.state.scale},
                    //     {perspective: 1000}, // without this line this Animation will not render on Android while working fine on iOS
                    //   ],
                }}
            >
                <Svg 
                    height={this.surfaceLength*2} 
                    width={this.surfaceLength*2} 
                    viewBox={`0 0 ${this.surfaceLength*2} ${this.surfaceLength*2}`}
                >
                    <Circle
                        cx={this.surfaceLength}
                        cy={this.surfaceLength}
                        r={this.radius}
                        stroke="#a3a1af"
                        strokeWidth={this.ringWidth}
                        fill="none"
                    />
                    <Path
                        d={this.generateProgressArcPath(this.progress)} 
                        x={this.surfaceLength}
                        y={this.surfaceLength}
                        fill="none"
                        stroke={this.progressColor}
                        strokeWidth={this.progressWidth}
                        strokeLinecap="round"
                    />
                    {/* <ART.Shape 
                        d={this.generateProgressArcPath(this.progress)} 
                        stroke={this.progressColor}
                        strokeWidth={this.progressWidth}
                        transform={new ART.Transform().translate(this.surfaceLength, this.surfaceLength)}
                    /> */}
                </Svg>
                
            </Animated.View>
        );
    }
}

export default ProgressRingView;