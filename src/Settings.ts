import { PageHandlerBase } from "./PageHandlers/PageHandlerBase";

export class Settings {
    private static instance : Settings;
    
    static Instance() : Settings {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new Settings();
        return this.instance;
    }

    private _bc: BroadcastChannel | undefined = undefined;
    public get bc(): BroadcastChannel {
        if (this._bc === undefined) {
            throw new Error("Trying to access broadcast channel before initialization");
        }
        return this._bc;
    }
    public set bc(value: BroadcastChannel | undefined) {
        this._bc = value;
    }

    private pageHandler : PageHandlerBase | undefined = undefined;
    getPageHandler() : PageHandlerBase {
        if (this.pageHandler === undefined) {
            throw new Error("Trying to access page handler before initialization");
        }
        return this.pageHandler;
    }
    setPageHandler(newPageHandler : PageHandlerBase) {
        this.pageHandler = newPageHandler;
    }
}