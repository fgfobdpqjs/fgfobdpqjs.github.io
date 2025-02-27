/************************************************

								___                      _
							 / __)                    | |
 _   _   ____ | |__  ____  ____    ____ | | _    ____   ____
| | | | / _  )|  __)/ _  )|  _   / _  || ||   / _  | / ___)
| |_| |( (/ / | |  ( (/ / | | | |( ( | || |_) )( ( | || |
 __  | ____)|_|   ____)|_| |_| _|| ||____/  _||_||_|
(____/                           (_____| @By:yefengbar.com

 * @version : v1.0.0
 * @date :2021-08-09 16:24:20
 ********************************************************/
! function(t, e) {
	function o() {}
	o.prototype._opts = {
		name: "K7adsSDK",
		version: "1.0.0",
		postMsgHost: location.protocol+"//www.7k7k.com",
		ajaxUrl: location.protocol+"//www.7k7k.com"
	}, o.prototype._addJs = function(t) {
		var e = document.createElement("script");
		e.type = "text/javascript", e.async = !0, e.src = t;
		var o = document.getElementsByTagName("head")[0];
		o.appendChild(e)
	}, o.prototype._console = function(t) {
		return t && console.log("%c[" + this._opts.name + "]: %c " + t, "color:#159957;font-weight:bold", "color:#ffb658")
	}, o.prototype._sendMsg = function(t, e, o) {
		t && (e = e || {}, "init" === t ? (e.account = this._opts.account, e.appkey = this._opts.appkey, e.vaildCode = this._opts.vaildCode) : e.token = window.localStorage.getItem("youxi123_token"), e.time = (new Date).getTime(),
		window.parent.postMessage({
			type: t,
			data: e
		}, this._opts.postMsgHost),

		(location.protocol=="https:")&&window.parent.postMessage({
			type: t,
			data: e
		}, "http://www.7k7k.com"),
		"function" == typeof o && o.call(this, e))
	}, o.prototype.cookie = {
		write: function(t, e, o, n, s) {
			var i = new Date;
			o = o || 30, s = s || "/", i.setTime(i.getTime() + 24 * o * 60 * 60 * 1e3);
			var a = "; expires=" + i.toGMTString(),
				r = t + "=" + e + a + "; path=" + s;
			n && (r += "; domain=" + n), document.cookie = r
		},
		read: function(t) {
			var e = "" + document.cookie,
				o = e.indexOf(t);
			if(void 0 === t || "" === t || o === -1) return "";
			var n = e.indexOf(";", o);
			return n == -1 && (n = e.length), unescape(e.substring(o + t.length + 1, n))
		},
		remove: function(t) {
			this.read(t) && this.write(t, "", -1, "/")
		}
	}, o.prototype.serialize = function(t) {
		if("object" == typeof t) {
			var e = [];
			for(k in t) e.push(k + "=" + t[k]);
			return e.join("&")
		}
		this._console("Error! param isnot a object type!")
	}, o.prototype._ajax = function(t, e, o) {
		var n = this;
		if(window.localStorage.getItem("k7ads_token")) {
			var s = new XMLHttpRequest;
			s.open("POST", this._opts.ajaxUrl + t, !0), s.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), s.setRequestHeader("Authorization", window.localStorage.getItem("k7ads_token")), s.onreadystatechange = function() {
				return 4 == s.readyState && 200 == s.status || 304 == s.status ? ("-99" === s.responseText && this._sendMsg("login", {}), void("function" == typeof o && o.call(this, s.responseText))) : void n._console("Error! post:" + s.status)
			}, s.send(n.serialize(e))
		} else n.Login()
	}, o.prototype.showAd = function(t, e) {
		this._sendMsg("showAd", t, e)
	}, o.prototype.AdaptParams = function(t, e) {
		this._ajax("adaptParams", t, e)
	}, o.prototype._update = function(t, e, o) {
		return this[t] = function(e, n) {
			this[t] = Object.assign({}, o, e)
		}, this
	}, o.prototype._remove = function(t) {
		return delete this[t], this
	}, o.prototype.Adjust = function(t, e) {
		this._sendMsg("adjust", t, e)
	}, o.prototype.Init = function(t) {
		if(t) {
			Object.assign({}, this._opts, t), this._console("Init complate!"), this._console("Version:" + this._opts.version), this._sendMsg("init", {
				rand: Math.random()
			});
			try {
				localStorage.setItem("SDK_version", this._opts.version)
			} catch(e) {
				return !0
			}
			document.body.addEventListener('focusout', function(){
				//软键盘收起的事件处理
				console.log('game focusout!!!');
				K7adsSDK._sendMsg("focusout", t, e);
				window.scrollTo(0, 0);
				document.body.scrollTop = 0;
			});
		} else alert("请正确配置sdk初始化信息！")
	};
	t.K7adsSDK = new o
}(window, document);
