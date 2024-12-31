import { GC_BrowseMap_PageHandler } from "./PageHandlers/Geocaching/GC_BrowseMap_PageHandler";
import { GC_SearchMap_PageHandler } from "./PageHandlers/Geocaching/GC_SearchMap_PageHandler";

import { GSAK_PageHandler } from "./PageHandlers/GSAK/GSAK_PageHandler";

import { PGC_Map_PageHandler } from "./PageHandlers/ProjectGC/PGC_Map_PageHandler";

import { CT_RVSites_PageHandler } from "./PageHandlers/Cachetur/CT_RVSites_PageHandler";

import { Settings } from "./Settings";


const bc = new BroadcastChannel("cachetur-assistant-map-connector");
Settings.Instance().bc = bc;

const pathname = window.location.pathname;
const domain = window.location.hostname;
const href = window.location.href;

window.addEventListener("load", main);


function main() {
    window.removeEventListener("load", main);
    console.log("Starting cachetur assistant 2 map connector ");
    if (domain === "www.geocaching.com") {
        if (pathname.indexOf("/map/") > -1) {
            Settings.Instance().setPageHandler(new GC_BrowseMap_PageHandler());
        } else if (pathname.indexOf("/play/map") > -1) {
            Settings.Instance().setPageHandler(new GC_SearchMap_PageHandler());
        }
    } else if (href.indexOf("/html/") > -1) {
        Settings.Instance().setPageHandler(new GSAK_PageHandler());
    } else if (pathname.startsWith("/bobilplasser/")) {
        Settings.Instance().setPageHandler(new CT_RVSites_PageHandler());
    } else if (domain === "project-gc.com") {
        Settings.Instance().setPageHandler(new PGC_Map_PageHandler());
    } else {
        throw new Error("Allowed but unsupported page");
    }
    Settings.Instance().bc.onmessage = handleCommunication;
}

function handleCommunication(event : any) {
    const command = event.data.command;
    const data = event.data.data;
    const pageHandler = Settings.Instance().getPageHandler();
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