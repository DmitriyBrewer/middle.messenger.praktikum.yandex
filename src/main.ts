import "./index.scss";
import renderComponent from "./lib/renderComponent";
import Block, { BlockProps } from "./lib/test/block";
import ButtonComponent from "./ui/button/index";


class PageComponent extends Block {
    constructor(props: BlockProps, children: Block[]) {
        super("div", props, children);
    }

    render() {
        return `<div>${super.render()}</div>`;
    }
}

const button = new ButtonComponent({
    text: "Click me",
});

setTimeout(() => {
    button.setProps({
        text: "Click me, please",
    });
}, 1000);

const page = new PageComponent({}, [button, button]);

renderComponent(".root", page);
