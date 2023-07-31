const router = require('express').Router();
const { Project, User, Comment} = require('../../models');
const withAuth = require('../../utils/auth');

// INSOMNIA
router.get('/', async (req,res) => { console.log("api/commentRoutes.get('/')")
  try {
    const allComments = await Comment.findAll({
      include: {
        model: User,
        attributes: ['name']
      }
    })
    res.status(200).json(allComments)
  } catch (err) {res.status(400).json(err)}
})

router.post('/', withAuth, async (req, res) => { console.log("api/commentRoutes.post('/')")
  try {
    const newComment = await Comment.create({
      text: req.body.text,
      user_id: req.session.user_id,
      project_id: req.session.project_id,
    });
    res.status(200).json(newComment);
  } catch (err) {res.status(400).json(err);}
});

module.exports = router;
