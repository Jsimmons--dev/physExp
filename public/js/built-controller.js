(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _model = require("../js/model");

var model = _interopRequireWildcard(_model);

var _view = require("../js/view");

var view = _interopRequireWildcard(_view);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var bodies = [];
bodies.push(new _model.Body([0, 0], [1, 1], 15, {
    "drag": true
}, [[[.1, .3], 10]]));
bodies.push(new _model.Body([10, 30], [2, 2], 5, {
    "drag": true
}));

var context = view.setup();

var mainloop = function mainloop() {
    model.updateBodies(bodies);
    view.drawBodies(context, bodies);
};

var recursiveAnim = function recursiveAnim() {
    mainloop();
    window.requestAnimationFrame(recursiveAnim);
};

window.requestAnimationFrame(recursiveAnim);

//window.requestAnimationFrame(mainloop);
setTimeout(function () {
    var focusBody = void 0;
    document.querySelector("#id_0").addEventListener("mousedown", function (e) {
        console.log('dragstart');
        focusBody = bodies[0];
    });
    document.querySelector("#id_0").addEventListener("mousemove", function (e) {
        console.log('drag');
        focusBody.x = [e.clientX, e.clientY];
    });
    document.querySelector("#id_0").addEventListener("mouseup", function (e) {
        console.log('dragend');
        focusBody = undefined;
    });
}, 0);

},{"../js/model":2,"../js/view":4}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Body = undefined;
exports.updateBodies = updateBodies;
exports.updateBody = updateBody;

var _vec = require("../js/vec");

var vec = _interopRequireWildcard(_vec);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ID = 0;
var DRAG = .01;

var Body = exports.Body = function Body(x, v, m, options, forces) {
    _classCallCheck(this, Body);

    this.x = x;
    this.v = v;
    this.m = m;
    this.forces = forces || [];
    this.id = "id_" + ID++;
    var ops = options || {};
    if (ops.drag === true) this.drag = this.v.slice().map(function (d) {
        return -d * DRAG;
    });
};

function updateBodies(bodies) {
    bodies.forEach(function (d) {
        return updateBody(d);
    });
}

function updateBody(body) {
    body.x = vec.add(body.x, body.v);
    body.forces.forEach(function (d, i) {
        body.v = vec.add(body.v, body.forces[i][0]);
        body.forces[i][1] = body.forces[i][1] - 1;
        if (body.forces[i][1] === 0) body.forces.splice(i);
    });
    if (body.drag !== undefined) {
        body.v = vec.add(body.v, body.drag);
        body.drag = body.v.slice().map(function (d) {
            return -d * DRAG;
        });
    }
}

},{"../js/vec":3}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.add = add;

function add(arr1, arr2) {
    return arr1.map(function (d, i) {
        return arr1[i] + arr2[i];
    });
}

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.drawBody = drawBody;
exports.drawBodies = drawBodies;
exports.setup = setup;


function drawBody(context, body) {
    var bodyEl = context.selectAll("#" + body.id).data([body]);

    bodyEl.attr({
        "cx": body.x[0],
        "cy": body.x[1]
    });

    bodyEl.enter().append('circle').attr({
        "cx": body.x[0],
        "cy": body.x[1],
        "r": body.m,
        "id": body.id
    });
}

function drawBodies(context, bodies) {
    bodies.forEach(function (d) {
        drawBody(context, d);
    });
}

function setup() {
    var sel = d3.select("body").append("svg");
    sel.attr({
        "id": "board"
    }).style({
        "width": "98vw",
        "height": "98vh"
    });
    return sel;
}

},{}]},{},[1]);
