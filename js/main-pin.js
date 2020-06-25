'use strict';

(function () {

  var PIN_MAIN_GAP_X = 62 / 2;
  var PIN_MAIN_GAP_AFTER_Y = 84;
  var PIN_LEFT_MIN = 0;
  var PIN_TOP_MIN = 130;
  var PIN_TOP_MAX = 630;

  var setAdFormEnable = window.form.setAdFormEnable;
  var setMapEnable = window.map.setMapEnable;
  var isMouseLeftButtonClick = window.util.isMouseLeftButtonClick;
  var isEnterEvent = window.util.isEnterEvent;
  var setAdFormAddress = window.form.setAdFormAddress;

  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var pinLeftMax = map.offsetWidth;

  window.mainPinClick = false;

  var onMapPinMainClickHandle = function (evt) {

    if (isMouseLeftButtonClick(evt) && !window.mainPinClick) {
      setAdFormEnable();
      setMapEnable();

      window.mainPinClick = true;
    }

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var pinTop = mapPinMain.offsetTop - shift.y;
      var pinLeft = mapPinMain.offsetLeft - shift.x;

      if (pinTop < PIN_TOP_MIN - PIN_MAIN_GAP_AFTER_Y) {
        pinTop = PIN_TOP_MIN - PIN_MAIN_GAP_AFTER_Y;
      } else if (pinTop > PIN_TOP_MAX - PIN_MAIN_GAP_AFTER_Y) {
        pinTop = PIN_TOP_MAX - PIN_MAIN_GAP_AFTER_Y;
      }

      if (pinLeft < PIN_LEFT_MIN - PIN_MAIN_GAP_X) {
        pinLeft = PIN_LEFT_MIN - PIN_MAIN_GAP_X;
      } else if (pinLeft > pinLeftMax - PIN_MAIN_GAP_X) {
        pinLeft = pinLeftMax - PIN_MAIN_GAP_X;
      }

      mapPinMain.style.top = pinTop + 'px';
      mapPinMain.style.left = pinLeft + 'px';

      setAdFormAddress(PIN_MAIN_GAP_X, PIN_MAIN_GAP_AFTER_Y);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          mapPinMain.removeEventListener('click', onClickPreventDefault);
        };
        mapPinMain.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

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
