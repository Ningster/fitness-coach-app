import React, { Component } from 'react';
import { Animated } from 'react-native';

class HeartBeatView extends Component {

    constructor(props){
        super(props);
        this.defaultScale = props.defaultScale || 1;
        this.zoomScale = props.zoomScale || 1.15;
        this.state = {
            scale: new Animated.Value(this.defaultScale), // So you can use setValue() later
        }
    }
    
    runAnimation(){
        this.state.scale.setValue(this.defaultScale);
        Animated.sequence(
            [
                Animated.timing(
                    this.state.scale,
                    {
                        toValue: this.zoomScale,
                        duration: 100,
                    }
                ),
                Animated.timing(
                    this.state.scale,
                    {
                        delay:200,
                        toValue: this.defaultScale,
                        duration: 600,
                    }
                )
            ]
        ).start(() => this.runAnimation());
    }

    componentDidMount(){
        this.runAnimation();
    }

    render(){
        return(
            <Animated.View 
                style={{
                    // borderWidth:5,
                    transform: [
                        {scale: this.state.scale},
                        {perspective: 1000}, // without this line this Animation will not render on Android while working fine on iOS
                      ],
                }}
            >
                {this.props.children}
            </Animated.View>
        );
    }
}

export default HeartBeatView;