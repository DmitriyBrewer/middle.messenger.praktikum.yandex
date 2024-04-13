import { compiledTemplate } from "./compileTemplate";
import EventBus from "./eventBus";

export interface UpdatePropsOptions {
    updateFirstChildren?: boolean; 
    updateSpecificChild?: { name: string, props: BlockProps }; 
    updateAllChild?: boolean
}

export type BlockEvents = Record<string, EventListenerOrEventListenerObject>

export type BlockChildren<T = unknown> = {
    [key: string]: T;
}

export type BlockProps = {
    [key: string]: unknown;
    children?: BlockChildren | unknown;
    events?: BlockEvents;
    blur?: (event: string) => void; 
}

export type PropsType<P = BlockProps> = P
class Block {
    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_CDU: "flow:component-did-update",
        FLOW_RENDER: "flow:render",
    };

    private _element: HTMLElement | null = null;
    private _meta: { tagName: string; props: PropsType } | null = null;
    public props: PropsType;
    public children:BlockChildren;
    private eventBus: () => EventBus;
    private _id: number | string | null = null;
    private savedDisplay: string = "";

    constructor(tagName = "div", propsAndChildren={}) {
        const { children, props } = this._getChildren(propsAndChildren);
        this.children = children;
        const eventBus = new EventBus();
        this._meta = {
            tagName,
            props,
        };

        if (props.witchId) {
            this._id = Math.floor(100000 + Math.random() * 900000);
        }

        this.props = this._makePropsProxy({ ...props, __id: this._id });


        this.eventBus = () => eventBus;

        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }

    _getChildren(propsAndChildren:BlockProps) {
        const children:BlockChildren = {};
        const props:BlockProps = {};

        Object.entries(propsAndChildren).forEach(([key, value]) => {
            if (value instanceof Block) {
                children[key] = value;
            } else {
                props[key] = value;
            }
        });
        return { children, props };
    }

    private _addEvents(): void {
        const { events = {} } = this.props;

        Object.keys(events).forEach(eventName => {
            this._element!.addEventListener(eventName, events[eventName]);
        });
    }

    private _removeEvents(): void {
        if (this._element) {
            const { events = {} } = this.props;

            Object.keys(events).forEach(eventName => {
                this._element!.removeEventListener(eventName, events[eventName]);
            });
        }
    }

    private _registerEvents(eventBus: EventBus): void {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, (args: unknown) => {
            this._componentDidMount(args as BlockProps);
        });

        // eslint-disable-next-line
        // @ts-ignore не успеваю решить эту проблему типизации, вероятно надо в EventBus делать generic, но пока оставляю так
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    private _createResources(): void {
        const { tagName } = this._meta!;
        this._element = this._createDocumentElement(tagName);
    }

    public init(): void {
        this._createResources();
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    private _componentDidMount(oldProps: BlockProps): void {
        this.componentDidMount(oldProps);
        
        Object.values(this.children).forEach(child => {
            (child as Block).dispatchComponentDidMount();
        });
    }

    public componentDidMount(oldProps: BlockProps): void {
        console.log(oldProps);
    }

    public dispatchComponentDidMount(): void {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    private _componentDidUpdate(
        oldProps: BlockProps,
        newProps: BlockProps
    ): void {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (!response) {
            return;
        }
        this._render();
    }

    compile<T extends Block & { id: string }>(template:string, props: PropsType) {
        const propsAndStubs:BlockProps = { ...props };
        const _tmpId =  Math.floor(100000 + Math.random() * 900000);
      
        Object.entries(this.children as BlockChildren<T>).forEach(([key, child]) => {
            if (Array.isArray(child)) {
                propsAndStubs[key] = `<div data-id="__l_${_tmpId}"></div>`;
            } else {
                propsAndStubs[key] = `<div data-id="${child.id}"></div>`;
            }
        });
        
        const fragment = this._createDocumentElement("template") as HTMLTemplateElement;
        fragment.innerHTML = compiledTemplate(template, propsAndStubs);

        Object.values(this.children as BlockChildren<T>).forEach(child => {
            const stub = fragment.content.querySelector(`[data-id="__l_${_tmpId}"]`);
            if(stub) {
                if(Array.isArray(child)) {
                    child.forEach(item => {
                        if (item instanceof Block) {
                            if (typeof this.props.className === "string") {
                                stub.classList.add(this.props.className);
                            }
                            stub.appendChild(item.getContent());
                        } else {
                            stub.replaceWith(`${item}`);
                        }
                    });
                }
            } else {  
                const stub = fragment.content.querySelector(`[data-id="${child.id}"]`);
          
                stub && stub.replaceWith(child.getContent());
            }
        });
        return fragment.content;
    }

    public componentDidUpdate(
        oldProps: BlockProps,
        newProps: BlockProps
    ): boolean {
        return !!oldProps && !!newProps; 
    }

    public handleFormData(callback: (formDataObject: Record<string, string>) => void) {
        const formData = new FormData(this.element as HTMLFormElement);
        const formDataObject: Record<string, string> = {};

        formData.forEach((value, key) => {
            if (typeof value === "string") {
                formDataObject[key] = value;
            } else if (value instanceof File) {
                formDataObject[key] = "File uploaded";
            }
        });

        callback(formDataObject);
        this.clearForm();
    }

    public clearForm() {
        const inputElements = this.element!.querySelectorAll("input");
        inputElements.forEach((inputElement) => {
            (inputElement as HTMLInputElement).value = "";
        });
    }

    // public setProps = (nextProps:BlockProps): void => {
    //     if (!nextProps) {
    //         return;
    //     }

    //     const oldProps = { ...this.props }; 
    //     Object.assign(this.props, nextProps);
    
    //     this._componentDidUpdate(oldProps, this.props); 
    // };
    public setPropsT = (nextProps: BlockProps): void => {
        if (!nextProps) {
            return;
        }
    
        const oldProps = { ...this.props };
        Object.assign(this.props, nextProps);
    
        // Рекурсивная функция для обновления props у всех дочерних элементов
        const updateChildProps = (children: { [key: string]: Block }, nextProps: BlockProps) => {
            for (const key in children) {
                if (children.hasOwnProperty(key)) {
                    const child = children[key];
                    if (child instanceof Block) {
                        child.setProps(nextProps); // Обновляем props у дочернего элемента
                    }
                }
            }
        };
    
        // Обновляем props у всех дочерних элементов
        updateChildProps(this.children, nextProps);
    
        this._componentDidUpdate(oldProps, this.props);
    };

    public setProps = (nextProps: BlockProps, options?: UpdatePropsOptions): void => {
        if (!nextProps) {
            return;
        }
    
        const oldProps = { ...this.props };
        Object.assign(this.props, nextProps);

        const updateChildProps = (children: { [key: string]: Block }, nextProps: BlockProps, options?: UpdatePropsOptions): void => {
            for (const key in children) {
                if (children.hasOwnProperty(key)) {
                    const child = children[key];
                    if (child instanceof Block) {
                        if (options?.updateFirstChildren || (options?.updateSpecificChild && options.updateSpecificChild.name === key)) {
                            child.setProps(options?.updateSpecificChild?.props || nextProps);
                        }  else child.setProps(nextProps);  
                    }
                }
            }
        };
    
        console.log(this.props);
        this.props.updateAllChild && updateChildProps((this.children), nextProps, options);
        this._componentDidUpdate(oldProps, this.props);
    };

    // public setProps2 = (nextProps: BlockProps, options?: UpdatePropsOptions): void => {
    //     if (!nextProps) {
    //         return;
    //     }
    
    //     const oldProps = { ...this.props };
    //     Object.assign(this.props, nextProps);

    //     const updateChildProps = (children: { [key: string]: Block }, nextProps: BlockProps, options?: UpdatePropsOptions): void => {
    //         for (const key in children) {
    //             if (children.hasOwnProperty(key)) {
    //                 const child = children[key];
    //                 if (child instanceof Block) {
    //                     if (options?.updateFirstChildren || (options?.updateSpecificChild && options.updateSpecificChild.name === key)) {
    //                         child.setProps(options?.updateSpecificChild?.props || nextProps);
    //                     }
    //                 }
    //             }
    //         }
    //     };
    
    //     updateChildProps((this.children), nextProps, options);
    //     console.log(this);
    //     this._componentDidUpdate(oldProps, this.props);
    // };

    get element(): HTMLElement | null {
        return this._element;
    }

    private _render(): void {

        const block = this.render(); 

        this._removeEvents();
        const fragment = block;
    
        const newElement = fragment.firstElementChild;
        
        if (newElement) {
            if (this._element) {
                this._element.replaceWith(newElement);
            }
    
            this._element = newElement as HTMLElement;
    
            this._addEvents();
        }
    }

    public render(): DocumentFragment {
        return new DocumentFragment;
    }

    public getContent(): HTMLElement {
        return this.element!;
    }

    private _makePropsProxy(props: BlockProps): BlockProps {
        return new Proxy(props, {
            get: (target, prop) => {
                if (typeof prop === "symbol") {
                    throw new Error("Symbols are not allowed as property keys");
                }
                const value = target[prop];
                return typeof value === "function"
                    ? (value).bind(target)
                    : value;
            },
        
            set: (target, prop, value) => {
                if (typeof prop === "symbol") {
                    throw new Error("Symbols are not allowed as property keys");
                }
                target[prop] = value;
                this.eventBus().emit(
                    Block.EVENTS.FLOW_CDU,
                    { ...target },
                    target
                );
                return true;
            },
            deleteProperty: () => {
                throw new Error("Нет доступа");
            },
        });
    }

    private _createDocumentElement(tagName: string): HTMLElement {
        const element = document.createElement(tagName);
        if (this._id) {
            element.setAttribute("data-id", this._id.toString()); 
        }
        return element;
    }
    public show(): void {
        this.getContent().style.display = this.savedDisplay;
    }

    public hide(): void {
        this.savedDisplay = this.getContent().style.display;
        console.log("hide prev route");
        this.getContent().style.display = "none"; 
    }
}

export default Block;
