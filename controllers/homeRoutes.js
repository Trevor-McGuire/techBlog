const router = require('express').Router();
const { Project, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => { console.log("homeRoutes.get('/')")
  try {
    const projectData = await Project.findAll({
      include: [
        {model: User,attributes: ['name'],},
        {model: Comment,}
      ],
    });
    const projects = projectData.map((project) => project.get({ plain: true }));
    projects.reverse()
    res.render('homepage', { 
      projects, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {res.status(500).json(err);}
});

router.get('/project/:id', withAuth, async (req, res) => { console.log("homeRoutes.get('/project/:id')")
  try {
    req.session.project_id = req.params.id
    const projectData = await Project.findByPk(req.params.id, {
      include: [
        {model: Comment,include: [
          {model: User,attributes: ['name']}
        ]},
        {model:User,attributes: ['name'],}
      ],
    });
    const project = projectData.get({ plain: true });
    project.comments.reverse()
    res.render('project', {
      ...project,
      logged_in: req.session.logged_in
    });
  } catch (err) {res.status(500).json(err);}
});

router.get('/dashboard', withAuth, async (req, res) => { console.log("homeRoutes.get('/dashboard')")
  try {
    console.log(req.session)
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [
        {model: Project,include: { model : User},}
      ],
    });
    const user = userData.get({ plain: true });
    user.projects.reverse()
    res.render('dashboard', {
      ...user,
      logged_in: req.session.logged_in
    });
  } catch (err) {res.status(500).json(err);}
});

router.get('/login', (req, res) => { console.log("homeRoutes.get('/login')")
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

router.get('/signup', (req, res) => { console.log("homeRoutes.get('/signup')")
  res.render('signup');
});

module.exports = router;
