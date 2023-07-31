const router = require('express').Router();
const { User,Project } = require('../../models');

// INSOMNIA
router.get('/', async (req,res) => { console.log("api/userRoutes.get('/')")
  try {
    const userData = await User.findAll({
      include: [
        {model: Project,attributes: ['name'],},
      ],
    })
    res.status(200).json(userData)
  } catch (err) {res.status(500).json(err)}
})

router.get('/:name', async (req, res) => { console.log("api/userRoutes.get('/:name')")
  try {
    const userData = await User.findOne({ 
      where: { name: req.params.name },
      include: [
        {model: Project},
      ]
    })
    if (!userData) {
      res.status(404).json({ message: 'No users found with this name!' });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {res.status(500).json(err);}
});

router.post('/', async (req, res) => { console.log("api/userRoutes.post('/')")
  try {
    const dbUserData = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    req.session.save(() => {
      req.session.logged_in = true;
      req.session.user_id = dbUserData.id;
      req.session.project_id = 1
      res.status(200).json(dbUserData);
    });
  } catch (err) {res.status(500).json(err);}
});

router.post('/login', async (req, res) => { console.log("api/userRoutes.post('/login')")
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });
    const validPassword = await userData.checkPassword(req.body.password);
    if (!userData || !validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    req.session.save( () => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      req.session.project_id = 1
      res.status(200).json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {res.status(400).json(err);}
});

router.post('/logout', (req, res) => { console.log("api/userRoutes.post('/logout')")
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
