const test = require('tape');
const mongoose = require('mongoose');
const config = require('../src/config/config');

const User = require('../src/models/User');
const Collection = require('../src/models/Collection');
const Item = require('../src/models/Item');

// Connect to DB
mongoose.connect(config.database, { useMongoClient: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
  console.log('Connected to the database for tests');
  
  test(`Testing API's integration with database`, (t) => {
    const newUser = new User({
      firstName: "John",
      lastName: "Userman",
      photo: "https://d30y9cdsu7xlg0.cloudfront.net/png/17241-200.png",
      email: "johnuserman@email.com",
      password: "secret",
    });

    const updatedUser = {
      firstName: "Mary",
      lastName: "McUser",
      photo: "https://cdn3.iconfinder.com/data/icons/rcons-user-action/32/girl-512.png",
      email: "marymcuser@email.com",
      password: "moresecret"
    };
    

    t.test('when a new user is created', (t) => {
      newUser.save(() => {
        User.find(newUser, (err, user) => {
          t.notDeepEqual(user.length, 0, "database should include new user");
          t.end(updateUser()); // Calls the tests for updating the user when finished
        })
      });
    });

    
    const updateUser = () => {
      t.test('when a user is updated', (t) => {
        
        User.findOne(newUser, (err, user) => {
          user.firstName = updatedUser.firstName;
          user.lastName = updatedUser.lastName;
          user.photo = updatedUser.photo;
          user.email = updatedUser.email;
          user.password = updatedUser.password;
          user.collections.push('new collecion');
          
          user.save(() => {
            User.find(updatedUser, (err, user) => {
              t.notDeepEqual(user.length, 0, "database should include updated user info");
            })
            User.find(newUser, (err, user) => {
              t.deepEqual(user.length, 0, "database should not include previous user info");
              t.end(deleteUser());  // Calls the tests for deleting the user when finished
            })
          })
        })
      });
    };


    const deleteUser = () => {
      t.test('when a user is deleted', (t) => {
        User.findByIdAndRemove(newUser._id, () => {
          User.findById(newUser._id, (err, user) => {
            t.deepEqual(user, null, 'database should no more include user');
            t.end();
            db.close(); // Close connection to the DB
          });
        });
      });
    };
    
  });

});
