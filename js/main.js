'use strict';

var TYPES = ['place', 'flat', 'house', 'bungalo'];
var TIMES_CHECK = ['12:00', '13:00', '14:00'];
var FEATURES_LIST = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var ANNOUNCEMENTS_QUANTITY = 8;

var getRandomInteger = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

var getRandomElement = function (array) {
  return array[getRandomInteger(0, array.length - 1)];
};

var getRandomElements = function (array) {
  var elements = [];
  for (var i = 0; i < getRandomInteger(1, array.length - 1); i++) {
    elements.push(getRandomElement(array));
  }

  return elements;
};

var createAnnouncements = function (AnnouncementsQuantity) {
  var AnnouncementList = [];

  for (var i = 0; i < AnnouncementsQuantity; i++) {
    var announcement = {};
    announcement['author'] = {
      avatar: 'img/avatars/user0' + (i + 1) + '.png'
    };

    announcement['offer'] = {
      title: 'Предложение номер ' + i,
      address: location.x + ', ' + location.y,
      price: getRandomInteger(0, 1000000),
      type: getRandomElement(TYPES),
      rooms: getRandomInteger(1, 5),
      guests: getRandomInteger(1, 5),
      checkin: getRandomElement(TIMES_CHECK),
      checkout: getRandomElement(TIMES_CHECK),
      features: getRandomElements(FEATURES_LIST),
      description: 'Описание предложения номер ' + i,
      photos: getRandomElements(PHOTOS)
    };

    announcement['location'] = {
      x: getRandomInteger(50, 1150),
      y: getRandomInteger(130, 630)
    };
    AnnouncementList.push(announcement);
  }

  return AnnouncementList;
};

var announcements = createAnnouncements(ANNOUNCEMENTS_QUANTITY);

var map = document.querySelector('.map');
map.classList.toggle('map--faded');

var renderPin = function (announcement) {
  var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pin = similarPinTemplate.cloneNode(true);

  pin.style.left = announcement.location.x - 25 + 'px';
  pin.style.top = announcement.location.y - 70 + 'px';
  pin.querySelector('img').src = announcement.author.avatar;
  pin.querySelector('img').alt = announcement.offer.title;

  return pin;
};

var renderPins = function () {

  var similarPins = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < announcements.length - 1; i++) {
    fragment.appendChild(renderPin(announcements[i]));
  }

  similarPins.appendChild(fragment);
};

renderPins();
