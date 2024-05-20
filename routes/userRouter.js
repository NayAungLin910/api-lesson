const userRouter = require('express').Router()

const userController = require('../controllers/userController.js')

userRouter.get('/', userController.getAllUsers);
userRouter.get('/get-specific-user', userController.getSpecificUser);
userRouter.post('/create-new-user', userController.postNewUser);
userRouter.put('/update-specific-user', userController.updateUser);
userRouter.delete('/delete-user', userController.deleteUser);

module.exports = userRouter