module.exports = {
	signUp: {
        name:{required:true},
		email: {required: true},
        gender: {required: true},
        password:{required:true},
        conpassword:{required:true,min:8},
        role:{required:true}


	},
	
};