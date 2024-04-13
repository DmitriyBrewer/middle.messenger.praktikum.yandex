import Block, { UpdatePropsOptions } from "./block";
import isEqual from "./isEqual";
import store, { StoreEvents } from "./store";

type Indexed<T = unknown> = {
    [key in string]: T;
};

// TODO удалить если не нужно
// export function connect(Component: typeof Block, mapStateToProps: (state: Indexed) => Indexed) {
//     return class extends Component {
//         constructor(props) {
//             super({...props, ...mapStateToProps(store.getState())});
  
//             store.on(StoreEvents.Updated, () => {
//                 console.log(store.getState());
//                 console.log(this);
//                 this.setProps({...store.getState()});
//                 // this.setProps({...store.getState()});
//             });
//         }
//     }; 
// } 

export function connect(mapStateToProps: (state: Indexed) => Indexed, updatePropsOptions?:UpdatePropsOptions) {
    return function(Component: typeof Block) {
        return class extends Component {
            constructor(props) {
                let state = mapStateToProps(store.getState());
                super({...props, ...state});
  
                store.on(StoreEvents.Updated, () => {
                    console.log("lslds");
                    const newState = mapStateToProps(store.getState());
                    console.log(state);
                    console.log(newState);
                    if (!isEqual(state, newState)) {
                        console.log(this);
                        // TODO сделать для this и для его children
                        this.setProps({...newState}, updatePropsOptions);
                    }
                    state = newState;
                });
            }
        };
    };
}

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
