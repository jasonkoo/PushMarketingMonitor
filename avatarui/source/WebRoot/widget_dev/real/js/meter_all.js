/**
 * AvatarUI 仪表盘组件
 * data:	2012-12-20
 */

//公共定义
var AnimatedText, AnimatedTextFactory, BaseDonut, BaseMeter, Donut, Meter, MeterPointer, TextRenderer, ValueUpdater, addCommas, formatNumber, mergeObjects, secondsToString, updateObjectValues, __hasProp = {}.hasOwnProperty,
	//扩展对象方法
	extendsObj = function (child, parent) {
		for (var key in parent) {
			if (__hasProp.call(parent, key)) child[key] = parent[key];
		}
		function ctor() {
			this.constructor = child;
		}
		ctor.prototype = parent.prototype;
		child.prototype = new ctor();
		child.__super__ = parent.prototype;
		return child;
	};
		
(function() {
	var browserRequestAnimationFrame, isCancelled, lastId, vendor, vendors, _i, _len;
	vendors = ['ms', 'moz', 'webkit', 'o'];
	for (_i = 0, _len = vendors.length; _i < _len; _i++) {
		vendor = vendors[_i];
		if (window.requestAnimationFrame) {
			break;
		}
		window.requestAnimationFrame = window[vendor + 'RequestAnimationFrame'];
		window.cancelAnimationFrame = window[vendor + 'CancelAnimationFrame'] || window[vendor + 'CancelRequestAnimationFrame'];
	}
	browserRequestAnimationFrame = null;
	lastId = 0;
	isCancelled = {};
	if (!requestAnimationFrame) {
		window.requestAnimationFrame = function (callback, element) {
			var currTime, id, lastTime, timeToCall;
			currTime = new Date().getTime();
			timeToCall = Math.max(0, 16 - (currTime - lastTime));
			id = window.setTimeout(function () {
				return callback(currTime + timeToCall);
			}, timeToCall);
			lastTime = currTime + timeToCall;
			return id;
		};
		return window.cancelAnimationFrame = function (id) {
			return clearTimeout(id);
		};
	} else if (!window.cancelAnimationFrame) {
		browserRequestAnimationFrame = window.requestAnimationFrame;
		window.requestAnimationFrame = function (callback, element) {
			var myId;
			myId = ++lastId;
			browserRequestAnimationFrame(function () {
				if (!isCancelled[myId]) {
					return callback();
				}
			}, element);
			return myId;
		};
		return window.cancelAnimationFrame = function (id) {
			return isCancelled[id] = true;
		};
	}
})();

//时间转字符
secondsToString = function (sec) {
	var hr, min;
	hr = Math.floor(sec / 3600);
	min = Math.floor((sec - (hr * 3600)) / 60);
	sec -= (hr * 3600) + (min * 60);
	sec += '';
	min += '';
	while (min.length < 2) {
		min = '0' + min;
	}
	while (sec.length < 2) {
		sec = '0' + sec;
	}
	hr = hr ? hr + ':' : '';
	return hr + min + ':' + sec;
};

//格式化数字（去掉小数）
formatNumber = function (num) {
	return addCommas(num.toFixed(0));
};

//扩展对象
updateObjectValues = function (obj1, obj2) {
	var key, val;
	for (key in obj2) {
		if (!__hasProp.call(obj2, key)) continue;
		val = obj2[key];
		obj1[key] = val;
	}
	return obj1;
};

//合并对象
mergeObjects = function (obj1, obj2) {
	var key, out, val;
	out = {};
	for (key in obj1) {
		if (!__hasProp.call(obj1, key)) continue;
		val = obj1[key];
		out[key] = val;
	}
	for (key in obj2) {
		if (!__hasProp.call(obj2, key)) continue;
		val = obj2[key];
		out[key] = val;
	}
	return out;
};

//科学计数法
addCommas = function (nStr) {
	var rgx, x, x1, x2;
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = '';
	if (x.length > 1) {
		x2 = '.' + x[1];
	}
	rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
};

//数字跳动
ValueUpdater = (function () {
	ValueUpdater.prototype.animationSpeed = 16;

	function ValueUpdater(addToAnimationQueue, clear) {
		if (addToAnimationQueue == null) {
			addToAnimationQueue = true;
		}
		this.clear = clear != null ? clear : true;
		if (addToAnimationQueue) {
			AnimationUpdater.add(this);
		}
	}

	ValueUpdater.prototype.update = function (force) {
		var diff;
		if (force == null) {
			force = false;
		}
		if (force || this.displayedValue !== this.value) {
			if (this.ctx && this.clear) {
				this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
			}
			diff = this.value - this.displayedValue;
			if (Math.abs(diff / this.animationSpeed) <= 0.001) {
				this.displayedValue = this.value;
			} else {
				this.displayedValue = this.displayedValue + diff / this.animationSpeed;
			}
			this.render();
			return true;
		}
		return false;
	};
	return ValueUpdater;
})();

