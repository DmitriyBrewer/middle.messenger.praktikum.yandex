import "./index.scss";
import { allPartials } from "./lib/partials";
import { registerHandlebarsPartials } from "./lib/register";
import renderComponent from "./lib/renderComponent";
import AuthPage from "./pages/auth";
import ChatPage from "./pages/chat";
import RegistrationPage from "./pages/registration";

registerHandlebarsPartials(allPartials);

const profile = new AuthPage({
    buttonText: "Вход",
});

const registration = new RegistrationPage({
    buttonText: "Регистрация"
});

const chat = new ChatPage({
});



renderComponent(".root", chat);

// profile.setProps({
//     buttonText: "Change namess"
// });
