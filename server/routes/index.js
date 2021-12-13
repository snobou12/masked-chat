const Router = require('express').Router;
const userController = require('../controllers/user-controller');
const roomController = require('../controllers/room-controller');
const chatController = require('../controllers/chat-controller');


const authMiddleware = require('../middlewares/auth-middleware'); //ВАЖНО
const { body } = require('express-validator');

const router = Router();

//AUTH

router.post(
  '/registration',
  body('email').isEmail(),
  body('password').isLength({ min: 8, max: 16 }),
  userController.registration,
);

router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.post('/forgot', userController.forgot);
router.get('/checkResetLink/:resetPasswordToken', userController.checkResetLink);
router.put('/updatePassword', userController.updatePassword);
router.post('/sendActivationLink', userController.sendActivationLink);

router.get('/refresh', userController.refresh);

//AUTH-TOOLS

router.post('/checkUniqueEmail',userController.checkUniqueEmail);
router.post('/checkUniquePhone',userController.checkUniquePhone);
router.post('/sendActivationCode',userController.sendActivationCode);
router.post('/checkActivationCode',userController.checkActivationCode);


//ROOM

router.post('/createRoom',authMiddleware,roomController.createRoom);
router.post('/deleteRoom',authMiddleware,roomController.deleteRoom);

router.post('/getRoomsBySort',authMiddleware,roomController.getRoomsBySort);


router.get('/getRoomData/:roomId',authMiddleware,roomController.getRoomData)

router.post('/deleteUserFromRoom',authMiddleware,roomController.deleteUserFromRoom);

router.post('/leaveFromRoom',authMiddleware,roomController.leaveFromRoom);

router.get('/getRoomsOfUser',authMiddleware,roomController.getRoomsOfUser);


router.post('/subscribeToRoom',authMiddleware,roomController.subscribeToRoom);

router.post('/unSubscribeToRoom',authMiddleware,roomController.unSubscribeToRoom);


router.post('/acceptPotentialUser',authMiddleware,roomController.acceptPotentialUser);

router.post('/deletePotentialUser',authMiddleware,roomController.deletePotentialUser);






//CHAT

router.post('/getChat',authMiddleware,chatController.getChat)
router.post('/sendMessage',authMiddleware,chatController.sendMessage)
















module.exports = router;
