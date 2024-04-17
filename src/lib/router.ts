import Block, { BlockProps } from "./block";
import isEqual, { PlainObject } from "./isEqual";
import renderComponent from "./renderComponent";

export type BlockClass = new (props: BlockProps) => Block;

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
            this.render(this._props);
        }
    }
  
    leave() {
        if (this._block) {
            this._block.hide();
        }
    }
  
    match(pathname:Pathname) {
        const pathnameObject: PlainObject<string> = { pathname };
        const thisPathnameObject: PlainObject<string> = { pathname: this._pathname };
        return isEqual(pathnameObject, thisPathnameObject);
    }
  
    render(props: BlockProps) {
        if (!this._block) {
            this._block = new this._blockClass(props);
            renderComponent((this._props.rootQuery as string), this._block);
            return;
        }
    
        this._block.show();
    }
}
  
export class Router {
    private static __instance: Router | null = null;
    private routes: Route[] | undefined;
    private history: History | undefined;
    private _currentRoute: Route | null | undefined;
    private _rootQuery: string | undefined;

    constructor(rootQuery: string) {
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
        return this;
    }
  
    start() {
        window.onpopstate = (event: PopStateEvent) => {
            if (event.currentTarget instanceof Window) {
                this._onRoute(event.currentTarget.location.pathname);
            }
        };
    
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
        route.render({pathname});
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

    getCurrentPathname() {
        return window.location.pathname;
    }
}