//构造基本仪表盘
BaseMeter = (function (_super) {
	extendsObj(BaseMeter, _super);
	function BaseMeter() {
		return BaseMeter.__super__.constructor.apply(this, arguments);
	}

	BaseMeter.prototype.setTextField = function (textField) {
		return this.textField = textField instanceof TextRenderer ? textField : new TextRenderer(textField);
	};

	BaseMeter.prototype.setOptions = function (options) {
		if (options == null) {
			options = null;
		}
		this.options = mergeObjects(this.options, options);
		if (this.textField) {
			this.textField.el.style.fontSize = options.fontSize + 'px';
		}
		return this;
	};
	return BaseMeter;
})(ValueUpdater);

//填充数字
TextRenderer = (function () {
	function TextRenderer(el) {
		this.el = el;
	}

	TextRenderer.prototype.render = function (meter) {
		return this.el.innerHTML = formatNumber(meter.displayedValue);
	};
	return TextRenderer;
})();

//动态数字
AnimatedText = (function (_super) {
	extendsObj(AnimatedText, _super);
	AnimatedText.prototype.displayedValue = 0;
	AnimatedText.prototype.setVal = function (value) {
		return this.value = 1 * value;
	};

	function AnimatedText(elem, text) {
		this.elem = elem;
		this.text = text != null ? text : false;
		this.value = 1 * this.elem.innerHTML;
		if (this.text) {
			this.value = 0;
		}
	}

	AnimatedText.prototype.render = function () {
		var textVal;
		if (this.text) {
			textVal = secondsToString(this.displayedValue.toFixed(0));
		} else {
			textVal = addCommas(formatNumber(this.displayedValue));
		}
		return this.elem.innerHTML = textVal;
	};
	return AnimatedText;
})(ValueUpdater);

//变化数字
AnimatedTextFactory = {
	create: function (objList) {
		var elem, out, _i, _len;
		out = [];
		for (_i = 0, _len = objList.length; _i < _len; _i++) {
			elem = objList[_i];
			out.push(new AnimatedText(elem));
		}
		return out;
	}
};

//指针
MeterPointer = (function (_super) {
	extendsObj(MeterPointer, _super);
	MeterPointer.prototype.displayedValue = 0;

	MeterPointer.prototype.value = 0;

	MeterPointer.prototype.options = {
		strokeWidth: 0.035,
		length: 0.1,
		color: "#000000"
	};

	function MeterPointer(meter) {
		this.meter = meter;
		this.ctx = this.meter.ctx;
		this.canvas = this.meter.canvas;
		MeterPointer.__super__.constructor.call(this, false, false);
		this.setOptions();
	}

	MeterPointer.prototype.setOptions = function (options) {
		if (options == null) {
			options = null;
		}
		updateObjectValues(this.options, options);
		this.length = this.canvas.height * this.options.length;
		this.strokeWidth = this.canvas.height * this.options.strokeWidth;
		this.maxValue = this.meter.maxValue;
		return this.animationSpeed = this.meter.animationSpeed;
	};

	MeterPointer.prototype.render = function () {
		var angle, centerX, centerY, endX, endY, startX, startY, x, y;
		angle = this.meter.getAngle.call(this, this.displayedValue);
		centerX = this.canvas.width / 2;
		centerY = this.canvas.height * 0.9;
		x = Math.round(centerX + this.length * Math.cos(angle));
		y = Math.round(centerY + this.length * Math.sin(angle));
		startX = Math.round(centerX + this.strokeWidth * Math.cos(angle - Math.PI / 2));
		startY = Math.round(centerY + this.strokeWidth * Math.sin(angle - Math.PI / 2));
		endX = Math.round(centerX + this.strokeWidth * Math.cos(angle + Math.PI / 2));
		endY = Math.round(centerY + this.strokeWidth * Math.sin(angle + Math.PI / 2));
		this.ctx.fillStyle = this.options.color;
		this.ctx.beginPath();
		this.ctx.arc(centerX, centerY, this.strokeWidth, 0, Math.PI * 2, true);
		this.ctx.fill();
		this.ctx.beginPath();
		this.ctx.moveTo(startX, startY);
		this.ctx.lineTo(x, y);
		this.ctx.lineTo(endX, endY);
		return this.ctx.fill();
	};
	return MeterPointer;
})(ValueUpdater);


