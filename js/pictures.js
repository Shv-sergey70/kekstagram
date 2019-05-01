'use strict';

var KEY_ESC = 'Escape';

var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var DESCRIPTIONS = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];
var MIN_LIKES = 15;
var MAX_LIKES = 200;
var photos = [];
var randomPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture');
var randomPhotosFragment = document.createDocumentFragment();
var usersPicturesContainer = document.querySelector('.pictures');

var bigPicture = document.querySelector('.big-picture');
var bigPictureImg = bigPicture.querySelector('.big-picture__img img');
var bigPictureLikesCount = bigPicture.querySelector('.likes-count');
var bigPictureCommentsCount = bigPicture.querySelector('.comments-count');
var bigPictureCaption = bigPicture.querySelector('.social__caption');
var bigPictureSocialCommentsBlock = bigPicture.querySelector('.social__comments');
var bigPictureCommentTemplate = document.querySelector('#picture').content.querySelector('.social__comment');
var bigPictureCommentsFragment = document.createDocumentFragment();
var bigPictureSocialCommentsCountBlock = bigPicture.querySelector('.social__comment-count');
var bigPictureCommentsLoaderButton = bigPicture.querySelector('.social__comments-loader');
var bigPictureCloseButton = bigPicture.querySelector('#picture-cancel');

var userPictureEditorBlock = document.querySelector('.img-upload__overlay');

var generateRandomNumber = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

var getRandomElementFromArray = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var generateComments = function (isGetTwoComments) {
  var comments = [];
  if (isGetTwoComments) {
    comments.push(getRandomElementFromArray(COMMENTS));
  }
  comments.push(getRandomElementFromArray(COMMENTS));
  return comments;
};

var generatePictureData = function (i) {
  return {
    id: i,
    url: 'photos/' + i + '.jpg',
    likes: generateRandomNumber(MIN_LIKES, MAX_LIKES),
    comments: generateComments(i % 2),
    description: getRandomElementFromArray(DESCRIPTIONS)
  };
};

var generatePictureElement = function (data, template) {
  template.querySelector('.picture__img').dataset.id = data.id;
  template.querySelector('.picture__img').setAttribute('src', data.url);
  template.querySelector('.picture__likes').textContent = data.likes;
  template.querySelector('.picture__comments').textContent = data.comments.length;

  return template;
};

var onBigPictureEscKeydown = function (evt) {
  if (evt.key === KEY_ESC) {
    closeBigPicture();
  }
};

var openBigPicture = function () {
  bigPicture.classList.remove('hidden');

  document.addEventListener('keydown', onBigPictureEscKeydown);
};
var closeBigPicture = function () {
  bigPicture.classList.add('hidden');

  document.removeEventListener('keydown', onBigPictureEscKeydown);
};

for (var i = 1; i <= 25; i++) {
  photos.push(generatePictureData(i));
}
for (var j = 0; j <= 24; j++) {
  randomPhotosFragment.appendChild(generatePictureElement(photos[j], randomPhotoTemplate.cloneNode(true)));
}
usersPicturesContainer.appendChild(randomPhotosFragment);

var renderBigPicture = function (id) {
  bigPictureImg.setAttribute('src', photos[id]['url']);
  bigPictureLikesCount.textContent = photos[id]['likes'];
  bigPictureCommentsCount.textContent = photos[id]['comments'].length;
  bigPictureCaption.textContent = photos[id]['description'];

  for (var k = 0; k < photos[id]['comments'].length; k++) {
    var commentTemplate = bigPictureCommentTemplate.cloneNode(true);
    commentTemplate.querySelector('.social__picture').setAttribute('src', 'img/avatar-' + generateRandomNumber(1, 6) + '.svg');
    commentTemplate.querySelector('.social__text').textContent = photos[0]['comments'][k];
    bigPictureCommentsFragment.appendChild(commentTemplate);
  }
  bigPictureSocialCommentsBlock.textContent = '';
  bigPictureSocialCommentsBlock.appendChild(bigPictureCommentsFragment);
  openBigPicture();
};

bigPictureSocialCommentsCountBlock.classList.add('visually-hidden');
bigPictureCommentsLoaderButton.classList.add('visually-hidden');
usersPicturesContainer.addEventListener('click', function (evt) {
  if (evt.target.classList.contains('picture')) {
    evt.preventDefault();
    renderBigPicture(evt.target.dataset.id - 1);
  }
});

bigPictureCloseButton.addEventListener('click', function () {
  closeBigPicture();
});

var uploadPictureInput = document.querySelector('#upload-file');
var openUserEditorPopup = function () {
  userPictureEditorBlock.classList.remove('hidden');

  document.addEventListener('keydown', onEditorPopupEscKeydown);
};
var closeUserEditorPopup = function () {
  userPictureEditorBlock.classList.add('hidden');
  uploadPictureInput.value = '';

  document.removeEventListener('keydown', onEditorPopupEscKeydown);
};
var onEditorPopupEscKeydown = function (evt) {
  if (evt.key === KEY_ESC) {
    closeUserEditorPopup();
  }
};
uploadPictureInput.addEventListener('change', function () {
  openUserEditorPopup();
});

var editorPin = userPictureEditorBlock.querySelector('.effect-level__pin');
editorPin.addEventListener('mouseup', function () {

});
