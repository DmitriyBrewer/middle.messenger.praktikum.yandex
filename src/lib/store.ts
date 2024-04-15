import EventBus from "./eventBus";

type Indexed<T = unknown> = {
    [key in string]: T;
};

function merge(lhs: Indexed, rhs: Indexed): Indexed {
    for (const p in rhs) {
        if (Object.prototype.hasOwnProperty.call(rhs, p)) {
            try {
                if (typeof rhs[p] === "object" && rhs[p] !== null) {
                    lhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
                } else {
                    lhs[p] = rhs[p];
                }
            } catch (e) {
                lhs[p] = rhs[p];
            }
        }
    }

    return lhs;
}


function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
    if (typeof object !== "object" || object === null) {
        return object;
    }

    if (typeof path !== "string") {
        throw new Error("path must be string");
    }

    const result = path.split(".").reduceRight<Indexed>((acc, key) => ({
        [key]: acc,
    }), value as Indexed<unknown>);
    return merge(object as Indexed, result);
}

export enum StoreEvents {
    Updated = "updated",
  }
  
class Store extends EventBus {

    private state: Indexed = {};

    public getState() {
        return this.state;
    }
  
    public set(path: string, value: unknown) {
        console.log(value);
        console.log(this.state);

        set(this.state, path, value);
  
        this.emit(StoreEvents.Updated);
    }
}
  
export default new Store(); 
