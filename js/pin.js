'use strict';

(function () {

  var PIN_GAP_X = 50 / 2;
  var PIN_GAP_Y = 70;

  var isEnterEvent = window.util.isEnterEvent;
  var isMouseLeftButtonClick = window.util.isMouseLeftButtonClick;
  var renderCard = window.card.render;

  var similarPins = document.querySelector('.map__pins');
  var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var createPin = function (announcement, offerId) {

    var pin = similarPinTemplate.cloneNode(true);
    var image = pin.querySelector('img');

    pin.style.left = announcement.location.x - PIN_GAP_X + 'px';
    pin.style.top = announcement.location.y - PIN_GAP_Y + 'px';
    image.src = announcement.author.avatar;
    image.alt = announcement.offer.title;

    pin.dataset.offerId = offerId;

    return pin;
  };

  var removePins = function () {
    var pins = similarPins.querySelectorAll('.map__pin:not(.map__pin--main)');

    pins.forEach(function (item) {
      item.remove();
    });

    similarPins.removeEventListener('mousedown', onMapPinClickHandle);
    similarPins.removeEventListener('keydown', onMapPinPressEnter);
  };

  var renderPins = function (announcements) {
    removePins();
    var fragment = document.createDocumentFragment();

    announcements.forEach(function (announcement) {
      var pin = createPin(window.pin.announcements[announcement], announcement);
      fragment.appendChild(pin);
    });

    similarPins.appendChild(fragment);

    similarPins.addEventListener('mousedown', onMapPinClickHandle);
    similarPins.addEventListener('keydown', onMapPinPressEnter);
  };

  var showCardforPinId = function (evt) {
    var mapPin = evt.target.closest('.map__pin:not(.map__pin--main)');
    if (mapPin !== null && !mapPin.classList.contains('map__pin--active')) {
      var mapPinId = mapPin.dataset.offerId;
      renderCard(mapPinId);
      mapPin.classList.add('map__pin--active');
    }
  };

  var onMapPinClickHandle = function (evt) {
    if (isMouseLeftButtonClick(evt)) {
      showCardforPinId(evt);
    }
  };

  var onMapPinPressEnter = function (evt) {
    if (isEnterEvent(evt)) {
      showCardforPinId(evt);
    }
  };

  window.pin = {
    render: renderPins,
    create: createPin,
    remove: removePins
  };

})();
