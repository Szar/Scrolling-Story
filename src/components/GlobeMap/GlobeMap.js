import React from 'react';
import * as d3 from "d3";
import * as topojson from 'topojson';
import './GlobeMap.scss';
import topo from './world-110m.json';

class GlobeMap extends React.Component {
	constructor(props) {
		super(props);
		this.state = { progress: 0 }
	}
	componentWillReceiveProps(p) {
		this.setState({progress: p.progress})
		this.updateChart()
	  }
	componentDidMount() {
		this.createChart();
	}
	updateChart() {
		const sphere = {type: "Sphere"},
			p = this.state.progress,
			w = this.w,
			h = this.h,
			path = this.path,
			context = this.ctx,
			speed = 300,
			stroke_width = 100,
			grid_width = 0.5;

		this.projection.rotate([speed * p, -15]);
		context.clearRect(0, 0, w, h);
		
		context.beginPath();
		path(sphere);
		context.linewidth = 33;
		context.strokeStyle = this.props.data.colors.stroke;
		context.stroke();

		context.beginPath();
		path(sphere);
		context.fillStyle = this.props.data.colors.water;
		context.fill();

		context.beginPath();
		path(this.land);
		context.fillStyle = this.props.data.colors.land;
		context.fill();

		context.beginPath();
		path(this.borders);
		context.linewidth = stroke_width;
		context.strokeStyle = this.props.data.colors.water;
		context.stroke();

		context.beginPath();
		path(this.grid);
		context.linewidth = grid_width;
		context.strokeStyle = this.props.data.colors.grid; 
		context.stroke();
	}
	createChart() {
		const data = this.props.data.data,
			el = document.getElementById(this.props.data.id),
			w = el.getBoundingClientRect().width,
			h = w*0.5;

		const svg = d3.select(el)
			.append("canvas")
			.attr("width", w)
			.attr("height", h)

		var projection = d3.geoOrthographic()
			.scale(h / 2.1)
			.translate([w / 2, h / 2])
			.clipAngle(90)
			.precision(.5);

		var graticule = d3.geoGraticule();

		var context = el.getElementsByTagName('canvas')[0].getContext("2d");
		context.fillStyle = "red";
		context.fillRect(0, 0, 300, 150);
		context.clearRect(0, 0, w, h);
		console.log(context)

		var path = d3.geoPath()
			.projection(projection)
			.context(context);

		var land = topojson.feature(topo, topo.objects.land),
			borders = topojson.mesh(topo, topo.objects.countries, function(a, b) { return a !== b; }),
			grid = graticule();

		this.data = data
		this.w = w
		this.h = h
		this.projection = projection
		this.ctx = context
		this.path = path
		this.land = land
		this.borders = borders
		this.grid = grid
	}

	render() {
		const header = typeof this.props.data.title!=="undefined"?
		<div className="asset--title">
			<h3>{this.props.data.title}</h3>
			<h4>{this.props.data.description}</h4>
		</div>: "";
		return <div className="asset chart map-chart" id={ this.props.data.id }>
			{header}
		</div>
	}
}

export default GlobeMap;