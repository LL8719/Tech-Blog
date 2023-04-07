const delButtonHandler = async (event) => {
	console.log('delete');

	if (event.target.hasAttribute('data-id')) {
		const id = event.target.getAttribute('data-id');

		const response = await fetch(`/api/post/${id}`, {
			method: 'DELETE',
		});

		if (response.ok) {
			document.location.replace('/dashboard');
		} else {
			alert('Failed to delete post');
		}
	}
};

const updateHandler = async (event) => {
	console.log('update');

	if (event.target.hasAttribute('data-id')) {
		const id = event.target.getAttribute('data-id');
		const title = document.querySelector('#post-title').value.trim();
		const content = document.querySelector('#post-content').value.trim();
		const response = await fetch(`/api/post/${id}`, {
			method: 'PUT',
			body: JSON.stringify({ title, content }),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (response.ok) {
			document.location.replace('/dashboard');
		} else {
			alert('Failed to update post');
		}
	}
};

document.querySelector('#update-btn').addEventListener('click', updateHandler);

document
	.querySelector('#delete-btn')
	.addEventListener('click', delButtonHandler);
