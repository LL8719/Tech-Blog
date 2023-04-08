const newCommentHandler = async (event) => {
	event.preventDefault();
	console.log('newcomment');

	const commentText = $('#comment').val().trim();
	console.log('commentText:', commentText);

	const postId = $('#new-comment').data('postid');
	console.log('postId:', postId);

	if (commentText) {
		try {
			const response = await fetch(`/api/post/${postId}/comments`, {
				method: 'POST',
				body: JSON.stringify({
					commentText,
				}),
				headers: { 'Content-Type': 'application/json' },
			});
			if (response.ok) {
				console.log('Comment submitted successfully!');
				document.location.replace('/');
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
