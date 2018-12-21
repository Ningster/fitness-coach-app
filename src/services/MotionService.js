import { NativeModules, NativeEventEmitter } from 'react-native';
import { observable, action, computed } from "mobx";
import {PEDOMETER_STATE} from "../constants/pedometer";

class MotionService {

    MotionManager = NativeModules.MotionManager;
    motionManagerEmitter = new NativeEventEmitter(this.MotionManager);
    sensorSubscription = null;
    authSubscription = null;
    stepCountSubscription = null;
    currStepCount = 0;
    @observable sensorStatus = null;
    @observable authStatus = null;
    @observable pedometerStepCount = 0;
    @computed get serviceStepCount(){
        return this.currStepCount + this.pedometerStepCount;
    }

    // check if user authorized.
    // 如果要不到回應要怎麼處理ＸＤ
    // @action updateAuthStatus(status){

    //     // 0: notDetermined | 1: restricted | 2: denied | 3: authorized
    //     console.log(`RN receives auth status : ${status}`);
    //     this.authStatus = status;
    // }

    // 這個call得到，但是execution context裡面的this指的是global
    // check if device has required sensor
    // 如果沒有sensor要怎麼處理ＸＤ
    // @action updateSensorAvailability(status){
    //     console.log(`RN receives sensor status : ${status}`);
    //     // this.sensorStatus = status;
    //     console.log(this);
    // }

    //這個會error，但是()=>{}會成功，兩者有什麼不同？
    // @action updateSensorAvailability = (status) => {
    //     // console.log(`RN receives sensor status : ${status}`);
    //     this.sensorStatus = status;
    //     // console.log(this);
    // }

    subscribeSensorEvent = () => {
        this.sensorSubscription = this.motionManagerEmitter.addListener(
            'SensorAvailability',
            // this.updateSensorAvailability
            (status)=>{
                console.log(`RN receives sensor status : ${status}`);
                this.sensorStatus=true
                this.sensorSubscription.remove();
            }
        );
    }

    subscribeAuthEvent = () => {
        this.authSubscription = this.motionManagerEmitter.addListener(
            'AuthStatus',
            // this.updateAuthStatus,
            (status)=>{
                console.log(`RN receives auth status : ${status}`);
                this.authStatus=status
                this.authSubscription.remove();
            }
        );
    }

    subscribeStepCount = () => {
        this.stepCountSubscription = this.motionManagerEmitter.addListener(
            'PedometerStepCount',
            (status)=>{
                console.log(`RN receives step count : ${status}`);
                this.pedometerStepCount = status;
                // this.authSubscription.remove();
            }
        );
    }

    pedometerStartUpdates = () => {
        this.MotionManager.pedometerStartUpdates();
    }

    pedometerStopUpdates = () => {
        this.MotionManager.pedometerStopUpdates();
    }

    authorize(){
        this.sensorSubscription = null;
        this.authSubscription = null;
        this.authStatus = null;
        this.sensorStatus = null;
        this.subscribeSensorEvent();
        this.subscribeAuthEvent();
        this.MotionManager.determineSensorAvailability();
        this.MotionManager.determineAuthStatus();
    }

    @action setPedometerState = (state) => {
        switch(state){
            case PEDOMETER_STATE.START:
                // Subscribe to NativeModule's stepCount event then Start the pedometer
                this.subscribeStepCount();
                this.pedometerStartUpdates();

                break;

            case PEDOMETER_STATE.PAUSE:
                // cache the current stepCount for later resumes.
                this.currStepCount = this.serviceStepCount;

                // Stop the pedometer. (Will no longer receive any event since the pedometer is stopped.)
                this.pedometerStopUpdates();

                break;

            case PEDOMETER_STATE.RESUME:
                // Start the pedometer. (So should be receiving events.)
                this.pedometerStartUpdates();
                break;

            case PEDOMETER_STATE.FINISH:
                // Unsubscribe to NativeModule's stepCount event then Stop the pedometer
                this.stepCountSubscription.remove();
                this.pedometerStopUpdates();

                // Set below back to default.
                this.pedometerStepCount = 0;
                this.currStepCount = 0;
                break;

            default:
                throw `Invalid timer state: ${state}. Only 'start'|'finish'|'pause'|'resume' are allowed.`;
        }
    }

}

const motionService = new MotionService();
export default motionService;