Meter = (function (_super) {
	extendsObj(Meter, _super);
	Meter.prototype.elem = null;

	Meter.prototype.value = [20];

	Meter.prototype.maxValue = 80;

	Meter.prototype.displayedAngle = 0;

	Meter.prototype.displayedValue = 0;

	Meter.prototype.lineWidth = 40;

	Meter.prototype.paddingBottom = 0.1;

	Meter.prototype.options = {
		colorStart: "#6fadcf",
		colorStop: void 0,
		strokeColor: "#e0e0e0",
		pointer: {
			length: 0.8,
			strokeWidth: 0.035
		},
		angle: 0.15,
		lineWidth: 0.44,
		fontSize: 40
	};

	function Meter(canvas) {
		this.canvas = canvas;
		Meter.__super__.constructor.call(this);
		this.ctx = this.canvas.getContext('2d');
		this.gp = [new MeterPointer(this)];
		this.setOptions();
		this.render();
	}

	Meter.prototype.setOptions = function (options) {
		var meter, _i, _len, _ref;
		if (options == null) {
			options = null;
		}
		Meter.__super__.setOptions.call(this, options);
		this.lineWidth = this.canvas.height * (1 - this.paddingBottom) * this.options.lineWidth;
		this.radius = this.canvas.height * (1 - this.paddingBottom) - this.lineWidth;
		_ref = this.gp;
		for (_i = 0, _len = _ref.length; _i < _len; _i++) {
			meter = _ref[_i];
			meter.setOptions(this.options.pointer);
		}
		return this;
	};

	Meter.prototype.set = function (value) {
		var i, val, _i, _j, _len, _ref;
		if (!(value instanceof Array)) {
			value = [value];
		}
		if (value.length > this.gp.length) {
			for (i = _i = 0, _ref = value.length - this.gp.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
				this.gp.push(new MeterPointer(this));
			}
		}
		i = 0;
		for (_j = 0, _len = value.length; _j < _len; _j++) {
			val = value[_j];
			if (val > this.maxValue) {
				this.maxValue = this.value * 1.1;
			}
			this.gp[i].value = val;
			this.gp[i++].setOptions({
				maxValue: this.maxValue,
				angle: this.options.angle
			});
		}
		this.value = value[value.length - 1];
		return AnimationUpdater.run();
	};

	Meter.prototype.getAngle = function (value) {
		return (1 + this.options.angle) * Math.PI + (value / this.maxValue) * (1 - this.options.angle * 2) * Math.PI;
	};

	Meter.prototype.render = function () {
		var displayedAngle, fillStyle, meter, h, w, _i, _len, _ref, _results;
		w = this.canvas.width / 2;
		h = this.canvas.height * (1 - this.paddingBottom);
		displayedAngle = this.getAngle(this.displayedValue);
		if (this.textField) {
			this.textField.render(this);
		}
		this.ctx.lineCap = "butt";
		if (this.options.colorStop !== void 0) {
			fillStyle = this.ctx.createRadialGradient(w, h, 9, w, h, 70);
			fillStyle.addColorStop(0, this.options.colorStart);
			fillStyle.addColorStop(1, this.options.colorStop);
		} else {
			fillStyle = this.options.colorStart;
		}
		this.ctx.strokeStyle = fillStyle;
		this.ctx.beginPath();
		this.ctx.arc(w, h, this.radius, (1 + this.options.angle) * Math.PI, displayedAngle, false);
		this.ctx.lineWidth = this.lineWidth;
		this.ctx.stroke();
		this.ctx.strokeStyle = this.options.strokeColor;
		this.ctx.beginPath();
		this.ctx.arc(w, h, this.radius, displayedAngle, (2 - this.options.angle) * Math.PI, false);
		this.ctx.stroke();
		_ref = this.gp;
		_results = [];
		for (_i = 0, _len = _ref.length; _i < _len; _i++) {
			meter = _ref[_i];
			_results.push(meter.update(true));
		}
		return _results;
	};

	return Meter;

})(BaseMeter);

