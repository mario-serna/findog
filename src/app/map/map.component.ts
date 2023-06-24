import { Component, OnDestroy, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { circular } from 'ol/geom/Polygon';
import Control from 'ol/control/Control';
import { fromLonLat } from 'ol/proj';

@Component({
  selector: 'nid-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  public map!: Map;

  ngOnInit(): void {
    // https://openlayers.org/workshop/en/mobile/geolocation.html
    // 
    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
          })
        })
      ],
      view: new View({
        center: [0, 0],
        zoom: 2
      })
    });

    const source = new VectorSource();
    const layer = new VectorLayer({
      source: source,
    });
    this.map.addLayer(layer);

    navigator.geolocation.watchPosition(
      (pos) => {
        const coords = [pos.coords.longitude, pos.coords.latitude];
        const accuracy = circular(coords, pos.coords.accuracy);
        source.clear(true);
        source.addFeatures([
          new Feature(
            accuracy.transform('EPSG:4326', this.map.getView().getProjection())
          ),
          new Feature(new Point(fromLonLat(coords))),
        ]);
        this.map.getView().fit(source.getExtent(), {
          maxZoom: 17,
          duration: 500
        })
      },
      function (error) {
        alert(`ERROR: ${error.message}`);
      },
      {
        enableHighAccuracy: true,
      }
    );

    const locate = document.createElement('div');
    locate.className = 'ol-control ol-unselectable locate';
    locate.innerHTML = '<button title="Locate me">◎</button>';
    locate.addEventListener('click', () => {
      if (!source.isEmpty()) {
        this.map.getView().fit(source.getExtent(), {
          maxZoom: 18,
          duration: 500,
        });
      }
    });
    this.map.addControl(
      new Control({
        element: locate,
      })
    );
  }

}
