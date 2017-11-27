const express = require('express');
const router = express.Router();

const config = require('../config/config');
const userHandler = require('../controllers/user');

// User Routes
router.get('/:userId', userHandler.getUser);

router.post('/sign-up', userHandler.signUp);

router.post('/sign-in', userHandler.signIn);

router.put('/:userId', userHandler.updateUser);

router.delete('/:userId', userHandler.deleteUser);
// User Routes


// Collection Routes
router.get('/:userId/:collectionId', collectionHandler.getCollection);

router.post('/:userId/create-collection', collectionHandler.createCollection);

router.put('/:userId/:collectionId', collectionHandler.updateCollection);

router.delete('/:userId/:collectionId', collectionHandler.deleteCollection);
// Collection Routes


// Item Routes
router.get('/:userId/:collectionId/:itemId', itemHandler.getItem);

router.post('/:userId/:collectionId/add-item', itemHandler.addItem);

router.put('/:userId/:collectionId/:itemId', itemHandler.updateItem);

router.delete('/:userId/:collectionId/:itemId', itemHandler.deleteItem);
// Item Routes

module.exports = router;
