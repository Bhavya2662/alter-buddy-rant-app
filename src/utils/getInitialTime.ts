import moment from 'moment';

const SECONDS = 'seconds';

const getInitialTime = (endDate: string) => {
  if (endDate) {
    const now = moment();
    const end = moment(endDate);
    const timeLeft = end.diff(now, SECONDS);
    return timeLeft + 3;
  }

  const savedTime = localStorage.getItem('timeLeft');
  return savedTime ? parseInt(savedTime, 10) : 0; // Default to 0 minutes if no time is saved
};

export default getInitialTime;