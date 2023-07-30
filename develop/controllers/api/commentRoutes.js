const router = require('express').Router();
const { Project, User, Comment} = require('../../models');
const withAuth = require('../../utils/auth');

// get all comment data
router.get('/', async (req,res) => {
  try {

    const allComments = await Comment.findAll({
      include: {
        model: User,
        attributes: ['name']
      }
    })

    res.status(200).json(allComments)

  } catch (err) {

    res.status(400).json(err)

  }
})

// router.post('/', withAuth, async (req, res) => {
//   try {
//     console.log(req.session)
//     const newComment = await Project.create({
//       ...req.body,
//       user_id: req.session.user_id || req.body.user_id,
      
//     });
//     console.log(req.session)
//     console.log(newComment)

//     res.status(200).json(newComment);

//   } catch (err) {

//     res.status(400).json(err);

//   }
// });
router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      text: req.body.text,
      user_id: req.session.user_id,
      project_id: req.session.project_id,
    });

    res.status(200).json(newComment);

  } catch (err) {

    res.status(400).json(err);

  }
});



// // get project data by id
// router.get('/:id', async (req,res) => {
//   try {
//     const project = await Project.findByPk(req.params.id, {
//       include: [
//         {
//           model: User,
//           attributes: ['name'],
//         },
//       ],
//     })

//     if (!project) {
//       res.status(404).json({ message: 'No products found with this id!' });
//       return;
//     }

//     res.status(200).json(project)
//   } catch (err) {
//     res.status(400).json(err)
//   }
// })

// router.post('/', withAuth, async (req, res) => {
//   try {

//     const newProject = await Project.create({
//       ...req.body,
//       user_id: req.session.user_id || req.body.user_id,
//     });

//     res.status(200).json(newProject);

//   } catch (err) {

//     res.status(400).json(err);

//   }
// });

// router.delete('/:id', withAuth, async (req, res) => {
//   try {

//     const projectData = await Project.destroy({
//       where: {
//         id: req.params.id,
//         user_id: req.session.user_id,
//       },
//     });

//     if (!projectData) {
//       res.status(404).json({ message: 'No project found with this id!' });
//       return;
//     }

//     res.status(200).json(projectData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
