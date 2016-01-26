/**
 * @param {string} name - required
 * @param {string} email - required
 */
function doSignUp(name, email) {
  return $.ajax({
    type: 'POST',
    url: 'https://auth.opsee.com/signups',
    data: JSON.stringify({
      name: name,
      email: email
    }),
    contentType: 'application/json; charset=utf-8',
    dataType: 'json'
  });
}

/**
 * @param {object} user
 */
function trackSignUp(user) {
  return $.ajax({
    type: 'POST',
    url: 'https://myst.opsee.com/event',
    data: JSON.stringify({
      category: 'Onboard',
      action: 'signup',
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    }),
    contentType: 'application/json; charset=utf-8',
    dataType: 'json'
  });
}

$( document ).ready(function() {
  $(".required").blur(function(e) {
    if ($(e.target).val()) {
      $(e.target).addClass('has_content');
    } else {
      $(e.target).removeClass('has_content');
    }
  });

  $('#mc-embedded-subscribe-form').validate({
    rules: {
      EMAIL: {
        required: true,
        email: true
      },
      FNAME: {
        required: true
      },
      LNAME: {
        required: true
      }
    },
    // onkeyup: function() {
    //   if ($('#mc-embedded-subscribe-form').valid()) {
    //     $('#mc-embedded-subscribe').prop('disabled', false);
    //   } else {
    //     $('#mc-embedded-subscribe').prop('disabled', true);
    //   }
    // },
    errorPlacement: function(error, element) {
      //return true;
    },
    highlight: function(element, errorClass, validClass) {
      $(element).addClass('error').addClass('has_content').removeClass('valid');
    },
    unhighlight: function(element, errorClass, validClass) {
      $(element).removeClass('error').removeClass('has_content').addClass('valid');
    }
  });

  $('#js-signup-form').submit(function(event) {
    event.preventDefault();

    $("#js-signup-form :input").prop("disabled", true);

    var name = $('#js-signup-name').val();
    var email = $('#js-signup-email').val();

    doSignUp(name, email)
      .done(function(user, textStatus, xhr) {
        trackSignUp(user);

        $('.js-signup-thanks-name').text(user.name);
        $('.js-signup-thanks-email').text(user.email);

        $('#js-signup').hide();
        $('#js-signup-thanks').show();
      })
      .fail(function(xhr, textStatus, error) {
        var message;

        if (xhr && xhr.responseText) {
          var response = JSON.parse(xhr.responseText);
          message = response.message;
        } else {
          message = 'an error occurred!';
        }

        $('#js-signup-errors')
          .text('Sorry, ' + message)
          .show();
      })
      .always(function() {
        $("#js-signup-form :input").prop("disabled", false);
      });
  });
});