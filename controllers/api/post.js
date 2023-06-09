const router = require('express').Router();
const { Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
	try {
		const user = req.session.user_id; // get the user_id from the session
		const newPost = await Post.create({
			...req.body,
			user_id: user, // set the user_id to the user ID obtained from the session
		});

		res.status(200).json(newPost);
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

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

router.put('/:id', withAuth, async (req, res) => {
	try {
		const existingPost = await Post.update(
			{
				title: req.body.title,
				content: req.body.content,
			},
			{
				where: {
					id: req.params.id,
				},
			}
		);
		res.status(200).json(existingPost);
	} catch (err) {
		res.status(400).json(err);
	}
});

module.exports = router;
