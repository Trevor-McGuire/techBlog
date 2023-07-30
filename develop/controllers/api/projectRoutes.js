const router = require('express').Router();
const { Project, User, Comment} = require('../../models');
const withAuth = require('../../utils/auth');

// get all project data
router.get('/', async (req,res) => {
  try {

    const allProjects = await Project.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          include: {
            model: User,
            attributes: ['name'],
          }
        }
      ],
    })

    res.status(200).json(allProjects)

  } catch (err) {

    res.status(400).json(err)

  }
})

// get project data by id
router.get('/:id', withAuth, async (req,res) => {
  try {
    console.log(req.session)
    const project = await Project.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          include: {
            model: User,
            attributes: ['name']
          }
        },
      ],
    })


    // req.session.project_id = req.params.id


    if (!project) {
      
      res.status(404).json({ message: 'No products found with this id!' });
      
      return;
    }

    res.status(200).json(project)
  } catch (err) {
    res.status(400).json(err)
  }
})

router.post('/', withAuth, async (req, res) => {
  try {

    const newProject = await Project.create({
      ...req.body,
      user_id: req.session.user_id || req.body.user_id,
    });

    res.status(200).json(newProject);

  } catch (err) {

    res.status(400).json(err);

  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    
    const projectData = await Project.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    
    if (!projectData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(projectData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
