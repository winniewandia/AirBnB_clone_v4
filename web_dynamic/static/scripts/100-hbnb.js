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
    },
    error: function (error) {
      $('#api_status').removeClass('available');
      console.log(error);
    }
  });
  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    type: 'POST',
    data: '{}',
    dataType: 'json',
    contentType: 'application/json',
    success: function (data) {
      data.forEach(function (place) {
        const newArticle = $(`<article>
                <div class="title_box">
                  <h2>${place.name}</h2>
                  <div class="price_by_night">$${place.price_by_night}</div>
                </div>
                <div class="information">
                  <div class="max_guest">${place.max_guest} Guest${place.max_guest > 1 ? 's' : ' '}</div>
                      <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms > 1 ? 's' : ' '}</div>
                      <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms > 1 ? 's' : ' '}</div>
                </div>
                    <div class="description">
                  ${place.description}
                    </div>
              </article>`);
        $('section.places').append(newArticle);
      });
    },
    error: function (error) {
      console.log(error);
    }
  });
  const myDict = {};
  $('.amenity_cb').change(function () {
    if ($(this).is(':checked')) {
      myDict[$(this).data('id')] = $(this).data('name');
    } else {
      delete myDict[$(this).data('id')];
    }
  });
  const stateDict = {};
  $('.state_cb').change(function () {
    if ($(this).is(':checked')) {
      stateDict[$(this).data('id')] = $(this).data('name');
    } else {
      delete stateDict[$(this).data('id')];
    }
  });
  const cityDict = {};
  $('.city_cb').change(function () {
    if ($(this).is(':checked')) {
      cityDict[$(this).data('id')] = $(this).data('name');
    } else {
      delete cityDict[$(this).data('id')];
    }
  });
  $('button').click(function () {
    const Ids = { amenities: Object.keys(myDict), states: Object.keys(stateDict), cities: Object.keys(cityDict) };
    $('section.places').empty();
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      type: 'POST',
      data: JSON.stringify(Ids),
      dataType: 'json',
      contentType: 'application/json',
      success: function (data) {
        data.forEach(function (place) {
          const newArticle = $(`<article>
                    <div class="title_box">
                      <h2>${place.name}</h2>
                      <div class="price_by_night">$${place.price_by_night}</div>
                    </div>
                    <div class="information">
                      <div class="max_guest">${place.max_guest} Guest${place.max_guest > 1 ? 's' : ' '}</div>
                          <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms > 1 ? 's' : ' '}</div>
                          <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms > 1 ? 's' : ' '}</div>
                    </div>
                        <div class="description">
                      ${place.description}
                        </div>
                  </article>`);
          $('section.places').append(newArticle);
        });
      }
    });
  });
  const checkedStateDict = {};
  $('.state_cb').change(function () {
    if ($(this).is(':checked')) {
      checkedStateDict[$(this).data('id')] = $(this).data('name');
    } else {
      delete checkedStateDict[$(this).data('id')];
    }

    let stateStr = '';
    Object.values(checkedStateDict).forEach(function (value) {
      stateStr += value + ', ';
    });
    if (stateStr.endsWith(', ')) {
      stateStr = stateStr.slice(0, -2);
    }
    $('.locations h4').text(stateStr);
  });
  const checkedCityDict = {};
  $('.city_cb').change(function () {
    if ($(this).is(':checked')) {
      checkedCityDict[$(this).data('id')] = $(this).data('name');
    } else {
      delete checkedCityDict[$(this).data('id')];
    }

    let cityStr = '';
    Object.values(checkedCityDict).forEach(function (value) {
      cityStr += value + ', ';
    });
    if (cityStr.endsWith(', ')) {
      cityStr = cityStr.slice(0, -2);
    }
    $('.locations h4').text(cityStr);
  });
});
