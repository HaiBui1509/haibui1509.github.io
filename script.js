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

let heartInterval;
function createRandomHeart() {
    const container = document.getElementById('open-invitation-container');
    if (!container || container.classList.contains('hidden')) return;

    // Change: Tạo ra 4-6 trái tim cùng lúc mỗi nhịp đập thay vì 1
    const heartCount = Math.floor(Math.random() * 3) + 4;

    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤';
        heart.className = 'heart-ripple';

        // Random angle (0 to 360 deg) and random distance
        const angle = Math.random() * Math.PI * 2;
        const distance = 80 + Math.random() * 100; // 80px to 180px
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;

        // Random gentle colors ('--primary-color' #8B7A58, #F8F5EE, whites, soft golds, vanilla)
        const colors = ['#8B7A58', '#A2916F', '#C3B091', '#E8E1D3', '#FFFFFF', '#F5DEB3'];
        const color = colors[Math.floor(Math.random() * colors.length)];

        // Random size
        const size = 0.8 + Math.random() * 1.5;

        heart.style.setProperty('--tx', `${tx}px`);
        heart.style.setProperty('--ty', `${ty}px`);
        heart.style.color = color;
        heart.style.fontSize = `${size}rem`;

        container.appendChild(heart);

        // Remove heart after animation completes (2.5s)
        setTimeout(() => {
            heart.remove();
        }, 2500);
    }
}

// --- LOADING SCREEN ---
function hideLoadingScreen() {
    const loadingSpinner = document.getElementById('loading-spinner');
    const loadingText = document.getElementById('loading-text');
    const openContainer = document.getElementById('open-invitation-container');

    // Hide spinner and text, show button container
    if (loadingSpinner) loadingSpinner.classList.add('hidden');
    if (loadingText) loadingText.classList.add('hidden');
    if (openContainer) {
        openContainer.classList.remove('hidden');
        // Start spawning hearts 
        if (!heartInterval) {
            heartInterval = setInterval(createRandomHeart, 200); // 5 hearts per second
        }
    }
}

function startInvitation() {
    const loadingScreen = document.getElementById('loading-screen');
    const body = document.body;

    if (loadingScreen && !loadingScreen.classList.contains('hidden')) {
        loadingScreen.classList.add('hidden');
        body.classList.remove('loading');
    }

    // Stop heart animation
    if (heartInterval) clearInterval(heartInterval);

    // Thử phát nhạc ngay khi người dùng bấm mở thiệp
    if (typeof playMusicOnInteraction === 'function') {
        playMusicOnInteraction();
    }
}

// Attach click event to the Open Invitation button
document.addEventListener('DOMContentLoaded', function () {
    const openBtn = document.getElementById('open-invitation-btn');
    if (openBtn) {
        openBtn.addEventListener('click', startInvitation);
    }
});

// Multiple ways to detect when page is ready (for different browsers/WebViews)
let loadingHidden = false; // This flag now indicates if the spinner/text are hidden and button is shown

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
