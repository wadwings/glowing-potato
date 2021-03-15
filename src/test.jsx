class Unit extends React.Component {
	constructor(props) {
		super(props);
	}
	click = () => {
		if(this.props.num >= 0)
			this.props.click(this.props.row, this.props.line)
	}
	render() {
		if (this.props.num === 1 || this.props.num === 0)
			return <td className={"unit"} onClick={this.click}>{this.props.num}</td>
		else if(this.props.num === -2 || this.props.num === -3)
			return <td className={"unit darkturquoise"}>{this.props.num + 3}</td>
		else
			return <td className={"unit aliceblue"} onClick={this.click}/>
	}
}

class Choose extends React.Component{
	constructor(props) {
		super(props);
		this.selector_1 = Array(4).fill(null).map((_, h) => 6 + h * 2)
			.map((num) => <option key={num} value={num}>{num}</option>)
		this.selector_2 = Array(4).fill(null).map((_, h) => h + 1)
			.map((num) => <option key={num} value={num}>{num}</option>)
		this.selector_3 = Array(49).fill(null).map((_, h) => h + 1)
			.map((num) => <option key={num} value={num}>{num}</option>)
		this.state = {
			size : 6,
			diff : 1,
			nr : 1
		}
	}
	
	setSize = (e) =>{
		console.log("size :"+ (e.target.selectedIndex * 2 + 6))
		this.state.size = e.target.selectedIndex * 2 + 6
		this.props.setGame(this.state.size, this.state.diff, this.state.nr)
	}
	
	setDiff = (e) =>{
		console.log("diff :"+ e.target.selectedIndex)
		this.state.diff = e.target.selectedIndex + 1
		this.props.setGame(this.state.size, this.state.diff, this.state.nr)
	}
	
	setNr = (e) =>{
		console.log("nr :"+ e.target.selectedIndex)
		this.state.nr = e.target.selectedIndex + 1
		this.props.setGame(this.state.size, this.state.diff, this.state.nr)
	}
	
	render() {
		return(
			<div className={this.props.className}>
				<select onChange={this.setSize}>
					{this.selector_1}
				</select>
				<select onChange={this.setDiff}>
					{this.selector_2}
				</select>
				<select onChange={this.setNr}>
					{this.selector_3}
				</select>
			</div>
		)
	}
}

class Table extends React.Component {
	constructor(props) {
		super(props);
		this.number = Array(this.props.size).fill(null).map((_, h) => h)
		this.state = {
			table : Array(this.props.size).fill(2).map((_) => Array(this.props.size).fill(2)),
			left : this.props.size * this.props.size,
			size : this.props.size,
			diff : 1,
			nr : 1,
			path : this.props.path,
			word : this.props.size * this.props.size  + " left"
		}
	}
	
	setTable = (row, line) => {
		let table = this.state.table;
		table[row][line] = (table[row][line] + 1) % 3
		this.setState({
			table : table
		}, () =>{
			if(table[row][line] === 0)
				this.state.left--
			else if(table[row][line] === 2)
				this.state.left++
			console.log(this.state.left)
			this.setState({
				word : this.state.left  + " left"
			})
			if(this.state.left === 0){
				this.calc()
			}
		})
	}
	
	setGame = (size, diff, nr) =>{
		this.setState({
			size : size,
			diff : diff,
			nr : nr,
			path : `./resources/app/Resources/${size}/${diff}/${nr}`
		}, () => this.initGame())
	}

	calc(){
		console.log(this.state.table)
		console.log(this.state.answer)
		for(let x = 0; x < this.state.size; x++){
			for(let y = 0; y < this.state.size; y++)
				if(this.state.table[x][y] !== this.state.answer[x][y] && this.state.table[x][y] + 3 !== this.state.answer[x][y]){
					this.setState({
						word : "Oh no, U failed!"
					})
					return;
				}
		}
		this.setState({
			word : "Congratulation! You found the right Answer!"
		})
		return true
	}
	
	initGame = () => {
		this.state.left = this.state.size * this.state.size
		this.number = Array(this.state.size).fill(null).map((_, h) => h)
		const fs = require('fs')
		fs.readFile(this.state.path, 'utf-8', (err, data) => {
			if (err) {
				console.log(err);
				return;
			}
			let array = [...data.matchAll(/(\d+)/g)]
			console.log(array)
			let table = Array(this.state.size).fill(2).map((_) => Array(this.state.size).fill(2))
			console.log(table)
			for (let i = 0; i * 3 < array.length; i++) {
				table[array[i * 3][0] - 1][array[i * 3 + 1][0] - 1] = parseInt(array[i * 3 + 2][0]) - 3
				this.state.left--
			}
			this.setState({
				word : this.state.left + " left",
				table : table
			})
		})
		fs.readFile(this.state.path + "_solution", 'utf-8', (err, data) => {
			if (err) {
				console.log(err)
				return
			}
			let array = [...data.matchAll(/(\d+)/g)]
			console.log(array)
			let table = Array(this.state.size).fill(2).map((_) => Array(this.state.size).fill(2))
			console.log(table)
			for(let x = 0; x < this.state.size; x++){
				for(let y = 0; y < this.state.size; y++){
					table[x][y] = parseInt(array[x * this.state.size + y][0])
				}
			}
			this.state.answer = table
			console.log(this.state.answer)
		})
	}
	
	showAnswer = () =>{
		let table = Array(this.state.size).fill(2).map((_) => Array(this.state.size).fill(2))
		for(let x = 0; x < this.state.size; x++){
			for(let y = 0; y < this.state.size; y++){
				table[x][y] = this.state.answer[x][y] - 3
			}
		}
		console.log(table)
		this.setState({
			table : table,
			word : "You Made This By CHEAT!"
		})
	}
	
	render() {
		let rows = this.number.map((key) => <Row key={key} row={key} size={this.state.size} nums={this.state.table[key]} click={this.setTable}/>)
		return (
			<div className={"main"}>
				<Choose className={"choose"} setGame={this.setGame}/>
				<p>{this.state.word}</p>
				<table className={"table"}>
					<tbody>
					{rows}
					</tbody>
				</table>
				<button className={"gameGen"} onClick={this.initGame}>{"Start Game!"}</button>
				<button onClick={this.showAnswer}>{"Give me Answer!"}</button>
			</div>
		)
	}
}

class Row extends React.Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		this.number = Array(this.props.size).fill(null).map((_,h) => h)
		this.Units = this.number.map((key) => <Unit key={key} row={this.props.row} line={key} num={this.props.nums[key]} click={this.props.click}/>)
		return (
			<tr>
				{this.Units}
			</tr>
		)
	}
}

ReactDOM.render(<Table size={6} path={"./resources/app/Resources/6/1/1"}/>, document.getElementById('root'));
