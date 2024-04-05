import EventBus from "./eventBus";
import isEqual from "./isEqual";

type Indexed<T = any> = {
    [key in string]: T;
};

function merge(lhs: Indexed, rhs: Indexed): Indexed {
    for (const p in rhs) {
        if (!rhs.hasOwnProperty(p)) {
            continue;
        }

        try {
            if (rhs[p].constructor === Object) {
                rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
            } else {
                lhs[p] = rhs[p];
            }
        } catch(e) {
            lhs[p] = rhs[p];
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
    }), value as any);
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


// const newState = mapStateToProps(state);
    
// if (!isEqual(oldState, newState)) {
//   // обновляем компонент
// }

// class Store extends EventBus {
//     private state: Indexed = {};

//     public getState() {
//         return this.state;
//     }

//     public set(path: string, value: unknown) {
//         const oldState = {...this.state};
//         set(this.state, path, value);

//         this.emitUpdated(oldState);
//     }

//     private emitUpdated(oldState) {
//         const newState = { ...this.state }; 
//         console.log(oldState);
//         console.log(newState);

//         if (!isEqual(oldState, newState)) {
//             console.log("iis");
//             this.emit(StoreEvents.Updated, newState);
//         }
//     }
// }

// export default new Store();
