const faker = window.faker;

const selectUserCount = Math.floor(Math.random() * 11);
let dataOfUsers = [];
let currentUser = null;

class User {
    constructor(name, email, nickname, ownPosts) {
        this.name = name;
        this.email = email;
        this.nickname = nickname;
        this.ownPosts = ownPosts;
    }
}

class Post {
    constructor(imageUrl, owner, likes, description, creationDate) {
        this.imageUrl = imageUrl;
        this.owner = owner;
        this.likes = likes;
        this.description = description;
        this.creationDate = creationDate;
        this.hasLiked = false;
        this.comments = []; // Додаємо масив коментарів
    }
}

class Comment {
    constructor(username, text) {
        this.username = username; // Нікнейм користувача, що коментує
        this.text = text;         // Текст коментаря
    }
}


function createUser(userCount) {
    for (let i = 0; i < userCount; i++) {
        let u = new User();
        u.name = faker.name.firstName();
        u.email = `${u.name.toLowerCase()}@${faker.internet.domainName()}`; // Генеруємо email на основі імені з випадковим доменом
        u.nickname = `${u.name.toLowerCase()}${Math.floor(Math.random() * 100) + 1}`; // Генеруємо нікнейм на основі імені з додаванням випадкового числа
        u.ownPosts = [];

        dataOfUsers.push(u);
    }
}
createUser(selectUserCount);

function createPost(dataOfUsers) {
    dataOfUsers.forEach(user => {
        const countOfPosts = Math.floor(Math.random() * 11);
        for (let i = 0; i < countOfPosts; i++) {
            let p = new Post;
            p.imageUrl = "./images/picture.png";
            p.owner = user.nickname;
            p.likes = Math.floor(Math.random() * 600);
            p.description = 'blabla';

            const fullDate = faker.date.past();
            // const year = fullDate.getFullYear();
            // const month = String(fullDate.getMonth() + 1).padStart(2, '0'); // Додаємо 1, оскільки getMonth() повертає місяці з 0 до 11
            // const day = String(fullDate.getDate()).padStart(2, '0');
            const postDate = fullDate.toISOString().split('T')[0];
            p.creationDate = postDate;

            user.ownPosts.push(p);

            user.ownPosts.sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate));
        }
    })
}
createPost(dataOfUsers);

console.log(dataOfUsers);


function generateUserButtons(users) {
    const userButtonsDiv = document.getElementById('userButtons');
    userButtonsDiv.innerHTML = '';  // Очищаємо старі кнопки

    users.forEach(user => {
        const button = document.createElement('button');  // Створюємо нову кнопку
        button.textContent = user.nickname;  // Встановлюємо нікнейм як текст кнопки
        // button.addEventListener('click', () => alert(`Це кнопка користувача: ${user.nickname}`));  // Додаємо подію на кнопку
        button.addEventListener('click', () => {
            showUsersPosts(user);
            currentUser = user; // Оновлюємо вибраного користувача
            const createPostButton = document.querySelector('#userButtons button:last-child'); // Отримуємо кнопку "Додати пост"
            createPostButton.disabled = false; // Активуємо кнопку створення посту
        });
        userButtonsDiv.appendChild(button);  // Додаємо кнопку в контейнер
    });

    const createPostButton = document.createElement('button');
    createPostButton.textContent = 'Додати пост';
    createPostButton.disabled = true;  // Спочатку вимкнена
    createPostButton.addEventListener('click', () => createNewPost()); // Додаємо обробник події
    userButtonsDiv.appendChild(createPostButton);
}
generateUserButtons(dataOfUsers);

