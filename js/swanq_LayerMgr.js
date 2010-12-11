/**
 * レイヤー管理モジュール<br />
 * swanq.js必須。<br />
 * 便利系機能は不要（フルスクリーンとか）。<br />
 * 自前のプロパティ保存は不要かも<br />
 */

swanq.LayerMgr = function () {
	
	//private shorthand references
	//var SL = swanq.LayerMgr;
	
	//
	//"private" props:
	//
	var fixTimer,maxTimer;
	
	//
	//"private" method:
	//
	
	var setCssText = function (id,style) {
		//var target = document.getElementById(id);
		var target = swanq.$(id);
		if( typeof( target.style.cssText ) != 'undefined' ) {
			target.style.cssText = style;
		} else {
			target.setAttribute('style',style);
		}
	};
	var getCssText = function (id) {
		var o = swanq.LayerMgr.props[id];
		var result = '';
		for(var i in o){
			result = result + i + ': ' + o[i] + 'px;';
		}
		//swanq.log(result);
		return result;
	};
	
	//プロパティアップデート
	var readyProp = function (id) {
		var SL = swanq.LayerMgr;		//privateからpublicメンバへのアクセスはフルパスで
		if(SL.props[id] == undefined){
			//SL.props[id] = new Object();
			SL.props[id] = {};
		}
	};
	var setProp = function (id,name,value) {
		readyProp(id);
		swanq.LayerMgr.props[id][name] = value;
	};
	var setProps = function (id,dat) {
		readyProp(id);
		var o = swanq.LayerMgr.props[id];
		for(var i in dat){
			o[i] = dat[i];
		}
	};
	var removeProps = function (id) {
		var SL = swanq.LayerMgr;
		delete SL.props[id];
	};
	
	
	return {
		//
		// public props.
		//
		props : {},
		maxList : [],
		fixList : [],
		
		
		//
		// public method
		//
		
		/**
		 * 指定id要素の指定プロパティを取得する。
		 * @param {Object} id	対象要素のid
		 * @param {Object} name	プロパティ名
		 */
		getProp: function (id,name) {
			return this.props[id][name];
		},
		
		/**
		 * 
		 * @param {Object} id
		 */
		getProps: function (id) {
			return this.props[id];
		},
		
		/**
		 * レイヤーを生成する。
		 * @param {Object} id	対象レイヤーのid名。
		 * @param {Object} x	（オプション）レイヤーの横位置。
		 * @param {Object} y	（オプション）レイヤーの縦位置。
		 * @param {Object} w	（オプション）レイヤーの横幅。
		 * @param {Object} h	（オプション）レイヤーの高さ。
		 */
		create: function (id,x,y,w,h) {
			//swanq.log('SL.create('+id+','+x+','+y+','+w+','+h);
			// パラメータのデフォルト値
			var left = (x==undefined) ? 0 : x;
			var top = (y==undefined) ? 0 : y;
			var width = (w==undefined) ? 100 : w;
			var height = (h==undefined) ? 100 : h;
			//
			var result = document.createElement('div');
			result.setAttribute('id',id);
			result.style.position = 'absolute';
			result.style.left = left+'px';
			result.style.top = top+'px';
			result.style.width = width+'px';
			result.style.height = height+'px';
			//result.style.overflow = 'hidden';
			//document.body.appendChild(result);
			//プロパティ保存
			setProps(id,{left:left,top:top,width:width,height:height,visible:true,maximize:false});
			//setProps(id,{left:left,top:top,width:width,height:height});
			
			return result;
		},
		
		/**
		 * レイヤーを削除する。
		 * @param {Object} id	削除するレイヤーのid名。
		 */
		remove: function (id) {
			//swanq.log('SL.remove('+id);
//			var target = document.getElementById(id);
			var target = swanq.$(id);
			if(target==undefined){
				return;
			}
			target.parentNode.removeChild(target);
			removeProps(id);
		},
		
		
		
		/**
		 * レイヤーのサイズを変更する。
		 * @param {Object} id	対象レイヤーのid名。
		 * @param {Object} w	レイヤーの横幅。
		 * @param {Object} h	レイヤーの高さ。
		 */
		setSize: function (id,w,h) {
			//swanq.log('SL.setSize('+w+','+h);
			var props = {};
//			var target = document.getElementById(id);
			var target = swanq.$(id);
			if(w!==undefined){
				target.style.width = w+'px';
				props.width = w;				//プロパティ保存
			}
			if(h!==undefined){
				target.style.height = h+'px';
				props.height = h;			   //プロパティ保存
			}
			//プロパティ保存
			setProps(id,props);
			return target;
		},
		
		
		/**
		 * ウィンドウサイズいっぱいに表示する。
		 * @param {Object} id
		 */
		setFullSize: function (id) {
			//swanq.log('SL.setFullSize('+id);
			this.move(id,0,0);
			return this.setSize(id,swanq.clientWidth(),swanq.clientHeight());
		},
		
		/**
		 * レイヤー位置を移動する。
		 * @param {Object} id
		 * @param {Object} x	レイヤーの横位置。
		 * @param {Object} y	レイヤーの縦位置。
		 */
		move: function (id,x,y) {
			//swanq.log('SL.move('+id+','+x+','+y);
			var props = {};
			var target = swanq.$(id);
			if(x!==undefined){
				target.style.left = x+'px';
				props.left = x;			 //プロパティ保存
			}
			if(y!==undefined){
				target.style.top = y+'px';
				props.top = y;			  //プロパティ保存
			}
//		  setCssText(id,getCssText(id));
			//プロパティ保存
			setProps(id,props);
			return target;
		},
		
		
		/**
		 * ウィンドウ左上（スクロール位置）からの相対位置で、レイヤーを移動する。
		 * @param {Object} id
		 * @param {Object} x	ウィンドウ左からの、レイヤーの横位置。
		 * @param {Object} y	ウィンドウ上からの、レイヤーの縦位置。
		 */
		moveRel: function (id,x,y) {
			//swanq.log('SL.moveRel('+id+','+x+','+y);
			var relx,rely;
			if(x!==undefined){
				relx=swanq.scrollLeft()+x;
			}
			if(y!==undefined){
				rely=swanq.scrollTop()+y;
			}
			return this.move(id,relx,rely);
		},
		
		/**
		 * レイヤーの表示／非表示を設定する。
		 * @param {Object} id
		 * @param {Object} flg	trueなら表示、falseなら非表示に設定する。
		 */
		setVisible: function (id,flg) {
			//swanq.log('SL.setVisible('+id+','+flg);
			var visibility = (flg) ? "visible" : "hidden";
			var target = swanq.$(id);
			target.style.visibility = visibility;
			//プロパティ保存
			setProp(id,'visible',flg);
			return target;
		},
		
		
		/**
		 * レイヤーの透明度を設定する。
		 * @param {Object} id
		 * @param {Object} value	透明度。0～100。内部で整数として扱われる。
		 */
		setOpacity : function (id,value) {
			var target = swanq.$(id);
			target.style.filter = 'alpha(opacity=' + Math.round(value) + ')';
			target.style.MozOpacity = value / 100;
			target.style.opacity = value / 100;
//			if(is_ie){
//			}else if(is_gecko){
//			}else if(is_opera){
//			}else if(is_safari){
//			}
		},
		
		
		//
		// 状態系
		//
		
		
		
		
		
		/**
		 * 最大化状態を設定する。最大化とはウィンドウ一杯に表示され、なおかつスクロールにも追随すること。
		 * @param {Object} id
		 * @param {Object} flg	trueで最大化。falseで最大化解除。
		 */
		setMaximize: function (id,flg) {
			//swanq.log('SL.setMaximize('+id+','+flg);
			var len=this.maxList.length;
			
			this.setFixed(id,false);
			//まず削除（多重登録を防ぐ）
			this.removeMaxData(id);
			
			//固定追加
			if(flg){
				this.maxList.push(this.__makeMaxData(id));
			}
			
			//ループ管理
			clearInterval(this.maxTimer);		   //ループ終了
			if(this.maxList.length>0){
				//ループ開始
				//this.maxTimer=setInterval('swanq.LayerMgr.__maxLoop()', swanq.RENDER_INTERVAL);
				this.maxTimer=setInterval(swanq.LayerMgr.__maxLoop, swanq.RENDER_INTERVAL);
			}
			this.setFullSize(id,flg);
			//プロパティ保存
			setProp(id,'maximize',flg);
		},
		
		//setMaximizeサブ
		removeMaxData: function (id) {
			var len=this.maxList.length;
			for(var i=0;i<len;i++){
				if(this.maxList[i] == id){
					return this.maxList.splice(i,1);
				}
			}
		},
		
		//setMaximizeサブ
		__makeMaxData: function (id) {
			var target = swanq.$(id);
			var dat = {};
			dat.id = id;
			return dat;
		},
		
		//setMaximizeサブ
		__maxLoop: function () {
			var dat;
			var len=this.maxList.length;
			for(var i=0;i<len;i++){
				dat = this.maxList[i];
				this.moveRel(dat.id,0,0);
				this.setSize(dat.id,swanq.clientWidth(),swanq.clientHeight());
			}
		},
		
		
		
		
		
		
		/**
		 * スクロール追随を設定する。
		 * @param {Object} id
		 * @param {Object} flg
		 */
		setFixed: function (id,flg) {
			//swanq.log('SL.setFixed('+id+','+flg);
			//最大化時は無視
			if(this.getProp(id,'maximize')==true){
				return;
			}
			//swanq.log('setFixed');
			//まず削除（多重登録を防ぐ）
			this.__removeFixedData(id);
			
			//固定リストに追加
			if(flg){
				this.fixList.push(this.__makeFixedData(id));
			}
			
			//ループ管理
			clearInterval(this.fixTimer);		   //ループ終了
			if(this.fixList.length>0){
				//this.fixTimer=setInterval('swanq.LayerMgr.__fixLoop()', swanq.RENDER_INTERVAL);   //ループ開始
				this.fixTimer=setInterval(swanq.LayerMgr.__fixLoop, swanq.RENDER_INTERVAL);   //ループ開始
			}
		},
		
		//setFixedサブ
		__removeFixedData: function (id) {
			var len=this.fixList.length;
			var result;
			for(var i=0;i<len;i++){
				if(this.fixList[i].id == id){
					//result = this.fixList.splice(i,1);
					//break;
					return this.fixList.splice(i,1);
				}
			}
			return result;
		},
		
		//setFixedサブ
		__makeFixedData: function (id) {
//			var target = document.getElementById(id);
			var target = swanq.$(id);
			var dat = {};
			dat.id = id;
			//ウィンドウ左上からの相対位置を保存
			dat.relx = parseInt(target.style.left,10) - swanq.scrollLeft();
			dat.rely = parseInt(target.style.top,10) - swanq.scrollTop();
			//絶対位置を保存
//			  dat.relx = Number(target.style.left.slice(0,-2));
//			  dat.rely = Number(target.style.top.slice(0,-2));
			return dat;
		},
		
		//setFixedサブ
		__fixLoop: function () {
			//swanq.log('__fixLoop')
			var dat;
			var len=this.fixList.length;
			for(var i=0;i<len;i++){
				dat = this.fixList[i];
				this.moveRel(dat.id,dat.relx,dat.rely);
			}
		},
		
		
		
		
		
		_EOP: "End"
	};
	
}();	// the parens here cause the anonymous function to execute and return



