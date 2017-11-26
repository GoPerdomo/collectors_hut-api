const test = require('tape');
const httpMocks = require('node-mocks-http');

// Schemas
const User = require('../src/models/User');
const Collection = require('../src/models/Collection');
const Item = require('../src/models/Item');
// Schemas

// Controllers
const userHandler = require('../src/controllers/user');
// Controllers

// Data for tests
const mockUser = require('./mockData').mockUser;
const mockCollection = require('./mockData').mockCollection;
const mockItem = require('./mockData').mockItem;
// Data for tests


// User controllers tests
test('Testing user controllers', (t) => {
  const request = httpMocks.createRequest({
    method: 'POST',
    body: {
      firstName: mockUser.firstName,
      lastName: mockUser.lastName,
      photo: mockUser.photo,
      email: mockUser.email,
      password: mockUser.password,
    }
  });
  const response = httpMocks.createResponse();

  userHandler.signUp(request, response);
  const data = JSON.parse(response._getData());
  
  t.test('when creating a new user', (t) => {
    t.notDeepEqual(data._id, undefined, "unique id should be assigned");
    t.deepEqual(data.firstName, mockUser.firstName, 'first name should match new the one');
    t.deepEqual(data.lastName, mockUser.lastName, 'last name should match new the one');
    t.deepEqual(data.photo, mockUser.photo, 'photo should match new the one');
    t.deepEqual(data.email, mockUser.email, 'email should match new the one');
    t.deepEqual(data.password, mockUser.password, 'password should match new the one');
    t.end();
  });
    
});
// User controllers tests
