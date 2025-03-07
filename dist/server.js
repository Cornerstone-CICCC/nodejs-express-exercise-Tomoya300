"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
let products = [];
app.get('/products', (req, res) => {
    console.log('someone got products list');
    res.status(200).json(products);
});
app.post('/products', (req, res) => {
    const { product_name, product_description, product_price } = req.body;
    console.log(product_name);
    console.log(product_description);
    console.log(product_price);
    const newProduct = {
        id: products.length + 1,
        product_name,
        product_description,
        product_price: parseFloat(product_price)
    };
    products.push(newProduct);
    console.log('added product successfully.');
    res.status(201).json(newProduct);
});
app.get('/products/:id', (req, res) => {
    const { id } = req.params;
    const newId = parseInt(id);
    const reqProduct = products.find(product => product.id === newId);
    if (!reqProduct) {
        res.status(404).send('Product not found.');
        return;
    }
    res.status(200).json(reqProduct);
});
app.put('/products/:id', (req, res) => {
    const { id } = req.params;
    const newId = parseInt(id);
    const updatedIndex = products.findIndex(product => product.id === newId);
    if (updatedIndex === -1) {
        res.status(404).send('Products not found.');
        return;
    }
    products[updatedIndex] = Object.assign(Object.assign({}, products[updatedIndex]), req.body);
    res.status(200).json(products[updatedIndex]);
});
app.delete('/products/:id', (req, res) => {
    const { id } = req.params;
    const newId = parseInt(id);
    const deletedIndex = products.findIndex(product => product.id === newId);
    if (deletedIndex === -1) {
        res.status(404).send('Product not found.');
        return;
    }
    products.splice(deletedIndex, 1);
    res.status(200).send('Product was successfully deleted.');
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});
