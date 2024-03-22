import Handlebars from "handlebars";
import EventBus from "./eventBus";

interface Props {
    [key: string]: unknown;
}

interface Children {
    [key: string]: Block;
}

interface Lists {
    [key: string]: unknown[];
}

export default class Block {
    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_CDU: "flow:component-did-update",
        FLOW_RENDER: "flow:render"
    };

    private _element = null;
    private _id = Math.floor(100000 + Math.random() * 900000);
    private props: Props = {};
    private children: Children = {};
    private lists: Lists = {};
    private eventBus: () => EventBus;
    
    constructor(propsWithChildren = {}) {
        const eventBus = new EventBus();
        const {props, children, lists} = this._getChildrenPropsAndProps(propsWithChildren);
        this.props = this._makePropsProxy({...props});
        this.children = children;
        this.lists = lists;
        this.eventBus = () => eventBus;
        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }

    _addEvents() {
        const {events = {}} = this.props;
        Object.keys(events).forEach(eventName => {
            this._element.addEventListener(eventName, events[eventName]);} );
    }

    _registerEvents(eventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    init() {
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    _componentDidMount() {
        this.componentDidMount();
        Object.values(this.children).forEach(child => {child.dispatchComponentDidMount();});
    }

    componentDidMount(oldProps) {}

    dispatchComponentDidMount() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    _componentDidUpdate(oldProps, newProps) {
        console.log("_componentDidUpdate");
        const response = this.componentDidUpdate(oldProps, newProps);
        if (!response) {
            return;
        }
        this._render();
    }

    componentDidUpdate(oldProps, newProps) {
        return true;
    }

    _getChildrenPropsAndProps(propsAndChildren) {
        const children = {};
        const props = {};
        const lists = {};

        Object.entries(propsAndChildren).forEach(([key, value]) => {
            if (value instanceof Block) {
                children[key] = value;
            } else if(Array.isArray(value)) {
                lists[key] = value;
            } else {
                props[key] = value;
            }
        });

        return {children, props, lists};
    }

    addAttributes() {
        const {attr = {}} = this.props;

        Object.entries(attr).forEach(([key, value]) => {
            this._element.setAttribute(key, value);
        });
    }

    setProps = nextProps => {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    };

    get element() {
        return this._element;
    }

    _render() {
        const propsAndStubs = { ...this.props };
        const _tmpId =  Math.floor(100000 + Math.random() * 900000);
        Object.entries(this.children).forEach(([key, child]) => {
            propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
        });

        Object.entries(this.lists).forEach(([key, child]) => {
            console.log(`${child._id}`);
            propsAndStubs[key] = `<div data-id="__l_${_tmpId}"></div>`;
        });

        const fragment = this._createDocumentElement("template");
        fragment.innerHTML = Handlebars.compile(this.render())(propsAndStubs);

        //comment if you want to see
        Object.values(this.children).forEach(child => {
            const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
            stub.replaceWith(child.getContent());
        });

        Object.entries(this.lists).forEach(([key, child]) => {
            console.log("Object.entries(this.lists)");
            const listCont = this._createDocumentElement("template");
            console.log(child._id);
            child.forEach(item => {
                if (item instanceof Block) {
                    console.log(item.getContent());
                    listCont.content.append(item.getContent());
                } else {
                    listCont.content.append(`${item}`);
                }
            });
            console.log(fragment.content);
            // fragment.content.innerHTML = listCont.content;
            const stub = fragment.content.querySelector(`[data-id="__l_${_tmpId}"]`);
            stub.replaceWith(listCont.content);
        });

        const newElement = fragment.content.firstElementChild;
        if (this._element) {
            this._element.replaceWith(newElement);
        }
        this._element = newElement;
        this._addEvents();
    }

    render() {}

    getContent() {
        return this.element;
    }

    _makePropsProxy(props) {
        const self = this;

        return new Proxy(props, {
            get(target, prop) {
                const value = target[prop];
                return typeof value === "function" ? value.bind(target) : value;
            },
            set(target, prop, value) {
                const oldTarget = {...target};
                target[prop] = value;
                self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
                return true;
            },
            deleteProperty() {
                throw new Error("No access");
            }
        });
    }

    _createDocumentElement(tagName) {
        return document.createElement(tagName);
    }

    show() {
        this.getContent().style.display = "block";
    }

    hide() {
        this.getContent().style.display = "none";
    }
}
