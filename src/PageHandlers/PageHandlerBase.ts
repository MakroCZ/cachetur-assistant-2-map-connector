import * as L from "leaflet";

/**
 * "Abstract" base class for individual page handlers (GC cache detail, GC old map, GC new map, PGC, ...)
 */
export abstract class PageHandlerBase {

    protected leafletMapObject: L.Map | null = null;
    protected cacheturCacheLayer: L.LayerGroup | null = null;
    protected cacheturWaypointLayer: L.LayerGroup | null = null;
    protected cacheturRouteLayer: L.Polyline | null = null;

    abstract grabLeafletMap(): void;

    protected getLeafletMap() {
        if (this.leafletMapObject == null) {
            this.grabLeafletMap();
        }
        if (this.leafletMapObject == null) {
            throw new Error("Leaflet map object was not gathered");
        }
        return this.leafletMapObject;
    }

    public showCachesOnMap(cacheData: any[]) {
        console.log("Adding caches from cachetur.no");

        if (this.cacheturCacheLayer) {
            this.getLeafletMap().removeLayer(this.cacheturCacheLayer);
        }

        console.log("Cache data received, constructing markers");

        let markers: L.Marker[] = [];
        for (let item of cacheData) {
            const icon = L.divIcon({
                className: "cachetur-map_marker",
                iconSize: [18, 18],
                html: `<div class="cachetur-map_marker_symbol" title="${item.name}">
                            <img src="${item.typeicon}"/>
                      </div>
                      <span class="label label-default"></span>`
            });

            const newWP = L.marker([item.lat, item.lon], { icon: icon });
            markers.push(newWP);
        }

        this.cacheturCacheLayer = L.layerGroup(markers);
        console.log("Injecting caches");
        this.getLeafletMap().addLayer(this.cacheturCacheLayer);
    }

    public fitBounds() {
        if (this.cacheturRouteLayer) {
            this.getLeafletMap().fitBounds(
                this.cacheturRouteLayer.getBounds()
            );
        }
    }

    public showTripData = async (data: any) => {
        const routeData = data.routeData;
        if (this.cacheturRouteLayer) {
            this.getLeafletMap().removeLayer(this.cacheturRouteLayer);
        }

        console.log("Route data received, constructing route");
        this.cacheturRouteLayer = L.polyline(routeData, {
            color: "purple",
        });
        this.cacheturRouteLayer.getAttribution = function () {
            return 'Directions powered by <a href="https://www.graphhopper.com/" target="_blank">GraphHopper API</a>, delivered by <a href="https://cachetur.no">cachetur.no</a>';
        };

        console.log("Injecting route");
        this.getLeafletMap().addLayer(this.cacheturRouteLayer);

        const waypointData = data.waypointData;
        if (this.cacheturWaypointLayer) {
            this.getLeafletMap().removeLayer(this.cacheturWaypointLayer);
        }

        const markers = [];
        for (const item of waypointData) {
            const icon = L.divIcon({
                className: "cachetur-map_marker",
                iconSize: [18, 18],
                html: `<div class="cachetur-map_marker_symbol" title="${item.name}">
                            <img src="${item.typeicon}"/>
                      </div>
                      <span class="label label-default"></span>`
            });

            const newWP = L.marker([item.lat, item.lon], { icon: icon });
            markers.push(newWP);
        }

        this.cacheturWaypointLayer = L.layerGroup(markers);
        console.log("Injecting waypoints");
        this.getLeafletMap().addLayer(this.cacheturWaypointLayer);
    }

}