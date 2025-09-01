import moment from "moment";

export function useFormartDate() {

    const formartDateToString = (date: string | Date ): string => {
        // date is timestamp
        return moment(date).format('MMMM Do YYYY');
    }

    return {
        formartDateToString
    }
      
}