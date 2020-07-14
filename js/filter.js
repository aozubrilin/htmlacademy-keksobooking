'use strict';

(function () {
  var DEFAULT_FILTER_VALUE = 'any';
  var COUNT_PINS = 5;

  var setFormFieldsDisable = window.util.setFormFieldsDisable;

  var mapFilterForm = document.querySelector('.map__filters');
  var mapFilters = mapFilterForm.querySelectorAll('.map__filter');
  var mapFeatures = mapFilterForm.querySelector('.map__features');
  var housingType = mapFilterForm.querySelector('#housing-type');
  var housingPrice = mapFilterForm.querySelector('#housing-price');
  var housingRooms = mapFilterForm.querySelector('#housing-rooms');
  var housingGuests = mapFilterForm.querySelector('#housing-guests');

  var priceRange = {
    'low': {
      from: 0,
      to: 9999,
    },
    'middle': {
      from: 10000,
      to: 50000,
    },
    'high': {
      from: 50001,
      to: 10000000,
    }
  };

  var filterByFeatures = function (announcement) {
    var announcementFeatures = announcement.offer.features;
    var features = mapFeatures.querySelectorAll('input:checked');

    var checkedValues = Array.from(features).map(function (feature) {
      return feature.value;
    });

    return checkedValues.every(function (checkedValue) {
      return announcementFeatures.includes(checkedValue);
    });
  };

  var filterByGuests = function (announcement) {
    return housingGuests.value === DEFAULT_FILTER_VALUE
      || parseInt(housingGuests.value, 10) === announcement.offer.guests;
  };

  var filterByRooms = function (announcement) {
    return housingRooms.value === DEFAULT_FILTER_VALUE
      || parseInt(housingRooms.value, 10) === announcement.offer.rooms;
  };

  var filterByPrice = function (announcement) {
    return housingPrice.value === DEFAULT_FILTER_VALUE
      || announcement.offer.price >= priceRange[housingPrice.value].from
      && announcement.offer.price <= priceRange[housingPrice.value].to;
  };

  var filterByType = function (announcement) {
    return housingType.value === DEFAULT_FILTER_VALUE
      || housingType.value === announcement.offer.type;
  };

  var setFilters = function () {
    window.card.deleteMapPopup();
    var announcements = [];
    for (var index = 0; index < window.pin.announcements.length; index++) {
      var announcement = window.pin.announcements[index];
      if (filterByType(announcement) && filterByPrice(announcement)
        && filterByRooms(announcement) && filterByGuests(announcement)
         && filterByFeatures(announcement)) {
        announcements.push(index);
      }
      if (announcements.length === COUNT_PINS) {
        break;
      }
    }
    window.pin.render(announcements);
  };

  var setDisable = function () {
    mapFilterForm.classList.add('ad-form--disabled');
    mapFeatures.disabled = true;
    mapFilterForm.reset();
    setFormFieldsDisable(mapFilters, true);
    mapFilterForm.removeEventListener('change', setFilters);
  };

  var setEnable = function () {
    mapFilterForm.classList.remove('ad-form--disabled');
    mapFeatures.disabled = false;
    setFormFieldsDisable(mapFilters, false);
    mapFilterForm.addEventListener('change', window.debounce(setFilters));
  };

  window.filter = {
    setFilters: setFilters,
    setDisable: setDisable,
    setEnable: setEnable,
  };

})();
