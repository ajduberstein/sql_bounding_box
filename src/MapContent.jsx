import React, { Component } from 'react';

import { Map, TileLayer, Circle, Rectangle} from 'react-leaflet';
import 'leaflet/dist/leaflet.css'

import clipboard from 'clipboard-js';


const MAX_PTS = 2;

class MapContent extends Component {

  colors = ["#378B2E", "#236863", "#A7383E", "#AA6A39"]

  getRandomColor = () => {
    let idx = Math.floor(this.colors.length * Math.random())
    return this.colors[idx]
  }

  state = {
    center: [37.7749, -122.4194],
    pts: [],
    color: this.getRandomColor(),
  }

  handleClick = e => {
    let [lat, lng] = [e.latlng.lat, e.latlng.lng];
    let pt = [{lat, lng}];
    console.log(pt);
    if (this.state.pts.length < MAX_PTS) {
      this.setState({pts: this.state.pts.concat(pt)})
    } else {
      this.setState({pts: [], color: this.getRandomColor()})
    }
  }

  makeShape = () => {
    if (this.state.pts.length === 1) {
     return (<Circle
        center={this.state.pts[0]}
        fillColor={this.state.color}
        radius={400}>
      </Circle>
     );
    } 
    return (<Rectangle
      bounds={this.state.pts}
      color={this.state.color}
      >
      </Rectangle>
    );
  }

  extractBounds = () => {
    let p = this.state.pts;
    return `
    lat BETWEEN ${Math.min(p[0].lat, p[1].lat)} AND ${Math.max(p[0].lat, p[1].lat)}
    AND lng BETWEEN ${Math.min(p[0].lng, p[1].lng)} AND ${Math.max(p[0].lng, p[1].lng)}`.trim()
  }

  displayBox = () => {
    let results, backgroundColor;
    if (this.state.pts.length < MAX_PTS) {
      backgroundColor = '#222';
      results = ''
    } else {
      backgroundColor = this.state.color;
      results = this.extractBounds()
      clipboard.copy(results);
    }
    return (<div style={{color: 'white', backgroundColor: backgroundColor,
        position: 'relative', height: 20, fontFamily: 'monospace'}}>
      {results}
    </div>)
  }


  render() {
    let shapes = this.state.pts.length ? <div>{this.makeShape()}</div> : <div></div>
    return (
    <div>
    {this.displayBox()}
    <Map
      center={this.state.center}
      zoom={11}
      style={{ height: 800 }}
      onClick={this.handleClick}
      >
      <TileLayer
        url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {shapes}
    </Map>
    </div>
    )
  }

}

export default MapContent;
