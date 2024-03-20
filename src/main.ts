import "./index.scss";
import renderComponent from "./lib/renderComponent";
import Block, { BlockProps } from "./lib/test/block";
import ButtonComponent from "./ui/button/index";


class PageComponent extends Block {
    constructor(props: BlockProps) {
        super("span", props);
    }

    render() {
        const button = new ButtonComponent({
            text: this.props.buttonText,
            
        });

        const button2 = new ButtonComponent({
            text: this.props.buttonText2,
        });

        return `<div>
        ${button.render()}
        ${button2.render()}
        <button>ssd</button>
        </div>`;
    }
}

setTimeout(() => {
    page.setProps({
        buttonText: "Click me, erer",
        buttonText2: "Trara",
        // events: {
        //     click: () => console.log("event")
        // }
    });
}, 1000);

const page = new PageComponent({buttonText:"default", buttonText2:"deff"});

renderComponent(".root", page);
