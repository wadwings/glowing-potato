var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Unit = function (_React$Component) {
	_inherits(Unit, _React$Component);

	function Unit(props) {
		_classCallCheck(this, Unit);

		var _this = _possibleConstructorReturn(this, (Unit.__proto__ || Object.getPrototypeOf(Unit)).call(this, props));

		_this.click = function () {
			if (_this.props.num >= 0) _this.props.click(_this.props.row, _this.props.line);
		};

		return _this;
	}

	_createClass(Unit, [{
		key: "render",
		value: function render() {
			if (this.props.num === 1 || this.props.num === 0) return React.createElement(
				"td",
				{ className: "unit", onClick: this.click },
				this.props.num
			);else if (this.props.num === -2 || this.props.num === -3) return React.createElement(
				"td",
				{ className: "unit darkturquoise" },
				this.props.num + 3
			);else return React.createElement("td", { className: "unit aliceblue", onClick: this.click });
		}
	}]);

	return Unit;
}(React.Component);

var Choose = function (_React$Component2) {
	_inherits(Choose, _React$Component2);

	function Choose(props) {
		_classCallCheck(this, Choose);

		var _this2 = _possibleConstructorReturn(this, (Choose.__proto__ || Object.getPrototypeOf(Choose)).call(this, props));

		_this2.setSize = function (e) {
			console.log("size :" + (e.target.selectedIndex * 2 + 6));
			_this2.state.size = e.target.selectedIndex * 2 + 6;
			_this2.props.setGame(_this2.state.size, _this2.state.diff, _this2.state.nr);
		};

		_this2.setDiff = function (e) {
			console.log("diff :" + e.target.selectedIndex);
			_this2.state.diff = e.target.selectedIndex + 1;
			_this2.props.setGame(_this2.state.size, _this2.state.diff, _this2.state.nr);
		};

		_this2.setNr = function (e) {
			console.log("nr :" + e.target.selectedIndex);
			_this2.state.nr = e.target.selectedIndex + 1;
			_this2.props.setGame(_this2.state.size, _this2.state.diff, _this2.state.nr);
		};

		_this2.selector_1 = Array(4).fill(null).map(function (_, h) {
			return 6 + h * 2;
		}).map(function (num) {
			return React.createElement(
				"option",
				{ key: num, value: num },
				num
			);
		});
		_this2.selector_2 = Array(4).fill(null).map(function (_, h) {
			return h + 1;
		}).map(function (num) {
			return React.createElement(
				"option",
				{ key: num, value: num },
				num
			);
		});
		_this2.selector_3 = Array(49).fill(null).map(function (_, h) {
			return h + 1;
		}).map(function (num) {
			return React.createElement(
				"option",
				{ key: num, value: num },
				num
			);
		});
		_this2.state = {
			size: 6,
			diff: 1,
			nr: 1
		};
		return _this2;
	}

	_createClass(Choose, [{
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				{ className: this.props.className },
				React.createElement(
					"select",
					{ onChange: this.setSize },
					this.selector_1
				),
				React.createElement(
					"select",
					{ onChange: this.setDiff },
					this.selector_2
				),
				React.createElement(
					"select",
					{ onChange: this.setNr },
					this.selector_3
				)
			);
		}
	}]);

	return Choose;
}(React.Component);

