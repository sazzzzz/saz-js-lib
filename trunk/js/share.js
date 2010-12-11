/**
 * シェアライブラリ.
 * @author saz
 */

var share = function () {
	
	//--------------------------------------
	// PRIVATE
	//--------------------------------------
	
	/**
	 * mixi Plugin のサービス識別キー.
	 * @see	http://ueblog.natural-wave.com/2010/09/13/mixi-check-for-wordpress/
	 */
	/*vvvvvvvvvvvvvvvvvvvv do edit! vvvvvvvvvvvvvvvvvvvv*/
	var MIXI_KEY = '81bea4a1aa4c5e2ee5f76c4468b9817d2a09cd81';
	/*^^^^^^^^^^^^^^^^^^^^ do edit! ^^^^^^^^^^^^^^^^^^^^*/
	
	
	//--------------------------------------
	// PUBLIC
	//--------------------------------------
	return {
		
		foo: 'bar',
		
		/**
		 * ﾒｰﾙで.
		 * @param	address	送り先ﾒｰﾙアドレス
		 * @param	subject	表題
		 * @param	body	本文
		 */
		mail: function (address, subject, body) {
			var href = 'mailto:' + address + '?';
			if(subject) href = href + '&subject=' + encodeURI(subject);
			if(body) href = href + '&body=' + encodeURI(body);
			location.href = href;
		},
		
		/**
		 * twitterでシェア.
		 * @param	url	登録するページのURL. URLに'#'を含めると正しく動作しません（#以降が無視される）. 
		 * @param	text	本文.
		 */
		twitter: function (url, text) {
			var linkUrl = encodeURI('http://twitter.com/share?' + '&text=' + text + '&url=' + encodeURI(url));
			var twitterWin = window.open(linkUrl,'shareTwitter','width=600,height=400');
		},
		
		/**
		 * facebookでシェア.
		 * @param	url	登録するページのURL. URLに'#'を含めると正しく動作しません（リクエストされたページが見つかりませんでした。）.
		 */
		facebook: function (url) {
			// &t=でタイトルを指定できるらしいが、反映されない?
			var linkUrl = encodeURI('http://www.facebook.com/sharer.php?' + '&u=' + encodeURI(url));
			var facebookWin = window.open(linkUrl,'shareFacebook','width=600,height=500');
		},
		
		/**
		 * mixiチェック.
		 * mixiデベロッパー登録し、Developer Dashboardから「mixi Plugin」「新規サービス追加」した上で、そのサービスの識別キーが必要です.
		 * その識別キーをMIXI_KEYに設定してください。
		 * @param	url	登録するページのURL. URLに'#'を含めると正しく動作しません（#以降が無視される）. 実際のリンク先には'&__from=mixi'がつきます. 
		 */
		mixiCheck: function (url) {
			var linkUrl = encodeURI('http://mixi.jp/share.pl?' + '&k=' + MIXI_KEY + '&u=' + encodeURI(url));
			var mixiWin = window.open(linkUrl,'shareMixiCheck','width=600,height=500');
		},
		
		_EOP: 'EOP'
	};
}();




