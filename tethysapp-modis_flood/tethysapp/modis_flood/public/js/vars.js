WMSURL = "http://216.218.240.206:8080/geoserver/new_flood/wms?"

customParams = [
	"FORMAT=image%2Fpng",
	"LAYERS=new_flood:new_flood",
	"SRS=EPSG:900913"
];

tileHeight = 256;
tileWidth = 256;

wmsStandardParams = [
	"REQUEST=GetMap",
	"SERVICE=WMS&",
	"VERSION=1.3.0",
	"TRANSPARENT=TRUE",
	"BGCOLOR=0xFFFFFF",
	"WIDTH="+ tileWidth,
	"HEIGHT="+ tileHeight
];