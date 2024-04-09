import "../../middle.messenger.praktikum.yandex/src/components/text-field/index.scss";
import "./index.scss";
import { Router } from "./lib/router";
import { RegistrationPage } from "./pages/registration";
import { ProfilePage, ProfilePageChangeData, ProfilePageChangePassword } from "./pages/profile";
import { ChatPage } from "./pages/chat";
import AuthPage from "./pages/auth";
import { connect } from "./lib/hoc";
  
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
