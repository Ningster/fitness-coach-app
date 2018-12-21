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
  
  @objc static func requiresMainQueueSetup() -> Bool {
    return false
  }
  
  @objc(speak:)
  func speak(text: String) -> Void {
    NSLog(text);
    let utterance = AVSpeechUtterance(string: text)
    utterance.voice = AVSpeechSynthesisVoice(language: "zh-TW")
    utterance.rate = 0.5
    self.synthesizer.speak(utterance);
  }
  
  @objc(stopSpeakingImmediate)
  func stopSpeakingImmediate() -> Void {
    self.synthesizer.stopSpeaking(at:AVSpeechBoundary.immediate);
  }
  
  @objc(pauseSpeakingWord)
  func pauseSpeakingWord() -> Void {
    self.synthesizer.pauseSpeaking(at:AVSpeechBoundary.word);
  }
  
  @objc(continueSpeaking)
  func continueSpeaking() -> Void {
    self.synthesizer.continueSpeaking();
  }
  
  @objc
  func constantsToExport() -> [String: Any]! {
    return ["someKey": "someValue"]
  }
  
}
