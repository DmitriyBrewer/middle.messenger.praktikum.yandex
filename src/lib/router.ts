import Block, { BlockProps } from "./block";
import isEqual from "./isEqual";
import renderComponent from "./renderComponent";

type BlockClass = new (props: BlockProps) => Block;

type Pathname = string
class Route {
    private _pathname: Pathname;
    private _blockClass: BlockClass;
    private _block: Block | null;
    private _props: BlockProps;

    constructor(pathname:Pathname, view: BlockClass, props: BlockProps) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }
  
    navigate(pathname: Pathname) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }
  
    leave() {
        if (this._block) {
            this._block.hide();
        }
    }
  
    match(pathname:Pathname) {
        return isEqual(pathname, this._pathname);
    }
  
    render() {
        if (!this._block) {
            this._block = new this._blockClass();
            renderComponent((this._props.rootQuery as string), this._block);
            return;
        }
  
        this._block.show();
    }
}
  
export class Router {
    private routes: Route[] | undefined;
    private history: History | undefined;
    private _currentRoute: Route | null | undefined;
    private _rootQuery: string | undefined;

    constructor(rootQuery: string) {
        // @ts-nocheck
        if (Router.__instance) {
            return Router.__instance;
        }
  
        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;
  
        Router.__instance = this;
    }
  
    use(pathname: Pathname, block: BlockClass) {
        const route = new Route(pathname, block, {rootQuery: this._rootQuery});
  
        (this.routes as Route[]).push(route);
        console.log(this);
  
        return this;
    }
  
    start() {
        window.onpopstate = ((event:Event) => {
            this._onRoute(event.currentTarget.location.pathname);
        }).bind(this);
  
        this._onRoute(window.location.pathname);
    }
  
    _onRoute(pathname:Pathname) {
        const route = this.getRoute(pathname);
        if (!route) {
            return;
        }
  
        if (this._currentRoute && this._currentRoute !== route) {
            this._currentRoute.leave();
        }
  
        this._currentRoute = route;
        route.render(route, pathname);
    }
  
    go(pathname: Pathname) {
        (this.history as History).pushState({}, "", pathname);
        this._onRoute(pathname);
    }
  
    back() {
        (this.history as History).back();
    }
  
    forward() {
        (this.history as History).forward();
    }
  
    getRoute(pathname: Pathname) {
        return (this.routes as Route[]).find(route => route.match(pathname));
    }
}
