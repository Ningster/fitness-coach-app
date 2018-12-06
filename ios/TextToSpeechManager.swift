//
//  TextToSpeechManager.swift
//  fitnessCoachApp
//
//  Created by Ning kang on 2018/11/27.
//  Copyright © 2018年 Facebook. All rights reserved.
//

import Foundation
import AVFoundation

@objc(TextToSpeechManager)
class TextToSpeechManager: NSObject {
  
  let synthesizer: AVSpeechSynthesizer;
  
  override init(){
    self.synthesizer = AVSpeechSynthesizer();
    super.init();
  }
  
  @objc(addSomeEvent:location:date:)
  func addSomeEvent(name: String, location: String, date: NSNumber) -> Void {
    // Date is ready to use!
    NSLog("Cute \(name) and you can also put expressions here \(5*2)");
//    let utterance = AVSpeechUtterance(string: "放鬆你的肩膀，我們來暖身五分鐘！")
//    utterance.voice = AVSpeechSynthesisVoice(language: "zh-TW")
//    utterance.rate = 0.5
    
//    let synthesizer = AVSpeechSynthesizer()
//    synthesizer.speak(utterance)
//    self.synthesizer.speak(utterance);
  }
  
  @objc(speak:)
  func speak(text: String) -> Void {
    NSLog(text);
    let utterance = AVSpeechUtterance(string: text)
    utterance.voice = AVSpeechSynthesisVoice(language: "zh-TW")
    utterance.rate = 0.5
    self.synthesizer.speak(utterance);
  }
  
  @objc
  func constantsToExport() -> [String: Any]! {
    return ["someKey": "someValue"]
  }
  
}
