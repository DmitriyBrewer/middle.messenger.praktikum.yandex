import Block from "./block";
import store, { StoreEvents } from "./store";

type Indexed<T = any> = {
    [key in string]: T;
};

export function connect(Component: typeof Block, mapStateToProps: (state: Indexed) => Indexed) {
    // используем class expression
    return class extends Component {
        constructor(props) {
            // не забываем передать все аргументы конструктора
            super({...props, ...mapStateToProps(store.getState())});

            // подписываемся на событие
            store.on(StoreEvents.Updated, () => {
                // вызываем обновление компонента, передав данные из хранилища
                this.setProps({...store.getState()});
            });
        }
    }; 
} 
