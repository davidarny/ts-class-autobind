import {Const} from "./const";

export function isExcluded(key: string) {
    return Const.REACT_EXCLUDE_METHODS[key] === true;
}
