import renderComponent from "./lib/renderComponent";
import "./index.scss";
import {  registerHandlebarsPartials } from "./lib/register";
import { allPartials } from "./lib/partials";
import AuthPage from "./pages/auth";

registerHandlebarsPartials(allPartials);


const auth  = new AuthPage({
    buttonText: "Вход",
    helperPassword:"Пароль",
    helperLogin:"Логин",
    errorLogin:"Сообщение об ошибке",
    errorPassword:"Сообщение об ошибке",
    events: {
        submit:() => {
            console.log("Form submitted");
        }
    }
});

renderComponent(".root", auth);

