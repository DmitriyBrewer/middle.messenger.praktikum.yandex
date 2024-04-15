// TODO удалить если не нужно
// export function isEqual(lhs:string, rhs:string) {
//     return lhs === rhs;
// }
export type PlainObject<T = unknown> = {
    [k in string]: T;
};

function isPlainObject(value: unknown): value is PlainObject {
    return typeof value === "object"
        && value !== null
        && value.constructor === Object
        && Object.prototype.toString.call(value) === "[object Object]";
}

function isArray(value: unknown): value is [] {
    return Array.isArray(value);
}

function isArrayOrObject(value: unknown): value is [] | PlainObject {
    return isPlainObject(value) || isArray(value);
}

function isEqual(lhs: PlainObject, rhs: PlainObject) {
    if (Object.keys(lhs).length !== Object.keys(rhs).length) {
        return false;
    }

    for (const [key, value] of Object.entries(lhs)) {
        const rightValue = rhs[key];
        if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
            // TODO
            // if (!isEqual(value, rightValue)) {
            //     return false;
            // }
            const valueObject: PlainObject<unknown> = isArrayOrObject(value) ? { value } : value;
            const rightValueObject: PlainObject<unknown> = isArrayOrObject(rightValue) ? { rightValue } : rightValue;
            
            if (isEqual(valueObject, rightValueObject)) {
                continue;
            }
            return false;
        }

        if (value !== rightValue) {
            return false;
        }
    }

    return true;
}

export default isEqual;
