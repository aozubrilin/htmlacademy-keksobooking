'use strict';

(function () {

  var PIN_MAIN_GAP_X = 62 / 2;
  var PIN_MAIN_GAP_Y = 62 / 2;
  var PIN_MAIN_GAP_AFTER_Y = 84;

  var setFormFieldsDisable = window.util.setFormFieldsDisable;
  var setAdFormAddress = window.form.setAdFormAddress;
  var renderPins = window.pin.renderPins;

  var map = document.querySelector('.map');
  var mapFilterForm = map.querySelector('.map__filters');
  var mapFilters = mapFilterForm.querySelectorAll('.map__filter');
  var mapFeatures = mapFilterForm.querySelector('.map__features');


  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    map.appendChild(node);
  };

  var successHandler = function (announcements) {
    window.pin.announcements = announcements;
    renderPins(announcements);
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
    window.backend.load(successHandler, errorHandler);
  };

  setMapDisable();

  window.map = {
    setMapEnable: setMapEnable,
  };

})();


