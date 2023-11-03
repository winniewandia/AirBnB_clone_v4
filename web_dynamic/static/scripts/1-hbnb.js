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
});
