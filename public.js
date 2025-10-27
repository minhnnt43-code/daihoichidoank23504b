// public.js - Chỉ chứa logic cho các tính năng công khai

document.addEventListener('DOMContentLoaded', () => {

    // ========================================================== //
    // ================= LOGIC ĐẾM NGƯỢỢC ======================== //
    // ========================================================== //
    
    const countdownContainer = document.getElementById('countdown-container');
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    // Thời gian mục tiêu theo chuẩn UTC (08:30 GMT+7 -> 01:30 UTC)
    const targetDate = new Date('2025-10-30T01:30:00Z');

    let countdownInterval;

    function updateCountdown() {
        const now = new Date();
        const diff = targetDate - now;

        if (diff <= 0) {
            if (countdownInterval) {
                clearInterval(countdownInterval);
            }
            countdownContainer.innerHTML = '<h3 style="color: var(--primary-color);">Đại hội đã chính thức diễn ra!</h3>';
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        if (daysEl && hoursEl && minutesEl && secondsEl) {
            daysEl.textContent = String(days).padStart(2, '0');
            hoursEl.textContent = String(hours).padStart(2, '0');
            minutesEl.textContent = String(minutes).padStart(2, '0');
            secondsEl.textContent = String(seconds).padStart(2, '0');
        }
    }
    
    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);

});
