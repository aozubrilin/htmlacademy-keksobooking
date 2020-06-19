'use strict';

(function () {

  var setAdFormEnable = window.form.setAdFormEnable;
  var setMapEnable = window.map.setMapEnable;
  var isMouseLeftButtonClick = window.util.isMouseLeftButtonClick;
  var isEnterEvent = window.util.isEnterEvent;

  var mapPinMain = document.querySelector('.map__pin--main');

  var onMapPinMainClickHandle = function (evt) {
    if (isMouseLeftButtonClick(evt)) {
      setAdFormEnable();
      setMapEnable();
    }
  };

  var onMapPinMainPressEnter = function (evt) {
    if (isEnterEvent(evt)) {
      setAdFormEnable();
      setMapEnable();
    }
  };

  mapPinMain.addEventListener('mousedown', onMapPinMainClickHandle);
  mapPinMain.addEventListener('keydown', onMapPinMainPressEnter);

})();
