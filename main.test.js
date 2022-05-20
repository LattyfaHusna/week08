const supertest = require('supertest');
const request = supertest('http://localhost:4000');
const bcrypt = require("bcryptjs");

// const saltRounds = 10;
// let encryptedPassword;
// bcrypt.genSalt(saltRounds, function (saltError, salt) {
// 	if (saltError) {
// 	  throw saltError
// 	} else {
// 	  bcrypt.hash(userpassword, salt, function(hashError, hash) {
// 		if (hashError) {
// 		  throw hashError
// 		} else {
// 			encryptedPassword=hash;
// 			//console.log("Hash:",hash);
		  
// 		}
// 	  })
// 	}
//   })

describe('Express Route Test', function () {
	

	it('login successfully', async () => {
		return request
			.post('/login')
			.send({'userName': 'Bryant Fay','UserEmail':'Ethel_Daniel@gmail.com' ,'userpassword': "t4Iz0ZE1eJhM5Rq" })
			.expect('Content-Type', /text/)
			.expect(200).then(response => {
				expect(response.text).toEqual("login success");
			});
	});

	it('login failed', async () => {
		return request
			.post('/login')
			.send({'userName': 'Bryant Fay','UserEmail':'Ethel_Daniel@gmail.com' ,'password': "1230" })
			.expect('Content-Type', /text/)
			.expect(404).then(response => {
				expect(response.text).toEqual("Wrong login details");

	});
});
	

	it('register', async () => {
		return request
			.post('/register')
			.send({'userName': 'user48','UserEmail':'dddefgh@gmail.com' ,'userpassword': "11122233340" })//,encryptedPassword:encryptedPassword })
			.expect('Content-Type', /text/)
			.expect(200).then(response => {
				expect(response.text).toEqual("New user is created");
	});
});

	it('register failed', async () => {
		return request
			.post('/register')
			.send({'username': 'user44','email':'dddefg@gmail.com' ,'password': "12345678"}) //,'encryptedPassword':encryptedPassword })
			.expect('Content-Type', /text/)
			.expect(404).then(response => {
				expect(response.text).toEqual("The username already exist!");
	});

})

// 	it('update', async () => {
// 		return request
// 			.patch('/login/baekhyun')
// 			.send({'username': 'baekhyun'})
// 			.expect(200)
// })

});