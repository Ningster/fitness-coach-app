//
//  MotionManager.m
//  fitnessCoachApp
//
//  Created by Ning kang on 2018/12/18.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(MotionManager, RCTEventEmitter)

RCT_EXTERN_METHOD(addEvent:(NSString *)name)
RCT_EXTERN_METHOD(determineAuthStatus)
RCT_EXTERN_METHOD(determineSensorAvailability)
RCT_EXTERN_METHOD(pedometerStartUpdates)
RCT_EXTERN_METHOD(pedometerStopUpdates)

@end
