import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MapMarker } from "./map-marker.model";
import { Observable, of } from "rxjs";

@Injectable({ providedIn: 'root' })
export class MarkerService {
  constructor(private http: HttpClient) { }

  private markers: MapMarker[] = [
    { code: 'EHLE', name: 'Lelystad', lat: 52.455278, lng: 5.523056, type: 'medium' },
    { code: 'EHHO', name: 'Hoogeveen', lat: 52.725163766, lng: 6.509664628, type: 'medium' },
    { code: 'EDVM', name: 'Hildesheim', lat: 52.179833, lng: 9.945667, type: 'medium' },
    { code: 'EBZR', name: 'Zoersel', lat: 51.264722, lng: 4.753333, type: 'medium' }
  ];

  getMarkers(): Observable<MapMarker[]> {
    return of(this.markers);
  }

  //[{"lat":52.2421,"lng":6.0521,"title":"EHTE - Vliegveld Teuge"},{"lat":51.5117,"lng":3.7299,"title":"EHMZ - Vliegveld midden Zeeland"},{"lat":53.1146,"lng":4.8301,"title":"EHTX - Vliegveld Texel"},{"lat":51.5547,"lng":4.5525,"title":"EHSE - Vliegveld Breda Airfield"},{"lat":52.731,"lng":6.5163,"title":"EHHO - Vliegveld Hoogeveen"},{"lat":53.1182,"lng":6.5758,"title":"EHGG - Vliegveld Eelde"},{"lat":51.9565,"lng":4.4405,"title":"EHRD - Vliegveld Rotterdam"},{"lat":50.9107,"lng":5.769,"title":"EHBK - Vliegveld Maastricht Aachen"},{"lat":53.4537,"lng":5.6794,"title":"EHAL - Viegveld Ameland"},{"lat":52.313,"lng":4.7792,"title":"EHAM - Vliegveld Amsterdam Schiphol"},{"lat":51.2561,"lng":5.6019,"title":"EHBD - Vliegveld Weert - Budel"},{"lat":53.118,"lng":6.1289,"title":"EHDR - Vliegveld Drachten"},{"lat":51.4489,"lng":5.373,"title":"EHEH - Vliegveld Eindhoven"},{"lat":52.1888,"lng":5.1466,"title":"EHHV - Vliegveld Hilversum"},{"lat":52.9242,"lng":4.7814,"title":"EHKD - Vliegveld de Kooy"},{"lat":52.4534,"lng":5.5155,"title":"EHLE - Vliegveld Lelystad"},{"lat":53.2088,"lng":7.033,"title":"EHOW - Vliegveld Oostwold"},{"lat":52.9968,"lng":7.0229,"title":"EHST - Vliegveld Stadskanaal"},{"lat":52.0624,"lng":5.9203,"title":"EHTL - Vliegveld Terlet"},{"lat":52.2752,"lng":6.8874,"title":"EHTW - Vliegveld Twente Airfield"},{"lat":52.8152,"lng":5.0217,"title":"XXXX - Vliegveld Middenmeer"},{"lat":51.1901,"lng":4.4622,"title":"EBAW - Antwerpen"},{"lat":50.8919,"lng":4.4934,"title":"EBBR - Brussel"},{"lat":50.4611,"lng":4.457,"title":"EBCI - Charleroi"},{"lat":50.818,"lng":3.2065,"title":"EBKT -  Kortrijk Wevelgem"},{"lat":50.6381,"lng":5.4449,"title":"EBLG - Luik"},{"lat":49.6266,"lng":6.2122,"title":"ELLX - Luxemburg"},{"lat":51.1995,"lng":2.8724,"title":"EBOS - Oostende"},{"lat":50.74,"lng":3.4839,"title":"EBAM - Amougies"},{"lat":51.1808,"lng":5.2213,"title":"EBKH - Balen Keiheuvel"},{"lat":51.3443,"lng":4.5023,"title":"EBBT - Brasschaat"},{"lat":50.153,"lng":4.3853,"title":"EBCF - Cerfontaine"},{"lat":51.0148,"lng":5.5254,"title":"EBZW - Genk - Zwartberg"},{"lat":50.7538,"lng":3.8621,"title":"EBGG - Geraardsbergen"},{"lat":50.7812,"lng":4.9573,"title":"EBTN - Goetsenhoven"},{"lat":50.9466,"lng":4.3911,"title":"EBGB - Grimbergen"},{"lat":50.9704,"lng":5.3753,"title":"EBZH - Hasselt - Kiewit"},{"lat":51.3063,"lng":4.3865,"title":"EBHN - Hoevenen"},{"lat":50.1827,"lng":4.3678,"title":"EBEH - HYDROBASE DE L\u2019EAU D\u2019HEURE "},{"lat":51.1194,"lng":5.3006,"title":"EBLE - Leopoldsburg"},{"lat":50.8515,"lng":3.148,"title":"EBMO - Moorsele"},{"lat":50.4895,"lng":4.7698,"title":"EBNM - Namur"},{"lat":49.9809,"lng":5.9179,"title":"ELNT - Noertrange"},{"lat":50.4579,"lng":3.8206,"title":"EBSG - Saint Ghislain"},{"lat":50.0358,"lng":5.4049,"title":"EBSH - Saint Hubert"},{"lat":50.7923,"lng":5.2025,"title":"EBST - Sint-Truiden"},{"lat":50.482,"lng":5.9132,"title":"EBSP - Spa - La Sauveni\u00e8re"},{"lat":50.5315,"lng":3.4958,"title":"EBTY - Tournai - Maubray"},{"lat":49.7682,"lng":5.9649,"title":"ELUS - USELDANGE"},{"lat":50.5512009,"lng":5.854018321889022,"title":"EBTX - Verviers"},{"lat":51.2642,"lng":4.7531,"title":"EBZR - Zoersel"},{"lat":50.9482,"lng":5.59,"title":"EBSL - Zutendaal"},{"lat":50.8216,"lng":6.1832,"title":"EDKA - AACHEN - MERZBRUCK"},{"lat":48.4246,"lng":10.9292,"title":null}]
}

