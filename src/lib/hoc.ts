import Block, { BlockProps, UpdatePropsOptions } from "./block";
import isEqual from "./isEqual";
import store, { StoreEvents } from "./store";

type Indexed<T = unknown> = {
    [key in string]: T;
};

export function connect(mapStateToProps: (state: Indexed) => Indexed, updatePropsOptions?:UpdatePropsOptions) {
    return function(Component: typeof Block) {
        return class extends Component {
            constructor(props) {
                let state = mapStateToProps(store.getState());
                super({...props, ...state});
  
                store.on(StoreEvents.Updated, () => {
                    const newState = mapStateToProps(store.getState());
                    if (!isEqual(state, newState)) {
                        console.log(updatePropsOptions);
                        this.setProps({...newState}, updatePropsOptions);
                    }
                    state = newState;
                });
            }
        };
    };
}

// export function connect(mapStateToProps: (state: Indexed) => Indexed, updatePropsOptions?: UpdatePropsOptions) {
//     return function (Component: typeof Block) {
//         return class extends Component {
//             constructor(props: BlockProps) {
//                 let state = mapStateToProps(store.getState());
//                 super({ ...props, ...state });

//                 store.on(StoreEvents.Updated, () => {
//                     const newState = mapStateToProps(store.getState());
//                     console.log(state);
//                     console.log(newState);

//                     if (!isEqual(state, newState)) {
                       
//                         this.setProps({ ...newState }, updatePropsOptions);
//                     }
//                     state = newState;
//                 });
//             }
//         };
//     };
// }

// TODO удалить если не нужно
// export function connect(Component: typeof Block, mapStateToProps: (state: Indexed) => Indexed) {
//     return class extends Component {
//         constructor(props) {
//             super({...props, ...mapStateToProps(store.getState())});
  
//             this.updateProps = () => {
//                 this.setProps({...mapStateToProps(store.getState())});
//             };

//             store.on(StoreEvents.Updated, this.updateProps);
//         }

//         componentWillUnmount() {
//             store.off(StoreEvents.Updated, this.updateProps);
//         }
//     }; 
// }
