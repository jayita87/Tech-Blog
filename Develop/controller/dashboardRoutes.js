const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Every route will be prefixed with /dashboard

// Edit post
router.get('/edit/:id', withAuth , async (req, res) => {

  // res.render('dashboard')
  try {
    const postData = await Post.findbyPk(
      req.params.id, {
        attributes: ['id', 'title', 'post_body'],
      });
       
    const post = postData.get({ plain: true });
    
    res.render('dashboard', {
        post,
        logged_in: req.session.logged_in
    } );
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;