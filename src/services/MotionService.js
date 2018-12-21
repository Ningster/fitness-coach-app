import { NativeModules, NativeEventEmitter } from 'react-native';
import { observable, action, computed } from "mobx";

class MotionService {

    MotionManager = NativeModules.MotionManager;
    motionManagerEmitter = new NativeEventEmitter(this.MotionManager);
    sensorSubscription = null;
    authSubscription = null;
    @observable sensorStatus = null;
    @observable authStatus = null;

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
                this.sensorStatus=status
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

}

const motionService = new MotionService();
export default motionService;