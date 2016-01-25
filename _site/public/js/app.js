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

  $('form#js-signup').submit(function(event) {
    event.preventDefault();

    var data = {
      name: $('#js-signup-name').val(),
      email: $('#js-signup-email').val()
    };

    $.ajax({
      type: 'POST',
      url: 'https://auth.opsee.com/signups',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",

      success: function(response) {
        // no-op
      },

      error: function(response) {
        // no-op
      }
    });
  });
});