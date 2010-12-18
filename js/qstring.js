/**
 * Query String Util.
 * @author saz
 * @see	http://zombiebook.seesaa.net/article/31766192.html
 */
//

// Query String から 配列を返す
// http://zombiebook.seesaa.net/article/31766192.html
function getParameter(str){
	var dec = decodeURIComponent;
	var par = new Array, itm;
	if(typeof(str) == 'undefined') return par;
	if(str.indexOf('?', 0) > -1) str = str.split('?')[1];
	str = str.split('&');
	for(var i = 0; str.length > i; i++){
		itm = str[i].split("=");
		if(itm[0] != ''){
			par[itm[0]] = typeof(itm[1]) == 'undefined' ? true : dec(itm[1]);
		}
	}
	return par;
}


// 配列 から Query Stringを返す
// http://zombiebook.seesaa.net/article/31766192.html
function setParameter(par){
	var enc = encodeURIComponent;
	var str = '', amp = '';
	if(!par) return '';
	for(var i in par){
		str = str + amp + i + "=" + enc(par[i]);
		amp = '&'
	}
	return str;
}
