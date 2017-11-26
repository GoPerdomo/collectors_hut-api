const test = require('tape');

const User = require('../src/models/User');
const Collection = require('../src/models/Collection');
const Item = require('../src/models/Item');

// Data for tests
const userData = require('./data').userData;
const collectionData = require('./data').collectionData;
const itemData = require('./data').itemData;
// Data for tests


// User tests
test('Testing user schema', (t) => {
  const newUser = new User({
    firstName: userData.firstName,
    lastName: userData.lastName,
    photo: userData.photo,
    email: userData.email,
    password: userData.password,
  });
  const userId = newUser._id;
  
  t.test('when a new user is created', (t) => {
    t.notDeepEqual(newUser._id, undefined, "unique id should be assigned");
    t.deepEqual(typeof newUser.firstName, "string", 'first name should be a string')
    t.deepEqual(typeof newUser.lastName, "string", 'last name should be a string');
    t.deepEqual(typeof newUser.photo, "string", 'photo should be a string');
    t.deepEqual(typeof newUser.email, "string", 'email should be a string');
    t.deepEqual(typeof newUser.password, "string", 'password should be a string');
    t.deepEqual(Array.isArray(newUser.collections), true, 'collections should be an array');
    t.deepEqual(newUser.collections.length, 0, 'collections array should be empty');    
    t.end();
  });

  t.test('when a user is updated', (t) => {
    newUser.firstName = userData.newFirstName;
    newUser.lastName = userData.newLastName;
    newUser.photo = userData.newPhoto;
    newUser.email = userData.newEmail;
    newUser.password = userData.newPassword;
    newUser.collections.push('new collection');
    
    t.deepEqual(newUser.firstName, userData.newFirstName, 'first name should match new the one');
    t.deepEqual(newUser.lastName, userData.newLastName, 'last name should match new the one');
    t.deepEqual(newUser.photo, userData.newPhoto, 'photo should match new the one');
    t.deepEqual(newUser.email, userData.newEmail, 'email should match new the one');
    t.deepEqual(newUser.password, userData.newPassword, 'password should match new the one');
    t.notDeepEqual(newUser.collections.length, 0, 'collections array should not be empty');
    t.end();
  });
});
// User tests


// Collection tests
test('Testing collection schema', (t) => {
  const newCollection = new Collection({
    name: collectionData.name
  });

  t.test('when a new collection is created', (t) => {
    t.notDeepEqual(newCollection._id, undefined, "unique id should be assigned")
    t.deepEqual(typeof newCollection.name, "string", 'collection name should be a string');
    t.deepEqual(Array.isArray(newCollection.items), true, 'items should be an array');
    t.deepEqual(newCollection.items.length, 0, 'items array should be empty');
    t.end();
  });

  t.test('when a collection is updated', (t) => {
    newCollection.name = collectionData.newName;
    newCollection.items.push('new item');

    t.deepEqual(newCollection.name, collectionData.newName, 'name should match new the one');
    t.notDeepEqual(newCollection.items.length, 0, 'items array should not be empty');
    t.end();
  });
});
// Collection tests


// Item tests
test('Testing item schema', (t) => {
  const newItem = new Item({
    name: itemData.name,
    photo: itemData.photo,
    description: itemData.description,
    extraInfo: itemData.extraInfo,
  });

  t.test('when a new item is created', (t) => {
    t.notDeepEqual(newItem._id, undefined, "unique id should be assigned")
    t.deepEqual(typeof newItem.name, "string", 'item name should be a string');
    t.deepEqual(typeof newItem.photo, "string", 'item photo should be a string');
    t.deepEqual(typeof newItem.description, "string", 'item description should be a string');
    t.deepEqual(typeof newItem.extraInfo, "string", 'item extra info should be a string');
    t.end();
  });

  t.test('when a item is updated', (t) => {
    newItem.name = itemData.newItemName,
    newItem.photo = itemData.newItemPhoto,
    newItem.description = itemData.newItemDescription,
    newItem.extraInfo = itemData.newItemExtraInfo,

    t.deepEqual(newItem.name, itemData.newItemName, 'name should match new the one');
    t.deepEqual(newItem.photo, itemData.newItemPhoto, 'photo should match new the one');
    t.deepEqual(newItem.description, itemData.newItemDescription, 'description should match new the one');
    t.deepEqual(newItem.extraInfo, itemData.newItemExtraInfo, 'extra info should match new the one');
    t.end();
  });
});
// Item tests
