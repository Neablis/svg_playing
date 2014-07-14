function Shape() {
	this.id = function (val) {
		if (val === undefined) {
			if (this._id === undefined) {
    			return '';
    		} else {
    			return this._id;
    		}
		} else {
			this._id = val;
		}

		return this;
	};

	this.class = function (val) {
		if (val === undefined) {
			if (this._class === undefined) {
    			return '';
    		} else {
    			return this._class;
    		}
		} else {
			this._class = val;
		}

		return this;
	};

	this.width = function (val) {
		if (val === undefined) {
			return this._width;
		} else {
			this._width = val;
		}

		return this;
	};

	this.height = function (val) {
		if (val === undefined) {
			return this._height;
		} else {
			this._height = val;
		}

		return this;
	};

	this.y = function (val) {
		if (val === undefined) {
			return this._y;
		} else {
			this._y = val;
		}

		return this;
	};

	this.x = function (val) {
		if (val === undefined) {
			return this._x;
		} else {
			this._x = val;
		}

		return this;
	};

	this.cx = function (val) {
		if (val === undefined) {
			return this._cx;
		} else {
			this._cx = val;
		}

		return this;
	};

	this.cy = function (val) {
		if (val === undefined) {
			return this._cy;
		} else {
			this._cy = val;
		}

		return this;
	};

	this.center = function (x, y) {
		this.cx(x);
		this.cy(y);
		this.x(x);
		this.y(y);

		return this;
	};

	this.fill = function (val) {
		if (val === undefined) {
			return this._fill;
		} else {
			this._fill = val;
		}

		return this;
	};

	this.x1 = function (val) {
		if (val === undefined) {
			return this._x1;
		} else {
			this._x1 = val;
		}

		return this;
	};

	this.y1 = function (val) {
		if (val === undefined) {
			return this._y1;
		} else {
			this._y1 = val;
		}

		return this;
	};

	this.x2 = function (val) {
		if (val === undefined) {
			return this._x2;
		} else {
			this._x2 = val;
		}

		return this;
	};

	this.y2 = function (val) {
		if (val === undefined) {
			return this._y2;
		} else {
			this._y2 = val;
		}

		return this;
	};

	this.stroke = function (val) {
		if (val === undefined) {
			return this._stroke;
		} else {
			this._stroke = val;
		}

		return this;
	};

	this.strokeWidth = function (val) {
		if (val === undefined) {
			return this._strokeWidth;
		} else {
			this._strokeWidth = val;
		}

		return this;
	};

	this.text = function (val) {
		if (val === undefined) {
			return this._text;
		} else {
			this._text = val;
		}

		return this;
	};

	this.draw = function () {
		throw new Error('Arbitrary shapes cannot be drawn');
	}

	this.makeSVG = function (tag, attrs) {
        var el= document.createElementNS('http://www.w3.org/2000/svg', tag);
        for (var k in attrs)
            el.setAttribute(k, attrs[k]);
        return el;
    }

    this.style = function (val) {
    	if (val === undefined) {
    		if (this._style === undefined) {
    			return '';
    		} else {
    			return this._style;
    		}
		} else {
			this._style = val;
		}

		return this;
    }

    this.fontsize = function (val) {
    	if (val === undefined) {
    		if (this._fontsize === undefined) {
    			return '';
    		} else {
    			return this._fontsize;
    		}
		} else {
			this._fontsize = val;
		}

		return this;
    }
};

function Line () {
	this.draw = function (parent) {
		var svg = this.makeSVG('line', {x1: this.x1(), y1: this.y1(), x2: this.x2(), 
			y2: this.y2(), stroke: this.stroke(), 'stroke-width': this.strokeWidth(), style: this.style()});
		parent.appendChild(svg);
		return this;
	};

	return this;
};

function Square () {
	this.draw = function (parent) {
		var svg = this.makeSVG('rect', {fill: this.fill(), x: this.x(), y: this.y(), 
			width: this.width(), height: this.height(), style: this.style()});
		parent.appendChild(svg);
		return this;
	};

	this.width = function (val) {
		if (val === undefined) {
			return this._width;
		} else {
			this._width = val;
			this._height = val;

		}

		if (this._x === undefined && this._center) {
			this.center(this._center.x, this._center.y);
		}

		return this;
	};

	this.center = function (x, y) {
		if (this.width() !== undefined) {
			x = x - (this._width / 2);
			y = y - (this._width / 2);
			this.cx(x);
			this.cy(y);
			this.x(x);
			this.y(y);
		} else {
			this._center = {x: x, y: y};
		}

		return this;
	};

	return this;
};

function Rectangle () {
	this.draw = function (parent) {
		var svg = this.makeSVG('rect', {fill: this.fill(), x: this.x(), y: this.y(), 
			width: this.width(), height: this.height(), style: this.style()});
		parent.appendChild(svg);
		return this;
	};

	this.width = function (val) {
		if (val === undefined) {
			return this._width;
		} else {
			this._width = val;
			this._height = val;

		}

		if (this._x === undefined && this._center) {
			this.center(this._center.x, this._center.y);
		}

		return this;
	};

	this.center = function (x, y) {
		if (this.width() !== undefined) {
			x = x - (this._width / 2);
			y = y - (this._width / 2);
			this.cx(x);
			this.cy(y);
			this.x(x);
			this.y(y);
		} else {
			this._center = {x: x, y: y};
		}

		return this;
	};

	return this;
};

function Circle () {
	this.draw = function (parent) {
		var svg = this.makeSVG('circle', {fill: this.fill(), cx: this.cx(), cy: this.cy(), 
			r: this.width(), style: this.style(), id: this.id(), class: this.class()});
		parent.appendChild(svg);
		return this;
	};

	this.width = function (val) {
		if (val === undefined) {
			return this._width;
		} else {
			this._width = val/2;
		}

		return this;
	};

	return this;
};

function Text () {
	this.draw = function (parent) {
		var svg = this.makeSVG('text', {x: this.x(), y: this.y(),
			style: this.style(), 'font-size': this.fontsize()});
		var textNode = document.createTextNode(this.text());
     	svg.appendChild(textNode);

		parent.appendChild(svg);
		return this;
	};

	return this;
};

Line.prototype = new Shape;
Square.prototype = new Shape;
Rectangle.prototype = new Shape;
Circle.prototype = new Shape;
Text.prototype = new Shape;
