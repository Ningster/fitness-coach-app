import { observable, action, computed } from "mobx";
import {TIMER_STATE} from '../constants/timer';

class TimerService {
    timer;
    currTimestamp;
    countDown = 0;
    timePausedAt = 0;
    @observable timePassed = 0;
    @computed get timePassedStr(){
        return this.msToString(this.timePassed);
    }
    @computed get progress(){
        return this.timePassed/this.countDown;
    }
    @computed get timeIsUp(){
        if(this.timePassed > this.countDown){
            // stop the timer.
            clearInterval(this.timer);
            return true;
        }
        return false; 
    }


    @action setTimerState = (state) => {
        switch(state){
            case TIMER_STATE.START:
                // cache the current timestamp.
                this.currTimestamp = new Date().getTime();

                // start the timer.
                this.timer = setInterval(
                    ()=>{
                        this.timePassed = new Date().getTime()-this.currTimestamp;
                    }
                    , 1000)
                break;
            case TIMER_STATE.PAUSE:
                // cache the passed time for later resumes.
                this.timePausedAt = this.timePassed;

                // stop the timer.
                clearInterval(this.timer);
                break;
            case TIMER_STATE.RESUME:
                // cache the current timestamp
                this.currTimestamp = new Date().getTime();

                // start the timer
                this.timer = setInterval(
                    ()=>{
                        this.timePassed = this.timePausedAt + (new Date().getTime()-this.currTimestamp);
                    }
                    , 1000)
                break;
            case TIMER_STATE.FINISH:
                // Set back to default.
                this.timePassed = 0;
                this.timePausedAt = 0;
                this.countDown = 0

                // stop the timer.
                clearInterval(this.timer);
                break;
            default:
                throw `Invalid timer state: ${state}. Only 'start'|'finish'|'pause'|'resume' are allowed.`;
        }
    }

    setTimer(countDown){
        this.countDown = countDown;
    }

    msToString(ms){
        const sec = Math.floor(ms / 1000);
        const hours = Math.floor(sec/3600);
        let remainder = sec % 3600;
        const minutes = Math.floor(remainder/60);
        const secs = remainder % 60;
        const prefix = (time)=>time > 9 ? time : '0'+time ;
        return `${prefix(hours)}:${prefix(minutes)}:${prefix(secs)}`; 
    }
}

const timerService = new TimerService();
export default timerService;