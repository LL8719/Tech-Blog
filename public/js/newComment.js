const newCommentHandler = async (event) => {
	event.preventDefault();

	console.log('good start');

	const comment_text = $(event.target)
		.children('div')
		.children('textarea')
		.val();

	console.log(comment_text);

	const postId = event.target.getAttribute('data-postid');

	console.log('postId:', postId);

	if (comment_text) {
		try {
			const response = await fetch(`/api/comments/`, {
				method: 'POST',
				body: JSON.stringify({
					comment_text,
					post_id: postId,
				}),
				headers: { 'Content-Type': 'application/json' },
			});
			if (response.ok) {
				console.log('Comment submitted successfully!');

				document.location.reload();
			}
		} catch (err) {
			console.log(err);
			alert('Error submitting comment. Please try again.');
		}
	} else {
		console.log('Please enter a comment.');
		alert('Please enter a comment.');
	}
};

document.querySelectorAll('#new-comment').forEach(function (commentForm) {
	commentForm.addEventListener('submit', newCommentHandler);
});
