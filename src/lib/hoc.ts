import Block, { UpdatePropsOptions } from "./block";
import store, { StoreEvents } from "./store";

type Indexed<T = unknown> = {
    [key in string]: T;
};

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
                super({...props, ...mapStateToProps(store.getState())});
  
                store.on(StoreEvents.Updated, () => {
                    console.log(store.getState());
                    console.log(this);
                    this.setProps({...store.getState()}, updatePropsOptions);
                // this.setProps({...store.getState()});
                });
            }
        };
    };
}
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
