import { Const } from "./const";

export function isExcluded(key: string): boolean {
    return Const.REACT_EXCLUDE_METHODS[key] === true;
}
