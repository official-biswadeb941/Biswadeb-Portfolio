;(function () {
	
	'use strict';

	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
			BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
			iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
			Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
			Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
			any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};

	
	var fullHeight = function() {

		if ( !isMobile.any() ) {
			$('.js-fullheight').css('height', $(window).height());
			$(window).resize(function(){
				$('.js-fullheight').css('height', $(window).height());
			});
		}
	};

	// Parallax
	var parallax = function() {
		$(window).stellar();
	};

	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated-fast') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn animated-fast');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated-fast');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight animated-fast');
							} else {
								el.addClass('fadeInUp animated-fast');
							}

							el.removeClass('item-animate');
						},  k * 100, 'easeInOutExpo' );
					});
					
				}, 50);
				
			}

		} , { offset: '85%' } );
	};



	var goToTop = function() {

		$('.js-gotop').on('click', function(event){
			
			event.preventDefault();

			$('html, body').animate({
				scrollTop: $('html').offset().top
			}, 500, 'easeInOutExpo');
			
			return false;
		});

		$(window).scroll(function(){

			var $win = $(window);
			if ($win.scrollTop() > 200) {
				$('.js-top').addClass('active');
			} else {
				$('.js-top').removeClass('active');
			}

		});
	
	};

	var pieChart = function() {
		$('.chart').easyPieChart({
			scaleColor: false,
			lineWidth: 4,
			lineCap: 'butt',
			barColor: '#FF9000',
			trackColor:	"#f5f5f5",
			size: 160,
			animate: 1000
		});
	};

	var skillsWayPoint = function() {
		if ($('#fh5co-skills').length > 0 ) {
			$('#fh5co-skills').waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {
					setTimeout( pieChart , 400);					
					$(this.element).addClass('animated');
				}
			} , { offset: '90%' } );
		}

	};


	// Loading page
	var loaderPage = function() {
		$(".fh5co-loader").fadeOut("slow");
	};

	
	$(function(){
		contentWayPoint();
		goToTop();
		loaderPage();
		fullHeight();
		parallax();
		// pieChart();
		skillsWayPoint();
	});



	function submitForm(event) {
		event.preventDefault(); // Prevent form submission
	
		var form = document.getElementById("contactForm");
		var formData = new FormData(form);
	
		fetch("https://script.google.com/macros/s/AKfycbwcLLTUTj39iKUKYcUAW2vWiPbgeXERIMsuWlAXDmZONXA7IG2Oxejk8gKN_J0LvJsY/exec", {
			method: "POST",
			body: formData
		})
		.then(response => response.text())
		.then(data => {
			document.getElementById("messageArea").textContent = data; // Display response from server
			form.reset(); // Clear form fields after submission
		})
		.catch(error => {
			console.error("Error:", error);
			document.getElementById("messageArea").textContent = "An error occurred while submitting the form.";
		});
	}
	
	// Add event listener to the form element
	document.addEventListener("DOMContentLoaded", function() {
		var form = document.getElementById("contactForm");
		form.addEventListener("submit", submitForm);
	});
	
	document.addEventListener("DOMContentLoaded", function() {
        var form = document.getElementById("contactForm");
        var nameInput = document.getElementById("name");
        var emailInput = document.getElementById("email");
        var subjectInput = document.getElementById("subject");
        var messageInput = document.getElementById("message");
        var messageArea = document.getElementById("messageArea");

        form.addEventListener("submit", function(event) {
            if (!validateName() || !validateEmail() || !validateSubject() || !validateMessage()) {
                event.preventDefault();
                messageArea.textContent = "Please fill in all fields correctly.";
            }
        });

        nameInput.addEventListener("input", validateName);
        emailInput.addEventListener("input", validateEmail);
        subjectInput.addEventListener("input", validateSubject);
        messageInput.addEventListener("input", validateMessage);

        function validateName() {
            if (nameInput.value.trim() === "") {
                nameInput.setCustomValidity("Name cannot be empty");
                return false;
            } else {
                nameInput.setCustomValidity("");
                return true;
            }
        }

        function validateEmail() {
            var email = emailInput.value.trim();
            if (email === "") {
                emailInput.setCustomValidity("Email cannot be empty");
                return false;
            } else if (!isValidEmail(email)) {
                emailInput.setCustomValidity("Please enter a valid email address");
                return false;
            } else {
                emailInput.setCustomValidity("");
                return true;
            }
        }

        function isValidEmail(email) {
            // Basic email validation regex
            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        function validateSubject() {
            var subject = subjectInput.value.trim();
            // Assuming subject is valid if it's not empty
            if (subject === "") {
                subjectInput.setCustomValidity("Subject cannot be empty");
                return false;
            } else {
                subjectInput.setCustomValidity("");
                return true;
            }
        }

        function validateMessage() {
            var message = messageInput.value.trim();
            if (message.length < 10) {
                messageInput.setCustomValidity("Message should be at least 10 characters long");
                return false;
            } else {
                messageInput.setCustomValidity("");
                return true;
            }
        }
    });


// Text to be typed in the preloader
const textToType = [
    "Welcome to Biswadeb Mukherjee's Portfolio",
    "Remember I'm not a Developer. I'm an Ethical Hacker."
];

// Index of the current text being typed
let currentTextIndex = 0;

// Index of the current character being typed
let currentCharIndex = 0;

// Speed of typing in milliseconds
const typingSpeed = 15; // Adjust speed as needed

// Function to simulate typing effect
function typeText() {
    const textElement = document.querySelector('.loader-text');
    const currentText = textToType[currentTextIndex];

    if (currentCharIndex < currentText.length) {
        textElement.innerHTML += currentText.charAt(currentCharIndex);
        currentCharIndex++;
        setTimeout(typeText, typingSpeed);
    } else {
        // Text typing completed, move to next text if available
        currentTextIndex++;
        if (currentTextIndex < textToType.length) {
            // Add line break before typing the next text
            textElement.innerHTML += '<br>';
            currentCharIndex = 0;
            setTimeout(typeText, typingSpeed);
        } else {
            // All texts typed, load content
            setTimeout(loadContent, 2000); // Adjust delay as needed
        }
    }
}

// Function to load content after typing animation completes
function loadContent() {
    // Hide preloader and display content
    document.querySelector('.preloader').style.display = 'none';
    document.querySelector('.content').style.display = 'block';
}

// Start the typing animation when the window loads
window.addEventListener('load', function(){
    typeText();
});

//Google tag (gtag.js)
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'G-MLM138KNXE');




}());
