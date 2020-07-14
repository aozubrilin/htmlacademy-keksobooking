'use strict';

(function () {

  var PIN_MAIN_GAP_X = 62 / 2;
  var PIN_MAIN_GAP_Y = 62 / 2;
  var PIN_MAIN_GAP_AFTER_Y = 84;
  var PIN_MAIN_STYLES = {
    left: '570px',
    top: '375px'
  };

  var ERROR_MESSAGE_STYLES = {
    util: 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;',
    position: 'absolute',
    left: 0,
    top: 0,
    fontSize: '35px'
  };

  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = ERROR_MESSAGE_STYLES.util;
    node.style.position = ERROR_MESSAGE_STYLES.position;
    node.style.left = ERROR_MESSAGE_STYLES.left;
    node.style.right = ERROR_MESSAGE_STYLES.right;
    node.style.fontSize = ERROR_MESSAGE_STYLES.fontSize;

    node.textContent = errorMessage;
    map.appendChild(node);
  };

  var successHandler = function (announcements) {
    window.pin.announcements = announcements;
    window.filter.setFilters();
  };

  var setMapDisable = function () {
    map.classList.add('map--faded');
    window.form.setDisable();
    window.filter.setDisable();
    window.mainPinClick = false;
    window.loadPhotos.setDisable();
    mapPinMain.style.left = PIN_MAIN_STYLES.left;
    mapPinMain.style.top = PIN_MAIN_STYLES.top;
    window.form.setAddress(PIN_MAIN_GAP_X, PIN_MAIN_GAP_Y);
    window.pin.remove();
    window.card.deleteMapPopup();
  };

  var setMapEnable = function () {
    map.classList.remove('map--faded');
    window.filter.setEnable();
    window.form.setEnable();
    window.form.setAddress(PIN_MAIN_GAP_X, PIN_MAIN_GAP_AFTER_Y);
    window.backend.load(successHandler, errorHandler);
  };

  setMapDisable();

  window.map = {
    setDisable: setMapDisable,
    setEnable: setMapEnable
  };

})();


