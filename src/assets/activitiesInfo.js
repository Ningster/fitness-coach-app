import {TRIGGER} from '../constants/script';

export const runHIIT = {
    // time in milliseconds
    timeLength: 180000,
    trigger: TRIGGER.TIME, // "time" | "heartRate" | "gps" | "pace"
    script: [
        {
            baseline: 1000,
            operator: ">=",
            text: "來吧！放鬆你的肩膀，先暖身一下",
        },
        {
            baseline: 60000,
            operator: ">=",
            text: "快跑500公尺，注意呼吸調節，腰桿打直！",
        }
    ],
}