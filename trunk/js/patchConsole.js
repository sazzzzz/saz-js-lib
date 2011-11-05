/**
 * patchConsole
 * console.logがないブラウザでも、console.logを使う。
 * テストしてない！！！！！！！！！！！！！！！！！！！！！！！
 * @author saz
 * @see	http://narucissus.blogspot.com/2007/07/firebugconsolelogie.html
 */

///////////////////////////////////////////////////////////////////
// テストしてない！！！！！！！！！！！！！！！！！！！！！！！
///////////////////////////////////////////////////////////////////

String.prototype.escape = function() {
	var str = this;
	str = str.replace(/&/g, '&amp;');
	str = str.replace(/</g, '&lt;');
	str = str.replace(/>/g, '&gt;');
	str = str.replace(/"/g, '&quot;');
	str = str.replace(/'/g, '&#039;');
	str = str.replace(/\\/g, '&yen;');
	return str;
};

Number.prototype.pad = function() {
	return (this < 10) ? '0' + this : this;
};

//consoleが定義されていない場合
if (typeof window.console !== 'object') {
	//画面末尾にログ表示用のdivを作成
	if (window.attachEvent) {
		window.attachEvent('onload', function() {
			var div,attr1,ul,attr2;
			
			div = document.createElement('div');
			attr1 = document.createAttribute('id');
			attr1.value = 'console';
			div.setAttributeNote(attr1);
			
			ul = document.createElement('ul');
			attr2 = document.createAttribute('id');
			attr2.value = 'console-list';
			ul.setAttributeNote(attr2);
			
			div.appendChild(ul);
			
			document.body.appendChild(div);
		});
	}
	
	//console.logを定義
	var console = {};
	console.log = function(obj) {
		if(obj !== null){
			var list,d,time;
			
			list = document.getElementById('console-list');
			d = new Date();
			time = d.getHours().pad() + ':' + d.getMinutes().pad() + ':' + d.getSeconds().pad();
			list.innerHtml += '<li><span>' + time + '</span>' + obj.toString().escape() + '</li>';
		}
	};
}

