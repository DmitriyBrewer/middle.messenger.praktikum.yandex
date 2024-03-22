import renderComponent from "./lib/renderComponent";
import "./index.scss";
import {  registerHandlebarsPartials } from "./lib/register";
import { allPartials } from "./lib/partials";
import AuthPage from "./pages/auth";
import RegistrationPage from "./pages/registration";

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

if (window.location.href.includes("/registration")) {
    const registration = new RegistrationPage({
        buttonText: "Регистрация",
        errorEmail: "Введите корректно почту",
        errorLogin: "Введите корректно логин",
        errorName: "Введите корректно Имя",
        errorSecondName: "Введите корректно Фамилию",
        errorMobile: "Введите корректно телефон",
        errorPassword: "Введите корректно пароль",
        errorPassword2: "Пароли не совпадают"
    });

    renderComponent(".root", registration);
} else  renderComponent(".root", auth);



