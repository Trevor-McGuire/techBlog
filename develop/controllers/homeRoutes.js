const router = require('express').Router();
const { Project, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {

    // Get all projects and JOIN with user data
    const projectData = await Project.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          
        }
      ],
    });
    
    // Serialize data so the template can read it
    const projects = projectData.map((project) => project.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      projects, 
      logged_in: req.session.logged_in 
    });

  } catch (err) {

    res.status(500).json(err);
    
  }
});

router.get('/project/:id', withAuth, async (req, res) => {
  try {
    req.session.project_id = req.params.id
    console.log("req.session: ",req.session)
    const projectData = await Project.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          include: {
            model: User,
            attributes: ['name']
          }
        },
        {
          model:User,
          attributes: ['name'],
        }
      ],
    });

    const project = projectData.get({ plain: true });

    res.render('project', {
      ...project,
      logged_in: req.session.logged_in
    });

  } catch (err) {

    res.status(500).json(err);

  }
});


// Use withAuth middleware to prevent access to route
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID

    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Project ,
        include: { model : User}
      }],
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login route
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  // Otherwise, render the 'login' template
  res.render('login');
});

// Login route
router.get('/signup', (req, res) => {
  res.render('signup');
});

module.exports = router;
