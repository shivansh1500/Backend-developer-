const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const taskController = require('../controllers/taskController');
const { protect, restrictTo } = require('../middlewares/authMiddleware');

// Auth routes
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);

// Task routes (Protected)
router.use('/tasks', protect);
router.route('/tasks')
  .get(taskController.getTasks)
  .post(taskController.createTask);

router.route('/tasks/:id')
  .get(taskController.getTaskById)
  .put(taskController.updateTask)
  .delete(taskController.deleteTask);

// Admin only route example
router.get('/admin/stats', protect, restrictTo('admin'), (req, res) => {
  res.status(200).json({ success: true, message: 'Welcome to admin panel stats' });
});

module.exports = router;
