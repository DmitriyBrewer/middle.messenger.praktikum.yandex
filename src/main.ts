import "./index.scss";
import { allPartials } from "./lib/partials";
import { registerHandlebarsPartials } from "./lib/register";
import renderComponent from "./lib/renderComponent";
import AuthPage from "./pages/auth";

registerHandlebarsPartials(allPartials);

const profile = new AuthPage({
    buttonText: "Вход",
    helperLogin: "Логин",
});



renderComponent(".root", profile);

// profile.setProps({
//     buttonText: "Change namess"
// });
