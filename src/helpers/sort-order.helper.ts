
/**
 * @desc check if the query is sorted follow ascending
 * @param order 
 * @returns 
 */
export const isAscending = (order: string) => {
    if(order == "asc") return true;
    if(order == "desc") return false;
}