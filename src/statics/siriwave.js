! function (t, i) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = i() : "function" == typeof define && define.amd ? define(i) : (t = t || self).SiriWave = i()
}(this, (function () {
    "use strict";
    var t = function () {
        return (t = Object.assign || function (t) {
            for (var i, e = 1, s = arguments.length; e < s; e++)
                for (var o in i = arguments[e]) Object.prototype.hasOwnProperty.call(i, o) && (t[o] = i[o]);
            return t
        }).apply(this, arguments)
    };
    var i, e = function () {
            function t(t, i) {
                this.ATT_FACTOR = 4, this.GRAPH_X = 1, this.AMPLITUDE_FACTOR = .6, this.ctrl = t, this.definition = i
            }
            return t.prototype.globalAttFn = function (t) {
                return Math.pow(this.ATT_FACTOR / (this.ATT_FACTOR + Math.pow(t, this.ATT_FACTOR)), this.ATT_FACTOR)
            }, t.prototype._xpos = function (t) {
                return this.ctrl.width * ((t + this.GRAPH_X) / (2 * this.GRAPH_X))
            }, t.prototype._ypos = function (t) {
                return this.AMPLITUDE_FACTOR * (this.globalAttFn(t) * (this.ctrl.heightMax * this.ctrl.amplitude) * (1 / this.definition.attenuation) * Math.sin(this.ctrl.opt.frequency * t - this.ctrl.phase))
            }, t.prototype.draw = function () {
                var t = this.ctrl.ctx;
                t.moveTo(0, 0), t.beginPath();
                var i = this.ctrl.color.replace(/rgb\(/g, "").replace(/\)/g, "");
                t.strokeStyle = "rgba(" + i + "," + this.definition.opacity + ")", t.lineWidth = this.definition.lineWidth;
                for (var e = -this.GRAPH_X; e <= this.GRAPH_X; e += this.ctrl.opt.pixelDepth) t.lineTo(this._xpos(e), this.ctrl.heightMax + this._ypos(e));
                t.stroke()
            }, t.getDefinition = function () {
                return [{
                    attenuation: -2,
                    lineWidth: 1,
                    opacity: 0
                }, {
                    attenuation: -6,
                    lineWidth: 1,
                    opacity: 0
                }, {
                    attenuation: 4,
                    lineWidth: 1,
                    opacity: 0
                }, {
                    attenuation: 2,
                    lineWidth: 1,
                    opacity: 0
                }, {
                    attenuation: 1,
                    lineWidth: 1.5,
                    opacity: 1
                }]
            }, t
        }(),
        s = function () {
            function t(t, i) {
                this.GRAPH_X = 25, this.AMPLITUDE_FACTOR = .8, this.SPEED_FACTOR = 11, this.DEAD_PX = 2, this.ATT_FACTOR = 4, this.DESPAWN_FACTOR = .02, this.NOOFCURVES_RANGES = [2, 5], this.AMPLITUDE_RANGES = [.3, 1], this.OFFSET_RANGES = [-3, 3], this.WIDTH_RANGES = [1, 3], this.SPEED_RANGES = [.5, 1], this.DESPAWN_TIMEOUT_RANGES = [500, 2e3], this.ctrl = t, this.definition = i, this.respawn()
            }
            return t.prototype.getRandomRange = function (t) {
                return t[0] + Math.random() * (t[1] - t[0])
            }, t.prototype.respawnSingle = function (t) {
                this.phases[t] = 0, this.amplitudes[t] = 0, this.despawnTimeouts[t] = this.getRandomRange(this.DESPAWN_TIMEOUT_RANGES), this.offsets[t] = this.getRandomRange(this.OFFSET_RANGES), this.speeds[t] = this.getRandomRange(this.SPEED_RANGES), this.finalAmplitudes[t] = this.getRandomRange(this.AMPLITUDE_RANGES), this.widths[t] = this.getRandomRange(this.WIDTH_RANGES), this.verses[t] = this.getRandomRange([-1, 1])
            }, t.prototype.getEmptyArray = function (t) {
                return new Array(t)
            }, t.prototype.respawn = function () {
                this.spawnAt = Date.now(), this.noOfCurves = Math.floor(this.getRandomRange(this.NOOFCURVES_RANGES)), this.phases = this.getEmptyArray(this.noOfCurves), this.offsets = this.getEmptyArray(this.noOfCurves), this.speeds = this.getEmptyArray(this.noOfCurves), this.finalAmplitudes = this.getEmptyArray(this.noOfCurves), this.widths = this.getEmptyArray(this.noOfCurves), this.amplitudes = this.getEmptyArray(this.noOfCurves), this.despawnTimeouts = this.getEmptyArray(this.noOfCurves), this.verses = this.getEmptyArray(this.noOfCurves);
                for (var t = 0; t < this.noOfCurves; t++) this.respawnSingle(t)
            }, t.prototype.globalAttFn = function (t) {
                return Math.pow(this.ATT_FACTOR / (this.ATT_FACTOR + Math.pow(t, 2)), this.ATT_FACTOR)
            }, t.prototype.sin = function (t, i) {
                return Math.sin(t - i)
            }, t.prototype._grad = function (t, i, e) {
                return 1
            }, t.prototype.yRelativePos = function (t) {
                for (var i = 0, e = 0; e < this.noOfCurves; e++) {
                    var s = 4 * (e / (this.noOfCurves - 1) * 2 - 1);
                    s += this.offsets[e];
                    var o = t * (1 / this.widths[e]) - s;
                    i += Math.abs(this.amplitudes[e] * this.sin(this.verses[e] * o, this.phases[e]) * this.globalAttFn(o))
                }
                return i / this.noOfCurves
            }, t.prototype._ypos = function (t) {
                return this.AMPLITUDE_FACTOR * this.ctrl.heightMax * this.ctrl.amplitude * this.yRelativePos(t) * this.globalAttFn(t / this.GRAPH_X * 2)
            }, t.prototype._xpos = function (t) {
                return this.ctrl.width * ((t + this.GRAPH_X) / (2 * this.GRAPH_X))
            }, t.prototype.drawSupportLine = function () {
                var t = this.ctrl.ctx,
                    i = [0, this.ctrl.heightMax, this.ctrl.width, 1],
                    e = t.createLinearGradient.apply(t, i);
                e.addColorStop(0, "transparent"), e.addColorStop(.1, "rgba(255,255,255,.5)"), e.addColorStop(.8, "rgba(255,255,255,.5)"), e.addColorStop(1, "transparent"), t.fillStyle = e, t.fillRect.apply(t, i)
            }, t.prototype.draw = function () {
                var t = this.ctrl.ctx;
                if (t.globalAlpha = .7, t.globalCompositeOperation = "lighter", this.definition.supportLine) return this.drawSupportLine();
                for (var i = 0; i < this.noOfCurves; i++) this.spawnAt + this.despawnTimeouts[i] <= Date.now() ? this.amplitudes[i] -= this.DESPAWN_FACTOR : this.amplitudes[i] += this.DESPAWN_FACTOR, this.amplitudes[i] = Math.min(Math.max(this.amplitudes[i], 0), this.finalAmplitudes[i]), this.phases[i] = (this.phases[i] + this.ctrl.speed * this.speeds[i] * this.SPEED_FACTOR) % (2 * Math.PI);
                for (var e = -1 / 0, s = 0, o = [1, -1]; s < o.length; s++) {
                    var n = o[s];
                    t.beginPath();
                    for (var h = -this.GRAPH_X; h <= this.GRAPH_X; h += this.ctrl.opt.pixelDepth) {
                        var r = this._xpos(h),
                            a = this._ypos(h);
                        t.lineTo(r, this.ctrl.heightMax - n * a), e = Math.max(e, a)
                    }
                    t.closePath(), t.fillStyle = "rgba(" + this.definition.color + ", 1)", t.strokeStyle = "rgba(" + this.definition.color + ", 1)", t.fill()
                }
                return e < this.DEAD_PX && this.prevMaxY > e && this.respawn(), this.prevMaxY = e, null
            }, t.getDefinition = function () {
                return [{
                    color: "255,255,255",
                    supportLine: !0
                }, {
                    color: "15, 82, 169"
                }, {
                    color: "173, 57, 76"
                }, {
                    color: "48, 220, 155"
                }]
            }, t
        }();
    return function (t) {
            t.ios = "ios", t.ios9 = "ios9"
        }(i || (i = {})),
        function () {
            function o(o) {
                var n = this,
                    h = o.container,
                    r = function (t, i) {
                        var e = {};
                        for (var s in t) Object.prototype.hasOwnProperty.call(t, s) && i.indexOf(s) < 0 && (e[s] = t[s]);
                        if (null != t && "function" == typeof Object.getOwnPropertySymbols) {
                            var o = 0;
                            for (s = Object.getOwnPropertySymbols(t); o < s.length; o++) i.indexOf(s[o]) < 0 && Object.prototype.propertyIsEnumerable.call(t, s[o]) && (e[s[o]] = t[s[o]])
                        }
                        return e
                    }(o, ["container"]);
                this.phase = 0, this.run = !1, this.curves = [];
                var a = window.getComputedStyle(h);
                switch (this.opt = t({
                    container: h,
                    style: i.ios,
                    ratio: window.devicePixelRatio || 1,
                    speed: .2,
                    amplitude: 1,
                    frequency: 6,
                    color: "#fff",
                    cover: !1,
                    width: parseInt(a.width.replace("px", ""), 10),
                    height: parseInt(a.height.replace("px", ""), 10),
                    autostart: !0,
                    pixelDepth: .02,
                    lerpSpeed: .1
                }, r), this.speed = Number(this.opt.speed), this.amplitude = Number(this.opt.amplitude), this.width = Number(this.opt.ratio * this.opt.width), this.height = Number(this.opt.ratio * this.opt.height), this.heightMax = Number(this.height / 2) - 6, this.color = "rgb(" + this.hex2rgb(this.opt.color) + ")", this.interpolation = {
                    speed: this.speed,
                    amplitude: this.amplitude
                }, this.canvas = document.createElement("canvas"), this.ctx = this.canvas.getContext("2d"), this.canvas.width = this.width, this.canvas.height = this.height, !0 === this.opt.cover ? this.canvas.style.width = this.canvas.style.height = "100%" : (this.canvas.style.width = this.width / this.opt.ratio + "px", this.canvas.style.height = this.height / this.opt.ratio + "px"), this.opt.style) {
                    case i.ios9:
                        this.curves = (this.opt.curveDefinition || s.getDefinition()).map((function (t) {
                            return new s(n, t)
                        }));
                        break;
                    case i.ios:
                    default:
                        this.curves = (this.opt.curveDefinition || e.getDefinition()).map((function (t) {
                            return new e(n, t)
                        }))
                }
                this.opt.container.appendChild(this.canvas), this.opt.autostart && this.start()
            }
            return o.prototype.hex2rgb = function (t) {
                t = t.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (function (t, i, e, s) {
                    return i + i + e + e + s + s
                }));
                var i = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);
                return i ? parseInt(i[1], 16).toString() + "," + parseInt(i[2], 16).toString() + "," + parseInt(i[3], 16).toString() : null
            }, o.prototype.intLerp = function (t, i, e) {
                return t * (1 - e) + i * e
            }, o.prototype.lerp = function (t) {
                return this[t] = this.intLerp(this[t], this.interpolation[t], this.opt.lerpSpeed), this[t] - this.interpolation[t] == 0 && (this.interpolation[t] = null), this[t]
            }, o.prototype._clear = function () {
                this.ctx.globalCompositeOperation = "destination-out", this.ctx.fillRect(0, 0, this.width, this.height), this.ctx.globalCompositeOperation = "source-over"
            }, o.prototype._draw = function () {
                this.curves.forEach((function (t) {
                    return t.draw()
                }))
            }, o.prototype.startDrawCycle = function () {
                this._clear(), null !== this.interpolation.amplitude && this.lerp("amplitude"), null !== this.interpolation.speed && this.lerp("speed"), this._draw(), this.phase = (this.phase + Math.PI / 2 * this.speed) % (2 * Math.PI), window.requestAnimationFrame ? this.animationFrameId = window.requestAnimationFrame(this.startDrawCycle.bind(this)) : this.timeoutId = setTimeout(this.startDrawCycle.bind(this), 20)
            }, o.prototype.start = function () {
                this.phase = 0, this.run || (this.run = !0, this.startDrawCycle())
            }, o.prototype.stop = function () {
                this.phase = 0, this.run = !1, this.animationFrameId && window.cancelAnimationFrame(this.animationFrameId), this.timeoutId && clearTimeout(this.timeoutId)
            }, o.prototype.set = function (t, i) {
                this.interpolation[t] = i
            }, o.prototype.setSpeed = function (t) {
                this.set("speed", t)
            }, o.prototype.setAmplitude = function (t) {
                this.set("amplitude", t)
            }, o
        }()
}));