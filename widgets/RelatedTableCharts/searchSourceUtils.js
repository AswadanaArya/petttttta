// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
define("dojo/_base/lang dojo/_base/array dojo/Deferred dojo/when dojo/promise/all jimu/portalUtils esri/lang esri/request".split(" "),function(f,m,r,t,n,u,p,v){return{map:null,layerInfosObj:null,appConfig:null,_esriLocatorRegExp:/geocode(.){0,3}\.arcgis.com\/arcgis\/rest\/services\/World\/GeocodeServer/g,setMap:function(a){this.map=a},setLayerInfosObj:function(a){this.layerInfosObj=a},setAppConfig:function(a){this.appConfig=a},getConfigInfo:function(a){if(a&&a.sources&&0<a.sources.length){var c=null;
return this.searchLayer(this.map)&&a.upgradeFromGeocoder?(c=this.map.itemInfo.itemData.applicationProperties.viewing.search,c=m.map(c.layers,f.hitch(this,function(b,e){e.hintText=b;return this._getQueryTypeGeocoder(e)},c.hintText)),n(c).then(f.hitch(this,function(b){a.sources=[].concat(b).concat(a.sources);return a}))):a}return t(this._getSoucesFromPortalAndWebmap()).then(f.hitch(this,function(b){return{allPlaceholder:"",showInfoWindowOnSelect:!0,sources:b}}))},_getSoucesFromPortalAndWebmap:function(){var a=
[],c=null;this.searchLayer(this.map)&&(c=this.map.itemInfo.itemData.applicationProperties.viewing.search,m.forEach(c.layers,f.hitch(this,function(b,e){e.hintText=b;a.push(this._getQueryTypeGeocoder(e))},c.hintText)));return u.getPortalSelfInfo(this.appConfig.portalUrl).then(f.hitch(this,function(b){if((b=b.helperServices&&b.helperServices.geocode)&&0<b.length)for(var e=0,g=b.length;e<g;e++){var h=b[e];h&&a.push(this._processSingleLine(h))}return n(a).then(f.hitch(this,function(q){for(var k=[],l=0;l<
q.length;l++){var d=q[l];d&&(d&&"query"===d.type?k.push(d):(d={name:d.name||this._getGeocodeName(d.url),url:d.url,singleLineFieldName:d.singleLineFieldName,placeholder:d.placeholder||d.name||this._getGeocodeName(d.url),maxResults:6,searchInCurrentMapExtent:!1,type:"locator"},d.enableLocalSearch=this._isEsriLocator(d.url),d.localSearchMinScale=3E5,d.localSearchDistance=5E4,k.push(d)))}return k}))}))},_getQueryTypeGeocoder:function(a){var c=this.map.getLayer(a.id),b=null,e=null,g=null;g=p.isDefined(a.subLayer)?
a.id+"_"+a.subLayer:a.id;b=this.layerInfosObj.traversal(function(h){return h.id===g?(e=h,!0):!1});return c&&b&&e?(b=p.isDefined(a.subLayer)?e.url||c.url+"/"+a.subLayer:e.url||c.url,{name:e.title,layerId:g,url:b,placeholder:a.hintText,searchFields:[a.field.name],displayField:a.field.name,exactMatch:a.field.exactMatch||!1,maxResults:6,searchInCurrentMapExtent:!1,type:"query"}):null},_isEsriLocator:function(a){this._esriLocatorRegExp.lastIndex=0;return this._esriLocatorRegExp.test(a)},_processSingleLine:function(a){if(a.singleLineFieldName)return a;
if(this._isEsriLocator(a.url))return a.singleLineFieldName="SingleLine",a;var c=new r;v({url:a.url,content:{f:"json"},handleAs:"json",callbackParamName:"callback"}).then(f.hitch(this,function(b){b.singleLineAddressField&&b.singleLineAddressField.name?(a.singleLineFieldName=b.singleLineAddressField.name,c.resolve(a)):(console.warn(a.url+"has no singleLineFieldName"),c.resolve(null))}),f.hitch(this,function(b){console.error(b);c.resolve(null)}));return c.promise},_getGeocodeName:function(a){if("string"!==
typeof a)return"geocoder";a=a.split("/");return a[a.length-2]||"geocoder"},getGeocoderName:function(a){return this._getGeocodeName(a)},hasAppSearchInfo:function(a){return a.itemInfo&&a.itemInfo.itemData&&a.itemInfo.itemData.applicationProperties&&a.itemInfo.itemData.applicationProperties.viewing&&a.itemInfo.itemData.applicationProperties.viewing.search},searchLayer:function(a){if(!this.hasAppSearchInfo(a))return!1;a=a.itemInfo.itemData.applicationProperties.viewing.search;return a.enabled&&0!==a.layers.length?
!0:!1}}});