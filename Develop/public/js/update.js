const updateButtonHandler = async (event) => {
    event.preventDefault();
    
    const title = document.querySelector('#title').value.trim();
    const contents = document.querySelector('#article').value.trim();

    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/post/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ title, contents }),
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        }else {
            alert ('Cannot Update Blog Post')
        }
    }
};

document
.querySelector('.update-post-form')
.addEventListener('submit', updateButtonHandler);