import { GC_PageHandlerBase } from "./GC_PageHandlerBase";
import * as L from "leaflet";

export class GC_BrowseMap_PageHandler extends GC_PageHandlerBase {

    grabLeafletMap() : void {
        this.leafletMapObject = (window as any).MapSettings?.Map as L.Map;
    }
}