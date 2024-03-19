import "./index.scss";
import Block from "../../lib/test/block";
import renderTemplate from "../../lib/render";

class Button extends Block {
    constructor(props) {
        super("span", props);
    }

    render() {
        return renderTemplate("Button", {
            data: {
                type: "submit",
                text: "Вход",
            },
        });
    }
}

function render(query, block) {
    const root = document.querySelector(query);
    root.appendChild(block.getContent());
    return root;
}

const button = new Button({
    text: "Click me",
});

render("#app", button);

setTimeout(() => {
    button.setProps({
        text: "Click me, please",
    });
}, 1000);

export default button;

// export { default as Button } from "./index.hbs?raw";
