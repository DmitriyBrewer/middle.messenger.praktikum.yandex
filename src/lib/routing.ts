import { authPage } from "../pages/auth";
import { chatPage } from "../pages/chat";
import { errorPage404, errorPage500 } from "../pages/error-page";
import { profileChangeDataPage, profileChangePassword, profilePage } from "../pages/profile";
import { registrationPage } from "../pages/registration";

import renderComponent from "./renderComponent";

export function renderApp(root:string) {

    const url = window.location.pathname;
    
    if (url === "/registration") {
        renderComponent(root, registrationPage);
    } else if (url === "/chat") {
        renderComponent(root, chatPage);
    } else if (url === "/500") {
        renderComponent(root, errorPage500);
    } else if (url === "/404") {
        renderComponent(root, errorPage404);
    } else if (url === "/profile") {
        renderComponent(root, profilePage);
    } else if (url === "/profile/change") {
        renderComponent(root, profileChangeDataPage);
    }  else if (url === "/profile/change/password") {
        renderComponent(root, profileChangePassword);
    } else {
        renderComponent(root, authPage);
    }
}
