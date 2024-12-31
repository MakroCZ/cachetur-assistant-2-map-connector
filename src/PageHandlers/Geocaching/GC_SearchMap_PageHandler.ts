import { GC_PageHandlerBase } from "./GC_PageHandlerBase";
import * as L from "leaflet";

export class GC_SearchMap_PageHandler extends GC_PageHandlerBase {

    constructor() {
        super();
    }
    
    private findMap() : L.Map | null {
        const mapDiv = document.createElement("div");
        mapDiv.id = "testMap";
        document.body.appendChild(mapDiv);
        const targetPrototypeObject = L.map("testMap");
        console.log(targetPrototypeObject);
        const targetPrototype = Object.getPrototypeOf(targetPrototypeObject);
        console.log(targetPrototype);
    
        const processed = new Set();
        const processing : Array<{path: string, object: any}> = [{path: "window", object: window}];
        const maps : Array<{path: string, object: any}> = [];

        console.log("Before loop");
        while (processing.length > 0) {
            //console.log("Inside loop");
            const current = processing.pop();
            if (processed.has(current!.object)) {
                continue;
            }
            if (current!.path.includes("__SENTRY__")) {
                continue;
            }
            //console.log(current);
    
            if (Object.getPrototypeOf(current!.object) === targetPrototype) {
                console.log("Found same prototype");
                console.log(current);
                maps.push({path: current!.path, object: current?.object});
            }
    
            const keys = Object.keys(current!.object);
            //console.log(keys);
            for (const key of keys) {
                const newPath = current!.path + "." + key;
                const newObject = current!.object[key];
                if (newObject === undefined || newObject === null) {
                    continue;
                }
                //console.log(newPath);
                processing.push({path: newPath, object: newObject});
            }
            processed.add(current!.object);
        }
        console.log("After loop");
        if (maps.length > 0) {
            return maps[0].object;
        }
        return null;
    }

    grabLeafletMap(): void {
        console.log("Trying to grab leaflet map object");
        this.leafletMapObject = this.findMap();
    }
}