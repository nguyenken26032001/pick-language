const express = require("express");
require('dotenv').config()
const PORT = process.env.PORT || 3000;
const router = express.Router();
const IP = require('ip');
const app = express();
app.use(router);

app.get('/', (req, res)=>{
	res.send("HELLO WORLD!");
});

app.get('/getLanguage', async(req, res)=>{
	let language = "vi";
	const response = await fetch("https://api64.ipify.org?format=json");
	const ip = await response.json();
	console.log(ip);
	if (ip.ip) {
		const responseDetectCountry = await fetch(`https://ipinfo.io/${ip.ip}/json`)
		const dataCountry = await responseDetectCountry.json();
		language = dataCountry.country.toLowerCase();
	}
	res.json({language})
});

app.listen(PORT,()=>{
	console.log(`Example app listening on port http://localhost:${PORT}`)
})
