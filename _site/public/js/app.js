var MYST_API = 'https://myst.opsee.com';
var AUTH_API = 'https://auth.opsee.com';

/**
 * @returns {string} - an anonymous UUID for tracking unauthenticated users
 *    (similar in spirit to Google Analytics' _ga cookie)
 */
function getAnonymousUUID() {
  return localStorage.getItem('_opsee_uuid');
}

/**
 * @returns {string} - a random UUID
 */
function setAnonymousUUID() {
  // @see http://stackoverflow.com/a/2117523
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });
  localStorage.setItem('_opsee_uuid', uuid);
}

/**
 * @param {string} name - required
 * @param {string} email - required
 */
function doSignUp(name, email) {
  return $.ajax({
    type: 'POST',
    url: AUTH_API + '/signups',
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
    url: MYST_API + '/event',
    data: JSON.stringify({
      category: 'Onboard',
      action: 'signup',
      data: {
        name: user.name,
        email: user.email
      }
    }),
    contentType: 'application/json; charset=utf-8',
    dataType: 'json'
  });
}

function trackPageView() {
  if (!getAnonymousUUID()) setAnonymousUUID();

  $.ajax({
    type: 'POST',
    url: MYST_API + '/pageview',
    data: JSON.stringify({
      path: document.location.pathname,
      name: document.title,
      user: {
        uuid: getAnonymousUUID()
      }
    }),
    contentType: 'application/json; charset=utf-8',
    dataType: 'json'
  });
}

$( document ).ready(function() {

  trackPageView();

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

  // When there are multiple forms on the same page, validation handlers need
  // to be attached individually. @see http://stackoverflow.com/a/23941558
  $('.js-signup-form').each(function(key, form) {
    $(this).validate({
      rules: {
        name: {
          required: true
        },
        email: {
          required: true,
          email: true
        }
      },

      errorPlacement: function(error, element) {
        // necessary no-op to avoid duplicate error messages
      },

      submitHandler: function(form, event) {
        event.preventDefault();

        // In case of multiple sign-up forms on the same page, make sure to only
        // work with the user submitted
        const $form = $(form);

        // We do, however, want to disable inputs on ALL signup forms
        const $forms = $('.js-signup-form');
        const $inputs = $forms.find(':input');

        $inputs.prop('disabled', true);

        var name = $form.find('.js-signup-name').val();
        var email = $form.find('.js-signup-email').val();

        doSignUp(name, email)
          .done(function(user, textStatus, xhr) {
            trackSignUp(user);

            $('.js-signup-thanks-name').text(user.name);
            $('.js-signup-thanks-email').text(user.email);

            $('.js-signup').hide();
            $('.js-signup-thanks').show();
          })
          .fail(function(xhr, textStatus, error) {
            var message;

            if (xhr && xhr.responseText) {
              var response = JSON.parse(xhr.responseText);
              message = response.message;
            } else {
              message = 'an error occurred!';
            }

            if (xhr.status <= 0 || xhr.status >= 500) {
              if (window.Yeller) {
                // TODO: figure out some custom attributes
                window.Yeller.report(message);
              }
            }

            $('.js-signup-errors')
              .text('Sorry, ' + message)
              .show();
          })
          .always(function() {
            $inputs.prop('disabled', false);
          });
      }
    })
  });
});