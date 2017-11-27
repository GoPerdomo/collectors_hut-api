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
  
  t.test('when creating a new user', (t) => {
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

    t.notDeepEqual(data._id, undefined, "unique id should be assigned");
    t.deepEqual(data.firstName, mockUser.firstName, 'first name should be correct');
    t.deepEqual(data.lastName, mockUser.lastName, 'last name should be correct');
    t.deepEqual(data.photo, mockUser.photo, 'photo should be correct');
    t.deepEqual(data.email, mockUser.email, 'email should be correct');
    t.deepEqual(data.password, mockUser.password, 'password should be correct');
    t.end();
  });
  
  t.test('when trying to login', (t) => {
    const request = httpMocks.createRequest({
      method: 'POST',
      body: {
        email: mockUser.email,
        password: mockUser.password,
      }
    });
    const response = httpMocks.createResponse();
    userHandler.signIn(request, response);
    const data = JSON.parse(response._getData());
    
    t.deepEqual(data.email, mockUser.email, 'email should be correct');
    t.deepEqual(data.password, mockUser.password, 'password should be correct');
    t.end(testUpdate(data._id));
  });
  
  const testUpdate = (userId) => {
    t.test('when updating an existing user', (t) => {
      const request = httpMocks.createRequest({
        method: 'PUT',
        params: {
          _id: userId
        },
        body: {
          firstName: mockUser.newFirstName,
          lastName: mockUser.newLastName,
          photo: mockUser.newPhoto,
          email: mockUser.newEmail,
          password: mockUser.newPassword,
        }
      });
      const response = httpMocks.createResponse();
      userHandler.updateUser(request, response);
      const data = JSON.parse(response._getData());
    
      t.deepEqual(data.firstName, mockUser.newFirstName, 'first name should match new the one');
      t.deepEqual(data.lastName, mockUser.newLastName, 'last name should match new the one');
      t.deepEqual(data.photo, mockUser.newPhoto, 'photo should match new the one');
      t.deepEqual(data.email, mockUser.newEmail, 'email should match new the one');
      t.deepEqual(data.password, mockUser.newPassword, 'password should match new the one');
      t.end(testDelete(userId));
    });
  };

  const testDelete = (userId) => {
    const request = httpMocks.createRequest({
      method: 'DELETE',
      params: {
        _id: userId
      }
    });
    const response = httpMocks.createResponse();
    userHandler.deleteUser(request, response);
    const data = JSON.parse(response._getData());

    t.deepEqual(data.message, "User deleted", "should say the user was deleted");
    t.end();
  };
  
  
});
// User controllers tests