function showUsersPosts(user) {
    currentUser = user;
    const createPostButton = document.querySelector('#userButtons button:last-child'); // Отримуємо кнопку "Додати пост"
    createPostButton.disabled = false; // Активуємо кнопку створення посту

    const postsDiv = document.getElementById('posts');
    postsDiv.innerHTML = '';  // Очищаємо старі пости
    const recentPosts = user.ownPosts.slice(0, 5); // Останні перші 5 постів

    if (user.ownPosts.length == 0) {
        const postElement = document.createElement('div');
        postElement.innerHTML = `
                <p><strong>Пости відсутні</strong>
            `;
            postsDiv.appendChild(postElement);  // Додаємо пост на сторінку
    } else {
        recentPosts.forEach((post, index) => {
            const postElement = document.createElement('div');
            postElement.innerHTML = `
                <strong>${user.nickname} Пост ${index + 1}</strong>
                <p />
                <img src="${post.imageUrl}" alt="Картинка для поста" width="200" height="200">
                <p>Likes: <span class="likesCount">${post.likes}</span></p>
                <p><strong><em>${post.creationDate}</em><strong></p>
                <p><strong>${user.nickname} </strong>${post.description}</p>
                <button class="likeButton">👍</button>
                <div>
                    <div class="nicknameButtons"></div>
                    <input type="text" class="commentInput" placeholder="Напишіть коментар..." disabled>
                    <button class="commentButton" disabled>Коментувати</button>
                </div>
                <div class="commentsContainer"></div>
                <button class="deleteButton">🗑️</button>
                <p />
            `;
            
            const likeButton = postElement.querySelector('.likeButton');
            likeButton.addEventListener('click', () => {
                if (!post.hasLiked) {
                    post.likes++;  // Збільшуємо кількість лайків
                    post.hasLiked = true;
                    const likesCountElement = postElement.querySelector('.likesCount'); // Зберігаємо посилання на елемент лайків
                    if (likesCountElement) {  // Переконуємось, що елемент існує
                        likesCountElement.textContent = post.likes;  // Оновлюємо відображення лайків
                        console.log(`Кількість лайків після натискання: ${post.likes}`);
                    } else {
                        console.log("Елемент лайків не знайдено!");
                    }
                }
            });

            const deleteButton = postElement.querySelector('.deleteButton');
            deleteButton.addEventListener('click', () => {
                deletePost(user, post); // Викликаємо функцію видалення посту
            });

            const nicknameButtonsDiv = postElement.querySelector('.nicknameButtons');
            dataOfUsers.forEach(u => {
                const nicknameButton = document.createElement('button');
                nicknameButton.textContent = u.nickname;
                nicknameButton.addEventListener('click', () => {
                    // Встановлюємо вибраний нік у поле введення та активуємо кнопку коментування
                    const commentInput = postElement.querySelector('.commentInput');
                    const commentButton = postElement.querySelector('.commentButton');
                    commentInput.value = ''; // Очищаємо поле введення
                    commentInput.placeholder = `Коментувати як ${u.nickname}`; // Змінюємо плейсхолдер
                    commentInput.disabled = false; // Активуємо поле
                    commentButton.disabled = false; // Активуємо кнопку коментування

                    // Додаємо подію для коментування
                    commentButton.onclick = () => {
                        const commentText = commentInput.value.trim();
                        if (commentText) {
                            const comment = new Comment(u.nickname, commentText);
                            post.comments.push(comment); // Додаємо коментар до поста
                            commentInput.value = ''; // Очищаємо поле введення
                            displayComments(post, postElement); // Відображаємо коментарі
                        }
                    };
                });
                nicknameButtonsDiv.appendChild(nicknameButton); // Додаємо кнопку нікнейму в контейнер
            });

            postsDiv.appendChild(postElement);  // Додаємо пост на сторінку
            displayComments(post, postElement); // Відображаємо коментарі
        });
    }
}

function displayComments(post, postElement) {
    const commentsContainer = postElement.querySelector('.commentsContainer');
    commentsContainer.innerHTML = ''; // Очищаємо старі коментарі
    post.comments.forEach(comment => {
        const commentElement = document.createElement('div');
        commentElement.innerHTML = `<strong>${comment.username}:</strong> ${comment.text}`;
        commentsContainer.appendChild(commentElement); // Додаємо коментар до контейнера
    });
}

function createNewPost() {
    if (!currentUser) {
        alert("Спочатку виберіть користувача!"); // Переконуємось, що вибрано користувача
        return;
    }

    let newPost = new Post();
    newPost.imageUrl = "./images/picture.png"; // Використовуємо ту ж картинку
    newPost.owner = currentUser.nickname; // Власник - вибраний користувач
    newPost.likes = Math.floor(Math.random() * 600); // Випадкова кількість лайків
    newPost.description = 'blabla'; // Можна зробити більш випадковим, якщо хочеш

    const fullDate = faker.date.past(); 
    newPost.creationDate = fullDate.toISOString().split('T')[0]; // Дата поста

    currentUser.ownPosts.unshift(newPost); // Додаємо новий пост на початок масиву
    showUsersPosts(currentUser); // Оновлюємо відображення постів
}

function deletePost(user, postToDelete) {
    user.ownPosts = user.ownPosts.filter(post => post !== postToDelete); // Видаляємо пост з масиву
    showUsersPosts(user); // Оновлюємо відображення постів
}

// 1 В системі є користувачі
// 2 кожен користувач має ім'я , імейл та нікнейм ( @nickname) - дані описані в коді
// 3 у кожного користувача є його пости в соц мережі
// 4 кожен пост має дату створення, текст поста, кількість лайків , коментарі до посту
// 5 користувач може отримати остані 5 постів іншого користувача (вивести в консоль повну інформацію про остані 5 постів)
// 6 коистувач може поставити лайк чи написати коментар до поста іншого користувача
// 7 користувач може створити собі новий пост
// 8 користувач може видалити свій пост
// 9 Для виконання роботи використовуйте класи. структури та функції для організації коду.