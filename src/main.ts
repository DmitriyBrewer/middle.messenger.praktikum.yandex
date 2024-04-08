import "../../middle.messenger.praktikum.yandex/src/components/text-field/index.scss";
import "./index.scss";
import { Router } from "./lib/router";
import { RegistrationPage } from "./pages/registration";
import { ProfilePage, ProfilePageChangeData, ProfilePageChangePassword } from "./pages/profile";
import { ChatPage } from "./pages/chat";
import AuthPage from "./pages/auth";
import Block from "./lib/block";
import store, { StoreEvents } from "./lib/store";
import { connect } from "./lib/hoc";
import { getAllChats } from "./pages/chat/api";

// class UserController {
//     public getUser() {
//         store.set("user",{test:"ss"});
//         // UserAPI.getUser()
//         //     .then(data => store.set("user", data));
//     }
// } 
// class UserProfile extends Block {
//     constructor(...args) {
//         super(...args);
      
//         // запрашиваем данные у контроллера
//         UserController.getUser();
      
//         // подписываемся на событие
//         store.on(StoreEvents.Updated, () => {
//             // вызываем обновление компонента, передав данные из хранилища
//             this.setProps(store.getState());
//         });
//     }
      
//     render() {
//         return this.compile("<div>test</div>", {});
//         // внутри рендер в this.props будут достпны данные из хранилища
//     }
// } 

// if(!state.chats) {
//     return {
//     // chats: state.chats
//         chats: [
//             {avatar: null,
//                 created_by: 374,
//                 id: 4025,
//                 last_message: null,
//                 title: "NameChat",
//                 unread_count: 0
//             }, {avatar: null,
//                 created_by: 374,
//                 id: 4025,
//                 last_message: null,
//                 title: "NameChat",
//                 unread_count: 0
//             }
//         ],
//     }; } else return {chats:state.chats};
  
const router = new Router(".root");

function mapUserToProps(state) {   
    return {
        userData: state.userData
    };
}

function mapChatsToProps(state) {
    return {
        data: state.data
    };
}


const withUser = connect(mapUserToProps,{updateFirstChildren:true});
const withChats = connect(mapChatsToProps,{updateFirstChildren:true});

router
    // .use("/", connect(AuthPage,mapUserToProps))
    .use("/", withUser(AuthPage))
    .use("/sign-up", RegistrationPage)
    .use("/settings", withUser(ProfilePage))
    .use("/messenger", withChats(ChatPage))
    .use("/settings/change", withUser(ProfilePageChangeData))
    .use("/settings/password", withUser(ProfilePageChangePassword))
    .start();

export default router;
  
// // // Через секунду контент изменится сам, достаточно дёрнуть переход
// setTimeout(() => {
//     router.go("/sign-up");
// }, 1000);
  
// // А можно и назад
// setTimeout(() => {
//     router.back();
// }, 3000);
  
// // И снова вперёд
// setTimeout(() => {
//     router.forward();
// }, 5000);
