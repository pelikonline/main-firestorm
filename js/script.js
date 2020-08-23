$(document).ready(function () {
  toggleModal({
    modalElement: ".js-modal",
    buttonElement: ".js-toggle-modal",
    blackoutClass: "blackout",
    body: "body",
  });

  configureGalleryGuarantee({
    container: ".js-gallery-guarantee",
    prevArrow: ".js-gallery-guarantee-prev",
    nextArrow: ".js-gallery-guarantee-next",
    containerDots: ".js-gallery-guarantee-dots",
  });

  configureGalleryAbout({
    container: ".js-gallery-about",
    prevArrow: ".js-gallery-about-prev",
    nextArrow: ".js-gallery-about-next",
  });

  configureGalleryProgram({
    container: ".js-gallery-program",
    prevArrow: ".js-gallery-program-prev",
    nextArrow: ".js-gallery-program-next",
    containerDots: ".js-gallery-program-dots",
  });

  scrollToElement({
    destinationElement: "body,html",
    targetElement: ".js-button-up",
    duration: 500,
  });

  scrollToElement({
    destinationElement: ".js-guarantee",
    targetElement: ".js-button-arrow",
    duration: 500,
  });

  var requiredMessage = "Это поле обязательно для заполнения";
  var emailMessage = "Введите корректный адрес эл.почты";

  function handleSuccess(responseText, statusText, xhr, $form) {
    $form.append("<p class='success'>Данные успешно отправлены</p>");
    setTimeout(function () {
      $(".success").remove();
    }, 3000);
  }

  function submitHandler(form) {
    $(form).ajaxSubmit({
      success: handleSuccess,
      clearForm: true,
    });
  }

  $(".js-whatsapp-form").validate({
    rules: {
      whatsappPhone: {
        required: true,
      },
      lastName: {
        required: true,
      },
      firstName: {
        required: true,
      },
    },
    messages: {
      whatsappPhone: {
        required: requiredMessage,
      },
      lastName: {
        required: requiredMessage,
      },
      firstName: {
        required: requiredMessage,
      },
    },
    submitHandler: submitHandler,
  });

  $(".js-skype-form").validate({
    rules: {
      skypeUsername: {
        required: true,
      },
      lastName: {
        required: true,
      },
      firstName: {
        required: true,
      },
    },
    messages: {
      skypeUsername: {
        required: requiredMessage,
      },
      lastName: {
        required: requiredMessage,
      },
      firstName: {
        required: requiredMessage,
      },
    },
    submitHandler: submitHandler,
  });

  $(".js-email-form").validate({
    rules: {
      email: {
        required: true,
        email: true,
      },
      lastName: {
        required: true,
      },
      firstName: {
        required: true,
      },
    },
    messages: {
      email: {
        required: requiredMessage,
        email: emailMessage,
      },
      lastName: {
        required: requiredMessage,
      },
      firstName: {
        required: requiredMessage,
      },
    },
    submitHandler: submitHandler,
  });
});

function toggleModal(config) {
  var $modalElement = $(config.modalElement);
  var $buttonElement = $(config.buttonElement);
  var $body = $(config.body);

  function complete() {
    var config = {
      container: ".js-modal-options",
      prevArrow: ".js-modal-options-prev",
      nextArrow: ".js-modal-options-next",
    };

    if ($body.css("overflow") === "hidden") {
      $body.css("overflow", "");

      $(config.container).slick("unslick");
    } else {
      $body.css("overflow", "hidden");
      configureModalOptions(config);
    }
  }

  // Закрытие\открытие по кнопке и закрытие по крестику
  $buttonElement.on("click", function (e) {
    e.preventDefault();

    $modalElement.fadeToggle({
      complete: complete,
    });
  });

  // Закрытие по темному фону попапа
  $modalElement.on("click", function (e) {
    if (
      typeof e.target.className === "string" &&
      e.target.className.indexOf(config.blackoutClass) > -1
    ) {
      e.preventDefault();

      $modalElement.fadeToggle({
        complete: complete,
      });
    }
  });
}

function configureModalOptions(config) {
  $(config.container).slick({
    dots: false,
    autoplay: false,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: false,
    swipe: false,
    touchMove: false,
    prevArrow: $(config.prevArrow),
    nextArrow: $(config.nextArrow),
  });
}

function configureGalleryGuarantee(config) {
  $(config.container).slick({
    dots: true,
    autoplay: false,
    autoplaySpeed: 3000,
    speed: 300,
    prevArrow: $(config.prevArrow),
    nextArrow: $(config.nextArrow),
    appendDots: $(config.containerDots),
    slidesToShow: 1,
    slidesToScroll: 1,
  });
}

function configureGalleryAbout(config) {
  $(config.container).slick({
    autoplay: false,
    autoplaySpeed: 3000,
    speed: 300,
    prevArrow: $(config.prevArrow),
    nextArrow: $(config.nextArrow),
    slidesToShow: 2,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });
}

function configureGalleryProgram(config) {
  $(config.container).slick({
    adaptiveHeight: true,
    dots: true,
    autoplay: false,
    autoplaySpeed: 3000,
    speed: 300,
    prevArrow: $(config.prevArrow),
    nextArrow: $(config.nextArrow),
    appendDots: $(config.containerDots),
    slidesToShow: 1,
    slidesToScroll: 1,
  });
}

function scrollToElement(config) {
  $(config.targetElement).click(function (e) {
    e.preventDefault();

    $("html, body").animate(
      {
        scrollTop: $(config.destinationElement).offset().top,
      },
      config.duration
    );
    return false;
  });
}
