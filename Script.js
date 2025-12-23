// 1. მობილური მენიუს ლოგიკა
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');

        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Burger Animation
        burger.classList.toggle('toggle');
    });
}

navSlide();

// 2. Scroll Animation (Reveal on Scroll)
window.addEventListener('scroll', reveal);

function reveal() {
    var reveals = document.querySelectorAll('.reveal');

    for (var i = 0; i < reveals.length; i++) {
        var windowheight = window.innerHeight;
        var revealtop = reveals[i].getBoundingClientRect().top;
        var revealpoint = 150;

        if (revealtop < windowheight - revealpoint) {
            reveals[i].classList.add('active');
        } else {
            reveals[i].classList.remove('active');
        }
    }
}

// 3. ნახშირბადის კვალის კალკულატორი
document.getElementById('carbon-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const transport = parseFloat(document.getElementById('transport').value) || 0;
    const electricity = parseFloat(document.getElementById('electricity').value) || 0;
    const meat = parseFloat(document.getElementById('meat').value) || 0;

    const transportEmission = transport * 52 * 0.2;
    const energyEmission = electricity * 12 * 5;
    const foodEmission = meat * 52 * 2;

    const totalKg = transportEmission + energyEmission + foodEmission;
    const totalTons = (totalKg / 1000).toFixed(2); 

    const resultBox = document.getElementById('result');
    const scoreSpan = document.getElementById('score');
    const feedback = document.getElementById('feedback');

    resultBox.classList.remove('hidden');
    scoreSpan.textContent = totalTons;

    if (totalTons < 4) {
        resultBox.style.borderLeftColor = "#2ecc71";
        feedback.innerHTML = "<p style='color:green'>ყოჩაღ! შენი ნახშირბადის კვალი საშუალოზე დაბალია. განაგრძე ასე!</p>";
    } else if (totalTons < 10) {
        resultBox.style.borderLeftColor = "#f1c40f";
        feedback.innerHTML = "<p style='color:orange'>საშუალო მაჩვენებელი. არის რაღაცები, რისი გამოსწორებაც შეიძლება.</p>";
    } else {
        resultBox.style.borderLeftColor = "#e74c3c";
        feedback.innerHTML = "<p style='color:red'>მაღალი მაჩვენებელი! გირჩევთ შეამციროთ მანქანით სიარული და ენერგიის მოხმარება.</p>";
    }
});

// 4. Formspree კომენტარების გაგზავნა (გვერდის გადატვირთვის გარეშე)
var form = document.getElementById("comment-form");
    
async function handleSubmit(event) {
  event.preventDefault();
  var status = document.getElementById("comment-status");
  var data = new FormData(event.target);
  
  // მონაცემების გაგზავნა Formspree-ზე
  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
        'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      status.innerHTML = "მადლობა! თქვენი კომენტარი წარმატებით გაიგზავნა.";
      status.style.color = "#2ecc71"; // მწვანე ფერი
      form.reset(); // ფორმის გასუფთავება
    } else {
      response.json().then(data => {
        if (Object.hasOwn(data, 'errors')) {
          status.innerHTML = data["errors"].map(error => error["message"]).join(", ");
        } else {
          status.innerHTML = "დაფიქსირდა შეცდომა კომენტარის გაგზავნისას.";
          status.style.color = "red";
        }
      })
    }
  }).catch(error => {
    status.innerHTML = "დაფიქსირდა შეცდომა კომენტარის გაგზავნისას.";
    status.style.color = "red";
  });
}
form.addEventListener("submit", handleSubmit);
