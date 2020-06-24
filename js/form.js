'use strict';

(function () {

  var FORMATS_IMG = 'image/png, image/jpeg';
  var TITLE_MIN_LENGTH = 30;
  var TITLE_MAX_LENGTH = 100;
  var PRICE_MAX_VALUE = 1000000;

  var PRICE_MIN_VALUE = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  var setFormFieldsDisable = window.util.setFormFieldsDisable;
  var isEscEvent = window.util.isEscEvent;
  var isMouseLeftButtonClick = window.util.isMouseLeftButtonClick;

  var adForm = document.querySelector('.ad-form');
  var adFormAddress = document.querySelector('#address');
  var adFormRoomNumber = adForm.querySelector('#room_number');
  var adFormCapacity = adForm.querySelector('#capacity');
  var adFormCapacityOptions = adFormCapacity.querySelectorAll('option');
  var adFormTitle = adForm.querySelector('#title');
  var adFormPrice = adForm.querySelector('#price');
  var adFormType = adForm.querySelector('#type');
  var adFormTimeIn = adForm.querySelector('#timein');
  var adFormTimeOut = adForm.querySelector('#timeout');
  var adFormTimefieldset = adForm.querySelector('.ad-form__element--time');
  var adFormFields = adForm.querySelectorAll('fieldset');
  var adFormImages = adForm.querySelectorAll('input[type="file"]');
  var adFormResetBtn = adForm.querySelector('.ad-form__reset');
  var mapPinMain = document.querySelector('.map__pin--main');
  var main = document.querySelector('main');

  var capacityMapping = {

    '1': {
      value: 1,
      items: [2]
    },
    '2': {
      value: 2,
      items: [1, 2]
    },
    '3': {
      value: 3,
      items: [0, 1, 2]
    },
    '100': {
      value: 0,
      items: [3]
    }
  };

  var setAdFormFields = function () {

    adFormAddress.readOnly = true;

    adFormPrice.required = true;
    adFormPrice.placeholder = 1000;
    adFormPrice.max = PRICE_MAX_VALUE;

    adFormTitle.maxLength = TITLE_MAX_LENGTH;
    adFormTitle.minLength = TITLE_MIN_LENGTH;
    adFormTitle.required = true;

    adFormImages.forEach(function (field) {
      field.accept = FORMATS_IMG;
    });
  };

  function onGuestInputChange() {
    setAllOptions(adFormCapacityOptions.length);
    capacityMapping[adFormRoomNumber.value].items.forEach(function (item) {
      adFormCapacityOptions[item].disabled = false;
    });
    adFormCapacity.value = capacityMapping[adFormRoomNumber.value].value;
  }

  function setAllOptions(count) {
    for (var i = 0; i < count; i++) {
      adFormCapacityOptions[i].disabled = true;
      if (adFormCapacityOptions[i].selected === true) {
        adFormCapacityOptions[i].removeAttribute('selected');
      }
    }
  }

  var onCheckTitleValidity = function () {

    var validity = adFormTitle.validity;
    var valueLength = adFormTitle.value.length;

    if (validity.tooShort) {
      adFormTitle.setCustomValidity('Ещё ' + (TITLE_MIN_LENGTH - valueLength) + ' симв.');
    } else if (validity.tooLong) {
      adFormTitle.setCustomValidity('Удалите лишние ' + (valueLength - TITLE_MAX_LENGTH) + ' симв.');
    } else if (validity.valueMissing) {
      adFormTitle.setCustomValidity('Обязательное поле');
    } else {
      adFormTitle.setCustomValidity('');
    }
  };

  var onCheckPriceValidity = function () {

    adFormPrice.min = PRICE_MIN_VALUE[adFormType.value];
    var minPriceType = adFormPrice.min;
    var validity = adFormPrice.validity;

    if (validity.rangeUnderflow) {
      adFormPrice.setCustomValidity('Минимальная цена на этот тип жилья составляет ' + minPriceType + 'руб.');
    } else if (validity.rangeOverflow) {
      adFormPrice.setCustomValidity('Превышена максимальная цена');
    } else if (validity.valueMissing) {
      adFormPrice.setCustomValidity('Обязательное поле');
    } else {
      adFormPrice.setCustomValidity('');
    }
  };

  var setAdFormAddress = function (valueX, valueY) {
    var pinX = Math.round(parseInt(mapPinMain.style.left, 10) + valueX);
    var pinY = Math.round(parseInt(mapPinMain.style.top, 10) + valueY);
    adFormAddress.value = pinX + ', ' + pinY;
  };

  var onTimeSync = function (evt) {
    if (evt.target === adFormTimeIn) {
      adFormTimeOut.value = adFormTimeIn.value;
    } else {
      adFormTimeIn.value = adFormTimeOut.value;
    }
  };

  var setAdFormDisable = function () {
    adForm.classList.add('ad-form--disabled');
    setFormFieldsDisable(adFormFields, true);
  };

  var setAdFormEnable = function () {
    adForm.classList.remove('ad-form--disabled');
    setFormFieldsDisable(adFormFields, false);
  };

  var submitHandler = function (evt) {
    window.backend.save(new FormData(adForm), function () {
      var successTemplate = document.querySelector('#success').content.querySelector('.success');
      var success = successTemplate.cloneNode(true);
      main.appendChild(success);
      window.map.setMapDisable();

      var onSuccessClose = function (evtClose) {
        if (isMouseLeftButtonClick(evtClose) || isEscEvent(evtClose)) {
          main.removeChild(success);
        }

        main.removeEventListener('click', onSuccessClose);
        document.removeEventListener('keydown', onSuccessClose);
      };

      main.addEventListener('click', onSuccessClose);
      document.addEventListener('keydown', onSuccessClose);

    }, submitError);
    evt.preventDefault();
  };

  var submitError = function () {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var error = errorTemplate.cloneNode(true);
    main.appendChild(error);

    var onErrorClose = function (evtClose) {
      if (isMouseLeftButtonClick(evtClose) || isEscEvent(evtClose)) {
        main.removeChild(error);
      }

      main.removeEventListener('click', onErrorClose);
      document.removeEventListener('keydown', onErrorClose);
    };

    main.addEventListener('click', onErrorClose);
    document.addEventListener('keydown', onErrorClose);

  };

  var onResetFormClick = function (evt) {
    if (isMouseLeftButtonClick(evt)) {
      window.map.setMapDisable();
    }
    evt.preventDefault();
  };

  adFormResetBtn.addEventListener('click', onResetFormClick);

  setAdFormFields();
  adFormRoomNumber.addEventListener('change', onGuestInputChange);
  onGuestInputChange();
  adFormTitle.addEventListener('input', onCheckTitleValidity);
  adFormType.addEventListener('change', onCheckPriceValidity);
  adFormPrice.addEventListener('input', onCheckPriceValidity);
  adFormTimefieldset.addEventListener('change', onTimeSync);

  window.form = {
    setAdFormEnable: setAdFormEnable,
    setAdFormDisable: setAdFormDisable,
    setAdFormAddress: setAdFormAddress,
    submitHandler: submitHandler
  };

})();
