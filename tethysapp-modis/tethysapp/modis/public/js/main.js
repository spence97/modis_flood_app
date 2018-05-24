/*****************************************************************************
 * FILE:    MODIS Flood Viewer MAIN JS
 * DATE:    12/13/2017
 * AUTHOR: Spencer McDonald
 * COPYRIGHT:
 * LICENSE:
 *****************************************************************************/

/*****************************************************************************
 *                      LIBRARY WRAPPER
 *****************************************************************************/

var LIBRARY_OBJECT = (function() {
    // Wrap the library in a package function
    "use strict"; // And enable strict mode for this library

    /************************************************************************
     *                      MODULE LEVEL / GLOBAL VARIABLES
     *************************************************************************/
    var map,
        public_interface,			// Object returned by the module
        layers,
        layer_names,
        opacityLevel,
        toggle = "on";


    layers = [];
    layer_names = ['gpm30min', 'gpm24hr', 'gpm7d', 'trmm3hr', 'trmm72hr', 'trmmFloodPot', 'gfsFloodPot',' geos5FloodPot', 'nasaFloodPot', 'mekongStem', 'rivGage', 'dams', 'traffic', 'rainAve', 'rainAnom', 'modis']
    // GPM
    layers [0] = new google.maps.KmlLayer('http://arthurhou.pps.eosdis.nasa.gov/THORonline/imergKML/realtimeIMERG.30min.kml',{preserveViewport: true, suppressInfoWindows: true});
    layers [1] = new google.maps.KmlLayer('http://arthurhou.pps.eosdis.nasa.gov/THORonline/imergKML/realtimeIMERG.1day.kml',{preserveViewport: true, suppressInfoWindows: true});
    layers [2] = new google.maps.KmlLayer('http://arthurhou.pps.eosdis.nasa.gov/THORonline/imergKML/realtimeIMERG.7day.kml',{preserveViewport: true, suppressInfoWindows: true});

    // Anomalies
    layers [13] = new google.maps.KmlLayer('http://trmm.gsfc.nasa.gov/trmm_rain/Events/30_day_average.kml',{preserveViewport: true, suppressInfoWindows: false});
    layers [14] = new google.maps.KmlLayer('http://trmm.gsfc.nasa.gov/trmm_rain/Events/30_day_anomaly.kml',{preserveViewport: true, suppressInfoWindows: false});

    // TRMM
    layers [3] = new google.maps.KmlLayer('http://trmm.gsfc.nasa.gov/trmm_rain/Events/GOOGLE_SOUTHEAST_ASIA_rain_accumulation_3hr.kml',{preserveViewport: true, suppressInfoWindows: true});
    layers [4] = new google.maps.KmlLayer('http://trmm.gsfc.nasa.gov/trmm_rain/Events/3B42_rain_accumulation_72hr_b.kml',{preserveViewport: true, suppressInfoWindows: true});

    // Hydro models
    layers [5] = new google.maps.KmlLayer('http://trmm.gsfc.nasa.gov/trmm_rain/Events/trmm_google_hydro_model_b.kml',{preserveViewport: true, suppressInfoWindows: true});
    layers [6] = new google.maps.KmlLayer('http://trmm.gsfc.nasa.gov/trmm_rain/Events/trmm_google_24plus_hydro_model.kml',{preserveViewport: true, suppressInfoWindows: true});
    layers [7] = new google.maps.KmlLayer('http://trmm.gsfc.nasa.gov/trmm_rain/Events/trmm_google_24plusG5_hydro_model.kml',{preserveViewport: true, suppressInfoWindows: true});
    layers [8] = new google.maps.KmlLayer('http://trmm.gsfc.nasa.gov/trmm_rain/Events/trmm_google_G5_extended_hydro_model.kml',{preserveViewport: true, suppressInfoWindows: true});

    // Others
    layers [9] = new google.maps.KmlLayer('http://sharemap.org/mapcontent/library/Rivers_50m/Mekong_river_river.kml',{preserveViewport: true, suppressInfoWindows: true});
    layers [10] = new google.maps.KmlLayer('http://matsu-seasia.opensciencedatacloud.org//layers/file/1574',{preserveViewport: true, suppressInfoWindows: false});
    layers [11] = new google.maps.KmlLayer('http://matsu-seasia.opensciencedatacloud.org//layers/file/1573',{preserveViewport: true, suppressInfoWindows: false});
    layers [12] = new google.maps.TrafficLayer();


    /************************************************************************
     *                    PRIVATE FUNCTION DECLARATIONS
     *************************************************************************/
    var initMap,
        toggleKML,
        toggleLayer,
        overlayWMS;


    /************************************************************************
     *                    PRIVATE FUNCTION IMPLEMENTATIONS
     *************************************************************************/

    initMap = function() {
        var mapCenter = new google.maps.LatLng(14.75, 103.0);
        var myOptions = {
            zoom: 6,
            center: mapCenter,
            mapTypecontrol: true,
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                position: google.maps.ControlPosition.TOP_RIGHT
            },
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        map = new google.maps.Map(document.getElementById("map"), myOptions)
        for (var i = 0; i < layers.length; i++) {
            layers[i].setMap(null);
        }

        loadWMS(map, WMSURL, customParams);
    }

    toggleKML = function(i) {
        if (layers[i].getMap() === null) {
            layers[i].setMap(map);
        } else {
            layers[i].setMap(null);
        }
    }

    toggleLayer = function() {
        if (toggle == "off") {
            loadWMS(map, WMSURL, customParams);
            toggle = "on";
        } else {
            map.overlayMapTypes.setAt(0, null);
            toggle = "off";
        }
    }



    /************************************************************************
     *                        DEFINE PUBLIC INTERFACE
     *************************************************************************/

    public_interface = {

    };

    /************************************************************************
     *                  INITIALIZATION / CONSTRUCTOR
     *************************************************************************/

    // Initialization: jQuery function that gets called when
    // the DOM tree finishes loading
    $(function() {
        initMap();

        $("input").click(function(){
            var checkId = $(this).attr('id');
            var i = layer_names.indexOf(checkId);
            if (i == 15) {
                console.log(i);
                toggleLayer();
            } else {
                toggleKML(i);
                console.log(i);
            }
        });
    });

    return public_interface;

}()); // End of package wrapper
// NOTE: that the call operator (open-closed parenthesis) is used to invoke the library wrapper
// function immediately after being parsed.


