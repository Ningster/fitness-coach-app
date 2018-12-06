//
//  TextToSpeechManager.m
//  fitnessCoachApp
//
//  Created by Ning kang on 2018/11/27.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(TextToSpeechManager, NSObject)

RCT_EXTERN_METHOD(addSomeEvent:(NSString *)name location:(NSString *)location date:(nonnull NSNumber *)date)
RCT_EXTERN_METHOD(speak:(NSString *)text)

@end
