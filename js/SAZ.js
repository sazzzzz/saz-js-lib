/*
JavaScriptデザインパターン
自作ライブラリの習作
*/

// ルート
var SAZ = SAZ || {};


/**
 * 名前空間管理
 * 
 * @param	{String} path 名前空間を表すパス.
 * @return	{String} 名前空間オブジェクトを返す.
 */
SAZ.namespace = function(path) {
	var parts = path.split('.'),
		parent = SAZ,
		i,
		n;
	
	// 先頭のグローバルを取り除く
	if (parts[0] === 'SAZ') {
		parts = parts.slice(1);
	}
	
	for (i = 0, n = parts.length; i < n; i += 1) {
		// プロパティが存在しなければ作成する
		if (typeof parent[parts[i]] === "undefined") {
			parent[parts[i]] = {};
		}
		parent = parent[parts[i]];
	}
	return parent;
};



SAZ.namespace('SAZ.utils');
SAZ.utils = (function() {
	
	//
	// 依存関係
	//
	//var uobj = SAZ.utils.object,
	//	ulang = SAZ.utils.lang;
	
	//
	// プライベートプロパティ
	//
	var array_string = '[object Array]',
		oToString = Object.prototype.toString,
		aSlice = Array.prototype.slice;
	
	//
	// プライベートメソッド
	//
	function hoge() {
		//
	}
	
	//
	// 初期化処理（があればこの辺で）
	//
	
	
	//
	// パブリックAPI
	//
	return {
		inArray: function (search, array) {
		},
		
		/**
		 * 配列かどうか調べる. 
		 * @param	{Object} target 調べるオブジェクト.
		 * @return	{Boolean} 配列ならtrue、そうでないならfalse.
		 */
		isArray: function (target) {
			//return Object.prototype.toString.call(target) === '[object Array]';
			return oToString.call(target) === array_string;
		},
		
		
		/**
		 * カリー化する
		 * @param	{Function} func カリー化対象の関数.
		 * @return	{Function} カリー化された関数を返す.
		 */
		curry: function (func) {
			var stored_args = aSlice.call(arguments, 1);
			return function() {
				var new_args = aSlice.call(arguments),
					args = stored_args.concat(new_args);
				return func.apply(null, args);
			};
		},
		
		/**
		 * オブジェクトの「浅い」コピーを作成します.
		 * @param	{Object} parent コピー元.
		 * @param	{Object} child （オプション）コピー先. 省略すると新しいオブジェクトを作成する. 
		 * @return	childを省略した場合はコピーしたオブジェクトを返す. 
		 */
		extend: function (parent, child) {
			var i;
			child = child || {};
			
			for (i in parent) {
				if (parent.hasOwnProperty(i)) {
					child[i] = parent[i];
				}
			}
			return child;
		},
		
		/**
		 * オブジェクトの「深い」コピーを作成します. 
		 * @param	{Object} parent コピー元.
		 * @param	{Object} child （オプション）コピー先. 省略すると新しいオブジェクトを作成する. 
		 * @return	childを省略した場合はコピーしたオブジェクトを返す. 
		 */
		extendDeep: function (parent, child) {
			var i;
			child = child || {};
			
			for (i in parent) {
				if (parent.hasOwnProperty(i)) {
					if (typeof parent[i] === 'object') {
						child[i] = (oToString.call(parent[i]) === array_string) ? [] : {};
						//SAZ.utils.extendDeep(parent[i], child[i]);
						arguments.callee(parent[i], child[i]);
					} else {
						child[i] = parent[i];
					}
					
				}
			}
			return child;
		},
	};
}());








