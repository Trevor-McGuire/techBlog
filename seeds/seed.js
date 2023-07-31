const sequelize = require('../config/connection');
const { User, Project, Comment } = require('../models');

const userData = require('./userData.json');
const projectData = require('./projectData.json');
const commentData = require('./commentData.json')

const seedDatabase = async () => {
  await sequelize.sync({ force: true, alter:true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const project = await Project.bulkCreate(projectData);

  const comment = await Comment.bulkCreate(commentData)

  process.exit(0);
};

seedDatabase();
