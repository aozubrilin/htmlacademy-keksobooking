'use strict';

(function () {

  var TYPES_RU = ['Дворец', 'Квартира', 'Дом', 'Бунгало'];

  var types = window.data.TYPES;
  var announcements = window.data.createAnnouncements();
  var isEscEvent = window.util.isEscEvent;
  var isEnterEvent = window.util.isEnterEvent;
  var isMouseLeftButtonClick = window.util.isMouseLeftButtonClick;

  var map = document.querySelector('.map');
  var filtersContainer = document.querySelector('.map__filters-container');
  var cardFragment = document.createDocumentFragment();
  var similarCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var cardElement = similarCardTemplate.cloneNode(true);
  var popupClose = cardElement.querySelector('.popup__close');

  var renderCard = function (offerId) {

    if (offerId === undefined) {
      return;
    }

    deleteMapCardPopup();

    var announcement = announcements[offerId];

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

    cardElement.appendChild(popupClose);
    cardFragment.appendChild(cardElement);
    map.insertBefore(cardFragment, filtersContainer);

    popupClose.addEventListener('mousedown', onPopupCloseMousedown);
    popupClose.addEventListener('keydown', onPopupClosePressEnter);
    map.addEventListener('keydown', onPopupClosePressEsc);
  };

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
      if (types[i] === enWord) {
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

  var deleteMapCardPopup = function () {
    var mapCard = map.querySelector('.map__card');

    if (mapCard !== null) {
      mapCard.remove();

      popupClose.removeEventListener('mousedown', onPopupCloseMousedown);
      popupClose.removeEventListener('keydown', onPopupClosePressEnter);
      map.removeEventListener('keydown', onPopupClosePressEsc);
    }

  };

  var onPopupCloseMousedown = function (evt) {
    if (isMouseLeftButtonClick(evt)) {
      deleteMapCardPopup();
    }
  };

  var onPopupClosePressEnter = function (evt) {
    if (isEnterEvent(evt)) {
      deleteMapCardPopup();
    }
  };

  var onPopupClosePressEsc = function (evt) {
    if (isEscEvent(evt)) {
      deleteMapCardPopup();
    }
  };

  window.card = {
    renderCard: renderCard,
    announcements: announcements,
  };

})();
