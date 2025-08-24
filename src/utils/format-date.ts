
import moment from "moment";

export const formatDate = (dateString: string) => {
  if(isNaN(Number(dateString))) {
    return new Date(dateString as string).toLocaleString()
  }
  return new Date(Number(dateString)).toLocaleString()
}

/**
 * Get time zone
 * @returns {Number}
 */
export const getTimeZone = (): number => {
  return (new Date()).getTimezoneOffset()/60;
}

/**
 * Format date by momentjs and date is timestamp is only on server
 * @param {String} date 
 * @returns {String}
 */
export const formatDateByMomentjs = (date: string | Date ): string => {
  // date isn't timestamp
  if(!isNaN(Number(date))) {
    const timeZone = getTimeZone();
    const dateUTCNow = Number(date) - timeZone*60*60*1000;
    return moment(dateUTCNow).format('MMMM Do YYYY, h:mm:ss a');
  }
  // date is timestamp
  return moment(date).format('MMMM Do YYYY, h:mm:ss a');
}

/**
 * @desc Get date with timezone offset with UTC and
 *    save database with timezone is GMT.
 * @returns {Number}
 */
export const getDateNowWithLocalTimezone = (): number => {
  const timeZone = getTimeZone();
  const timeLocalNow = Date.now();
  const dateUTCNow = timeLocalNow + timeZone*60*60*1000;
  return dateUTCNow;
}

class FormatDate {
  constructor () {}
  formatTimeAgo(date: string) {
    return moment(date).fromNow();
  }
}

export const formatDateWithMoment = new FormatDate();