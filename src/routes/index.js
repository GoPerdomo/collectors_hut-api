const express = require('express');
const router = express.Router();
const expressJWT = require('express-jwt');

const userHandler = require('../controllers/user');
const collectionHandler = require('../controllers/collection');
const itemHandler = require('../controllers/item');
const search = require('../controllers/search');
const contact = require('../controllers/contact');

const userAuthorization = require('../middlewares').userAuthorization;

// Config Vars
const secret = process.env.JWT_SECRET;


// User Routes
router.get('/users/:userId', userHandler.getUser);

router.post('/sign-up', userHandler.signUp);

router.post('/sign-in', userHandler.signIn);

router.put('/users/:userId', expressJWT({ secret }), userAuthorization, userHandler.updateUser);

router.delete('/users/:userId', expressJWT({ secret }), userAuthorization, userHandler.deleteUser);


// Collection Routes
router.get('/collections', collectionHandler.getAllCollections);

router.post('/users/:userId/add-collection', expressJWT({ secret }), userAuthorization, collectionHandler.createCollection);

router.put('/users/:userId/collections/:collectionId', expressJWT({ secret }), userAuthorization, collectionHandler.updateCollection);

router.delete('/users/:userId/collections/:collectionId', expressJWT({ secret }), userAuthorization, collectionHandler.deleteCollection);


// Item Routes
router.post('/users/:userId/collections/:collectionId/add-item', expressJWT({ secret }), userAuthorization, itemHandler.addItem);

router.put('/users/:userId/collections/:collectionId/items/:itemId', expressJWT({ secret }), userAuthorization, itemHandler.updateItem);

router.delete('/users/:userId/collections/:collectionId/items/:itemId', expressJWT({ secret }), userAuthorization, itemHandler.deleteItem);


// Other Routes
router.get('/search', search);
router.post('/contact', contact)


module.exports = router;
