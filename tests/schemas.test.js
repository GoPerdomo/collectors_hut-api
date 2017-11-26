const test = require('tape');

const User = require('../src/models/User');
const Collection = require('../src/models/Collection');
const Item = require('../src/models/Item');

// User tests
test('Testing user schema', (t) => {
  const firstName = "John";
  const lastName = "Userman";
  const photo = "https://d30y9cdsu7xlg0.cloudfront.net/png/17241-200.png";
  const email = "johnuserman@email.com";
  const password = "secret";
  
  const newUser = new User({
    firstName: firstName,
    lastName: lastName,
    photo: photo,
    email: email,
    password: password,
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
    const newFirstName = "Mary";
    const newLastName = "McUser";
    const newPhoto = "https://cdn3.iconfinder.com/data/icons/rcons-user-action/32/girl-512.png";
    const newEmail = "marymcuser@email.com";
    const newPassword = "moresecret";

    newUser.firstName = newFirstName;
    newUser.lastName = newLastName;
    newUser.photo = newPhoto;
    newUser.email = newEmail;
    newUser.password = newPassword;
    newUser.collections.push('new collection');
    
    t.deepEqual(newUser.firstName, newFirstName, 'first name should match new the one');
    t.deepEqual(newUser.lastName, newLastName, 'last name should match new the one');
    t.deepEqual(newUser.photo, newPhoto, 'photo should match new the one');
    t.deepEqual(newUser.email, newEmail, 'email should match new the one');
    t.deepEqual(newUser.password, newPassword, 'password should match new the one');
    t.notDeepEqual(newUser.collections.length, 0, 'collections array should not be empty');
    t.end();
  });
});
// User tests


// Collection tests
test('Testing collection schema', (t) => {
  const collectionName = "Coins";

  const newCollection = new Collection({
    name: collectionName
  });

  t.test('when a new collection is created', (t) => {
    t.notDeepEqual(newCollection._id, undefined, "unique id should be assigned")
    t.deepEqual(typeof newCollection.name, "string", 'collection name should be a string');
    t.deepEqual(Array.isArray(newCollection.items), true, 'items should be an array');
    t.deepEqual(newCollection.items.length, 0, 'items array should be empty');
    t.end();
  });

  t.test('when a collection is updated', (t) => {
    const newCollectionName = "Stamps";

    newCollection.name = newCollectionName;
    newCollection.items.push('new item');

    t.deepEqual(newCollection.name, newCollectionName, 'name should match new the one');
    t.notDeepEqual(newCollection.items.length, 0, 'items array should not be empty');
    t.end();
  });
});
// Collection tests


// Item tests
test('Testing item schema', (t) => {
  const itemName = "Cool Item";
  const itemPhoto = "https://image.flaticon.com/icons/svg/217/217853.svg";
  const itemDescription = "Rare cool item";
  const itemExtraInfo = "Some extra info";

  const newItem = new Item({
    name: itemName,
    photo: itemPhoto,
    description: itemDescription,
    extraInfo: itemExtraInfo,
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
    const newItemName = "Super Cool Item";
    const newItemPhoto = "https://d30y9cdsu7xlg0.cloudfront.net/png/71297-200.png";
    const newItemDescription = "Rare super cool item";
    const newItemExtraInfo = "Some super extra info";

    newItem.name = newItemName,
    newItem.photo = newItemPhoto,
    newItem.description = newItemDescription,
    newItem.extraInfo = newItemExtraInfo,

    t.deepEqual(newItem.name, newItemName, 'name should match new the one');
    t.deepEqual(newItem.photo, newItemPhoto, 'photo should match new the one');
    t.deepEqual(newItem.description, newItemDescription, 'description should match new the one');
    t.deepEqual(newItem.extraInfo, newItemExtraInfo, 'extra info should match new the one');
    t.end();
  });
});
// Item tests
