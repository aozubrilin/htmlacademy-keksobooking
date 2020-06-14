'use strict';

var TYPES = ['place', 'flat', 'house', 'bungalo'];
var TIMES_CHECK = ['12:00', '13:00', '14:00'];
var FEATURES_LIST = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var OBJECT_QUANTITY = 8;
var TYPES_RU = ['Дворец', 'Квартира', 'Дом', 'Бунгало'];
var MOUSE_LEFT_BUTTON_CODE = 0;
var ENTER_CODE = 13;
var PIN_MAIN_GAP_X = 65 / 2;
var PIN_MAIN_GAP_Y = 65 / 2;
var PIN_MAIN_GAP_AFTER_Y = 80;

var AD_FORM_ACTION = 'https://javascript.pages.academy/keksobooking';
var FORMATS_IMG = 'image/png, image/jpeg';
var TITLE_MIN_LENGTH = 30;
var TITLE_MAX_LENGTH = 100;
var PRICE_MAX_VALUE = 1000000;

var PRICE_MIN_VALUE = {
  'bungalo': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000
};

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

var cardFragment = document.createDocumentFragment();
var similarCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var filtersContainer = document.querySelector('.map__filters-container');

var checkingData = function (element, data, text) {
  if (!data) {
    element.style.display = 'none';
  } else {
    element.textContent = text;
  }
};

var translateOfferType = function (enWord) {
  var ruWord = '';

  for (var i = 0; i < TYPES_RU.length; i++) {
    if (TYPES[i] === enWord) {
      ruWord = TYPES_RU[i];
    }
  }
  return ruWord;
};

var addsFeatures = function (featuresElement, dataArr) {
  featuresElement.innerHTML = '';

  if (dataArr.length === 0) {
    featuresElement.style.display = 'none';
  } else {
    for (var i = 0; i < dataArr.length; i++) {
      var li = document.createElement('li');
      li.classList.add('popup__feature', 'popup__feature--' + dataArr[i]);
      featuresElement.appendChild(li);
    }
  }
};

var addsPhotos = function (photosElement, dataArr) {
  photosElement.innerHTML = '';

  if (dataArr.length === 0) {
    photosElement.style.display = 'none';
  } else {
    for (var i = 0; i < dataArr.length; i++) {
      var img = document.createElement('img');
      img.classList.add('popup__photo');
      img.src = dataArr[i];
      img.width = '45';
      img.height = '40';
      photosElement.appendChild(img);
    }
  }
};

var renderCard = function (announcement) {
  var cardElement = similarCardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__avatar').src = announcement.author.avatar;
  checkingData(cardElement.querySelector('.popup__title'), announcement.offer.title, announcement.offer.title);
  checkingData(cardElement.querySelector('.popup__text--address'), announcement.offer.address, announcement.offer.address);
  checkingData(cardElement.querySelector('.popup__text--price'), announcement.offer.price, announcement.offer.price + '₽/ночь');
  checkingData(cardElement.querySelector('.popup__type'), announcement.offer.type, translateOfferType(announcement.offer.type));
  checkingData(cardElement.querySelector('.popup__text--capacity'), announcement.offer.rooms, announcement.offer.rooms + ' комнаты для ' + announcement.offer.guests + ' гостей.');
  checkingData(cardElement.querySelector('.popup__text--time'), announcement.offer.checkin, 'Заезд после ' + announcement.offer.checkin + ', выезд до ' + announcement.offer.checkout);
  checkingData(cardElement.querySelector('.popup__description'), announcement.offer.description, announcement.offer.description);
  addsFeatures(cardElement.querySelector('.popup__features'), announcement.offer.features);
  addsPhotos(cardElement.querySelector('.popup__photos'), announcement.offer.photos);

  return cardElement;
};

cardFragment.appendChild(renderCard(announcements[0]));
// map.insertBefore(cardFragment, filtersContainer);

var mapPinMain = document.querySelector('.map__pin--main');
var mapFilterForm = document.querySelector('.map__filters');
var mapFilters = mapFilterForm.querySelectorAll('.map__filter');
var mapFeatures = mapFilterForm.querySelector('.map__features');

var adForm = document.querySelector('.ad-form');
var adFormFields = adForm.querySelectorAll('fieldset');
var adFormAddress = document.querySelector('#address');

adFormAddress.readOnly = true;

var setFormFieldsDisable = function (fields, value) {
  fields.forEach(function (field) {
    field.disabled = value;
  });
};

var setAdFormAddress = function (valueX, valueY) {
  var pinX = Math.round(parseInt(mapPinMain.style.left, 10) + valueX);
  var pinY = Math.round(parseInt(mapPinMain.style.top, 10) + valueY);
  adFormAddress.value = pinX + ', ' + pinY;
};


var setMapDisable = function () {
  map.classList.add('map--faded');
  mapFilterForm.classList.add('ad-form--disabled');
  mapFeatures.disabled = true;
  setFormFieldsDisable(mapFilters, true);
  setAdFormAddress(PIN_MAIN_GAP_X, PIN_MAIN_GAP_Y);
};

