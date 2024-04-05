import "./index.scss";
import Block, { BlockProps } from "../../lib/block";
import ChatPageTemplate from "./index.hbs?raw";
import Sidebar from "../../components/sidebar";
import ChatWindow from "../../components/chat-window";
import { mockChats } from "../../constants/mockChats";
import { getAllChats } from "./api";
import store, { StoreEvents } from "../../lib/store";

// const chats = getAllChats();
// console.log(chats);

// const mock = [
//     {avatar: null,
//         created_by: 374,
//         id: 4025,
//         last_message: null,
//         title: "NameChat",
//         unread_count: 0
//     }
// ];

class ChatController {
    public getChats() {
        getAllChats().then((chats) => {
            chatPage.setProps({ chats }); // Обновляем props чатов в компоненте ChatPage
        })
            .catch((error) => {
                console.error("Error fetching chats:", error);
            });
    }
} 

export const chatController = new ChatController();

export class ChatPage extends Block {
    constructor(props:BlockProps) {
        super("div",{
            ...props,
            // sidebar: new Sidebar({data: props.chats}),
            // window: new ChatWindow({
            //     ...mockChats[0],
            //     empty: false
            // })
        });

        chatController.getChats();

        this.children.sidebar = new Sidebar({data: this.props.chats});
        this.children.window = new ChatWindow({
            ...mockChats[0],
            empty: false
        });

        // this.props.sidebar = this.children.sidebar;


        // store.on(StoreEvents.Updated, () => {
        //     // вызываем обновление компонента, передав данные из хранилища
        //     this.children.sidebar.setProps({data: store.getState().chats});
        // });
    }

    // public componentDidUpdate(oldProps: BlockProps, newProps: BlockProps): boolean {
    //     if(oldProps.chats !== newProps.chats) {
    //         this.children.sidebar.setProps({data: newProps.chats});
    //         return true;
    //     }
    //     return true;
    // }

    render() {
        console.log(this);
        return this.compile(ChatPageTemplate, {sidebar: this.props.sidebar, window: this.props.window});
    }
}
