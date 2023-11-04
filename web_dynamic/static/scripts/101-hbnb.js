$(document).ready(function () {
  const apiPORT = '5001';
  const apiIP = '127.0.0.1';
  const apiURL = `http://${apiIP}:${apiPORT}/api/v1`;

  function formatDate (datetimeText) {
    // Convert the datetime string to a JavaScript Date object
    const datetime = new Date(datetimeText);

    // Define an array to store the month names
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    // Get the day, month, and year from the Date object
    const day = datetime.getDate();
    const month = months[datetime.getMonth()];
    const year = datetime.getFullYear();

    // Add "th" to the day if it's 1, 21, or 31; "st" for 2 and 22; "nd" for 3 and 23; "rd" for 4 and 24; otherwise, "th"
    const daySuffix = (day % 10 === 1 && day !== 11)
      ? 'st'
      : (day % 10 === 2 && day !== 12)
          ? 'nd'
          : (day % 10 === 3 && day !== 13) ? 'rd' : 'th';

    // Form the date string
    const formattedDate = day + daySuffix + ' ' + month + ' ' + year;

    return formattedDate;
  }
  function myFn (obj) {
    const placeId = $(obj).attr('id');
    console.log(placeId);
    $(obj).text(function (i, text) {
      if (text === 'show') {
        $.ajax({
          url: `${apiURL}/places/${placeId}/reviews`,
          type: 'GET',
          success: function (data) {
            data.forEach(function (review) {
              $.get(`http://127.0.0.1:5001/api/v1/users/${review.user_id}`, function (user) {
                const datetimeText = review.updated_at;
                $('#review-' + placeId).append(`<h3>From ${user.first_name} the ${formatDate(datetimeText)}</h3>`);
                $('#review-' + placeId).append(`<p>${review.text}</p>`);
              });
            });
          }
        });
        return 'hide';
      } else {
        $('#review-' + placeId).empty();
        return 'show';
      }
    });
  }

  function newArticleFn (place) {
    const newArticle = $(`<article class="arti">
    <div class="title_box">
      <h2>${place.name}</h2>
      <div class="price_by_night">$${place.price_by_night}</div>
    </div>
    <div class="information">
      <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ' '}</div>
          <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ' '}</div>
          <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ' '}</div>
    </div>
        <div class="description">
      ${place.description}
        </div>
        <div class="reviews">
        <h2>Reviews <span id="${place.id}" class="spanReviews" >show</span></h2>
        <ul>
            <li class="reviewsText" id="review-${place.id}">
            </li>
        </ul>
    </div>
  </article>`);
    return newArticle;
  }

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
    url: `${apiURL}/status/`,
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
    url: `${apiURL}/places_search/`,
    type: 'POST',
    data: '{}',
    dataType: 'json',
    contentType: 'application/json',
    success: function (data) {
      data.forEach(function (place) {
        $('section.places').append(newArticleFn(place));
      });
      $('.spanReviews').click(function () {
        myFn(this);
      });
    },
    error: function (error) {
      console.log(error);
    }
  });

  function handleCB (dictionary, className) {
    $(className).change(function () {
      if ($(this).is(':checked')) {
        dictionary[$(this).data('id')] = $(this).data('name');
      } else {
        delete dictionary[$(this).data('id')];
      }
    });
  }

  const myDict = {};
  const stateDict = {};
  const cityDict = {};

  handleCB(myDict, '.amenity_cb');
  handleCB(stateDict, '.state_cb');
  handleCB(cityDict, '.city_cb');

  $('button').click(function () {
    const Ids = { amenities: Object.keys(myDict), states: Object.keys(stateDict), cities: Object.keys(cityDict) };
    $('section.places').empty();
    $.ajax({
      url: `${apiURL}/places_search/`,
      type: 'POST',
      data: JSON.stringify(Ids),
      dataType: 'json',
      contentType: 'application/json',
      success: function (data) {
        data.forEach(function (place) {
          $('section.places').append(newArticleFn(place));
        });
        $('.spanReviews').click(function () {
          myFn(this);
        });
      }
    });
  });
  function printH4 (dictionary, className) {
    $(className).change(function () {
      if ($(this).is(':checked')) {
        dictionary[$(this).data('id')] = $(this).data('name');
      } else {
        delete dictionary[$(this).data('id')];
      }

      const values = Object.values(dictionary);
      const str = values.join(', ');

      $('.locations h4').text(str);
    });
  }

  const checkedStateDict = {};
  const checkedCityDict = {};

  printH4(checkedStateDict, '.state_cb');
  printH4(checkedCityDict, '.city_cb');
});
