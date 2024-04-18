import { State } from "./hoc";

export function mapProfileToProps(state:State) {  
    return {
        userData: state.userData,
        updateAllChild:true
    };
}

export function mapChatsToProps(state:State) {
    return {
        userData: state.userData,
        data: state.data,
        selectChat: state.selectChat,
        messages: state.messages,
        updateAllChild:true
    };
}
