const router = require('express').Router();
const { authenticationMiddleware } = require('../middlewares/authentication');
const mondayController = require('../controllers/monday-controller');
const subitemController = require('../controllers/subitem-controller');

// router.post('/monday/execute_action', authenticationMiddleware, mondayController.executeAction);
router.post('/monday/execute_action_1', authenticationMiddleware, mondayController.executeAction2);
router.post('/monday/execute_action_2', authenticationMiddleware, mondayController.executeAction3);
router.post('/monday/execute_action_3', authenticationMiddleware, mondayController.executeAction4);
router.post('/monday/execute_action_4', authenticationMiddleware, mondayController.executeAction5);
router.post('/monday/execute_action_5', authenticationMiddleware, mondayController.executeAction6);
router.post('/monday/execute_action_6', authenticationMiddleware, mondayController.executeAction7);
router.post('/monday/execute_action_7', authenticationMiddleware, mondayController.executeAction8);
router.post('/monday/execute_action_8', authenticationMiddleware, mondayController.executeAction9);
router.post('/monday/execute_action_9', authenticationMiddleware, mondayController.executeAction10);
router.post('/monday/execute_action_10', authenticationMiddleware, mondayController.executeAction11);
router.post('/monday/execute_action_21', authenticationMiddleware, mondayController.executeAction12);
router.post('/monday/execute_action_22', authenticationMiddleware, mondayController.executeAction13);

//subitem urls
router.post('/monday/execute_action_11', authenticationMiddleware, subitemController.executeAction2);
router.post('/monday/execute_action_17', authenticationMiddleware, subitemController.executeAction8);
router.post('/monday/execute_action_20', authenticationMiddleware, subitemController.executeAction11);
router.post('/monday/get_remote_list_options', authenticationMiddleware, subitemController.getRemoteListOptions);

module.exports = router;
