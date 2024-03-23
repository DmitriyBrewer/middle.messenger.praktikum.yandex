import "./index.scss";
import Block from "./lib/test/block";
import Button from "./ui/button";

function render(query, block) {
    const root = document.querySelector(query);
  
    root.appendChild(block.getContent());
  
    block.dispatchComponentDidMount();
  
    return root;
} 

const templates = `
<div class="{{ className }}">
    {{ buttonText }}
</div>
`; 

// class Button extends Block {
//     constructor(props) {
//         super("button", props);
//     }
  
//     render() {
//         console.log(this);
//         return this.compile(templates,{buttonText: this.props.buttonText});
//     }    
// }

const profileTemplate = `
    <div>
    {{{ userName }}}
    {{{ button }}}
    </div>
`; 

class UserProfile extends Block {
    constructor(props) {
        super("div",props);

        this.children.button = new Button({
            text: props.buttonText,
            events: {
                click: event => {
                    console.log(event);
                },
            },
        });
    }

    componentDidUpdate(oldProps, newProps) {
        if (oldProps.buttonText !== newProps.buttonText) {
            this.children.button.setProps({ text: newProps.buttonText });
        }

        return true;
    }

    render() {
        console.log(this);
        return this.compile(profileTemplate, {
            button: this.button,
            userName: this.props.userName,
        });
    }
}

const profile = new UserProfile({
    userName: "John Doe",
    buttonText: "Вход",
});



render(".root", profile);

profile.setProps({
    buttonText: "Change namess"
});
