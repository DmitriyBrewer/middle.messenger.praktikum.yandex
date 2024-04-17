import EventBus from "./eventBus";
import { merge } from "./merge";

type State<T = unknown> = {
    [key in string]: T;
};




function set(object: State | unknown, path: string, value: unknown): State | unknown {
    if (typeof object !== "object" || object === null) {
        return object;
    }

    if (typeof path !== "string") {
        throw new Error("path must be string");
    }

    const result = path.split(".").reduceRight<State>((acc, key) => ({
        [key]: acc,
    }), value as State<unknown>);
    return merge(object as State, result);
}

export enum StoreEvents {
    Updated = "updated",
  }
  
class Store extends EventBus {
    private state: State = {};

    public getState() {
        return this.state;
    }

    public set(path: string, value: unknown) {
        set(this.state, path, value);

        this.emit(StoreEvents.Updated,this.state);
    }
}
  
export default new Store(); 
