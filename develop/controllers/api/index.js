const router = require('express').Router();
const userRoutes = require('./userRoutes');
const projectRoutes = require('./projectRoutes');
const commentRoutes = require('./commentRoutes.js');

router.use('/users', userRoutes);
router.use('/projects', projectRoutes);
router.use('/comments', commentRoutes);

// to test the session data
router.get('/session', (req, res) => {
  res.json(req.session);
});

module.exports = router;

