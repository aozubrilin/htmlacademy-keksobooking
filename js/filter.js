'use strict';

(function () {
  var DEFAULT_FILTER_VALUE = 'any';
  var COUNT_PINS = 5;

  var setFormFieldsDisable = window.util.setFormFieldsDisable;

  var mapFilterForm = document.querySelector('.map__filters');
  var mapFilters = document.querySelectorAll('.map__filter');
  var housingType = document.querySelector('#housing-type');


  var filterByType = function (announcements) {
    return housingType.value === DEFAULT_FILTER_VALUE
      || housingType.value === announcements.offer.type;
  };

  var setFilters = function () {
    window.card.deleteMapCardPopup();
    var announcements = [];
    var takeNumber = 0;
    if (window.pin.announcements.length > COUNT_PINS) {
      takeNumber = COUNT_PINS;
    } else {
      takeNumber = window.pin.announcements.length;
    }

    for (var index = 0; index < takeNumber; index++) {
      var announcement = window.pin.announcements[index];
      if (filterByType(announcement)) {
        announcements.push(index);
      }
    }

    window.pin.renderPins(announcements);
  };

  var setDisable = function () {
    setFormFieldsDisable(mapFilters, true);
    mapFilterForm.removeEventListener('change', setFilters);
  };

  var setEnable = function () {
    setFormFieldsDisable(mapFilters, false);
    mapFilterForm.addEventListener('change', setFilters);
  };


  window.filter = {
    setFilters: setFilters,
    setDisable: setDisable,
    setEnable: setEnable,
  };

})();
