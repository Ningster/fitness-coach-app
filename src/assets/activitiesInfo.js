import {TRIGGER} from '../constants/script';

export const runHIIT = {
    // time in milliseconds
    timeLength: 300000,
    trigger: TRIGGER.TIME, // "time" | "heartRate" | "gps" | "pace"
    script: [
        {
            baseline: 0,
            operator: ">=",
            text: "來吧！放鬆你的肩膀，先暖身一下",
        },
        {
            baseline: 5000,
            operator: ">=",
            text: "哈囉",
        },
        {
            baseline: 50000,
            operator: ">=",
            text: "心情放鬆，看看旁邊的風景",
        }
    ],
}