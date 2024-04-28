import moment from "moment";

export const formatedSecondsTime = (timeSpentInSeconds: number) => {
  if (timeSpentInSeconds) {
    const duration = moment.duration(timeSpentInSeconds, 'seconds');

    const hours = duration.asHours();
    const minutes = duration.minutes();
    const seconds = duration.seconds();
    let formattedTime: string;
    if (Math.floor(hours) > 0) {
      formattedTime = `${Math.floor(hours)} hr ${minutes.toString()} min`;
    } else {
      formattedTime = `${minutes.toString()} min ${seconds.toString()} sec`;
    }
    return formattedTime
  }
  return '0 min 0 sec'
};