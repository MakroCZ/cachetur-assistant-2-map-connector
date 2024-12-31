// ==UserScript==
// @name cachetur-assistant-2-map-connector
// @version 0.1.0
// @namespace https://cachetur.no/
// @description Companion script for cachetur.no map connector part
// @author Makro
// @homepage https://github.com/MakroCZ/cachetur-assistant-2-map-connector
// @icon https://cachetur.net/img/logo_top.png
// @license https://opensource.org/licenses/MIT
// @match https://www.geocaching.com/live/play/map*
// @match https://www.geocaching.com/map/*
// @match https://www.geocaching.com/play/geotours/*
// @match file:///*/gsak/html/*
// @match file:///*/html/*
// @match https://project-gc.com/*
// @match https://cachetur.no/bobilplasser
// @connect self
// @grant none
// ==/UserScript==

/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 509:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CT_PageHandlerBase = void 0;
const PageHandlerBase_1 = __webpack_require__(795);
class CT_PageHandlerBase extends PageHandlerBase_1.PageHandlerBase {
}
exports.CT_PageHandlerBase = CT_PageHandlerBase;


/***/ }),

/***/ 739:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CT_RVSites_PageHandler = void 0;
const CT_PageHandlerBase_1 = __webpack_require__(509);
class CT_RVSites_PageHandler extends CT_PageHandlerBase_1.CT_PageHandlerBase {
    grabLeafletMap() {
        throw new Error("Method not implemented.");
    }
}
exports.CT_RVSites_PageHandler = CT_RVSites_PageHandler;


/***/ }),

/***/ 775:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GSAK_PageHandler = void 0;
const PageHandlerBase_1 = __webpack_require__(795);
class GSAK_PageHandler extends PageHandlerBase_1.PageHandlerBase {
    grabLeafletMap() {
        throw new Error("Method not implemented.");
    }
}
exports.GSAK_PageHandler = GSAK_PageHandler;


/***/ }),

/***/ 547:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GC_BrowseMap_PageHandler = void 0;
const GC_PageHandlerBase_1 = __webpack_require__(817);
class GC_BrowseMap_PageHandler extends GC_PageHandlerBase_1.GC_PageHandlerBase {
    grabLeafletMap() {
        var _a;
        this.leafletMapObject = (_a = window.MapSettings) === null || _a === void 0 ? void 0 : _a.Map;
    }
}
exports.GC_BrowseMap_PageHandler = GC_BrowseMap_PageHandler;


/***/ }),

/***/ 817:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GC_PageHandlerBase = void 0;
const PageHandlerBase_1 = __webpack_require__(795);
class GC_PageHandlerBase extends PageHandlerBase_1.PageHandlerBase {
}
exports.GC_PageHandlerBase = GC_PageHandlerBase;


/***/ }),

/***/ 89:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GC_SearchMap_PageHandler = void 0;
const GC_PageHandlerBase_1 = __webpack_require__(817);

class GC_SearchMap_PageHandler extends GC_PageHandlerBase_1.GC_PageHandlerBase {
    constructor() {
        super();
    }
    findMap() {
        const mapDiv = document.createElement("div");
        mapDiv.id = "testMap";
        document.body.appendChild(mapDiv);
        const targetPrototypeObject = L.map("testMap");
        console.log(targetPrototypeObject);
        const targetPrototype = Object.getPrototypeOf(targetPrototypeObject);
        console.log(targetPrototype);
        const processed = new Set();
        const processing = [{ path: "window", object: window }];
        const maps = [];
        console.log("Before loop");
        while (processing.length > 0) {
            const current = processing.pop();
            if (processed.has(current.object)) {
                continue;
            }
            if (current.path.includes("__SENTRY__")) {
                continue;
            }
            if (Object.getPrototypeOf(current.object) === targetPrototype) {
                console.log("Found same prototype");
                console.log(current);
                maps.push({ path: current.path, object: current === null || current === void 0 ? void 0 : current.object });
            }
            const keys = Object.keys(current.object);
            for (const key of keys) {
                const newPath = current.path + "." + key;
                const newObject = current.object[key];
                if (newObject === undefined || newObject === null) {
                    continue;
                }
                processing.push({ path: newPath, object: newObject });
            }
            processed.add(current.object);
        }
        console.log("After loop");
        if (maps.length > 0) {
            return maps[0].object;
        }
        return null;
    }
    grabLeafletMap() {
        console.log("Trying to grab leaflet map object");
        this.leafletMapObject = this.findMap();
    }
}
exports.GC_SearchMap_PageHandler = GC_SearchMap_PageHandler;


/***/ }),

/***/ 795:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PageHandlerBase = void 0;

class PageHandlerBase {
    constructor() {
        this.leafletMapObject = null;
        this.cacheturCacheLayer = null;
        this.cacheturWaypointLayer = null;
        this.cacheturRouteLayer = null;
        this.showTripData = async (data) => {
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
        };
    }
    getLeafletMap() {
        if (this.leafletMapObject == null) {
            this.grabLeafletMap();
        }
        if (this.leafletMapObject == null) {
            throw new Error("Leaflet map object was not gathered");
        }
        return this.leafletMapObject;
    }
    showCachesOnMap(cacheData) {
        console.log("Adding caches from cachetur.no");
        if (this.cacheturCacheLayer) {
            this.getLeafletMap().removeLayer(this.cacheturCacheLayer);
        }
        console.log("Cache data received, constructing markers");
        let markers = [];
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
    fitBounds() {
        if (this.cacheturRouteLayer) {
            this.getLeafletMap().fitBounds(this.cacheturRouteLayer.getBounds());
        }
    }
}
exports.PageHandlerBase = PageHandlerBase;


/***/ }),

