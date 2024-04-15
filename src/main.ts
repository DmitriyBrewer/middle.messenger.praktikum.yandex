import "../../middle.messenger.praktikum.yandex/src/components/text-field/index.scss";
import "./index.scss";
import {  Router } from "./lib/router";
import { RegistrationPage } from "./pages/registration";
import { ProfilePage, ProfilePageChangeData, ProfilePageChangePassword } from "./pages/profile";
import { ChatPage } from "./pages/chat";
import AuthPage from "./pages/auth";
import { Indexed, connect } from "./lib/hoc";
  
const router = new Router(".root");

// TODO удалить если не нужно
// function mapUserToProps(state) {   
//     return {
//         userData: state.userData
//     };
// }

function mapChatsToProps(state:Indexed) {
    return {
        userData: state.userData,
        data: state.data,
        selectChat: state.selectChat,
        messages: state.messages,
        updateAllChild:true
    };
}

const withUser = connect(mapChatsToProps,{updateFirstChildren:true});
const withChats = connect(mapChatsToProps,{updateAllChild:true});

router
    .use("/", withUser(AuthPage))
    .use("/sign-up", RegistrationPage)
    .use("/settings", withUser(ProfilePage))
    .use("/messenger", withChats(ChatPage))
    .use("/change", withUser(ProfilePageChangeData))
    .use("/password", withUser(ProfilePageChangePassword))
    .start();

export default router;
