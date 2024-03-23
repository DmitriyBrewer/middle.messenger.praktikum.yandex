import "./index.scss";
import { allPartials } from "./lib/partials";
import { registerHandlebarsPartials } from "./lib/register";
import renderComponent from "./lib/renderComponent";
import Block from "./lib/test/block";
import AuthPage from "./pages/auth";
import Button from "./ui/button";

registerHandlebarsPartials(allPartials);

const profile = new AuthPage({
    buttonText: "Вход",
});



renderComponent(".root", profile);

profile.setProps({
    buttonText: "Change namess"
});
