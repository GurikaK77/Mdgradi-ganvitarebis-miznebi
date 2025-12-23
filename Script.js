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

    // მნიშვნელობების აღება
    const transport = parseFloat(document.getElementById('transport').value) || 0;
    const electricity = parseFloat(document.getElementById('electricity').value) || 0;
    const meat = parseFloat(document.getElementById('meat').value) || 0;

    // მარტივი ფორმულა (სიმულაცია)
    // მანქანა: 1კმ = 0.2 კგ CO2 (წელიწადში 52 კვირა)
    // დენი: 1 ლარი ~ 5 კგ CO2 (უხეში დათვლა თვეში -> წელიწადში 12)
    // ხორცი: 1 კვება ~ 2 კგ CO2 (წელიწადში 52 კვირა)
    
    const transportEmission = transport * 52 * 0.2;
    const energyEmission = electricity * 12 * 5;
    const foodEmission = meat * 52 * 2;

    const totalKg = transportEmission + energyEmission + foodEmission;
    const totalTons = (totalKg / 1000).toFixed(2); // გადაყვანა ტონებში

    // შედეგის გამოჩენა
    const resultBox = document.getElementById('result');
    const scoreSpan = document.getElementById('score');
    const feedback = document.getElementById('feedback');

    resultBox.classList.remove('hidden');
    scoreSpan.textContent = totalTons;

    // შეფასება
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