// Open Layers stuff
//    init_map = function() {
//        var projection = ol.proj.get('EPSG:4326');
//        var baseLayer = new ol.layer.Tile({
//            source: new ol.source.BingMaps({
//                key: '5TC0yID7CYaqv3nVQLKe~xWVt4aXWMJq2Ed72cO4xsA~ApdeyQwHyH_btMjQS1NJ7OHKY8BK-W-EMQMrIavoQUMYXeZIQOUURnKGBOC7UCt4',
//                imagerySet: 'Road' // Options 'Aerial', 'AerialWithLabels', 'Road'
//            })
//        });
//
//        var view = new ol.View({
//            center: [101, 15],
//            projection: projection,
//            zoom: 6
//        });
//
//        map = new ol.Map({
//            target: document.getElementById("map"),
//            layers: [baseLayer],
//            view: view
//        });
//
//        console.log(map.getLayers())
//
//        map.crossOrigin = 'anonymous';
//
//
//    };
//
//    init_all = function(){
//        init_map();
//    };
//
//    layer_urls = []
//    layer_names = []
//
////  GPM
//    layer_urls [0] = 'http://arthurhou.pps.eosdis.nasa.gov/THORonline/imergKML/realtimeIMERG.30min.kml';
//    layer_names [0] = 'gpm30min'
//    layer_urls [1] = 'http://arthurhou.pps.eosdis.nasa.gov/THORonline/imergKML/realtimeIMERG.1day.kml';
//    layer_names [1] = 'gpm24hr'
//    layer_urls [2] = 'http://arthurhou.pps.eosdis.nasa.gov/THORonline/imergKML/realtimeIMERG.7day.kml';
//    layer_names [2] = 'gpm7d'
//    layer_urls [9] = 'http://sharemap.org/mapcontent/library/Rivers_50m/Mekong_river_river.kml';
//    layer_names [9] = 'mekongStem'
//
//
//
//    toggleLayer = function(){
//        wms_source = new ol.source.ImageWMS({
//            url: 'http://localhost:8080/geoserver/wms',
//            params: {'LAYERS':'modis_flood:flood_example'},
//            serverType: 'geoserver',
//            crossOrigin: 'Anonymous'
//        });
//
//        wms_layer = new ol.layer.Image({
//            source: wms_source
//        });
//
//
//        map.addLayer(wms_layer);
//    };
//
//
//    function toggleKML(i) {
//        kml_source = new ol.source.Vector({
//            url: layer_urls [i],
//            format: new ol.format.KML()
//        })
//
//        kml_layer = new ol.layer.Vector({
//            source: kml_source
//        })
//        console.log(map.getLayers())
//        map.addLayer(kml_layer)
//    }