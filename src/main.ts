import renderComponent from "./lib/renderComponent";
import "./index.scss";
import {  registerHandlebarsPartials } from "./lib/register";
import { allPartials } from "./lib/partials";
import AuthPage from "./pages/auth";

registerHandlebarsPartials(allPartials);


const auth  = new AuthPage({
    buttonText: "Вход",
    errorLogin:"deafult error login",
    errorPassword:"deafult error password",

});

// if (window.location.href.includes("/registration")) {
//     const registration  = new AuthPage({
//         buttonText: "Вхsод"
//     });
//     renderComponent(".root", registration);
// }

renderComponent(".root", auth);