var Table = function (_React$Component3) {
	_inherits(Table, _React$Component3);

	function Table(props) {
		_classCallCheck(this, Table);

		var _this3 = _possibleConstructorReturn(this, (Table.__proto__ || Object.getPrototypeOf(Table)).call(this, props));

		_this3.setTable = function (row, line) {
			var table = _this3.state.table;
			table[row][line] = (table[row][line] + 1) % 3;
			_this3.setState({
				table: table
			}, function () {
				if (table[row][line] === 0) _this3.state.left--;else if (table[row][line] === 2) _this3.state.left++;
				console.log(_this3.state.left);
				_this3.setState({
					word: _this3.state.left + " left"
				});
				if (_this3.state.left === 0) {
					_this3.calc();
				}
			});
		};

		_this3.setGame = function (size, diff, nr) {
			_this3.setState({
				size: size,
				diff: diff,
				nr: nr,
				path: "./resources/app/Resources/" + size + "/" + diff + "/" + nr
			}, function () {
				return _this3.initGame();
			});
		};

		_this3.initGame = function () {
			_this3.state.left = _this3.state.size * _this3.state.size;
			_this3.number = Array(_this3.state.size).fill(null).map(function (_, h) {
				return h;
			});
			var fs = require('fs');
			fs.readFile(_this3.state.path, 'utf-8', function (err, data) {
				if (err) {
					console.log(err);
					return;
				}
				var array = [].concat(_toConsumableArray(data.matchAll(/(\d+)/g)));
				console.log(array);
				var table = Array(_this3.state.size).fill(2).map(function (_) {
					return Array(_this3.state.size).fill(2);
				});
				console.log(table);
				for (var i = 0; i * 3 < array.length; i++) {
					table[array[i * 3][0] - 1][array[i * 3 + 1][0] - 1] = parseInt(array[i * 3 + 2][0]) - 3;
					_this3.state.left--;
				}
				_this3.setState({
					word: _this3.state.left + " left",
					table: table
				});
			});
			fs.readFile(_this3.state.path + "_solution", 'utf-8', function (err, data) {
				if (err) {
					console.log(err);
					return;
				}
				var array = [].concat(_toConsumableArray(data.matchAll(/(\d+)/g)));
				console.log(array);
				var table = Array(_this3.state.size).fill(2).map(function (_) {
					return Array(_this3.state.size).fill(2);
				});
				console.log(table);
				for (var x = 0; x < _this3.state.size; x++) {
					for (var y = 0; y < _this3.state.size; y++) {
						table[x][y] = parseInt(array[x * _this3.state.size + y][0]);
					}
				}
				_this3.state.answer = table;
				console.log(_this3.state.answer);
			});
		};

		_this3.showAnswer = function () {
			var table = Array(_this3.state.size).fill(2).map(function (_) {
				return Array(_this3.state.size).fill(2);
			});
			for (var x = 0; x < _this3.state.size; x++) {
				for (var y = 0; y < _this3.state.size; y++) {
					table[x][y] = _this3.state.answer[x][y] - 3;
				}
			}
			console.log(table);
			_this3.setState({
				table: table,
				word: "You Made This By CHEAT!"
			});
		};

		_this3.number = Array(_this3.props.size).fill(null).map(function (_, h) {
			return h;
		});
		_this3.state = {
			table: Array(_this3.props.size).fill(2).map(function (_) {
				return Array(_this3.props.size).fill(2);
			}),
			left: _this3.props.size * _this3.props.size,
			size: _this3.props.size,
			diff: 1,
			nr: 1,
			path: _this3.props.path,
			word: _this3.props.size * _this3.props.size + " left"
		};
		return _this3;
	}

	_createClass(Table, [{
		key: "calc",
		value: function calc() {
			console.log(this.state.table);
			console.log(this.state.answer);
			for (var x = 0; x < this.state.size; x++) {
				for (var y = 0; y < this.state.size; y++) {
					if (this.state.table[x][y] !== this.state.answer[x][y] && this.state.table[x][y] + 3 !== this.state.answer[x][y]) {
						this.setState({
							word: "Oh no, U failed!"
						});
						return;
					}
				}
			}
			this.setState({
				word: "Congratulation! You found the right Answer!"
			});
			return true;
		}
	}, {
		key: "render",
		value: function render() {
			var _this4 = this;

			var rows = this.number.map(function (key) {
				return React.createElement(Row, { key: key, row: key, size: _this4.state.size, nums: _this4.state.table[key], click: _this4.setTable });
			});
			return React.createElement(
				"div",
				{ className: "main" },
				React.createElement(Choose, { className: "choose", setGame: this.setGame }),
				React.createElement(
					"p",
					null,
					this.state.word
				),
				React.createElement(
					"table",
					{ className: "table" },
					React.createElement(
						"tbody",
						null,
						rows
					)
				),
				React.createElement(
					"button",
					{ className: "gameGen", onClick: this.initGame },
					"Start Game!"
				),
				React.createElement(
					"button",
					{ onClick: this.showAnswer },
					"Give me Answer!"
				)
			);
		}
	}]);

	return Table;
}(React.Component);

var Row = function (_React$Component4) {
	_inherits(Row, _React$Component4);

	function Row(props) {
		_classCallCheck(this, Row);

		return _possibleConstructorReturn(this, (Row.__proto__ || Object.getPrototypeOf(Row)).call(this, props));
	}

	_createClass(Row, [{
		key: "render",
		value: function render() {
			var _this6 = this;

			this.number = Array(this.props.size).fill(null).map(function (_, h) {
				return h;
			});
			this.Units = this.number.map(function (key) {
				return React.createElement(Unit, { key: key, row: _this6.props.row, line: key, num: _this6.props.nums[key], click: _this6.props.click });
			});
			return React.createElement(
				"tr",
				null,
				this.Units
			);
		}
	}]);

	return Row;
}(React.Component);

ReactDOM.render(React.createElement(Table, { size: 6, path: "./resources/app/Resources/6/1/1" }), document.getElementById('root'));