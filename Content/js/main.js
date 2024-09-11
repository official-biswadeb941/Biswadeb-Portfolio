(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Navbar on scrolling
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.navbar').fadeIn('slow').css('display', 'flex');
        } else {
            $('.navbar').fadeOut('slow').css('display', 'none');
        }
    });


    // Smooth scrolling on the navbar links
    $(".navbar-nav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            
            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 45
            }, 1500, 'easeInOutExpo');
            
            if ($(this).parents('.navbar-nav').length) {
                $('.navbar-nav .active').removeClass('active');
                $(this).closest('a').addClass('active');
            }
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });
    

    // Typed Initiate
    if ($('.typed-text-output').length == 1) {
        var typed_strings = $('.typed-text').text();
        var typed = new Typed('.typed-text-output', {
            strings: typed_strings.split(', '),
            typeSpeed: 100,
            backSpeed: 20,
            smartBackspace: false,
            loop: true
        });
    }


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Skills
    $('.skill').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});


    // Portfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });
    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('active');
        $(this).addClass('active');

        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        dots: true,
        loop: true,
    });

    $('#spanYear').html(new Date().getFullYear());
    
})(jQuery);

document.addEventListener('DOMContentLoaded', function() {
    const submitButton = document.getElementById('submitButton'); // Ensure this ID matches your button
    const responseMessage = document.getElementById('responseMessage');
    let messageTimeout;

    document.getElementById('contactForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        submitButton.disabled = true; // Disable the submit button

        const formData = new FormData(this);

        fetch('https://script.google.com/macros/s/AKfycby1PmSaQRZNNunuC2i1qzEQfVA0JCTspiv1DDP8vaeaUSkCEsUTZ2HRfzDfGmgBT81T/exec', { // Replace with your script URL
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(result => {
            responseMessage.innerText = 'Your Message has been sent successfully!';
            responseMessage.style.color = 'green';

            // Clear the form after successful submission
            document.getElementById('contactForm').reset();
        })
        .catch(error => {
            responseMessage.innerText = 'An error occurred. Please try again.';
            responseMessage.style.color = 'red';
        })
        .finally(() => {
            submitButton.disabled = false; // Re-enable the submit button

            // Clear any existing timeout
            if (messageTimeout) {
                clearTimeout(messageTimeout);
            }

            // Set a new timeout to clear the message after 5 seconds (5000 ms)
            messageTimeout = setTimeout(() => {
                responseMessage.innerText = '';
            }, 5000); // Change the time as needed
        });
    });
});



function validateForm() {
    var form = document.getElementById('contactForm');
    var inputs = form.querySelectorAll('input, textarea');
    var isValid = true;
    
    inputs.forEach(function(input) {
        if (!input.checkValidity()) {
            input.classList.add('is-invalid');
            isValid = false;
        } else {
            input.classList.remove('is-invalid');
        }
    });

    return isValid;
}

  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-P6L8PZFKXY');
