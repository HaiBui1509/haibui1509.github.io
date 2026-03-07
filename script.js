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
const x = setInterval(function () {

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

    // Format numbers to always show two digits
    if (elmDays) elmDays.innerHTML = days < 10 ? "0" + Math.max(0, days) : days;
    if (elmHours) elmHours.innerHTML = hours < 10 ? "0" + Math.max(0, hours) : hours;

    // If the count down is finished, display a message
    if (distance < 0) {
        clearInterval(x);
        const container = document.querySelector(".countdown-container");
        if (container) {
            container.innerHTML = "<div class='time-box'><span style='font-size:1.5rem;'>Đã diễn ra</span></div>";
        }
    }
}, 1000);

// QR Code Toggle Logic for the Gift Section
function toggleQR(id, buttonElement) {
    const el = document.getElementById(id);
    if (!el) return;

    // Check if it's currently hidden
    if (el.classList.contains('hidden')) {
        el.classList.remove('hidden');
        // Change button text to "Thu gọn"
        if (buttonElement) {
            buttonElement.textContent = 'Thu gọn';
        }
        // Optional: you can scroll to it slightly if needed
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else {
        el.classList.add('hidden');
        // Change button text back to "Hiển thị QR"
        if (buttonElement) {
            buttonElement.textContent = 'Hiển thị QR';
        }
    }
}

// --- LIGHTBOX GALLERY SETTINGS ---
const albumFolderPath = 'assets/img_wedding/album/';
const albumExtension = '.jpg';
let totalAlbumImages = 0; // Sẽ được code tự động đếm

// Code tự động dò tìm và đếm số lượng ảnh trong thư mục
function autoCountImages() {
    let count = 1;
    function checkNextImage() {
        let img = new Image();
        img.onload = function () {
            totalAlbumImages = count; // Nếu ảnh kề tiếp tồn tại, cập nhật tổng số
            count++;
            checkNextImage(); // Tiếp tục dò ảnh tiếp theo
        };
        img.onerror = function () {
            // Khi không tìm thấy ảnh nữa (ví dụ ảnh số 7), vòng lặp kết thúc
            console.log("Đã tự động đếm được: " + totalAlbumImages + " ảnh trong album.");
        };
        img.src = `${albumFolderPath}${count}${albumExtension}`;
    }
    checkNextImage();
}
// Chạy hàm đếm ngay khi trang web tải
autoCountImages();

let currentImageIndex = 0;

function openLightbox(index) {
    currentImageIndex = index;
    const lightbox = document.getElementById("lightbox");
    if (lightbox) {
        lightbox.classList.remove("hidden");
        updateLightboxImage();
    }
}

function closeLightbox() {
    const lightbox = document.getElementById("lightbox");
    if (lightbox) {
        lightbox.classList.add("hidden");
    }
}

// --- WISH MODAL FUNCTIONS ---
function openWishModal() {
    const modal = document.getElementById("wish-modal");
    if (modal) {
        modal.classList.remove("hidden");
    }
}

function closeWishModal() {
    const modal = document.getElementById("wish-modal");
    if (modal) {
        modal.classList.add("hidden");
    }
}

function changeImage(direction) {
    currentImageIndex += direction;
    // Loop back
    if (currentImageIndex < 0) {
        currentImageIndex = totalAlbumImages - 1;
    } else if (currentImageIndex >= totalAlbumImages) {
        currentImageIndex = 0;
    }
    updateLightboxImage();
}

function updateLightboxImage() {
    const img = document.getElementById("lightbox-img");
    if (img) {
        img.src = `${albumFolderPath}${currentImageIndex + 1}${albumExtension}`;
    }
}

// --- LOADING SCREEN ---
function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    const body = document.body;

    if (loadingScreen && !loadingScreen.classList.contains('hidden')) {
        loadingScreen.classList.add('hidden');
        body.classList.remove('loading');
    }
}

// Multiple ways to detect when page is ready (for different browsers/WebViews)
let loadingHidden = false;

// Method 1: DOMContentLoaded (faster, doesn't wait for images)
document.addEventListener('DOMContentLoaded', function () {
    if (!loadingHidden) {
        setTimeout(hideLoadingScreen, 800);
    }
});

// Method 2: window.load (waits for all resources)
window.addEventListener('load', function () {
    if (!loadingHidden) {
        setTimeout(hideLoadingScreen, 500);
        loadingHidden = true;
    }
});

// Method 3: Check readyState immediately (in case page already loaded)
if (document.readyState === 'complete') {
    setTimeout(hideLoadingScreen, 300);
    loadingHidden = true;
} else if (document.readyState === 'interactive') {
    setTimeout(hideLoadingScreen, 800);
}

// Method 4: Fallback timeout (always hide after 3 seconds max)
setTimeout(function () {
    if (!loadingHidden) {
        hideLoadingScreen();
        loadingHidden = true;
    }
}, 3000);

// Method 5: Handle errors (hide loading even if errors occur)
window.addEventListener('error', function () {
    setTimeout(function () {
        if (!loadingHidden) {
            hideLoadingScreen();
            loadingHidden = true;
        }
    }, 1000);
}, true);

// Method 6: For WebView compatibility - check periodically
let checkCount = 0;
const checkInterval = setInterval(function () {
    checkCount++;
    if (document.readyState === 'complete' || checkCount >= 10) {
        clearInterval(checkInterval);
        if (!loadingHidden) {
            setTimeout(hideLoadingScreen, 200);
            loadingHidden = true;
        }
    }
}, 300);

// --- SCROLL ANIMATION OBSERVER ---
document.addEventListener('DOMContentLoaded', function () {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, {
        threshold: 0.15 // Triggers when 15% of the element is visible
    });

    const hiddenElements = document.querySelectorAll('.animate-on-scroll');
    hiddenElements.forEach((el) => observer.observe(el));
});

// --- BACKGROUND MUSIC LOGIC ---
let musicStarted = false;
const bgMusic = document.getElementById("bg-music");
const musicControl = document.getElementById("music-control");

function toggleMusic() {
    if (!bgMusic) return;

    if (bgMusic.paused) {
        bgMusic.play().then(() => {
            musicControl.classList.add("playing");
            musicControl.classList.remove("disabled");
        }).catch(err => console.log("Lỗi phát nhạc: ", err));
    } else {
        bgMusic.pause();
        musicControl.classList.remove("playing");
        musicControl.classList.add("disabled");
    }
}

// Auto-play music on first user interaction (click or scroll)
function playMusicOnInteraction() {
    if (!musicStarted && bgMusic) {
        bgMusic.play().then(() => {
            musicStarted = true;
            musicControl.classList.add("playing");
            musicControl.classList.remove("disabled");

            // Remove listeners once started
            document.removeEventListener('click', playMusicOnInteraction);
            document.removeEventListener('touchstart', playMusicOnInteraction);
            document.removeEventListener('scroll', playMusicOnInteraction);
        }).catch(err => {
            console.log("Auto-play bị chặn, chờ người dùng thao tác: ", err);
        });
    }
}

// Attach starting listeners
document.addEventListener('click', playMusicOnInteraction);
document.addEventListener('touchstart', playMusicOnInteraction, { passive: true });
document.addEventListener('scroll', playMusicOnInteraction, { passive: true });
