/**
 * シェアライブラリ.
 * @author saz
 */

var share = function () {
	
	//--------------------------------------
	// PRIVATE
	//--------------------------------------
	
	//var foo = 'bar';
	
	//--------------------------------------
	// PUBLIC
	//--------------------------------------
	return {
		
		//foo: 'bar',
		/**
		 * mixi Plugin のサービス識別キー.
		 * @see	http://ueblog.natural-wave.com/2010/09/13/mixi-check-for-wordpress/
		 */
		/*vvvvvvvvvvvvvvvvvvvv do edit! vvvvvvvvvvvvvvvvvvvv*/
		//MIXI_KEY: 'XXXX',
		/*^^^^^^^^^^^^^^^^^^^^ do edit! ^^^^^^^^^^^^^^^^^^^^*/
		
		/**
		 * ﾒｰﾙで.
		 * @param	address	送り先ﾒｰﾙアドレス
		 * @param	subject	表題
		 * @param	body	本文
		 */
		mail: function (address, subject, body) {
			location.href = this.mailUrl(address, subject, body);
		},
		
		/**
		 * twitterでシェア.
		 * @param	url	登録するページのURL. URLに'#'を含めると正しく動作しません（#以降が無視される）. 
		 * @param	text	本文.
		 * @param	via	宛て先ユーザー. 
		 * @param	related	おすすめユーザー. 2つ指定したい場合は「:」でつなぐ. 
		 */
		twitter: function (url, text, via, related) {
			var twitterWin = window.open(this.twitterUrl(url, text, via, related),'shareTwitter','width=600,height=400');
		},
		
		/**
		 * twitterでシェア旧バージョン. タイムラインで投稿. 
		 * @param	text	本文. URLなど含める場合は、適宜エンコードすること. 
		 */
		twitterTL: function (text) {
			var twitterTLWin = window.open(this.twitterTLUrl(text),'shareTwitter@TL','');
		},
		
		/**
		 * facebookでシェア.
		 * @param	url	登録するページのURL. URLに'#'を含めると正しく動作しません（リクエストされたページが見つかりませんでした。）.
		 */
		facebook: function (url) {
			var facebookWin = window.open(this.facebookUrl(url),'shareFacebook','width=600,height=500');
		},
		
		/**
		 * mixiチェック.
		 * mixiデベロッパー登録し、Developer Dashboardから「mixi Plugin」「新規サービス追加」した上で、そのサービスの識別キーが必要です. その識別キーを引数で指定してください. 
		 * @param	url	登録するページのURL. URLに'#'を含めると正しく動作しません（#以降が無視される）. 実際のリンク先には'&__from=mixi'がつきます. URLはパブリックであること。
		 * @param	key	mixi Plugin のサービス識別キー. 
		 */
		mixiCheck: function (url, key) {
			var mixiWin = window.open(this.mixiCheckUrl(url, key),'shareMixiCheck','width=600,height=500');
		},
		
		
		
		mailUrl: function (address, subject, body) {
			var href = 'mailto:' + address + '?';
			if(subject) href = href + '&subject=' + encodeURI(subject);
			if(body) href = href + '&body=' + encodeURI(body);
			return href;
		},
		
		twitterUrl: function (url, text, via, related) {
			//return 'http://twitter.com/share?' + '&text=' + encodeURI(text) + '&url=' + encodeURI(encodeURI(url));
			//return 'http://twitter.com/share?' + '&text=' + encodeURIComponent(text) + '&url=' + encodeURI(encodeURI(url));		//'#'もOK⇒嘘。やっぱダメ。
			var res = 'http://twitter.com/share?' + '&text=' + encodeURIComponent(text) + '&url=' + encodeURI(encodeURI(url));
			if (via) res += '&via=' + via;
			if (related) res += '&related=' + encodeURIComponent(related);
			return res;
		},
		
		twitterTLUrl: function (text) {
			return 'http://twitter.com/?status=' + encodeURI(text);
		},
		
		facebookUrl: function (url) {
			// &t=でタイトルを指定できるようだが、反映されない?
			return 'http://www.facebook.com/sharer.php?' + '&u=' + encodeURI(encodeURI(url));
		},
		
		mixiCheckUrl: function (url, key) {
			if(!key){
				alert('mixi Plugin のサービス識別キーを設定してください。');
				return;
			}
			
			return 'http://mixi.jp/share.pl?' + '&k=' + key + '&u=' + encodeURI(encodeURI(url));
		},
		
		_EOP: 'EOP'
	};
}();




