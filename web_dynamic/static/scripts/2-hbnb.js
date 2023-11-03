$(document).ready(function () {
  const checkedDict = {};
  $('.amenity_cb').change(function () {
    if ($(this).is(':checked')) {
      checkedDict[$(this).data('id')] = $(this).data('name');
    } else {
      delete checkedDict[$(this).data('id')];
    }

    let str = '';
    Object.values(checkedDict).forEach(function (value) {
      str += value + ', ';
    });
    if (str.endsWith(', ')) {
      str = str.slice(0, -2);
    }
    $('.amenities h4').text(str);
  });
  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/status/',
    success: function () {
      $('#api_status').addClass('available');
      $('#api_status').css('background-color', '#ff545f');
      console.log('ok');
    },
    error: function (error) {
      $('#api_status').removeClass('available');
      console.log(error);
    }
  });
});
