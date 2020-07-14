'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var DEFAULT_AVATAR = 'img/muffin-grey.svg';
  var stylesImage = {
    width: '70px',
    height: '70px',
    borderRadius: '5px'
  };

  var avatarChooser = document.querySelector('#avatar');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');

  var photoChooser = document.querySelector('#images');
  var photoPreview = document.querySelector('.ad-form__photo');

  var onLoadImage = function (evt) {
    var fileChooser = evt.target;
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        var result = reader.result;
        switch (fileChooser) {
          case avatarChooser:
            avatarPreview.src = result;
            break;
          case photoChooser:
            var imgElement = document.createElement('img');
            imgElement.src = result;
            imgElement.style.width = stylesImage.width;
            imgElement.style.height = stylesImage.height;
            imgElement.style.borderRadius = stylesImage.borderRadius;
            photoPreview.appendChild(imgElement);
            break;
        }
      });

      reader.readAsDataURL(file);
    }
  };

  var setEnable = function () {
    avatarChooser.addEventListener('change', onLoadImage);
    photoChooser.addEventListener('change', onLoadImage);

  };

  var setDisable = function () {
    avatarChooser.removeEventListener('change', onLoadImage);
    photoChooser.removeEventListener('change', onLoadImage);
    avatarPreview.src = DEFAULT_AVATAR;
    photoPreview.innerHTML = '';
  };

  window.loadPhotos = {
    setDisable: setDisable,
    setEnable: setEnable
  };

})();

