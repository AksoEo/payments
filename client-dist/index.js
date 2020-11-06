(function () {
    'use strict';

    window.addEventListener('DOMContentLoaded', function () {
      document.querySelector('#page-back-button').addEventListener('click', function () {
        window.history.back();
      });
    });

}());
