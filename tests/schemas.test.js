const test = require('tape');

const User = require('../src/models/User');
const Collection = require('../src/models/Collection');
const Item = require('../src/models/Item');

// Data for tests
const mockUser = require('./mockData').mockUser;
const mockCollection = require('./mockData').mockCollection;
const mockItem = require('./mockData').mockItem;
// Data for tests


// User tests
test('Testing user schema', (t) => {
  const newUser = new User({
    firstName: mockUser.firstName,
    lastName: mockUser.lastName,
    photo: mockUser.photo,
    email: mockUser.email,
    password: mockUser.password,
  });
  
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
    newUser.firstName = mockUser.newFirstName;
    newUser.lastName = mockUser.newLastName;
    newUser.photo = mockUser.newPhoto;
    newUser.email = mockUser.newEmail;
    newUser.password = mockUser.newPassword;
    newUser.collections.push('new collection');
    
    t.deepEqual(newUser.firstName, mockUser.newFirstName, 'first name should match new the one');
    t.deepEqual(newUser.lastName, mockUser.newLastName, 'last name should match new the one');
    t.deepEqual(newUser.photo, mockUser.newPhoto, 'photo should match new the one');
    t.deepEqual(newUser.email, mockUser.newEmail, 'email should match new the one');
    t.deepEqual(newUser.password, mockUser.newPassword, 'password should match new the one');
    t.notDeepEqual(newUser.collections.length, 0, 'collections array should not be empty');
    t.end();
  });
});
// User tests


// Collection tests
test('Testing collection schema', (t) => {
  const newCollection = new Collection({
    name: mockCollection.name
  });

  t.test('when a new collection is created', (t) => {
    t.notDeepEqual(newCollection._id, undefined, "unique id should be assigned")
    t.deepEqual(typeof newCollection.name, "string", 'collection name should be a string');
    t.deepEqual(Array.isArray(newCollection.items), true, 'items should be an array');
    t.deepEqual(newCollection.items.length, 0, 'items array should be empty');
    t.end();
  });

  t.test('when a collection is updated', (t) => {
    newCollection.name = mockCollection.newName;
    newCollection.items.push('new item');

    t.deepEqual(newCollection.name, mockCollection.newName, 'name should match new the one');
    t.notDeepEqual(newCollection.items.length, 0, 'items array should not be empty');
    t.end();
  });
});
// Collection tests


// Item tests
test('Testing item schema', (t) => {
  const newItem = new Item({
    name: mockItem.name,
    photo: mockItem.photo,
    description: mockItem.description,
    extraInfo: mockItem.extraInfo,
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
    newItem.name = mockItem.newItemName,
    newItem.photo = mockItem.newItemPhoto,
    newItem.description = mockItem.newItemDescription,
    newItem.extraInfo = mockItem.newItemExtraInfo,

    t.deepEqual(newItem.name, mockItem.newItemName, 'name should match new the one');
    t.deepEqual(newItem.photo, mockItem.newItemPhoto, 'photo should match new the one');
    t.deepEqual(newItem.description, mockItem.newItemDescription, 'description should match new the one');
    t.deepEqual(newItem.extraInfo, mockItem.newItemExtraInfo, 'extra info should match new the one');
    t.end();
  });
});
// Item tests
