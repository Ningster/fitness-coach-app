//
//  MotionManager.swift
//  fitnessCoachApp
//
//  Created by Ning kang on 2018/12/18.
//  Copyright © 2018年 Facebook. All rights reserved.
//

import Foundation
import CoreMotion

@objc(MotionManager)
class MotionManager: RCTEventEmitter {
  
  private let pedometer = CMPedometer()
  
  @objc override func supportedEvents() -> [String] {
    return ["AuthStatus", "SensorAvailability"];
  }
  
  @objc(addEvent:)
  func addEvent(name: String) -> Void {
    // Date is ready to use!
    NSLog("numberOfSteps is : "+name)
  }
  
  @objc(determineAuthStatus)
  func determineAuthStatus() -> Void {

    // 0: notDetermined | 1: restricted | 2: denied | 3: authorized
    let status : Int = CMPedometer.authorizationStatus().rawValue

    self.sendEvent(withName: "AuthStatus", body: status);
    NSLog("status is : "+String(status));

  }
  
  @objc(determineSensorAvailability)
  func determineSensorAvailability() -> Void {
    
    let isSensorAvailable : Bool = CMPedometer.isStepCountingAvailable()
    
    self.sendEvent(withName: "SensorAvailability", body: isSensorAvailable);
    NSLog("required sensor is : "+String(isSensorAvailable));
    
  }
  
}