/***/ 338:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PGC_Map_PageHandler = void 0;
const PGC_PageHandlerBase_1 = __webpack_require__(606);
class PGC_Map_PageHandler extends PGC_PageHandlerBase_1.PGC_PageHandlerBase {
    grabLeafletMap() {
        if (window.PGC_LiveMap) {
            this.leafletMapObject = window.PGC_LiveMap.map;
        }
        if (window.freeDraw) {
            this.leafletMapObject = window.freeDraw.map;
        }
    }
}
exports.PGC_Map_PageHandler = PGC_Map_PageHandler;


/***/ }),

/***/ 606:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PGC_PageHandlerBase = void 0;
const PageHandlerBase_1 = __webpack_require__(795);
class PGC_PageHandlerBase extends PageHandlerBase_1.PageHandlerBase {
}
exports.PGC_PageHandlerBase = PGC_PageHandlerBase;


/***/ }),

/***/ 707:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PGC_VirtualGPS_PageHandler = void 0;
const PGC_PageHandlerBase_1 = __webpack_require__(606);
class PGC_VirtualGPS_PageHandler extends PGC_PageHandlerBase_1.PGC_PageHandlerBase {
    grabLeafletMap() {
        throw new Error("Method not implemented.");
    }
}
exports.PGC_VirtualGPS_PageHandler = PGC_VirtualGPS_PageHandler;


/***/ }),

/***/ 307:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Settings = void 0;
class Settings {
    constructor() {
        this._bc = undefined;
        this.pageHandler = undefined;
    }
    static Instance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new Settings();
        return this.instance;
    }
    get bc() {
        if (this._bc === undefined) {
            throw new Error("Trying to access broadcast channel before initialization");
        }
        return this._bc;
    }
    set bc(value) {
        this._bc = value;
    }
    getPageHandler() {
        if (this.pageHandler === undefined) {
            throw new Error("Trying to access page handler before initialization");
        }
        return this.pageHandler;
    }
    setPageHandler(newPageHandler) {
        this.pageHandler = newPageHandler;
    }
}
exports.Settings = Settings;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
const GC_BrowseMap_PageHandler_1 = __webpack_require__(547);
const GC_SearchMap_PageHandler_1 = __webpack_require__(89);
const GSAK_PageHandler_1 = __webpack_require__(775);
const PGC_Map_PageHandler_1 = __webpack_require__(338);
const PGC_VirtualGPS_PageHandler_1 = __webpack_require__(707);
const CT_RVSites_PageHandler_1 = __webpack_require__(739);
const Settings_1 = __webpack_require__(307);
const bc = new BroadcastChannel("cachetur-assistant-map-connector");
Settings_1.Settings.Instance().bc = bc;
console.log("cache clean");
const pathname = window.location.pathname;
const domain = window.location.hostname;
const href = window.location.href;
window.addEventListener("load", main);
function main() {
    window.removeEventListener("load", main);
    console.log("Starting cachetur assistant 2 map connector ");
    if (domain === "www.geocaching.com") {
        if (pathname.indexOf("/map/") > -1) {
            Settings_1.Settings.Instance().setPageHandler(new GC_BrowseMap_PageHandler_1.GC_BrowseMap_PageHandler());
        }
        else if (pathname.indexOf("/play/map") > -1) {
            Settings_1.Settings.Instance().setPageHandler(new GC_SearchMap_PageHandler_1.GC_SearchMap_PageHandler());
        }
    }
    else if (href.indexOf("/html/") > -1) {
        Settings_1.Settings.Instance().setPageHandler(new GSAK_PageHandler_1.GSAK_PageHandler());
    }
    else if (pathname.startsWith("/bobilplasser/")) {
        Settings_1.Settings.Instance().setPageHandler(new CT_RVSites_PageHandler_1.CT_RVSites_PageHandler());
    }
    else if (domain === "project-gc.com" &&
        pathname.indexOf("/User/VirtualGPS") > -1 &&
        window.location.search.indexOf("?map=") === -1) {
        Settings_1.Settings.Instance().setPageHandler(new PGC_VirtualGPS_PageHandler_1.PGC_VirtualGPS_PageHandler());
    }
    else if (domain === "project-gc.com") {
        Settings_1.Settings.Instance().setPageHandler(new PGC_Map_PageHandler_1.PGC_Map_PageHandler());
    }
    else {
        throw new Error("Allowed but unsupported page");
    }
    Settings_1.Settings.Instance().bc.onmessage = handleCommunication;
}
function handleCommunication(event) {
    const command = event.data.command;
    const data = event.data.data;
    const pageHandler = Settings_1.Settings.Instance().getPageHandler();
    switch (command) {
        case "showCachesOnMap":
            pageHandler.showCachesOnMap(data);
            break;
        case "fitBounds":
            pageHandler.fitBounds();
            break;
        case "showTripData":
            pageHandler.showTripData(data);
            break;
        default:
            console.error("Unknown command encountered", command);
    }
}

})();

/******/ })()
;