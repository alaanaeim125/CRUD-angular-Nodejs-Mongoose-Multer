var mongoose = require('mongoose');

class Product {
    constructor(){
        var productSchema = mongoose.Schema({
            _id: mongoose.Schema.Types.ObjectId,
            Name: String,
            Brand: String,
            Price: Number,
            Quantity: Number,
            Image: String,
            Date: { type: Date, default: Date.now() }
        })

        this.productModel = mongoose.model('product', productSchema, 'product');
    }

// Add New Product
addNewProdut(product) {
    return new Promise((resolve, reject) => {
        var newProd = {
            "_id": new mongoose.Types.ObjectId(),
            "Name": product.Name,
            "Brand": product.Brand,
            "Price": product.Price,
            "Quantity": product.Quantity,
            "Image": product.Image,
            "Date": Date.now()
        }
        this.productModel.create(newProd, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve('Product Added Successfully ..... ');
            }
        })
    })
}


// Find All Products
getAllProducts() {
    return new Promise((resolve, reject) => {
        this.productModel.find({}, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
}


// Find One Product
getOneProduct(id) {
    return new Promise((resolve, reject) => {
        this.productModel.findById(id, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
}

// Update Product
updateOneProduct(id, product) {
    return new Promise((resolve, reject) => {
        this.productModel.updateOne(
            {_id: id}, { $set: {
            "Name": product.Name,
            "Brand": product.Brand,
            "Price": product.Price,
            "Quantity": product.Quantity,
            "Image": product.Image,
            "Date": Date.now()
        }}, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve('Update Success ..... ');
            }
        })
    })
}


// Delete One Product

deleteOneProduct(id) {
    return new Promise((resolve, reject) => {
        this.productModel.deleteOne({_id: id}, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve('Delete Successfully ..... ');
            }
        })
    })
}


}

module.exports = Product;