import Block from "./block";
import store, { StoreEvents } from "./store";

export function connect(Component: typeof Block) {
    // используем class expression
    return class extends Component {
        constructor(...args) {
            // не забываем передать все аргументы конструктора
            super(...args);

            // подписываемся на событие
            store.on(StoreEvents.Updated, () => {
                // вызываем обновление компонента, передав данные из хранилища
                this.setProps({...store.getState()});
            });
        }
    }; 
} 
