/**
 * ��{���C�u����
 */



var test = function () {
	
	//���W���[��������̂݃A�N�Z�X�\
	var privateProp = 'private';
	
	//���W���[��������̂݃A�N�Z�X�\
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
			// �p�u���b�N���v���C�x�[�g�F�����Ȃ菑����OK�B
			//
			privateMethod();					//OK
			//this.privateMethod();					//�_��
			//xice2008bp.privateMethod();			//�_��
			
			//
			// �p�u���b�N���p�u���b�N�Fthis���g���B
			//
			//publicMethod();					//�_��
			this.publicMethod();			//OK
			//xice2008bp.publicMethod();			//OK
		},
		
		_EOP: "End"
	};
}();


//alert(xice2008bp.privateProp);	//undefined
//xice2008bp.privateMethod();		//���������Ȃ�
//alert(xice2008bp.publicProp);		//'public'
//xice2008bp.publicMethod();			//'publicMethod'

xice2008bp.test();


