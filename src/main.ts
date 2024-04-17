import "../../middle.messenger.praktikum.yandex/src/components/text-field/index.scss";
import "./index.scss";
import {  Router } from "./lib/router";
import { RegistrationPage } from "./pages/registration";
import { ProfilePage, ProfilePageChangeData, ProfilePageChangePassword } from "./pages/profile";
import { ChatPage } from "./pages/chat";
import AuthPage from "./pages/auth";
import { connect } from "./lib/hoc";
import { mapChatsToProps, mapProfileToProps } from "./lib/mapProps";
  
const router = new Router(".root");

const withChat = connect(mapChatsToProps);
const withProfile = connect(mapProfileToProps);

router
    .use("/", (AuthPage))
    .use("/sign-up", (RegistrationPage))
    .use("/settings", withProfile(ProfilePage))
    .use("/messenger", withChat(ChatPage))
    .use("/change", (ProfilePageChangeData))
    .use("/password", (ProfilePageChangePassword))
    .start();

export default router;
