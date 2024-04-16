import EventBus from "./eventBus";

type State<T = unknown> = {
    [key in string]: T;
};

function merge(lhs: State, rhs: State): State {
    for (const p in rhs) {
        if (Object.prototype.hasOwnProperty.call(rhs, p)) {
            try {
                if (typeof rhs[p] === "object" && rhs[p] !== null) {
                    lhs[p] = merge(lhs[p] as State, rhs[p] as State);
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
        console.log(this.state);
        const newState = { ...this.state }; // Создание нового объекта состояния на основе текущего
        set(newState, path, value); // Изменение нового объекта состояния

        console.log(newState); // Вывод нового состояния в консоль

        this.state = newState; // Обновление текущего объекта состояния
        this.emit(StoreEvents.Updated, newState); // Передача нового состояния в событие Updated
    }
}
  
export default new Store(); 
