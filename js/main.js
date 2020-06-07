'use strict';

var TYPES = ['place', 'flat', 'house', 'bungalo'];
var TIMES_CHECK = ['12:00', '13:00', '14:00'];
var FEATURES_LIST = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var OBJECT_QUANTITY = 8;
var TYPES_RU = ['Дворец', 'Квартира', 'Дом', 'Бунгало'];

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

var createAnnouncements = function (announcementsQuantity) {
  var announcementLists = [];

  for (var i = 0; i < announcementsQuantity; i++) {
    var announcement = {};
    announcement['author'] = {
      avatar: 'img/avatars/user0' + (i + 1) + '.png'
    };

    announcement['location'] = {
      x: getRandomInteger(0, 1200),
      y: getRandomInteger(130, 630)
    };

    announcement['offer'] = {
      title: 'Предложение номер ' + i,
      address: announcement.location.x + ', ' + announcement.location.y,
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

    announcementLists.push(announcement);
  }

  return announcementLists;
};

var announcements = createAnnouncements(OBJECT_QUANTITY);

var map = document.querySelector('.map');
map.classList.toggle('map--faded');

var renderPin = function (announcement) {
  var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pin = similarPinTemplate.cloneNode(true);
  var image = pin.querySelector('img');

  pin.style.left = announcement.location.x - 25 + 'px';
  pin.style.top = announcement.location.y - 70 + 'px';
  image.src = announcement.author.avatar;
  image.alt = announcement.offer.title;

  return pin;
};

var renderPins = function () {
  var similarPins = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < announcements.length; i++) {
    fragment.appendChild(renderPin(announcements[i]));
  }

  similarPins.appendChild(fragment);
};

renderPins();


var cardFragment = document.createDocumentFragment();
var similarCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var filtersContainer = document.querySelector('.map__filters-container');

var renderCard = function (announcement) {
  var cardElement = similarCardTemplate.cloneNode(true);
  var featuresElement = cardElement.querySelector('.popup__features');
  var photosElement = cardElement.querySelector('.popup__photos');


  var translateOfferType = function (enWord) {
    var ruWord = '';

    for (var i = 0; i < TYPES_RU.length; i++) {
      if (TYPES[i] === enWord) {
        ruWord = TYPES_RU[i];
      }
    }
    return ruWord;
  };

  var addsFeatures = function () {
    featuresElement.innerHTML = '';

    for (var i = 0; i < announcement.offer.features.length; i++) {
      var li = document.createElement('li');
      li.classList.add('popup__feature', 'popup__feature--' + announcement.offer.features[i]);
      featuresElement.appendChild(li);
    }
  };

  var addsPhotos = function () {
    photosElement.innerHTML = '';

    for (var i = 0; i < announcement.offer.photos.length; i++) {
      var img = document.createElement('img');
      img.classList.add('popup__photo');
      img.src = announcement.offer.photos[i];
      img.width = '45';
      img.height = '40';
      photosElement.appendChild(img);
    }
  };

  cardElement.querySelector('.popup__title').textContent = announcement.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = announcement.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = announcement.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = translateOfferType(announcement.offer.type);
  cardElement.querySelector('.popup__text--capacity').textContent = announcement.offer.rooms + ' комнаты для ' + announcement.offer.guests + ' гостей.';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + announcement.offer.checkin + ', выезд до ' + announcement.offer.checkout;
  cardElement.querySelector('.popup__description').textContent = announcement.offer.description;
  cardElement.querySelector('.popup__avatar').src = announcement.author.avatar;

  addsFeatures();
  addsPhotos();

  return cardElement;
};

cardFragment.appendChild(renderCard(announcements[0]));
map.insertBefore(cardFragment, filtersContainer);
