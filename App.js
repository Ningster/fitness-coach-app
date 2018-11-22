/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ART} from 'react-native';

// import * as scale from 'd3-scale';
// import * as shape from 'd3-shape';
// import * as d3Array from 'd3-array';
// const d3 = {
//   scale,
//   shape,
// };
import * as d3 from "d3";

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

function createLineGraph() {

  //The data for our line
  var lineData = [ { "x": 1,   "y": 5},  { "x": 20,  "y": 20},
                   { "x": 40,  "y": 10}, { "x": 60,  "y": 40},
                   { "x": 80,  "y": 5},  { "x": 100, "y": 60}];
  
  //This is the accessor function we talked about above
  var lineFunction = d3.line()
                       .x(function(d) { return d.x; })
                       .y(function(d) { return d.y; });
 
  console.log(lineFunction(lineData));
 
  // return {
  //   // Pass in our array of data to our line generator to produce the `d={}`
  //   // attribute value that will go into our `<Shape />` component.
  //   path: lineFunction(lineData),
  // };
  return lineFunction(lineData)

 }

 function createClockGraph() {

  // var path = d3.path();

  // // Make a half circle
  // path.arc(100,100,100, 0.95 * Math.PI, 0.05 * Math.PI)
  // return path.toString();

  var arcGenerator = d3.arc();
  dStr = arcGenerator({
    //Clockwise from 12 O'clock
    startAngle: 1.5 * Math.PI,
    endAngle: 2.5 * Math.PI,
    innerRadius: 80,
    outerRadius: 100,
  }); // "M0,-100A100,100,0,0,1,100,0L0,0Z"
  console.log(dStr);
  return dStr;

}

function createCircle() {
  var arcGenerator = d3.arc();
  dStr = arcGenerator({
    //Clockwise from 12 O'clock
    startAngle: 1.5 * Math.PI,
    endAngle: 3.5 * Math.PI,
    innerRadius: 0,
    outerRadius: 62,
  }); // "M0,-100A100,100,0,0,1,100,0L0,0Z"
  console.log(dStr);
  return dStr;

}

function createHourTick() {
  var lineData = [ { "x": 100,   "y": 100},  { "x": 100,  "y": 180},];

  var lineFunction = d3.line()
                       .x(function(d) { return d.x; })
                       .y(function(d) { return d.y; })
                       .curve(d3.curveLinear); 

  console.log(lineFunction(lineData));
  return lineFunction(lineData);

}

function createShadow() {
  var lineData = [ { "x": 100,   "y": 100},  { "x": 100,  "y": 160},];

  var lineFunction = d3.line()
                       .x(function(d) { return d.x; })
                       .y(function(d) { return d.y; })
                       .curve(d3.curveLinear); 

  console.log(lineFunction(lineData));
  return lineFunction(lineData);

}

type Props = {};
export default class App extends Component<Props> {
  state = {
    dAttribute: createHourTick(),
    shadowAttribute: createShadow(),
    circleAttribute: createCircle(),
  }
  // // componentDidMount = () => {
  // //   const dAttr = createLineGraph();
  // //   this.setState({dAttribute: dAttr});
  // // }
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
      <View style={styles.container}>
        <View>
          <ART.Surface width={200} height={200}>
                <ART.Shape 
                  d={this.state.dAttribute} 
                  stroke="#09c" strokeWidth={8}
                  fill="#09c"
                />
                <ART.Shape 
                  d={this.state.dAttribute} 
                  stroke="#09c" strokeWidth={8}
                  fill="#09c"
                  transform={new ART.Transform().rotate(45, 100, 100)}
                />
                <ART.Shape 
                  d={this.state.dAttribute} 
                  stroke="#09c" strokeWidth={8}
                  fill="#09c"
                  transform={new ART.Transform().rotate(90, 100, 100)}
                />
                <ART.Shape 
                  d={this.state.dAttribute} 
                  stroke="#09c" strokeWidth={8}
                  fill="#09c"
                  transform={new ART.Transform().rotate(135, 100, 100)}
                />
                <ART.Shape 
                  d={this.state.dAttribute} 
                  stroke="#09c" strokeWidth={8}
                  fill="#09c"
                  transform={new ART.Transform().rotate(180, 100, 100)}
                />
                <ART.Shape 
                  d={this.state.dAttribute} 
                  stroke="#09c" strokeWidth={8}
                  fill="#09c"
                  transform={new ART.Transform().rotate(225, 100, 100)}
                />
                <ART.Shape 
                  d={this.state.dAttribute} 
                  stroke="#09c" strokeWidth={8}
                  fill="#09c"
                  transform={new ART.Transform().rotate(270, 100, 100)}
                />
                <ART.Shape 
                  d={this.state.dAttribute} 
                  stroke="#09c" strokeWidth={8}
                  fill="#09c"
                  transform={new ART.Transform().rotate(315, 100, 100)}
                />
                <ART.Shape 
                  d={this.state.shadowAttribute} 
                  stroke="#F5FCFF" strokeWidth={8}
                  fill="#F5FCFF"
                  transform={new ART.Transform().rotate(315, 100, 100)}
                />
                <ART.Shape 
                  d={this.state.circleAttribute} 
                  stroke="#F5FCFF" strokeWidth={8}
                  fill="#F5FCFF"
                  transform={new ART.Transform().translate(100,100)}
                />

                                  {/* transform={new ART.Transform().translate(100, 100).rotate(0, 0, 0).scale(1, 1)} */}
                {/* <ART.Shape d={arcPath} stroke="#000" strokeWidth={2}/> */}
                {/* <ART.Shape d={path} stroke="#000000" strokeWidth={1} /> */}
                {/* <ART.Shape d="M0 200 A50 50,0 0 1 250 200" stroke="#000000" strokeWidth={6} strokeDash={[1,30]}/> */}
          </ART.Surface>
        </View>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
