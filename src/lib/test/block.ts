import EventBus from "./eventBus";

export interface BlockProps {
    [key: string]: string | boolean | number ;
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
    private children: Block[] = [];

    constructor(tagName: string = "div", props: BlockProps = {}, children: Block[] = []) {
        const eventBus = new EventBus();
        this._meta = {
            tagName,
            props,
        };

        this.props = this._makePropsProxy(props);

        this.eventBus = () => eventBus;

        this.children = children;

        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }

    private _registerEvents(eventBus: EventBus): void {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, (args: unknown) => {
            this._componentDidMount(args as BlockProps);
        });

        // eventBus.on(Block.EVENTS.FLOW_CDU, (args: unknown) => {
        //     console.log(args);
        //     // const [oldProps, newProps] = args as [BlockProps, BlockProps];
        //     this._componentDidUpdate(args as unknown);
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
        this.componentDidMount(oldProps);
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
            console.log("lsm,ds");
            return;
        }
        console.log("s");
        this._render();
    }

    public componentDidUpdate(
        oldProps: BlockProps,
        newProps: BlockProps
    ): boolean {
        console.log(oldProps);
        console.log(newProps);
        return true;
    }

    public setProps = (nextProps: BlockProps): void => {
        if (!nextProps) {
            return;
        }
        Object.assign(this.props, nextProps);
    };

    get element(): HTMLElement | null {
        return this._element;
    }

    private _render(): void {
        // const block = this.render();
        // this._element!.innerHTML = block;
        const content = this.render();
        if (this.children.length > 0) {
            const childrenContent = this.children.map(child => child.render()).join("");
            this._element!.innerHTML = content + childrenContent;
        } else {
            this._element!.innerHTML = content;
        }
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
        return document.createElement(tagName);
    }

    public show(): void {
        this.getContent().style.display = "block";
    }

    public hide(): void {
        this.getContent().style.display = "none";
    }
}

export default Block;
