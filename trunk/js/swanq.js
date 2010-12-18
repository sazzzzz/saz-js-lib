/**
 * 基本ライブラリ
 */


/*@cc_on _d=document;eval('var document=_d')@*/

// 自分自身が属する script 要素を取得
// http://d.hatena.ne.jp/amachang/20061201/1164986067
//var currentScript = (function (e) { if(e.nodeName.toLowerCase() == 'script') {return e;} return arguments.callee(e.lastChild); })(document);

var swanq = function () {
	
	//getPosition()用
	var agt = navigator.userAgent.toLowerCase();
	
	return {
		//
		// public props.
		//
		
		/**
		 * レンダリングする間隔。（ミリ秒）
		 */
		RENDER_INTERVAL: Math.floor(1000/24),
		
		//必要となるGlobal変数の定義
		// 間違いのないように全文字列を小文字に変換
		//http://www.openspc2.org/userAgent/
		//getPosition()用
		//agt : navigator.userAgent.toLowerCase(),
		agt : agt,
		
		is_safari : (agt.indexOf('safari') != -1),
		is_opera : (agt.indexOf('opera') != -1),
		is_gecko : ((agt.indexOf('gecko') != -1) && (agt.indexOf('safari') == -1)),
		is_ie : ((agt.indexOf('msie') != -1) && (agt.indexOf('opera') == -1)),
		
		is_win : (agt.indexOf('win') != -1),
		is_mac : ((agt.indexOf('mac') != -1) && (agt.indexOf('iphone') == -1)),
		is_macosx : ((agt.indexOf('mac') != -1) && (agt.indexOf('iphone') == -1) && (agt.indexOf('mac os x') != -1)),
		
		
		/**
		 * ブラウザレンダリングモードが、標準モード(Standard)かどうか
		 */
		isStandardMode: (document.compatMode=='CSS1Compat'),
		/**
		 * ブラウザレンダリングモードが、互換モード(Quirks)かどうか
		 */
		isQuirksMode: (document.compatMode=='BackCompat'),
		
		
		//
		// public method
		//
		
		/**
		 * デバッグ用出力
		 * firefox以外でconsole.log使うと、そこで中断するよ！
		 * @param {Object} str
		 */
		log: function (str) {
			if(this.is_gecko){
				//console.log(str);
			}
			//alert(str);
		},
		
		
		//
		// 便利
		//
		
		/**
		 * getElementByIdのショートカット
		 * @param {Object} id
		 */
		$: function (id) {
			//swanq.log('$('+id);
			var target = document.getElementById(id);
			if(target == undefined){
				swanq.log('swanq.$: id = "'+id+'" target not found.');
			}
			return target;
		},
		
		
		
		/**
		 * 指定要素のページ上での位置を調べる。
		 * http://hkom.blog1.fc2.com/blog-entry-503.html
		 * @param {Object} that	対象要素。
		 */
		getPosition: function(that) {
			//swanq.log('swanq.getPosition');
			var targetEle = that;　　　//thatは位置を取得したい要素Object
			
			//var pos = new function(){ this.x = 0; this.y = 0; };
			var pos = {x:0,y:0};
			
			while( targetEle ){
				pos.x += targetEle.offsetLeft; 
				pos.y += targetEle.offsetTop; 
				targetEle = targetEle.offsetParent;
				//IEの補正：上記計算で無視されてしまう各親要素のborder幅を加算
				if ((targetEle) && (this.is_ie)) {
					pos.x += (parseInt(this.getElementStyle(targetEle,'borderLeftWidth','border-left-width'),10) || 0);
					pos.y += (parseInt(this.getElementStyle(targetEle,'borderTopWidth','border-top-width'),10) || 0);
				}
			}
			//geckoの補正：カウントしないbody部border幅をマイナスしてしまうので２倍して加算
			if (this.is_gecko) {
				//以下の部分でbody部を取得し、borderの減算を補正する。
				var bd = document.getElementsByTagName('BODY')[0];　　//body部を取得
				pos.x += 2*(parseInt(this.getElementStyle(bd,'borderLeftWidth','border-left-width'),10) || 0);
				pos.y += 2*(parseInt(this.getElementStyle(bd,'borderTopWidth','border-top-width'),10) || 0);
			}
			//swanq.log('swanq.getPosition: '+pos.x+','+pos.y);
			return pos;
		},
		
		/**
		 * 要素のスタイル属性を取得する。getPositionの補助メソッド。
		 * @param {Object} targetElm
		 * @param {Object} IEStyleProp
		 * @param {Object} CSSStyleProp
		 */
		getElementStyle: function(targetElm,IEStyleProp,CSSStyleProp) {
			var elem = targetElm;
			if (elem.currentStyle) {
				return elem.currentStyle[IEStyleProp];
			} else if (window.getComputedStyle) {
				var compStyle = window.getComputedStyle(elem,'');
				return compStyle.getPropertyValue(CSSStyleProp);
			}
		},
		
		
		

		
		/**
		 * 指定idのflashを返す。flash: ExternalInterface 用。<br>
		 * document.getElementById('pluginName')やdocument.all.pluginNameなどは使用禁止
		 * @param {Object} movieName
		 */
		getSwf: function (movieName) {
			//this.log('swanq.getSwf('+movieName);
			return (navigator.appName.indexOf('Microsoft') != -1) ? window[movieName] : document[movieName];
			//return (document.all) ? window[movieName] : document[movieName];
		},
		
		
		
		
		
		//
		// クロスブラウザ
		//
		
		
		
		//
		// イベント
		//
		
		//
		// クロスブラウザコンテストNo１
		// http://d.hatena.ne.jp/yositosi/20070121
		// http://www.quirksmode.org/blog/archives/2005/10/_and_the_winner_1.html
		// ※MacIE5非対応
		//
		addEvent: function ( obj, type, fn ) {
			if (obj.addEventListener)
				obj.addEventListener( type, fn, false );
			else if (obj.attachEvent)
			{
				obj["e"+type+fn] = fn;
				obj[type+fn] = function() { obj["e"+type+fn]( window.event ); }
				obj.attachEvent( "on"+type, obj[type+fn] );
			}
		},

		removeEvent: function ( obj, type, fn ) {
			if (obj.removeEventListener)
				obj.removeEventListener( type, fn, false );
			else if (obj.detachEvent)
			{
				obj.detachEvent( "on"+type, obj[type+fn] );
				obj[type+fn] = null;
				obj["e"+type+fn] = null;
			}
		},
		
		
		
		//
		// http://d.hatena.ne.jp/amachang/20080517/1210991851
		// amachang製
		//
		
		// 古いブラウザだと unload 時に detach しないとメモリリークする
		//attach(elm, 'unload', function() {
		//  detach(elm, 'click', handler);
		//  detach(elm, 'unload', arguments.callee);
		//});

		
		/**
		 * イベントハンドラを追加
		 * @param {Object} elm
		 * @param {Object} eventType
		 * @param {Object} handler
		 */
		/*attachEvent: function (elm, eventType, handler) {
		    if (elm.addEventListener) {
		        elm.addEventListener(eventType, handler, false);
		    }
		    else {
		        elm.attachEvent('on' + eventType, handler);
		    }
		},*/
		
		/**
		 * イベントハンドラを削除
		 * @param {Object} elm
		 * @param {Object} eventType
		 * @param {Object} handler
		 */
		/*detachEvent: function (elm, eventType, handler) {
		    if (elm.removeEventListener) {
		        elm.removeEventListener(eventType, handler, false);
		    }
		    else {
		        elm.detachEvent('on' + eventType, handler);
		    }
		},*/
		
		
		
		
		//
		// IEのメモリリーク問題
		// http://p2b.jp/index.php?UID=1131336575
		// ブログパーツではうまく動かなかった。
		//
		
		/**
		 * イベントリスナを追加する。
		 * @param {Object} obj	対象オブジェクト。
		 * @param {Object} evType	イベント名。
		 * @param {Object} fn	リスナ関数。
		 */
		addEvent: function (obj, evType, fn){
			if(!obj['_'+evType]){
				obj['_'+evType] = [];
				if(obj['on' + evType] != null) obj['_'+evType].push(obj['on' + evType]);
				obj['on' + evType] = this.evokeEvent;
			} else {
				for(var i in obj['_'+evType]) if(obj['_'+evType][i]===fn) return;
			}
			obj['_'+evType].push(fn);
		},
		
		/**
		 * イベントリスナを削除する。
		 * @param {Object} obj	対象オブジェクト。
		 * @param {Object} evType	イベント名。
		 * @param {Object} fn	リスナ関数。
		 */
		removeEvent: function (obj, evType, fn){
			if(obj['_'+evType]){
				for(var i in obj['_'+evType]){
					if(obj['_'+evType][i]===fn) delete obj['_'+evType][i];
				}
			}
		},
		
		/**
		 * addEventサブ。
		 * @param {Object} e
		 */
		evokeEvent: function (e) {
			var e = e || window.event;
			for(var i in this['_'+e.type]) this['_'+e.type][i].apply(this,[e]);
		},		
		
		
		
		// 開発メモattachEvent
		// http://mykits.blog80.fc2.com/?q=attachEvent
		
		/**
		 * イベントリスナを追加する。<br>
		 * @param {Object} obj	対象オブジェクト。
		 * @param {Object} eventType	イベント名。
		 * @param {Object} fn	リスナ関数。
		 */
		addEventListener: function (obj, eventType, fn){
			//swanq.log('addEventListener'+arguments);
			if (obj.addEventListener){
				obj.addEventListener(eventType, fn, false);
				return true;
			} else if (obj.attachEvent){
				return obj.attachEvent('on'+eventType, fn);
			} else {
				return false;
			}
		},
		
		/**
		 * イベントリスナを削除する。
		 * @param {Object} obj	対象オブジェクト。
		 * @param {Object} eventType	イベント名。
		 * @param {Object} fn	リスナ関数。
		 */
		removeEventListener: function (obj, eventType, fn){
			//swanq.log('removeEventListener'+arguments);
			if (obj.removeEventListener){
				obj.removeEventListener(eventType, fn, false);
				return true;
			} else if (obj.detachEvent){
				return obj.detachEvent('on'+eventType, fn);
			} else {
				return false;
			}
		},
		
		
		
		
		
		
		
		
		
		/**
		 * ブラウザレンダリングモード
		 */
		getRenderingMode: function () {
			switch (document.compatMode) {
				case 'BackCompat':
					return 'quirks';
				case 'CSS1Compat':
					return 'standard';
				default:
					return;
			}
		},
		
		
		
		//Internet Explorer上のJavaScriptで、クライアントサイズが取得できない問題
		//http://mag.autumn.org/Content.modf?id=20051107135216
		
		//Quirks mode or Standard mode
		//http://wiki.bit-hive.com/tomizoo/pg/Quirks%20mode%20or%20Standard%20mode
		//document.compatMode=='BackCompat' -> Quirks（後方互換）
		//document.compatMode=='CSS1Compat' -> Standard(Strict)
		
		/**
		 * IE専用QuirksとStandardモードを吸収するサブルーチン。<br>
		 * Quirksならdocument.body、Standardならdocument.documentElementを返す。<br>
		 * clientWidth, clientHeight, scrollTop, scrollLeftで使用。
		 */
		getIeBody: function () {
			//return (document.compatMode=='BackCompat') ? document.body : document.documentElement;
			switch (document.compatMode) {
				case 'BackCompat':
					return document.body;
				case 'CSS1Compat':
					return document.documentElement;
				default:
					return;
			}
		},
		
		/**
		 * ウィンドウ内側の横幅を返す。（スクロールバーを含まない）
		 * via. http://d.hatena.ne.jp/onozaty/20060802/p1
		 */
		clientWidth: function () {
			//swanq.log('swanq.clientWidth');
			//return (document.all) ? this.getIeBody().clientWidth : window.innerWidth;
			if(this.is_ie | this.is_gecko){
				return this.getIeBody().clientWidth;
			}else if(this.is_opera){
				return document.body.clientWidth;
			}else if(this.is_safari){
				return window.innerWidth;
			}
		},
		/**
		 * ウィンドウ内側の高さを返す。（スクロールバーを含まない）
		 */
		clientHeight: function () {
			//swanq.log('swanq.clientHeight');
			//return (document.all) ? this.getIeBody().clientHeight : window.innerHeight;
			if(this.is_ie | this.is_gecko){
				return this.getIeBody().clientHeight;
			}else if(this.is_opera){
				return document.body.clientHeight;
			}else if(this.is_safari){
				return window.innerHeight;
			}
		},
		
		/**
		 * ウィンドウ内側の横幅を返す。（スクロールバー含む）
		 * http://d.hatena.ne.jp/onozaty/20060803/p1
		 */
		scrollWidth: function () {
			if(this.is_ie | this.is_gecko){
				return this.getIeBody().scrollWidth;
			}else if(is_opera|is_safari){
				return document.body.scrollWidth;
			}
		},
		/**
		 * ウィンドウ内側の高さを返す。（スクロールバー含む）
		 */
		scrollHeight: function () {
			if(this.is_ie | this.is_gecko){
				return this.getIeBody().scrollHeight;
			}else if(is_opera|is_safari){
				return document.body.scrollHeight;
			}
		},
		
		
		/**
		 * ページトップからの縦方向のスクロール位置を返す。
		 */
		scrollTop: function () {
			return swanq.pageYOffset();
		},
		pageYOffset: function () {
			//swanq.log('swanq.pageYOffset');
			return (document.all) ? this.getIeBody().scrollTop : window.pageYOffset;
		},
		
		/**
		 * ページトップからの横方向のスクロール位置を返す。
		 */
		scrollLeft: function () {
			return swanq.pageXOffset();
		},
		pageXOffset: function () {
			//swanq.log('swanq.pageXOffset');
			return (document.all) ? this.getIeBody().scrollLeft : window.pageXOffset;
		},
		
		
		_EOP: 'End'
	};
}();

