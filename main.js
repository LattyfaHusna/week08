const MongoClient = require("mongodb").MongoClient;
const User = require("./user");

MongoClient.connect(
	// TODO: Connection 
	"mongodb+srv://m001-student:m001-mongodb-basics@sandbox.6ac4l.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
	{ useNewUrlParser: true },
).catch(err => {
	console.error(err.stack)
	process.exit(1)
}).then(async client => {
	console.log('Connected to MongoDB');
	User.injectDB(client);
})

const express = require('express')
const app = express()
const port = 4000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
	res.send('Sehun server')
})

app.get('/hello', (req, res) => {
	res.send('Hello and welcome')
})

app.post('/login', async (req, res) => {
	//console.log(req.body);

	const user = await User.login(req.body.userName,req.body.UserEmail, req.body.userpassword);
	if(user=="The Username is invalid"||user=="The Password is invalid"||user=="The Email id is invalid"){
		return res.status(404).send("Wrong login details")
	}
	else{
		return res.status(200).send("login success")
	}
	
})
app.post('/register', async (req, res) => {
	//console.log(req.body);
	const user = await User.register(req.body.userName, req.body.UserEmail,req.body.userpassword);//,req.body.encryptedPassword);
	if(user=="The username already exist!"){
		return res.status(404).send("The username already exist!")
	}
	return res.status(200).send("New user is created")
	
})

// app.patch('/update/:username', async (req, res) => {
// 	const user = await User.update(req.body.userName);
// 	if (user == "The username does not exist!"){
// 		return res.status(404).send("The username is invalid!")
// 	}
// 	return res.status(200).json(user)
// })

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})