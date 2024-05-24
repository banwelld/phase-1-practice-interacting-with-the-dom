let counterId = setInterval(handleCounter, 1000);
let buttonsActive = true;

const counterLikes = {};
const counter = document.querySelector('h1#counter');

const plusBtn = document.getElementById('plus');
const minusBtn = document.getElementById('minus');
const likeBtn = document.getElementById('heart');
const pauseBtn = document.getElementById('pause');
const commentForm = document.getElementById('comment-form');

plusBtn.addEventListener('click', () => {if (buttonsActive) {handleCounter(1)}});
minusBtn.addEventListener('click', () => {if (buttonsActive) {handleCounter(-1)}});
likeBtn.addEventListener('click', () => {if (buttonsActive) {handleLike()}});
pauseBtn.addEventListener('click', handlePause);
commentForm.addEventListener('submit', (e) => {handleFormSubmit(e)});

function handleCounter(incAmt = 1) {
    const nextCount = parseInt(counter.innerText) + incAmt;
    counter.innerText = nextCount
}

function handleLike () {
    const likedNum = counter.innerText;
    const likeList = document.querySelector('ul.likes');
    
    switch(likedNum in counterLikes) {
        case true:
            counterLikes[likedNum] = parseInt(counterLikes[likedNum][0]) + 1 + ' likes';
            const likePattern = new RegExp(`${likedNum} :: (\\d+) like(s?)`, 'g');
            likeList.innerHTML = likeList.innerHTML.replace(likePattern, `${likedNum} :: ${counterLikes[likedNum]}`);
            break;
        case false:
            counterLikes[likedNum] = '1 like';
            likeContainer = document.createElement('li');
            likeContainer.className = 'liked_number';
            likeContainer.innerText = `${likedNum} :: ${counterLikes[likedNum]}`;
            likeList.appendChild(likeContainer);
            break;
    }
}

function handlePause() {
    switch (counterId !== null) {
        case true:
            clearInterval(counterId);
            counterId = null;
            pauseBtn.innerText = 'resume';
            buttonsActive = false;
            break;
        case false:
            counterId = setInterval(handleCounter, 1000);
            pauseBtn.innerText = 'pause';
            buttonsActive = true;
            break;
    }
}

function handleFormSubmit(e) {
    e.preventDefault();
    if (buttonsActive) {
        const commentText = document.getElementById('comment-input').value;
        postComment(commentText);
        e.target.reset();
    }
}

function postComment(comment) {
    const commentContainer = document.createElement('p');
    commentContainer.className = 'user_comment';
    commentContainer.innerText = comment;
    const commentList = document.querySelector('div#list');
    commentList.appendChild(commentContainer);
}