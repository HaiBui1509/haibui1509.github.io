// Smooth Scrolling for links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Countdown Timer Logic
// Set the wedding date to Oct 15, 2026, 10:00:00 (for example)
const countDownDate = new Date("Mar 28, 2026 10:00:00").getTime();

// Update the count down every 1 second
const x = setInterval(function() {

    // Get today's date and time
    const now = new Date().getTime();

    // Find the distance between now and the count down date
    const distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the corresponding elements
    const elmDays = document.getElementById("days");
    const elmHours = document.getElementById("hours");
    const elmMinutes = document.getElementById("minutes");
    const elmSeconds = document.getElementById("seconds");

    // Format numbers to always show two digits
    if(elmDays) elmDays.innerHTML = days < 10 ? "0" + Math.max(0, days) : days;
    if(elmHours) elmHours.innerHTML = hours < 10 ? "0" + Math.max(0, hours) : hours;
    if(elmMinutes) elmMinutes.innerHTML = minutes < 10 ? "0" + Math.max(0, minutes) : minutes;
    if(elmSeconds) elmSeconds.innerHTML = seconds < 10 ? "0" + Math.max(0, seconds) : seconds;

    // If the count down is finished, display a message
    if (distance < 0) {
        clearInterval(x);
        const container = document.querySelector(".countdown-container");
        if(container) {
            container.innerHTML = "<div class='time-box'><span style='font-size:1.5rem;'>Đã diễn ra</span></div>";
        }
    }
}, 1000);

// QR Code Toggle Logic for the Gift Section
function toggleQR(id) {
    const el = document.getElementById(id);
    if (!el) return;
    
    // Check if it's currently hidden
    if (el.classList.contains('hidden')) {
        el.classList.remove('hidden');
        // Optional: you can scroll to it slightly if needed
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else {
        el.classList.add('hidden');
    }
}
