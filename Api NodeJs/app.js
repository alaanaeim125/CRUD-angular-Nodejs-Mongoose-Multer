var express = require('express');
var app = express();

var connection = require('./connection');

var cors = require('cors');
var bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


var Products = require('./product');
var product = new Products();


/*----------------------------------------------------------------------------------*/
app.use(express.static('uploads')); // make inside folder out in the root 
var multer = require('multer');
const path = require('path');

const DIR = './uploads';
var ImageValues= '';

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        ImageValues = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
        cb(null, ImageValues);
    }
});
let upload = multer({ storage: storage });


app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.post('/api/upload', upload.single('Image'), function (req, res) {
    if (!req.file) {
        console.log("No file received");
        res.send({ success: false });
    } else {
        console.log('file received + ' + ImageValues);
        res.send({ success: true })
    }
});


/*----------------------------------------------------------------------------------*/


// Add New Produt
app.post('/addNewProdut', (req, res) => {
    ob = req.body;
    obj = {
        _id: ob._id,
        Name: ob.Name,
        Brand: ob.Brand,
        Price: ob.Price,
        Quantity: ob.Quantity,
        Image: ImageValues,
        Date: ob.Date
    }

    product.addNewProdut(obj).then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        res.status(400).json({error: err});
    })
})


// Get All Products
app.get('/getAllProducts', (req, res) => {
    product.getAllProducts().then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        res.status(400).json({error: err});
    })
})


// Get One Product 
app.get('/getOneProduct/:id', (req, res) => {
    product.getOneProduct(req.params.id).then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        res.status(400).json({err: err});
    })
})


// Update Product
app.put('/updateOneProduct/:id', (req, res) => {
    ob = req.body;
    if (ImageValues === '') {
        ob.Image = ob.ImageName;
    } else {
        ob.Image = ImageValues;
    }

    console.log("ImageValues  : " + ImageValues );
    product.updateOneProduct(req.params.id, ob).then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        res.status(400).json({error: err});
    })
    ImageValues = '';
    console.log('After Update : ' + ImageValues);
})


// Delete One Product

app.delete('/deleteOneProduct/:id', (req, res) => {
    product.deleteOneProduct(req.params.id).then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        res.status(400).json({error: err});
    })
})

app.listen(3030);