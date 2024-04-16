import  {  BlockProps, UpdatePropsOptions } from "./block";
import isEqual from "./isEqual";
import { BlockClass } from "./router";
import store, { StoreEvents } from "./store";

export type State<T = unknown> = {
    [key in string]: T;
};

export function connect(mapStateToProps: (state: State) => State, updatePropsOptions?: UpdatePropsOptions) {
    return function(Component: BlockClass) {
        return class extends Component {
            constructor(props: BlockProps) {
                let state = mapStateToProps(store.getState());
                super({ ...props, ...state });

                store.on(StoreEvents.Updated, () => {
                    const prevState = { ...state }; // Глубокое копирование предыдущего состояния
                    console.log(prevState);
                    const newState = mapStateToProps(store.getState());
                    console.log(newState);

                    if (!isEqual(prevState, newState)) {
                        this.setProps({ ...newState }, updatePropsOptions);
                    }
                    state = { ...newState }; // Обновление предыдущего состояния
                });
            }
        };
    };
}

// export function connect(mapStateToProps: (state: State) => State, updatePropsOptions?:UpdatePropsOptions) {
//     return function(Component: BlockClass) {
//         return class extends Component {
//             constructor(props: BlockProps) {
//                 let state = mapStateToProps(store.getState());
//                 super({...props, ...state});

//                 store.on(StoreEvents.Updated, () => {
//                     console.log(state);
//                     const newState = mapStateToProps(store.getState());
//                     console.log(newState);
//                     if (!isEqual(state, newState)) {
//                         this.setProps({...newState}, updatePropsOptions);
//                     }
//                     state = newState;
//                 });
//             }
//         };
//     };
// }