//构造基本圆形图
BaseDonut = (function (_super) {
	extendsObj(BaseDonut, _super);
	BaseDonut.prototype.lineWidth = 15;
	BaseDonut.prototype.displayedValue = 0;
	BaseDonut.prototype.value = 33;

	BaseDonut.prototype.maxValue = 80;

	BaseDonut.prototype.options = {
		lineWidth: 0.15,
		colorStart: "#98C649",
		colorStop: "#98C649",
		strokeColor: "#eeeeee",
		shadowColor: "#d5d5d5",
		angle: 0.35
	};

	function BaseDonut(canvas) {
		this.canvas = canvas;
		BaseDonut.__super__.constructor.call(this);
		this.ctx = this.canvas.getContext('2d');
		this.setOptions();
		this.render();
	}

	BaseDonut.prototype.getAngle = function (value) {
		return (1 - this.options.angle) * Math.PI + (value / this.maxValue) * ((2 + this.options.angle) - (1 - this.options.angle)) * Math.PI;
	};

	BaseDonut.prototype.setOptions = function (options) {
		if (options == null) {
			options = null;
		}
		BaseDonut.__super__.setOptions.call(this, options);
		this.lineWidth = this.canvas.height * this.options.lineWidth;
		this.radius = this.canvas.height / 2 - this.lineWidth / 2;
		return this;
	};

	BaseDonut.prototype.set = function (value) {
		this.value = value;
		if (this.value > this.maxValue) {
			this.maxValue = this.value * 1.1;
		}
		return AnimationUpdater.run();
	};

	BaseDonut.prototype.render = function () {
		var displayedAngle, grdFill, h, start, stop, w;
		displayedAngle = this.getAngle(this.displayedValue);
		w = this.canvas.width / 2;
		h = this.canvas.height / 2;
		if (this.textField) {
			this.textField.render(this);
		}
		grdFill = this.ctx.createRadialGradient(w, h, 39, w, h, 70);
		grdFill.addColorStop(0, this.options.colorStart);
		grdFill.addColorStop(1, this.options.colorStop);
		start = this.radius - this.lineWidth / 2;
		stop = this.radius + this.lineWidth / 2;
		this.ctx.strokeStyle = this.options.strokeColor;
		this.ctx.beginPath();
		this.ctx.arc(w, h, this.radius, (1 - this.options.angle) * Math.PI, (2 + this.options.angle) * Math.PI, false);
		this.ctx.lineWidth = this.lineWidth;
		this.ctx.lineCap = "round";
		this.ctx.stroke();
		this.ctx.strokeStyle = grdFill;
		this.ctx.beginPath();
		this.ctx.arc(w, h, this.radius, (1 - this.options.angle) * Math.PI, displayedAngle, false);
		return this.ctx.stroke();
	};
	return BaseDonut;
})(BaseMeter);

Donut = (function (_super) {
	extendsObj(Donut, _super);
	function Donut() {
		return Donut.__super__.constructor.apply(this, arguments);
	}

	Donut.prototype.strokeGradient = function (w, h, start, stop) {
		var grd;
		grd = this.ctx.createRadialGradient(w, h, start, w, h, stop);
		grd.addColorStop(0, this.options.shadowColor);
		grd.addColorStop(0.12, this.options._orgStrokeColor);
		grd.addColorStop(0.88, this.options._orgStrokeColor);
		grd.addColorStop(1, this.options.shadowColor);
		return grd;
	};

	Donut.prototype.setOptions = function (options) {
		var h, start, stop, w;
		if (options == null) {
			options = null;
		}
		Donut.__super__.setOptions.call(this, options);
		w = this.canvas.width / 2;
		h = this.canvas.height / 2;
		start = this.radius - this.lineWidth / 2;
		stop = this.radius + this.lineWidth / 2;
		this.options._orgStrokeColor = this.options.strokeColor;
		this.options.strokeColor = this.strokeGradient(w, h, start, stop);
		return this;
	};
	return Donut;
})(BaseDonut);

//构造动态更新参数
window.AnimationUpdater = {
	elements: [],
	animId: null,
	addAll: function (list) {
		var elem, _i, _len, _results;
		_results = [];
		for (_i = 0, _len = list.length; _i < _len; _i++) {
			elem = list[_i];
			_results.push(AnimationUpdater.elements.push(elem));
		}
		return _results;
	},
	add: function (object) {
		return AnimationUpdater.elements.push(object);
	},
	run: function () {
		var animationFinished, elem, _i, _len, _ref;
		animationFinished = true;
		_ref = AnimationUpdater.elements;
		for (_i = 0, _len = _ref.length; _i < _len; _i++) {
			elem = _ref[_i];
			if (elem.update()) {
				animationFinished = false;
			}
		}
		if (!animationFinished) {
			return AnimationUpdater.animId = requestAnimationFrame(AnimationUpdater.run);
		} else {
			return cancelAnimationFrame(AnimationUpdater.animId);
		}
	}
};

$.fn.Meter = function(opts) {
  this.each(function() {
    var $this = $(this),
        data = $this.data();

    if (data.meter) {
      data.meter.stop();
      delete data.meter;
    }
    if (opts !== false) {
      data.meter = new Meter(this).setOptions(opts);
    }
  });
  return this;
};

$.fn.Donut = function(opts) {
  this.each(function() {
    var $this = $(this),
        data = $this.data();

    if (data.donut) {
      data.donut.stop();
      delete data.donut;
    }
    if (opts !== false) {
      data.donut = new Donut(this).setOptions(opts);
    }
  });
  return this;
};