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
        required: true,
        minlength: 2
      },
      LNAME: {
        required: true,
        minlength: 2
      }
    },
    // onfocusout: function(error, element) {
    //   if(!element.target.validity.valid) {
    //     $(element).siblings('.error_text').addClass('visible');
    //   } else {
    //     $(element).siblings('.error_text').removeClass('visible');
    //   }
    // },
    errorPlacement: function(error, element) {
      //return true;
    },
    submitHandler: function (form) { // for demo
      alert('valid form submitted'); // for demo
      return false; // for demo
    }
  });

  // $('input').bind('input propertychange', function() {
  //   console.log("d");
  //     // $('#output').html($(this).val());
  // });

});