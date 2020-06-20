'use strict';

(function () {

  var TYPES = ['place', 'flat', 'house', 'bungalo'];
  var TIMES_CHECK = ['12:00', '13:00', '14:00'];
  var FEATURES_LIST = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var OBJECT_QUANTITY = 8;

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

  var createAnnouncements = function () {
    var announcementLists = [];

    for (var i = 0; i < OBJECT_QUANTITY; i++) {
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

  window.data = {
    createAnnouncements: createAnnouncements,
    TYPES: TYPES,
  };

})();