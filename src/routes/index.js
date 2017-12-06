const express = require('express');
const router = express.Router();

const config = require('../config/config');

const userHandler = require('../controllers/user');
const collectionHandler = require('../controllers/collection');
const itemHandler = require('../controllers/item');

// TODO: Implement jwt

// User Routes
router.get('/users/', userHandler.getAllUsers);

router.get('/users/:userId', userHandler.getUser);

router.post('/sign-up', userHandler.signUp);

router.post('/sign-in', userHandler.signIn);

router.put('/users/:userId', userHandler.updateUser);

router.delete('/users/:userId', userHandler.deleteUser);
// User Routes


// Collection Routes
router.get('/collections/', collectionHandler.getAllCollections);

router.get('/users/:userId/collections/', collectionHandler.getUserCollections);

router.get('/users/:userId/collections/:collectionId', collectionHandler.getCollection);

router.post('/users/:userId/add-collection', collectionHandler.createCollection);

router.put('/users/:userId/collections/:collectionId', collectionHandler.updateCollection);

router.delete('/users/:userId/collections/:collectionId', collectionHandler.deleteCollection);
// Collection Routes


// Item Routes
router.get('/users/:userId/collections/:collectionId/items/', itemHandler.getAllItems);

router.get('/users/:userId/collections/:collectionId/items/:itemId', itemHandler.getItem);

router.post('/users/:userId/collections/:collectionId/add-item', itemHandler.addItem);

router.put('/users/:userId/collections/:collectionId/items/:itemId', itemHandler.updateItem);

router.delete('/users/:userId/collections/:collectionId/items/:itemId', itemHandler.deleteItem);
// Item Routes

module.exports = router;