var setMapEnable = function () {
  map.classList.remove('map--faded');
  mapFilterForm.classList.remove('ad-form--disabled');
  mapFeatures.disabled = false;
  setFormFieldsDisable(mapFilters, false);
  setAdFormAddress(PIN_MAIN_GAP_X, PIN_MAIN_GAP_AFTER_Y);
  renderPins();
};

var setAdFormDisable = function () {
  adForm.classList.add('ad-form--disabled');
  setFormFieldsDisable(adFormFields, true);
};

var setAdFormEnable = function () {
  adForm.classList.remove('ad-form--disabled');
  setFormFieldsDisable(adFormFields, false);
};


var onMapPinMainClickHandle = function (evt) {
  if (evt.button === MOUSE_LEFT_BUTTON_CODE) {
    setAdFormEnable();
    setMapEnable();
  }
};

var onMapPinMainPressEnter = function (evt) {
  if (evt.keyCode === ENTER_CODE) {
    setAdFormEnable();
    setMapEnable();
  }
};

setAdFormDisable();
setMapDisable();


mapPinMain.addEventListener('mousedown', onMapPinMainClickHandle);
mapPinMain.addEventListener('keydown', onMapPinMainPressEnter);

var adFormRoomNumber = adForm.querySelector('#room_number');
var adFormCapacity = adForm.querySelector('#capacity');
var adFormCapacityOptions = adFormCapacity.querySelectorAll('option');

var adFormTitle = adForm.querySelector('#title');

var adFormPrice = adForm.querySelector('#price');
var adFormType = adForm.querySelector('#type');

var adFormTimeIn = adForm.querySelector('#timein');
var adFormTimeOut = adForm.querySelector('#timeout');
var adFormTimefieldset = adForm.querySelector('.ad-form__element--time');

var adFormImages = adForm.querySelectorAll('input[type="file"]');

var capacityMapping = {

  '1': {
    value: 1,
    items: [2]
  },
  '2': {
    value: 2,
    items: [1, 2]
  },
  '3': {
    value: 3,
    items: [0, 1, 2]
  },
  '100': {
    value: 0,
    items: [3]
  }
};


var setAdFormFields = function () {

  adForm.action = AD_FORM_ACTION;
  adFormAddress.readOnly = true;

  adFormPrice.required = true;
  adFormPrice.placeholder = 1000;
  adFormPrice.max = PRICE_MAX_VALUE;

  adFormTitle.maxLength = TITLE_MAX_LENGTH;
  adFormTitle.minLength = TITLE_MIN_LENGTH;
  adFormTitle.required = true;

  adFormImages.forEach(function (field) {
    field.accept = FORMATS_IMG;
  });

};

function onGuestInputChange() {
  setAllOptions(adFormCapacityOptions.length);
  capacityMapping[adFormRoomNumber.value].items.forEach(function (item) {
    adFormCapacityOptions[item].disabled = false;
  });
  adFormCapacity.value = capacityMapping[adFormRoomNumber.value].value;
}

function setAllOptions(count) {
  for (var i = 0; i < count; i++) {
    adFormCapacityOptions[i].disabled = true;
    if (adFormCapacityOptions[i].selected === true) {
      adFormCapacityOptions[i].removeAttribute('selected');
    }
  }
}

var onCheckTitleValidity = function () {

  var validity = adFormTitle.validity;
  var valueLength = adFormTitle.value.length;

  if (validity.tooShort) {
    adFormTitle.setCustomValidity('Ещё ' + (TITLE_MIN_LENGTH - valueLength) + ' симв.');
  } else if (validity.tooLong) {
    adFormTitle.setCustomValidity('Удалите лишние ' + (valueLength - TITLE_MAX_LENGTH) + ' симв.');
  } else if (validity.valueMissing) {
    adFormTitle.setCustomValidity('Обязательное поле');
  } else {
    adFormTitle.setCustomValidity('');
  }
};

var onCheckPriceValidity = function () {

  adFormPrice.min = PRICE_MIN_VALUE[adFormType.value];
  var minPriceType = adFormPrice.min;
  var validity = adFormPrice.validity;

  if (validity.rangeUnderflow) {
    adFormPrice.setCustomValidity('Минимальная цена на этот тип жилья составляет ' + minPriceType + 'руб.');
  } else if (validity.rangeOverflow) {
    adFormPrice.setCustomValidity('Превышена максимальная цена');
  } else if (validity.valueMissing) {
    adFormPrice.setCustomValidity('Обязательное поле');
  } else {
    adFormPrice.setCustomValidity('');
  }
};

var onTimeSync = function (evt) {
  if (evt.target === adFormTimeIn) {
    adFormTimeOut.value = adFormTimeIn.value;
  } else {
    adFormTimeIn.value = adFormTimeOut.value;
  }
};

setAdFormFields();
adFormRoomNumber.addEventListener('change', onGuestInputChange);
onGuestInputChange();
adFormTitle.addEventListener('input', onCheckTitleValidity);
adFormType.addEventListener('change', onCheckPriceValidity);
adFormPrice.addEventListener('input', onCheckPriceValidity);
adFormTimefieldset.addEventListener('change', onTimeSync);


