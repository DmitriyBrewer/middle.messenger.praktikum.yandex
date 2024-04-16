import "../../middle.messenger.praktikum.yandex/src/components/text-field/index.scss";
import "./index.scss";
import {  Router } from "./lib/router";
import { RegistrationPage } from "./pages/registration";
import { ProfilePage, ProfilePageChangeData, ProfilePageChangePassword } from "./pages/profile";
import { ChatPage } from "./pages/chat";
import AuthPage from "./pages/auth";
import { State, connect } from "./lib/hoc";
  
const router = new Router(".root");

// TODO удалить если не нужно
function mapProfileToProps(state:State) {  
    return {
        userData: state.userData,
        updateAllChild:true

    };
}

function mapChatsToProps(state:State) {
    return {
        userData: state.userData,
        data: state.data,
        selectChat: state.selectChat,
        messages: state.messages,
        updateAllChild:true
    };
}

const withUser = connect(mapChatsToProps,{updateFirstChildren:true});
const withProfile = connect(mapProfileToProps,{updateAllChild:true});

router
    .use("/", withUser(AuthPage))
    .use("/sign-up", RegistrationPage)
    .use("/settings", withProfile(ProfilePage))
    .use("/messenger", withUser(ChatPage))
    .use("/change", (ProfilePageChangeData))
    .use("/password", (ProfilePageChangePassword))
    .start();

export default router;
