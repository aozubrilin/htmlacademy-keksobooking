'use strict';

(function () {

  var PIN_GAP_X = 50 / 2;
  var PIN_GAP_Y = 70;

  var isEnterEvent = window.util.isEnterEvent;
  var isMouseLeftButtonClick = window.util.isMouseLeftButtonClick;
  var renderCard = window.card.renderCard;

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

  var renderPins = function (announcements) {

    var fragment = document.createDocumentFragment();
    for (var index = 0; index < announcements.length; index++) {
      fragment.appendChild(createPin(announcements[index], index));
    }

    similarPins.appendChild(fragment);

    similarPins.addEventListener('mousedown', onMapPinClickHandle);
    similarPins.addEventListener('keydown', onMapPinPressEnter);
  };

  var getMapPinId = function (evt) {

    var mapPin = evt.target.closest('.map__pin:not(.map__pin--main)');

    if (mapPin && mapPin.dataset.offerId !== null) {
      var mapPinId = mapPin.dataset.offerId;
    }
    return mapPinId;
  };

  var onMapPinClickHandle = function (evt) {
    if (isMouseLeftButtonClick(evt)) {
      renderCard(getMapPinId(evt));
    }
  };

  var onMapPinPressEnter = function (evt) {
    if (isEnterEvent(evt)) {
      renderCard(getMapPinId(evt));
    }
  };

  window.pin = {
    renderPins: renderPins
  };

})();
