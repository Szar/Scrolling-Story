import React from 'react';
import BarChart from './components/BarChart/BarChart';
import GlobeMap from './components/GlobeMap/GlobeMap';
import Sticky from './components/Sticky/Sticky';
import background from './images/map.png';
import './css/style.scss';
import './css/fonts.css';


class App extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = { documentWidth: 0 };
		this.setChartData = this.setChartData.bind(this);
		this.onProgress = this.onProgress.bind(this);
		this.setChartData()
	}
	setChartData() {
		this.charts = {};
		const charts = [{
			id: 'chart-2',
			data: [],
			colors: {
				water: "#1d1d1d",
				land: "#262626",
				stroke:"#262626",
				grid:"rgba(119,119,119,.1)"
			}
		},{
			id: 'chart-1',
			title: 'Aliquam Pretium Pulvinar',
			description: 'Phasellus Magna Nunc Sodales ut Orci a Blandit Gravida Orci',
			xlabel: 'Country',
			ylabel: 'Government Expenditure',
			data: [{
				name: 'IND',
				value: 273
			}, {
				name: 'USA',
				value: 2420
			}, {
				name: 'CHN',
				value: 1270
			}, {
				name: 'GBR',
				value: 553
			}, {
				name: 'DEU',
				value: 731
			}, {
				name: 'SWE',
				value: 136
			}, {
				name: 'FRA',
				value: 682
			}, {
				name: 'AUS',
				value: 239
			}, {
				name: 'CAN',
				value: 367
			}, {
				name: 'BRA',
				value: 442
			}]
		}]

		for (let i = 0; i < charts.length; i++) {
			var chart = charts[i]
			this.charts[chart.id] = chart
			
		}
	}
	
	componentDidMount() {
		

	}
	onProgress(e,p){
		this.setState({ progress: p })
		if (e.getElementsByClassName('asset').length > 0) {
			var d = {}
			d[e.getElementsByClassName('asset')[0].id] = p
			this.setState(d);
		}
	}

	render() {
		return (
				<article>
					<header style={{backgroundImage: `url(${background})`}}>
						<div className="container">
							<h1>Lorem Ipsum Dolor Sit</h1>
							<h2>Maecenas Malesuada Augue Vitae Justo Interdum, Vel Blandit Velit Varius vel Blandit Velit Varius</h2>
						</div>
					</header>
					<section>
						<div className="container">
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut sodales lorem. Maecenas malesuada augue vitae justo interdum, vel blandit velit varius. Pellentesque vehicula molestie molestie. Phasellus ut justo mollis, elementum ante at, sollicitudin orci. Nam gravida, justo sed interdum bibendum, erat arcu mattis justo, a facilisis diam felis id sapien. Mauris tortor massa, dignissim et lacinia in, imperdiet sit amet nisi. Mauris quis aliquet sapien, vitae semper urna. Nunc neque risus, pellentesque fringilla fermentum in, hendrerit vitae diam. Phasellus non tristique felis. Morbi at ligula id ipsum iaculis cursus vitae mattis purus. Nam auctor turpis sed ex efficitur posuere. Sed ultrices ut ante vel bibendum. Fusce malesuada, tellus ac maximus consequat, nunc turpis cursus magna, vitae mattis turpis mi et sapien.</p>
						</div>
					</section>

					<section className="section--full-width section--dark">
							<div className="container">
								<h2>Quisque Consequat sed Quam</h2>
							</div>
							<Sticky 
								id="sticky-example-3" 
								align="center"
								onProgress={this.onProgress}
								asset={<GlobeMap data={ this.charts["chart-2"]} progress={ this.state["chart-2"] }/>}
								text={<><div className="container"><div className="content"><p>Nulla gravida at elit eu varius. Sed condimentum libero ut tellus consectetur congue. Aenean ultricies purus sed dolor fringilla, et finibus orci condimentum. Etiam non molestie lorem. Vivamus ac ipsum sollicitudin, dapibus ligula id, consectetur enim. Phasellus hendrerit magna eget libero pellentesque pellentesque. Fusce sagittis erat vel massa ullamcorper, non volutpat ligula ornare. Morbi sit amet convallis dolor.</p>
									<p>Vivamus ultricies, arcu sit amet varius malesuada, dolor nisl gravida enim, gravida gravida erat libero a nunc. Donec fringilla luctus diam non dictum. Aenean non quam sodales, gravida mi ac, vestibulum leo.</p>
									</div><div className="content"><p>Massa turpis sollicitudin ligula, sit amet varius massa felis nec nulla. Aliquam porttitor, lectus ut euismod efficitur, libero nibh rhoncus augue, sit amet feugiat neque lorem ut tellus. Sed gravida consequat lacus, eget posuere metus convallis nec. Suspendisse maximus vulputate lacus, eu mollis est sagittis a. Pellentesque luctus libero vel nisl varius condimentum. Ut aliquet libero ante, quis sagittis est luctus nec. Cras ultricies elit mi, gravida auctor leo tincidunt non.</p></div></div></>}/>
						
					</section>
					
					<section className="section--lg-width">
						<h2>Aliquam Pretium Pulvinar Sapien</h2>
						<Sticky
						id="sticky-example-1" 
						align="right"
						onProgress={this.onProgress}
						asset={<BarChart data={ this.charts["chart-1"]} progress={ this.state["chart-1"] }/>}
						text={<><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pellentesque, eros quis pellentesque iaculis, lorem mi tempus quam, a interdum turpis sapien sed augue. Etiam quis ligula ullamcorper, auctor velit a, vestibulum sapien. Aliquam convallis erat vitae dui ornare, luctus eleifend quam malesuada. Aliquam pretium pulvinar sapien, eu elementum quam viverra id. Morbi aliquam ultricies eleifend. Fusce dapibus, metus eu tempus placerat, felis nibh blandit nisi, tristique ultricies ipsum massa consectetur risus. Quisque laoreet ex neque, sit amet imperdiet massa iaculis ut. Sed mattis turpis a nulla malesuada ultrices. Nam mauris magna, venenatis id sodales eget, venenatis at libero. Sed quis sem vel erat placerat tincidunt. Phasellus magna nunc, sodales ut orci a, blandit gravida orci.</p>
							<p>Sed eget lorem ipsum. In laoreet nisl id consectetur aliquam. Pellentesque cursus arcu nec massa rhoncus laoreet. Mauris viverra dignissim lacus et volutpat. Cras pulvinar mauris neque, et venenatis neque tincidunt vel. Aliquam suscipit enim et ultrices blandit. Maecenas eu arcu fringilla, semper velit at, rutrum justo. Sed gravida tempus tellus ac mollis. Mauris finibus ut nisl ac porta. Nunc luctus pulvinar orci, eu facilisis nunc maximus vitae. Cras vel lacus diam. Vestibulum egestas, metus mattis placerat finibus, nulla mauris sagittis libero, sit amet consequat neque tortor ac ligula. Sed vitae pellentesque lacus, sed aliquam lectus. Vestibulum quis erat viverra diam posuere mattis. Morbi porta sapien eu massa egestas rhoncus. Phasellus luctus purus in ipsum consectetur finibus a vel neque.</p>
							<p>Integer accumsan interdum justo eu pretium. Aliquam maximus mi sit amet dapibus efficitur.</p>
							<p>Sed condimentum lacus sit amet turpis aliquam varius nec a lacus. In facilisis convallis ante sit amet consequat. Aenean a lorem mollis, bibendum nibh nec, maximus orci. Nulla facilisi.</p></>}
						/>
					</section>
				

					<section>
						<div className="container">
							<h2>Quisque Consequat Porta</h2>
							<Sticky 
								id="sticky-example-2" 
								align="left"
								onProgress={this.onProgress}
								asset={<div className="asset"><div className="asset--example">{Math.round(this.state.progress*100)+"%"}</div></div>}
								text={<><p>Duis vitae velit blandit metus tempor auctor. Nullam rhoncus dolor ut fermentum maximus. Nullam vulputate convallis felis, sed commodo dolor. Nulla gravida at elit eu varius. Sed condimentum libero ut tellus consectetur congue. Aenean ultricies purus sed dolor fringilla, et finibus orci condimentum. Etiam non molestie lorem. Vivamus ac ipsum sollicitudin, dapibus ligula id, consectetur enim. Phasellus hendrerit magna eget libero pellentesque pellentesque. Fusce sagittis erat vel massa ullamcorper, non volutpat ligula ornare. Morbi sit amet convallis dolor.</p>
									<p>Fusce tincidunt, odio sed lacinia bibendum, ex mi gravida libero, nec maximus purus elit quis magna. Phasellus ipsum odio, luctus non justo quis, placerat dignissim mi. Praesent tempus dolor non pulvinar posuere. Vestibulum quis aliquet ex. Nam eu volutpat eros. Morbi eu molestie mi. Vivamus ultricies, arcu sit amet varius malesuada, dolor nisl gravida enim, gravida gravida erat libero a nunc. Donec fringilla luctus diam non dictum. Aenean non quam sodales, gravida mi ac, vestibulum leo. Nunc diam augue, egestas a metus at, lobortis fringilla dolor. Pellentesque sem leo, sollicitudin sit amet leo eget, scelerisque fringilla leo. Suspendisse id pharetra dolor, eu pretium justo.</p>
									<p>Aenean auctor ipsum sed erat vehicula ornare. Suspendisse ut velit ut dolor ornare ullamcorper. Nullam non egestas erat. Duis turpis est, lacinia vitae maximus in, facilisis non odio. Nulla facilisi. Aenean blandit feugiat aliquam. Aenean iaculis dictum fermentum. Curabitur maximus euismod scelerisque. Aenean volutpat fringilla enim et tincidunt. Curabitur euismod, massa a mollis tristique, massa turpis sollicitudin ligula, sit amet varius massa felis nec nulla. Aliquam porttitor, lectus ut euismod efficitur, libero nibh rhoncus augue, sit amet feugiat neque lorem ut tellus. Sed gravida consequat lacus, eget posuere metus convallis nec. Suspendisse maximus vulputate lacus, eu mollis est sagittis a. Pellentesque luctus libero vel nisl varius condimentum. Ut aliquet libero ante, quis sagittis est luctus nec. Cras ultricies elit mi, gravida auctor leo tincidunt non.</p></>}/>
						</div>
					</section>

					<section>
						<div className="container">
							<p>Cras nec mattis felis. Nullam malesuada volutpat pellentesque. Integer at metus nec turpis mattis eleifend et et dui. Fusce tincidunt odio ac euismod vehicula. Vestibulum sed risus at metus ornare pellentesque eget pulvinar arcu. Proin pretium efficitur quam, ac malesuada ante accumsan eget. Proin ac lacus a urna rhoncus sodales id et diam. Phasellus lacus urna, imperdiet et metus ac, ullamcorper mollis est. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Quisque commodo purus accumsan ullamcorper viverra. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer id eros at neque euismod ultricies.</p>
							<p>Quisque consequat sed quam porta faucibus. Sed velit nunc, ultricies et pharetra vitae, fermentum sit amet metus. Fusce eget pretium mauris. Nam at faucibus massa. Vivamus placerat varius eros, in tincidunt massa. Nam vel dignissim purus. Proin vulputate accumsan dui, ut vestibulum massa varius sit amet. Sed ut diam nibh. Morbi euismod nisi ex. Nulla feugiat accumsan mauris vitae tristique. Duis laoreet erat molestie orci mattis tincidunt. Phasellus id vehicula justo. Donec justo neque, iaculis sed condimentum sed, mollis at neque.</p>
							<h2>Methodology</h2>
							<p>Aenean faucibus risus mattis consectetur sollicitudin. Sed fermentum odio mollis, convallis lectus malesuada, varius sapien. Sed ipsum ex, gravida id dictum nec, fermentum ac nunc. Nunc nisi magna, cursus eget dolor id, ullamcorper consectetur dui. Donec at orci elementum, feugiat augue non, volutpat justo. In sollicitudin sapien vel magna mattis finibus. Nulla eu diam augue. Donec quis ex eget massa eleifend rhoncus id porta erat. Ut eleifend risus et quam accumsan tempor.</p>
							<ul>
								<li><a href="#">http://sourceurl/</a></li>
								<li><a href="#">http://sourceurl/</a></li>
								<li><a href="#">http://sourceurl/</a></li>
							</ul>
						</div>
					</section>
					<footer>
						<div className="container">
							<div className="copyright">© { new Date().getFullYear() } | <a href="https://github.com/Szar/Scrolling-Story" target="_blank" rel="noopener noreferrer">View on Github</a></div>
						</div>
					</footer>
				</article>
		);
	}
}

export default App;