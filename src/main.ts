import renderComponent from "./lib/renderComponent";
import "./index.scss";
import {  registerHandlebarsPartials } from "./lib/register";
import { allPartials } from "./lib/partials";
import AuthPage from "./pages/auth";

registerHandlebarsPartials(allPartials);


const auth  = new AuthPage({
    buttonText: "Вход",
    errorLogin:"Сообщение об ошибке",
    errorPassword:"Сообщение об ошибке",
});

renderComponent(".root", auth);

