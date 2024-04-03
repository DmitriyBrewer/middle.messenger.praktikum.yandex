import { AuthPage } from "./pages/auth";
import "../../middle.messenger.praktikum.yandex/src/components/text-field/index.scss";
import "./index.scss";
import { Router } from "./lib/router";
import { RegistrationPage } from "./pages/registration";
import { ProfilePage, ProfilePageChangeData, ProfilePageChangePassword } from "./pages/profile";
import { ChatPage } from "./pages/chat";
  
const router = new Router(".root");
  
router
    .use("/", AuthPage)
    .use("/sign-up", RegistrationPage)
    .use("/settings", ProfilePage)
    .use("/messenger", ChatPage)
    .use("/settings/change", ProfilePageChangeData)
    .use("/settings/password", ProfilePageChangePassword)
    .start();
  
// // Через секунду контент изменится сам, достаточно дёрнуть переход
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
