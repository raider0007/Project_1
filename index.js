const express=require('express')
const bodyParser = require('body-parser');
const route = require('../Project_1/src/route/route');
const { default: mongoose } = require('mongoose');
const app = express();

app.use(bodyParser.json());



mongoose.connect("mongodb+srv://Project_1:Xr1m54ZBz5hgLJbP@cluster0.wttupro.mongodb.net/skDB?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
    .then(() => console.log("Db is connected"))
    .catch(err => console.log(err))

app.use('/', route);

app.listen(process.env.PORT || 3000, function () {
    console.log('running on port ' + (process.env.PORT || 3000))
});