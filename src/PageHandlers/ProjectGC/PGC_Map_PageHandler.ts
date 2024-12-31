import { PGC_PageHandlerBase } from "./PGC_PageHandlerBase";

export class PGC_Map_PageHandler extends PGC_PageHandlerBase {

    grabLeafletMap(): void {
        if ((window as any).PGC_LiveMap) {
            this.leafletMapObject = (window as any).PGC_LiveMap.map;
        }

        // TODO: Why?
        if ((window as any).freeDraw) {
            this.leafletMapObject = (window as any).freeDraw.map;
        }
    }
}