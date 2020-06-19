'use strict';

(function () {

  var PIN_MAIN_GAP_X = 65 / 2;
  var PIN_MAIN_GAP_Y = 65 / 2;
  var PIN_MAIN_GAP_AFTER_Y = 80;

  var setFormFieldsDisable = window.util.setFormFieldsDisable;
  var setAdFormAddress = window.form.setAdFormAddress;
  var renderPins = window.pin.renderPins;

  var map = document.querySelector('.map');
  var mapFilterForm = map.querySelector('.map__filters');
  var mapFilters = mapFilterForm.querySelectorAll('.map__filter');
  var mapFeatures = mapFilterForm.querySelector('.map__features');

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

  setMapDisable();

  window.map = {
    setMapEnable: setMapEnable,
  };

})();


