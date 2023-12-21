const cors = require('cors');
const express = require('express');
const router = require('./routes/questionRoutes');

const app = express();

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.use('/', router)

const PORT = 3001;

app.listen(PORT, function () {
    console.log("Yhteys onnistui portissa: "+PORT);
})

