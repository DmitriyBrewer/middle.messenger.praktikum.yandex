import { compiledTemplate } from "../compileTemplate";
import EventBus from "./eventBus";

export interface BlockProps {
    [key: string]: unknown;
}

type BlockFunction = (...args: unknown[]) => unknown;

class Block {
    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_CDU: "flow:component-did-update",
        FLOW_RENDER: "flow:render",
    };

    private _element: HTMLElement | null = null;
    private _meta: { tagName: string; props: BlockProps } | null = null;
    public props: BlockProps;
    private eventBus: () => EventBus;
    private _id: number | null = null;

    constructor(tagName = "div", propsAndChildren = {}) {
        console.log(propsAndChildren);
        const { children, props } = this._getChildren(propsAndChildren);
        this.children = children;
        console.log(props);
        const eventBus = new EventBus();
        this._meta = {
            tagName,
            props,
        };

        if (props.settings?.withInternalID) {
            this._id = Math.floor(100000 + Math.random() * 900000);
        }

        this.props = this._makePropsProxy({ ...props, __id: this._id });


        this.eventBus = () => eventBus;

        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }

    _getChildren(propsAndChildren) {
        const children = {};
        const props = {};

        Object.entries(propsAndChildren).forEach(([key, value]) => {
            if (value instanceof Block) {
                children[key] = value;
            } else {
                props[key] = value;
            }
        });
        return { children, props };
    }

    private _addEvents() {
        const {events = {}} = this.props;
    
        Object.keys(events).forEach(eventName => {
            this._element.addEventListener(eventName, events[eventName]);
        });
    }

    private _removeEvents(): void {

        if (this._element) {
            const { events = {} } = this.props;

            Object.keys(events).forEach(eventName => {
                this._element.removeEventListener(eventName, events[eventName]);
            });


        }
    }

    private _registerEvents(eventBus: EventBus): void {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, (args: unknown) => {
            this._componentDidMount(args as BlockProps);
        });

        // eventBus.on(Block.EVENTS.FLOW_CDU, (args: unknown) => {
        //     const [oldProps, newProps] = args as [BlockProps, BlockProps];
        //     this._componentDidUpdate(oldProps, newProps);
        // });
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
        this.componentDidMount();
        
        Object.values(this.children).forEach(child => {
            child.dispatchComponentDidMount();
        });
    }

    public componentDidMount(oldProps: BlockProps): void {
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

    compile(template, props) {
        const propsAndStubs = { ...props };
        const _tmpId =  Math.floor(100000 + Math.random() * 900000);

        console.log(this.children);
      
        Object.entries(this.children).forEach(([key, child]) => {
            if(Array.isArray(child)) {
                console.log(";uuu");
                propsAndStubs[key] = `<div data-id="__l_${_tmpId}"></div>`;
            } else
                propsAndStubs[key] = `<div data-id="${child.id}"></div>`;
        });
        
        const fragment = this._createDocumentElement("template");
        fragment.innerHTML = compiledTemplate(template, propsAndStubs);

        Object.values(this.children).forEach(child => {

            if(Array.isArray(child)) {
                const stub = fragment.content.querySelector(`[data-id="__l_${_tmpId}"]`);
                console.log(child._id);
                child.forEach(item => {
                    console.log(item);
                    if (item instanceof Block) {
                        stub.appendChild(item.getContent());
                    } else {
                        stub.replaceWith(`${item}`);
                    }
                });
            } else {  
                const stub = fragment.content.querySelector(`[data-id="${child.id}"]`);
                stub.replaceWith(child.getContent());
            }
        });

        return fragment.content;
    }

    public componentDidUpdate(
        oldProps: BlockProps,
        newProps: BlockProps
    ): boolean {
        return true;
    }

    public setProps = (nextProps: BlockProps): void => {
        if (!nextProps) {
            return;
        }

        const oldProps = { ...this.props }; 
        Object.assign(this.props, nextProps);
    
        this._componentDidUpdate(oldProps, this.props); 
    };

    get element(): HTMLElement | null {
        return this._element;
    }

    private _render(): void {

        const block = this.render(); 

        this._removeEvents();
        const fragment = block;

        const newElement = fragment.firstElementChild;

        if (this._element) {
            this._element.replaceWith(newElement);
        }

        this._element = newElement;

        this._addEvents();
    }

    public render(): string {
        return "";
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
                    ? (value as BlockFunction).bind(target)
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
        if(this._id) {
            element.setAttribute("data-id", this._id);
        } 
        return element;    
    }

    public show(): void {
        this.getContent().style.display = "block";
    }

    public hide(): void {
        this.getContent().style.display = "none";
    }
}

export default Block;
