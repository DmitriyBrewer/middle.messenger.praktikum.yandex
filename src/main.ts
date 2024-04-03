import { AuthPage } from "./pages/auth";
import "../../middle.messenger.praktikum.yandex/src/components/text-field/index.scss";
import "./index.scss";
import { Router } from "./lib/router";

  
// Необходимо оставить в силу особенностей тренажёра
history.pushState({}, "", "/");
  
const router = new Router(".root");
  
// Можно обновиться на /user и получить сразу пользователя
router
    .use("/", AuthPage)
    .use("/users", AuthPage)
    .start();
  
// // Через секунду контент изменится сам, достаточно дёрнуть переход
setTimeout(() => {
    router.go("/users");
}, 1000);
  
// // А можно и назад
// setTimeout(() => {
//     router.back();
// }, 3000);
  
// // И снова вперёд
// setTimeout(() => {
//     router.forward();
// }, 5000);
