import "./index.scss";
import {  Router } from "./lib/router/router";
import { RegistrationPage } from "./pages/registration";
import { ProfilePage, ProfilePageChangeData, ProfilePageChangePassword } from "./pages/profile";
import { ChatPage } from "./pages/chat";
import AuthPage from "./pages/auth";
import { connect } from "./lib/hoc";
import { mapChatsToProps, mapProfileToProps } from "./lib/mapProps";
import { ErrorPage404, ErrorPage500 } from "./pages/error-page";
  
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
    .use("/500", (ErrorPage500))
    .use("/404", (ErrorPage404))
    .start();

export default router;
