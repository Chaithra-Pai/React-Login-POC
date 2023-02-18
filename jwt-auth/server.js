require('dotenv').config();
const cors = require('cors');
const axios = require('axios');
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

app.use(cors());
app.use(express.json());

const posts = [
	{
		username: 'Kyle',
		title: 'Post 1',
	},
	{
		username: 'Jim',
		title: 'Post 2',
	},
];

const getProducts = async () => {
	axios('http://localhost:3333/products')
		.then((resp) => {
			return resp;
		})
		.catch((error) => {
			return error;
		});
};
app.get('/products',authenticateToken, (req, res) => {
	axios('http://localhost:3333/products')
		.then((resp) => {
      // console.log(resp)
			res.json(resp.data)
		})
		.catch((error) => {
      console.log(error)
			return res.sendStatus(401)
		});
});



function authenticateToken( req,res, next) {
//   console.log(req.headers["authorization"])
	const authHeader = req.headers['authorization'];
	// const token = authHeader && authHeader.split(' ')[1];
	if (authHeader == null) return res.sendStatus(403);

	jwt.verify(authHeader, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
		console.log(err);
		if (err) return res.status(403).json({status:403,error:err.status})
		req.user = user;
		next();
	});
}

app.listen(3000);
