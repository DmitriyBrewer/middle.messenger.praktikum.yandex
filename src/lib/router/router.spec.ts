import { expect } from "chai";
import { Router } from "./router"; 
import Block, { BlockProps } from "../block";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let global: any;

class MockBlock extends Block {
    constructor(props:BlockProps) {
        super("div", props);
    }

    render() {
        return this.compile("<div>HelloWOrld</div>", {});
    }
}

describe("Router", () => {
    let router:Router;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
    let pushStateArgs: any;
    
    beforeEach(() => {
        global.window = {
            history: {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                pushState: (...args: any) => {
                    pushStateArgs = args; // Save the arguments passed to pushState
                },
                back: () => {},
                forward: () => {}
            },
            location: {
                pathname: "/test"
            }
        };

        router = new Router(".root");
    });

    afterEach(() => {
        global.window = undefined;
        global.renderComponent = undefined;
    });

    it("Добавить новый маршрут, используя метод use", () => {
        router.use("/home", MockBlock);
        const route = router.getRoute("/home");
        expect(route?.getPathname()).to.equal("/home");
        expect(route?.getBlockClass()).to.equal(MockBlock);
    });

    it("Перейти к указанному маршруту без изменения window.location.pathname", () => {
        router.use("/home", MockBlock); 
        router.start();
        router.go("/test");
    
        const expectedPathname = "/test";
        const actualPathname = pushStateArgs[2];

        expect(actualPathname).to.equal(expectedPathname);

        expect(router.getCurrentPathname()).to.equal(expectedPathname);
    });

    it("Перейти к указанному маршруту", () => {
        const initialPath = router.getCurrentPathname();

        router.use("/", MockBlock);
        router.go("/test");

        router.back();
        expect(router.getCurrentPathname()).to.equal(initialPath);
    });
});
