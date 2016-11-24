/**
 * 
 * 
 * @export
 * @class UtilHelper
 */
export class UtilHelper {
    constructor() { }

    /**
     * 
     * 
     * @param {any[]} data
     * @param {boolean} [desc] - Optional parameter, if "true" it returns data sorted in descending order
     * @returns {*}
     * 
     * @memberOf UtilHelper
     */
    public sortByDate(data: any[], desc?: boolean): any {
        data.sort((leftSide, rightSide): number => {
            if (desc) {
                return new Date(leftSide.date).getTime() - new Date(rightSide.date).getTime();
            } else {
                return new Date(rightSide.date).getTime() - new Date(leftSide.date).getTime();
            }
        });
        return data;
    }
}