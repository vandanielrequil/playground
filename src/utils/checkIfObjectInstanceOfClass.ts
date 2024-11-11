export const checkIfInstanceOf = function(obj, classFunction) {
    if(obj === null || obj === undefined) return false;
    if(obj.constructor === classFunction) return true;
    return checkIfInstanceOf(Object.getPrototypeOf(obj),classFunction);
};