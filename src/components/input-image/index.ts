import "./index.scss";
import Block, { BlockProps } from "../../lib/block";
import  InputImageTemplate  from "./index.hbs?raw";
import Image from "../../ui/img";
import InputFileComponent from "../../ui/input-file";
import { profileController } from "../../pages/profile/controller";

class InputImageComponent extends Block {
    constructor(props:BlockProps) {
        super("div",{...props,
            input: new InputFileComponent({
                type:props.type,
                id:props.id,
                name: props.name,
                placeholder:  props.placeholder,
                isRequired: props.isRequired,
                className:  props.className,
                autocomplete:  props.autocomplete,
                pattern:  props.pattern,
                dir:  props.dir,
                blur: props.blur,
                accept: props.accept,
                events:{
                    change: () => {
                        const element = document.getElementById("avatarInput") as HTMLInputElement | null;
                        if (element) {
                            const file = element.files?.[0];
                            if (file) {
                                profileController.updateAvatarController(file);
                            } else {
                                console.error("No file selected.");
                            }
                        } else {
                            console.error("Element not found.");
                        }
                    }
                }
            }),
      
        });

        this.children.image = new Image({
            width: 150,
            height: 150,
            src:this.props.src,
            alt:"avatar",
            className:"profileHeader__avatarDefault"
        });

        this.props.image = this.children.image;
    }

    public componentDidUpdate(oldProps: BlockProps, newProps: BlockProps): boolean {
        if(oldProps.src !== newProps.src) {
            (this.children.image as Block).setProps({src:newProps.src});
        }
        return true;
    }

    render() { 
        return this.compile(InputImageTemplate,{});
    } 
}

export default InputImageComponent;
