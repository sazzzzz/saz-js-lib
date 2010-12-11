/**
 * 環境チェックモジュール<br />
 * swanq.js必須。<br />
 * テストしてない<br />
 */

swanq.environment = function () {
	
	//
	//"private" props:
	//
	//var agt = swanq.agt;
	var agt = navigator.userAgent.toLowerCase();
	
	//
	//"private" method:
	//
	
	var getAgentSegment = function (src,search,from) {
		if(from == undefined) from = 0;
		var fromPos = src.indexOf(search,from);
		var toPos = src.indexOf(';',fromPos);
		if(toPos == -1) toPos = src.length;
		return src.substring(fromPos,toPos);
	};
	
	// バージョンをあらわす文字列から、メジャーバージョンを返す
	// "3.0.3"->"3", "6.0"->"6"
	var getMajorVersion = function (versionStr) {
		var arr = versionStr.split(".");
		return arr[0];
	};
	
	
	return {
		//
		// public props.
		//
		
		
		//
		// public method
		//
		
		/**
		 * 指定id要素の指定プロパティを取得する。
		 * @param {Object} id	対象要素のid
		 * @param {Object} name	プロパティ名
		 */
		testBrowser: function(){
			if(swanq.is_ie && Number(getMajorVersion(this.getIEVersion())) >= 6.0){
				return true;
			}else if(swanq.is_safari && Number(getMajorVersion(this.getSafariVersion())) >= 2){
				return true;
			}else{
				return false;
			}
		},

		testOS: function(){
			if(swanq.is_win && this.isWinNT() && Number(this.getWinVersion()) >= 5.1){
				return true;
			}else if(swanq.is_mac && swanq.is_macosx){
				return true;
			}else{
				return false;
			}
		},


		getIEVersion: function(){
			if(!swanq.is_ie)return null;
			var arr = this.getIEString().split(' ');
			return arr[arr.length-1];
		},

		getIEString: function(){
			if(!swanq.is_ie)return null;
			var iestr = getAgentSegment(agt,'msie');
			return iestr;
		},
		
		getSafariVersion: function(){
			if(!swanq.is_safari)return null;
			var slashArr = agt.split("/");
			var kakkoArr = slashArr[slashArr.length - 2].split(") ");
			var version = kakkoArr[kakkoArr.length - 1];
			if(version == 'safari'){	// 1 of 2
				return this.getSafariVersionFromBuild(this.getSafariBuild());
			}else{						// 3up
				return version.split(" ")[0];
			}
		},
		
		getSafariVersionFromBuild: function(buildStr){
			var buildMajor = Number(buildStr.split(".")[0]);
			if(buildMajor<400){
				return "1";
			}else{
				return String(Math.floor(buildMajor/100)-2);
			}
		},
		
		getSafariBuild: function(){
			if(!swanq.is_safari)return null;
			var slashArr = agt.split("/");
			return slashArr[slashArr.length - 1];
		},


		isWinNT: function(){
			if(!swanq.is_win)return false;
			return this.getWinString().indexOf('windows nt') != -1;
		},

		getWinVersion: function(){
			if(!swanq.is_win)return null;
			var arr = this.getWinString().split(' ');
			return arr[arr.length-1];
		},

		getWinString: function(){
			if(!swanq.is_win)return null;
			var kakko = agt.substring(agt.indexOf('(')+1, agt.indexOf(')'));
			var winstr = getAgentSegment(kakko,'win');
			if(winstr=='windows'){
				winstr = getAgentSegment(agt,'win',agt.indexOf('windows')+1);
			}
			return winstr;
		},
		
		
		
		
		
		_EOP: "End"
	};
	
}();	// the parens here cause the anonymous function to execute and return



