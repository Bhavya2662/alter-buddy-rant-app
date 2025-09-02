import moment from 'moment';

const SECONDS = 'seconds';
const ZERO = '0';

const getRemainingTime = (time: number) => {
    // Calculate minutes and seconds using moment
    const duration = moment.duration(time, SECONDS);
    const minutes = String(duration.minutes()).padStart(2, ZERO);
    const seconds = String(duration.seconds()).padStart(2, ZERO);
  
    const remainingTime = `${minutes}:${seconds}`;

    return remainingTime;
};

export default getRemainingTime;