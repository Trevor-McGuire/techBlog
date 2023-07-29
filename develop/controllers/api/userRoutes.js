const router = require('express').Router();
const { User,Project } = require('../../models');

// find all users and their projects
router.get('/', async (req,res) => {
  try {

    const userData = await User.findAll({
      include: [
        {
          model: Project,
          attributes: ['name'],
        },
      ],
    })
    res.status(200).json(userData)

  } catch (err) {

    res.status(500).json(err)

  }
})

// get one user
router.get('/:name', async (req, res) => {
  // find a single user by its `name` including their associated Projects
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

  } catch (err) {

    res.status(500).json(err);

  }
});

router.post('/', async (req, res) => {
  try {

    console.log(req.body)

    const dbUserData = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    // Set up sessions with a 'logged_in' variable set to `true`
    req.session.save(() => {

      req.session.logged_in = true;

      res.status(200).json(dbUserData);

    });
  } catch (err) {

    console.log(err);
    res.status(500).json(err);
    
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
