import React from 'react';
import * as d3 from "d3";
import './BarChart.scss';

class BarChart extends React.Component {
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
		const svg = d3.select(document.getElementById(this.props.data.id)),
			p = this.state.progress,
			h = this.h;
		if(p>0) {
			svg.selectAll(".bar").each(function(d,i){
				var y = parseFloat(d3.select(this).attr("data-y"))*p;
				d3.select(this)
				.attr('y', h - y)
				.attr('height', y)
			});
			svg.selectAll('.bar-label').each(function(d,i){
				var y = parseFloat(d3.select(this).attr("data-y"))*p;
				d3.select(this).attr('y', h - y)
			});
		}
	}
	createChart() {
		const data = this.props.data.data,
			el = document.getElementById(this.props.data.id),
			spacing = 40,
			margin = {top: spacing, right: spacing, bottom: 45+spacing, left: 35+spacing},
			w = el.getBoundingClientRect().width - margin.left - margin.right,
			h = (w) - margin.top - margin.bottom,
			xScale = d3.scaleBand().domain(data.map(d => d.name)).range([0, w]).paddingInner(0.5),
			yScale = d3.scaleLinear().domain([0, d3.max(data, d => d.value)]).range([0, h]);
		
		const svg = d3.select(el)
			.append("svg")
			.attr("width", w+margin.left+margin.right)
			.attr("height", h+margin.top+margin.bottom)
			.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		
		this.data = data
		this.w = w
		this.h = h
		this.xScale = xScale
		this.yScale = yScale

		this.drawChart(svg)
	}
	drawChart(svg) {
		const docWidth = document.getElementsByTagName("body")[0].getBoundingClientRect().width
		const yGridlines = d3.axisLeft()
			.scale(this.yScale)
			.tickSize(-this.w,0,0)
			.tickFormat('')
		
		svg.append('g')
			.call(yGridlines)
			.classed('gridline', true);

		
		svg.selectAll(".bar")
			.data(this.data)
			.enter()
			.append('rect')
			.classed('bar', true)
			.attr('x', d => this.xScale(d.name))
			.attr('y', d => this.yScale(d.value))
			.attr('height', d => docWidth<=836?(this.h - this.yScale(d.value)):0)
			.attr('data-y', d => this.yScale(d.value))
			.attr('width', d => this.xScale.bandwidth())
		

		svg.selectAll('.bar-label')
			.data(this.data)
			.enter()
			.append('text')
			.classed('bar-label', true)
			.style('text-anchor', 'middle')
			.attr('x', d => this.xScale(d.name) + this.xScale.bandwidth()/2)
			.attr('dx', 0)
			.attr('y', d => docWidth<=836?(this.h - this.yScale(d.value)):0)
			.attr('data-y', d => this.yScale(d.value))
			.attr('dy', -10)
			.text(d => Math.round(d.value/100)+"%");

		this.setAxis(svg)
	}

	setAxis(svg) {
		const xAxis = d3.axisBottom().scale(this.xScale),
			yAxis = d3.axisLeft().ticks(5).scale(this.yScale).tickFormat(d3.format(",.0f"));
		
		svg.append('g').classed('x axis', true).attr('transform', `translate(0,${this.h+3})`).call(xAxis);
		svg.append('g').classed('y axis', true).attr('transform', 'translate(0,0)').call(yAxis);

		svg.select('.x.axis')
			.append('text')
			.classed('axis-label', true)
			.attr('x',  this.w/2)
			.attr('y', 60)
			.style('text-anchor', 'middle')
			.text(this.props.data.xlabel);

		svg.select('.y.axis')
			.append('text')
			.classed('axis-label', true)
			.attr('x', 0)
			.attr('y', 0)
			.attr('transform', `translate(-32, ${this.h/2}) rotate(-90)`)
			.style('text-anchor', 'middle')
			.text(this.props.data.ylabel);
	}

	render() {
		const header = typeof this.props.data.title!=="undefined"?
		<div className="asset--title">
			<h3>{this.props.data.title}</h3>
			<h4>{this.props.data.description}</h4>
		</div>: "";
		return <div className="asset chart bar-chart" id={ this.props.data.id }>
			{ header }
		</div>
	}
}

export default BarChart;