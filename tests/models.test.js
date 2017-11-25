const test = require('tape');

test('Testing user models', (t) => {
  const firstName = "John";
  const lastName = "Userman";
  const picture = "https://d30y9cdsu7xlg0.cloudfront.net/png/17241-200.png";
  const email = "johnuserman@email.com";
  const password = "secret";

  const newUser = new User({
    firstName: firstName,
    lastName: lastName,
    picture: picture,
    email: email,
    password: password,
    collections: []
  });

  t.test('when a new user is created', (t) => {
    
    newUser.save(() => {
      User.findById(newUser._id, (err, user) => {
        t.deepEqual(typeof user.firstName, "string", 'first name should be a string');
        t.deepEqual(user.firstName, firstName, 'first name should match');
        t.deepEqual(typeof user.lastName, "string", 'last name should be a string');        
        t.deepEqual(user.lastName, lastName, 'last name should match');
        t.deepEqual(typeof user.picture, "string", 'picture should be a string');        
        t.deepEqual(user.picture, picture, 'picture should match');
        t.deepEqual(typeof user.email, "string", 'email should be a string');        
        t.deepEqual(user.email, email, 'email should match');
        t.deepEqual(typeof user.password, "string", 'password should be a string');        
        t.deepEqual(user.password, "secret", 'password should match');
        t.deepEqual(Array.isArray(user.collections), true, 'collections should be an array');
        t.deepEqual(user.collections.length, 0, 'collections array should be empty');
        t.end();
      })
    });
  });

  t.test('when a user updates its information', (t) => {
    const newFirstName = "Mary";
    const newLastName = "McUser";
    const newPicture = "https://cdn3.iconfinder.com/data/icons/rcons-user-action/32/girl-512.png";
    const newEmail = "marymcuser@email.com";
    const newPassword = "moresecret";

    User.findById(newUser._id, (err, user) => {
      user.firstName = newFirstName;
      user.lastName = newLastName;
      user.picture = newPicture;
      user.email = newEmail;
      user.password = newPassword;
      user.collections.push('new item');

      user.save(() => {
        t.deepEqual(user.firstName, newFirstName, 'first name should match new the one');
        t.notDeepEqual(user.firstName, firstName, 'first name should not match the old one');
        t.deepEqual(user.lastName, newLastName, 'last name should match new the one');
        t.notDeepEqual(user.lastName, lastName, 'last name should not match the old one');
        t.deepEqual(user.picture, newPicture, 'picture should match new the one');
        t.notDeepEqual(user.picture, picture, 'picture should not match the old one');
        t.deepEqual(user.email, newEmail, 'email should match new the one');
        t.notDeepEqual(user.email, email, 'email should not match the old one');
        t.deepEqual(user.password, newPassword, 'password should match new the one');
        t.notDeepEqual(user.password, "secret", 'password should not match the old one');
        t.deepEqual(user.collections.length, 1, 'collections array should contain 1 item');
        t.end();
      })
    })
  });

  t.test('when a user is deleted', (t) => {
    User.findByIdAndRemove(newUser._id);
    User.findById(newUser._id, (err, user) => {
      t.deepEqual(user, undefined, 'deleted user should not be found in the db');
      t.end();
    });
  });
  
});

