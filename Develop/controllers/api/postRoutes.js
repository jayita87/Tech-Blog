const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

//API POST route for a new blog post to be added 
router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

//API PUT route to update an existing blog post by ID 
router.put('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.update (
      {
        title: req.body.title,
        contents: req.body.contents,
      },
      {
        where: {
          id: req.params.id,
        }
      }
    )
    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }
    res.status(200).json(postData);
  }  catch (err) {
    res.status(500).json(err);
  }
})

//API route to delete a blog post via ID
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;