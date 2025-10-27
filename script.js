// Chờ cho toàn bộ tài liệu HTML được tải xong rồi mới chạy mã JavaScript
document.addEventListener('DOMContentLoaded', () => {

    // ========================================================== //
    // ================= LOGIC ĐẾM NGƯỢỢC ======================== //
    // ========================================================== //
    
    const countdownContainer = document.getElementById('countdown-container');
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    // Thiết lập thời gian mục tiêu: 8:30 ngày 30 tháng 10 năm 2025
    const targetDate = new Date('2025-10-30T08:30:00');

    // SỬA LỖI: Khai báo biến countdownInterval bằng `let` ở đây để nó có thể được truy cập trong hàm updateCountdown
    let countdownInterval;

    function updateCountdown() {
        const now = new Date();
        const diff = targetDate - now;

        if (diff <= 0) {
            // Ngừng đếm ngược khi đã đến giờ
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

        // Chỉ cập nhật DOM nếu các phần tử tồn tại
        if (daysEl && hoursEl && minutesEl && secondsEl) {
            daysEl.textContent = String(days).padStart(2, '0');
            hoursEl.textContent = String(hours).padStart(2, '0');
            minutesEl.textContent = String(minutes).padStart(2, '0');
            secondsEl.textContent = String(seconds).padStart(2, '0');
        }
    }
    
    // Chạy ngay lần đầu để không bị trễ 1 giây
    updateCountdown();
    // Cập nhật đếm ngược mỗi giây
    countdownInterval = setInterval(updateCountdown, 1000);


    // ========================================================== //
    // =============== KHAI BÁO CÁC BIẾN CẦN THIẾT =============== //
    // ========================================================== //

    // --- Các yếu tố của Bảng quản trị (Admin Panel) ---
    const adminPanel = document.getElementById('admin-panel');
    const loginForm = document.getElementById('login-form-container');
    const dashboard = document.getElementById('dashboard');

    // --- Các yếu tố của Form đăng nhập ---
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginBtn = document.getElementById('login-btn');
    const loginError = document.getElementById('login-error');

    // --- Nút kích hoạt bí mật (logo) và các nút chính ---
    const pageLogo = document.getElementById('page-logo');
    const generateBtn = document.getElementById('generate-html-btn');
    const addVanKienBtn = document.getElementById('add-van-kien-btn');
    const addNhanSuBtn = document.getElementById('add-nhan-su-btn');
    const addTinTucBtn = document.getElementById('add-tin-tuc-btn');
    const saveJsonBtn = document.getElementById('save-json-btn');
    const loadJsonBtn = document.getElementById('load-json-btn');
    const jsonUploadInput = document.getElementById('json-upload-input');

    // --- Các vùng chứa nội dung trên trang CÔNG KHAI ---
    const mainTitle = document.getElementById('main-title');
    const subTitle = document.getElementById('sub-title');
    const eventLocation = document.getElementById('event-location');
    const gioiThieuContent = document.getElementById('gioi-thieu-content');
    const vanKienList = document.getElementById('van-kien-list');
    const nhanSuList = document.getElementById('nhan-su-list');
    const tinTucList = document.getElementById('tin-tuc-list');
    const footerContent = document.getElementById('footer-content');

    // --- Các vùng nhập liệu trong Bảng ĐIỀU KHIỂN ---
    const editMainTitle = document.getElementById('edit-main-title');
    const editSubTitle = document.getElementById('edit-sub-title');
    const editEventLocation = document.getElementById('edit-event-location');
    const editGioiThieuContent = document.getElementById('edit-gioi-thieu-content');
    const editVanKienList = document.getElementById('edit-van-kien-list');
    const editNhanSuList = document.getElementById('edit-nhan-su-list');
    const editTinTucList = document.getElementById('edit-tin-tuc-list');
    const editFooterContent = document.getElementById('edit-footer-content');

    // --- Biến cho cơ chế kích hoạt bí mật ---
    let logoClickCount = 0;
    let logoClickTimer = null;


    // ========================================================== //
    // ============ LOGIC KÍCH HOẠT VÀ ĐĂNG NHẬP ADMIN ========== //
    // ========================================================== //

    pageLogo.addEventListener('click', () => {
        logoClickCount++;
        clearTimeout(logoClickTimer);
        logoClickTimer = setTimeout(() => { logoClickCount = 0; }, 2000);

        if (logoClickCount === 5) {
            logoClickCount = 0;
            adminPanel.classList.remove('hidden');
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            adminPanel.classList.add('hidden');
            dashboard.classList.add('hidden');
            loginForm.classList.remove('hidden');
            loginError.classList.add('hidden');
            usernameInput.value = '';
            passwordInput.value = '';
        }
    });

    loginBtn.addEventListener('click', () => {
        const CORRECT_PASSWORD = 'daihoi2025';
        if (usernameInput.value.trim() === 'lamquocminh' && passwordInput.value === CORRECT_PASSWORD) {
            loginForm.classList.add('hidden');
            dashboard.classList.remove('hidden');
            populateDashboard();
        } else {
            loginError.classList.remove('hidden');
            passwordInput.value = '';
        }
    });


    // ========================================================== //
    // = LOGIC TẢI DỮ LIỆU TỪ TRANG WEB VÀO BẢNG ĐIỀU KHIỂN ====== //
    // ========================================================== //

    function populateDashboard() {
        editMainTitle.value = mainTitle.textContent;
        editSubTitle.value = subTitle.textContent;
        editEventLocation.value = eventLocation.textContent;
        editGioiThieuContent.value = gioiThieuContent.innerHTML;
        editFooterContent.value = footerContent.innerHTML;

        editVanKienList.innerHTML = '';
        vanKienList.querySelectorAll('.van-kien-item').forEach(item => {
            const spanText = item.querySelector('span').textContent;
            const text = spanText.replace(/^\d+\.\s*/, '');
            // CẢI TIẾN: Lấy thuộc tính 'href' để tránh lấy full URL
            const link = item.querySelector('a').getAttribute('href');
            editVanKienList.appendChild(createVanKienEditItem(text, link));
        });

        editNhanSuList.innerHTML = '';
        nhanSuList.querySelectorAll('.nhan-su-card').forEach(card => {
            const imgSrc = card.querySelector('img').src;
            const name = card.querySelector('h4').textContent;
            const position = card.querySelector('p').textContent;
            editNhanSuList.appendChild(createNhanSuEditItem(imgSrc, name, position));
        });
        
        editTinTucList.innerHTML = '';
        tinTucList.querySelectorAll('.tin-tuc-item').forEach(item => {
            const title = item.querySelector('h4').textContent;
            const content = item.querySelector('p').innerHTML;
            editTinTucList.appendChild(createTinTucEditItem(title, content));
        });
    }


    // ========================================================== //
    // == CÁC HÀM TẠO GIAO DIỆN CHỈNH SỬA (THÊM/SỬA/XÓA) ======== //
    // ========================================================== //

    function createVanKienEditItem(text = '', link = '#') {
        const div = document.createElement('div');
        div.className = 'edit-item-container van-kien-edit';
        div.innerHTML = `
            <input type="text" placeholder="Tên văn kiện" value="${text}">
            <input type="url" placeholder="Đường dẫn tải về (URL)" value="${link}">
            <button class="btn-remove">Xóa</button>
        `;
        div.querySelector('.btn-remove').addEventListener('click', () => div.remove());
        return div;
    }

    function createNhanSuEditItem(imgSrc = 'https://via.placeholder.com/250x250.png?text=Ảnh+3x4', name = '', position = '') {
        const div = document.createElement('div');
        div.className = 'edit-item-container nhan-su-edit';
        div.innerHTML = `
            <div><label>Họ và tên:</label><input type="text" placeholder="Nguyễn Văn A" value="${name}"></div>
            <div><label>Chức vụ ứng cử:</label><input type="text" placeholder="Ứng cử Bí thư" value="${position}"></div>
            <div style="grid-column: 1 / -1;"><label>URL Hình ảnh:</label><input type="url" placeholder="https://..." value="${imgSrc}"></div>
            <button class="btn-remove" style="grid-column: 1 / -1;">Xóa Nhân sự này</button>
        `;
        div.querySelector('.btn-remove').addEventListener('click', () => div.remove());
        return div;
    }
    
    function createTinTucEditItem(title = '', content = '') {
        const div = document.createElement('div');
        div.className = 'edit-item-container tin-tuc-edit';
        div.innerHTML = `
            <div>
                 <label>Tiêu đề tin tức:</label><input type="text" placeholder="Tiêu đề tin tức" value="${title}">
                 <label>Nội dung (hỗ trợ thẻ p, b, i):</label><textarea rows="4">${content}</textarea>
            </div>
            <button class="btn-remove">Xóa</button>
        `;
        div.querySelector('.btn-remove').addEventListener('click', () => div.remove());
        return div;
    }

    addVanKienBtn.addEventListener('click', () => { editVanKienList.appendChild(createVanKienEditItem()); });
    addNhanSuBtn.addEventListener('click', () => { editNhanSuList.appendChild(createNhanSuEditItem()); });
    addTinTucBtn.addEventListener('click', () => { editTinTucList.appendChild(createTinTucEditItem()); });

    // ========================================================== //
    // ============ LOGIC LƯU VÀ TẢI NỘI DUNG (JSON) ============ //
    // ========================================================== //

    saveJsonBtn.addEventListener('click', () => {
        const dataToSave = {
            mainTitle: editMainTitle.value,
            subTitle: editSubTitle.value,
            location: editEventLocation.value,
            gioiThieu: editGioiThieuContent.value,
            footer: editFooterContent.value,
            vanKien: [],
            nhanSu: [],
            tinTuc: []
        };
        editVanKienList.querySelectorAll('.edit-item-container').forEach(item => { dataToSave.vanKien.push({ text: item.querySelectorAll('input')[0].value, link: item.querySelectorAll('input')[1].value }); });
        editNhanSuList.querySelectorAll('.edit-item-container').forEach(item => { dataToSave.nhanSu.push({ name: item.querySelectorAll('input')[0].value, position: item.querySelectorAll('input')[1].value, imgSrc: item.querySelectorAll('input')[2].value }); });
        editTinTucList.querySelectorAll('.edit-item-container').forEach(item => { dataToSave.tinTuc.push({ title: item.querySelector('input').value, content: item.querySelector('textarea').value }); });
        
        const jsonString = JSON.stringify(dataToSave, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        const timestamp = new Date().toISOString().slice(0, 10);
        link.download = `daihoi_content_${timestamp}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
    });

    loadJsonBtn.addEventListener('click', () => { jsonUploadInput.click(); });

    jsonUploadInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                loadDataIntoDashboard(data);
                alert('Tải nội dung từ file JSON thành công!');
            } catch (error) {
                alert('Lỗi: File JSON không hợp lệ hoặc đã bị hỏng.\n' + error.message);
            } finally {
                 event.target.value = null;
            }
        };
        reader.onerror = () => { alert('Lỗi khi đọc file.'); };
        reader.readAsText(file, 'UTF-8');
    });

    function loadDataIntoDashboard(data) {
        editMainTitle.value = data.mainTitle || '';
        editSubTitle.value = data.subTitle || '';
        editEventLocation.value = data.location || '';
        editGioiThieuContent.value = data.gioiThieu || '';
        editFooterContent.value = data.footer || '';

        editVanKienList.innerHTML = '';
        if(data.vanKien && Array.isArray(data.vanKien)) { data.vanKien.forEach(vk => { editVanKienList.appendChild(createVanKienEditItem(vk.text, vk.link)); }); }
        editNhanSuList.innerHTML = '';
        if(data.nhanSu && Array.isArray(data.nhanSu)) { data.nhanSu.forEach(ns => { editNhanSuList.appendChild(createNhanSuEditItem(ns.imgSrc, ns.name, ns.position)); }); }
        editTinTucList.innerHTML = '';
        if(data.tinTuc && Array.isArray(data.tinTuc)) { data.tinTuc.forEach(tt => { editTinTucList.appendChild(createTinTucEditItem(tt.title, tt.content)); }); }
    }


    // ========================================================== //
    // ============ LOGIC TẠO VÀ TẢI FILE HTML MỚI ============== //
    // ========================================================== //

    generateBtn.addEventListener('click', () => {
        const clonedDocument = document.cloneNode(true);

        clonedDocument.getElementById('main-title').textContent = editMainTitle.value;
        clonedDocument.getElementById('sub-title').textContent = editSubTitle.value;
        clonedDocument.getElementById('event-location').textContent = editEventLocation.value;
        clonedDocument.getElementById('gioi-thieu-content').innerHTML = editGioiThieuContent.value;
        clonedDocument.getElementById('footer-content').innerHTML = editFooterContent.value;

        const vanKienListClone = clonedDocument.getElementById('van-kien-list');
        vanKienListClone.innerHTML = '';
        editVanKienList.querySelectorAll('.edit-item-container').forEach((item, index) => {
            const text = item.querySelectorAll('input')[0].value;
            const link = item.querySelectorAll('input')[1].value;
            if(text.trim()) {
                vanKienListClone.innerHTML += `<div class="van-kien-item"><span>${index + 1}. ${text}</span><a href="${link}" class="btn" download>Tải về</a></div>`;
            }
        });

        const nhanSuListClone = clonedDocument.getElementById('nhan-su-list');
        nhanSuListClone.innerHTML = '';
        editNhanSuList.querySelectorAll('.edit-item-container').forEach(item => {
            const name = item.querySelectorAll('input')[0].value;
            const position = item.querySelectorAll('input')[1].value;
            const imgSrc = item.querySelectorAll('input')[2].value;
            if(name.trim()) {
                nhanSuListClone.innerHTML += `<div class="nhan-su-card"><img src="${imgSrc}" alt="Ảnh chân dung của ${name}"><div class="nhan-su-info"><h4>${name}</h4><p>${position}</p></div></div>`;
            }
        });

        const tinTucListClone = clonedDocument.getElementById('tin-tuc-list');
        tinTucListClone.innerHTML = '';
        editTinTucList.querySelectorAll('.edit-item-container').forEach(item => {
            const title = item.querySelector('input').value;
            const content = item.querySelector('textarea').value;
             if(title.trim()) {
                tinTucListClone.innerHTML += `<article class="tin-tuc-item"><h4>${title}</h4><p>${content}</p></article>`;
            }
        });
        
        clonedDocument.getElementById('admin-panel').remove();
        clonedDocument.querySelector('script').remove();

        const finalHtml = '<!DOCTYPE html>\n' + clonedDocument.documentElement.outerHTML;
        const blob = new Blob([finalHtml], { type: 'text/html;charset=utf-8' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'index_updated.html';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
        
        alert('File "index_updated.html" đã được tạo và đang được tải về!\nHãy đổi tên file thành "index.html" và tải lên hosting để cập nhật trang web.');
    });

});
