const { checkValuesNotExist } = require("../helpers/FormHelpers");

let users = [
  {
    id: 1,
    name: "Jake White",
    age: 31,
    email: "jakewhite@email.com",
    gender: "male",
    married: false,
  },
  {
    id: 2,
    name: "Cherry Rose",
    age: 17,
    email: "cherryrose@email.com",
    gender: "female",
    married: false,
  },
  {
    id: 3,
    name: "Brown Smith",
    age: 50,
    email: "brownsmit@email.com",
    gender: "male",
    married: true,
  },
];

/**
 * Get all the users
 */
const getAllUsers = (req, res) => {
  res.status(200).send(users);
};

/**
 * Get a single user
 */
const getSpecificUser = (req, res) => {
  let user = findUser(req.query.id, res);
  if (!user) return;

  res.status(200).send(user);
};

/**
 * Create a new user
 */
const postNewUser = (req, res) => {
  let lastUser = users[users.length - 1] || { id: 0 }; // get the current last user

  if (checkValuesNotExist(req.body, res)) return;

  if (checkDupliName(req.body.name, res)) return;

  let user = {
    id: lastUser.id + 1,
    name: req.body.name,
    age: req.body.age,
    email: req.body.email,
    gender: req.body.gender,
    married: req.body.married,
  };

  users.push(user); // push the user

  let createdUser = findUser(user.id, res);

  if (!createdUser) {
    res.status(500);
    res.send({
      message: "User creation was unsuccessful!",
    });
    return;
  }

  res.status(500).send({
    message: "User creation was successful!",
  });
};

/**
 * Update user
 */
const updateUser = (req, res) => {
  if (checkValuesNotExist(req.body, res)) return;

  let user = findUser(req.body.id, res);
  if (!user) return;

  if (checkDupliName(req.body.name, res, req.body.id)) return;

  // update the users array with the latest user data
  users = users.map((user) => {
    if (user.id == req.body.id) {
      user.name = req.body.name;
      user.age = req.body.age;
      user.email = req.body.email;
      user.gender = req.body.gender;
      user.married = req.body.married;
      return user;
    } else {
      return user;
    }
  });

  let updatedUser = users.filter((user) => user.id == req.body.id); // find the last updated user

  res.status(200).send(updatedUser);
};

/**
 * Delete a user
 */
const deleteUser = (req, res) => {
  let user = findUser(req.body.id, res);
  if (!user) return;

  users = users.filter((u) => u.id !== user[0].id); // update users array with deleted value

  res.status(200).send(users);
};

/**
 * Find the user matching with the given id
 */
const findUser = (id, res) => {
  let user = users.filter((user) => user.id == id); // find the user matching with the id from request

  if (user.length == 0) {
    // if user not found
    res.status(404);
    res.send({
      message: "User not found!",
    });

    return null;
  }

  return user;
};

/**
 * Check if user with the same name exists
 */
const checkDupliName = (name, res, except) => {
  let user = users.filter((user) => user.name == name); // find the user with the given name

  if (except) {
    // check duplicate name excpet for user with id same with except
    user = user.filter((u) => u.id !== except);
  }

  if (user.length > 0) {
    // if user with the same  name exists
    res.status(401).send({
      message: "The username already exists!",
    });

    return true;
  }
};

module.exports = {
  getAllUsers,
  getSpecificUser,
  postNewUser,
  updateUser,
  deleteUser,
};
