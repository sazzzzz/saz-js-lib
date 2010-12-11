/**
 * 基本ライブラリ
 */



var test = function () {
	
	//モジュール内からのみアクセス可能
	var privateProp = 'private';
	
	//モジュール内からのみアクセス可能
	var privateMethod = function () {
		alert('privateMethod');
		//alert(publicProp);
	};
	
	return {
		//
		// public props.
		//
		
		publicProp: 'public',
		
		
		//
		// public method
		//
		
		publicMethod: function () {
			alert('publicMethod');
		},
		
		test: function () {
			//alert('test');
			
			//
			// パブリック→プライベート：いきなり書いてOK。
			//
			privateMethod();					//OK
			//this.privateMethod();					//ダメ
			//xice2008bp.privateMethod();			//ダメ
			
			//
			// パブリック→パブリック：thisを使う。
			//
			//publicMethod();					//ダメ
			this.publicMethod();			//OK
			//xice2008bp.publicMethod();			//OK
		},
		
		_EOP: "End"
	};
}();


//alert(xice2008bp.privateProp);	//undefined
//xice2008bp.privateMethod();		//何もおきない
//alert(xice2008bp.publicProp);		//'public'
//xice2008bp.publicMethod();			//'publicMethod'

xice2008bp.test();


