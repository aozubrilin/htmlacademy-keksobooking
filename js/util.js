'use strict';

window.util = (function () {

  var MOUSE_LEFT_BUTTON_KEYCODE = 0;
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;

  return {

    isEscEvent: function (evt) {
      return evt.keyCode === ESC_KEYCODE;
    },
    isEnterEvent: function (evt) {
      return evt.keyCode === ENTER_KEYCODE;
    },
    isMouseLeftButtonClick: function (evt) {
      return evt.button === MOUSE_LEFT_BUTTON_KEYCODE;
    },
    setFormFieldsDisable: function (fields, value) {
      fields.forEach(function (field) {
        field.disabled = value;
      });
    },
  };

})();
