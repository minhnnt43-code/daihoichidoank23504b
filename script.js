// Chờ cho toàn bộ tài liệu HTML được tải xong rồi mới chạy mã JavaScript
document.addEventListener('DOMContentLoaded', () => {

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

    // === BỔ SUNG: Các nút và input cho tính năng Import/Export JSON ===
    const exportJsonBtn = document.getElementById('export-json-btn');
    const importJsonBtn = document.getElementById('import-json-btn');
    const importFileInput = document.getElementById('import-file-input');
    
    // --- Các vùng chứa nội dung trên trang CÔNG KHAI ---
    const mainTitle = document.getElementById('main-title');
    const subTitle = document.getElementById('sub-title');
    const gioiThieuContent = document.getElementById('gioi-thieu-content');
    const vanKienList = document.getElementById('van-kien-list');
    const nhanSuList = document.getElementById('nhan-su-list');
    const tinTucList = document.getElementById('tin-tuc-list');
    const footerContent = document.getElementById('footer-content');

    // --- Các vùng nhập liệu trong Bảng ĐIỀU KHIỂN ---
    const editMainTitle = document.getElementById('edit-main-title');
    const editSubTitle = document.getElementById('edit-sub-title');
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

    // --- Kích hoạt Bảng quản trị bằng cách nhấn vào logo 5 lần ---
    pageLogo.addEventListener('click', () => {
        logoClickCount++;
        // Đặt lại bộ đếm nếu không nhấn đủ 5 lần trong 2 giây
        clearTimeout(logoClickTimer);
        logoClickTimer = setTimeout(() => {
            logoClickCount = 0;
        }, 2000);

        if (logoClickCount === 5) {
            logoClickCount = 0;
            adminPanel.classList.remove('hidden');
        }
    });

    // --- Thoát Bảng quản trị bằng phím Escape ---
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            adminPanel.classList.add('hidden');
            // Reset về màn hình đăng nhập
            dashboard.classList.add('hidden');
            loginForm.classList.remove('hidden');
            loginError.classList.add('hidden');
            // Xóa các trường input
            usernameInput.value = '';
            passwordInput.value = '';
        }
    });

    // --- Xử lý đăng nhập ---
    loginBtn.addEventListener('click', () => {
        // !!! QUAN TRỌNG: Hãy thay đổi mật khẩu này để bảo mật hơn !!!
        const CORRECT_PASSWORD = 'daihoi2025';

        if (usernameInput.value.trim() === 'lamquocminh' && passwordInput.value === CORRECT_PASSWORD) {
            loginForm.classList.add('hidden');
            dashboard.classList.remove('hidden');
            populateDashboard(); // Tải dữ liệu hiện tại vào Bảng điều khiển
        } else {
            loginError.classList.remove('hidden');
            passwordInput.value = '';
        }
    });


    // ========================================================== //
    // = LOGIC TẢI DỮ LIỆU TỪ TRANG WEB VÀO BẢNG ĐIỀU KHIỂN ====== //
    // ========================================================== //

    function populateDashboard() {
        // 1. Tải các nội dung đơn giản (văn bản và HTML)
        editMainTitle.value = mainTitle.textContent;
        editSubTitle.value = subTitle.textContent;
        editGioiThieuContent.value = gioiThieuContent.innerHTML;
        editFooterContent.value = footerContent.innerHTML;

        // 2. Tải danh sách Văn kiện
        editVanKienList.innerHTML = ''; // Xóa sạch trước khi tải
        vanKienList.querySelectorAll('.van-kien-item').forEach(item => {
            const text = item.querySelector('span').textContent;
            const link = item.querySelector('a').href;
            const newItem = createVanKienEditItem(text, link);
            editVanKienList.appendChild(newItem);
        });

        // 3. Tải danh sách Nhân sự
        editNhanSuList.innerHTML = '';
        nhanSuList.querySelectorAll('.nhan-su-card').forEach(card => {
            const imgSrc = card.querySelector('img').src;
            const name = card.querySelector('h4').textContent;
            const position = card.querySelector('p').textContent;
            const newItem = createNhanSuEditItem(imgSrc, name, position);
            editNhanSuList.appendChild(newItem);
        });
        
        // 4. Tải danh sách Tin tức
        editTinTucList.innerHTML = '';
        tinTucList.querySelectorAll('.tin-tuc-item').forEach(item => {
            const title = item.querySelector('h4').textContent;
            const content = item.querySelector('p').innerHTML;
            const newItem = createTinTucEditItem(title, content);
            editTinTucList.appendChild(newItem);
        });
    }


    // ========================================================== //
    // == CÁC HÀM TẠO GIAO DIỆN CHỈNH SỬA (THÊM/SỬA/XÓA) ======== //
    // ========================================================== //

    // --- Tạo ô chỉnh sửa cho VĂN KIỆN ---
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

    // --- Tạo ô chỉnh sửa cho NHÂN SỰ ---
    function createNhanSuEditItem(imgSrc = 'https://via.placeholder.com/250x250.png?text=Ảnh+3x4', name = '', position = '') {
        const div = document.createElement('div');
        div.className = 'edit-item-container nhan-su-edit';
        div.innerHTML = `
            <div>
                <label>Họ và tên:</label>
                <input type="text" placeholder="Nguyễn Văn A" value="${name}">
            </div>
            <div>
                <label>Chức vụ ứng cử:</label>
                <input type="text" placeholder="Ứng cử Bí thư" value="${position}">
            </div>
            <div style="grid-column: 1 / -1;">
                <label>URL Hình ảnh:</label>
                <input type="url" placeholder="https://..." value="${imgSrc}">
            </div>
            <button class="btn-remove" style="grid-column: 1 / -1;">Xóa Nhân sự này</button>
        `;
        div.querySelector('.btn-remove').addEventListener('click', () => div.remove());
        return div;
    }
    
    // --- Tạo ô chỉnh sửa cho TIN TỨC ---
    function createTinTucEditItem(title = '', content = '') {
        const div = document.createElement('div');
        div.className = 'edit-item-container tin-tuc-edit';
        div.innerHTML = `
            <div>
                 <label>Tiêu đề tin tức:</label>
                <input type="text" placeholder="Tiêu đề tin tức" value="${title}">
                 <label>Nội dung (hỗ trợ thẻ p, b, i):</label>
                <textarea rows="4">${content}</textarea>
            </div>
            <button class="btn-remove">Xóa</button>
        `;
        div.querySelector('.btn-remove').addEventListener('click', () => div.remove());
        return div;
    }


    // --- Gắn sự kiện cho các nút "Thêm mới" ---
    addVanKienBtn.addEventListener('click', () => {
        editVanKienList.appendChild(createVanKienEditItem());
    });
    
    addNhanSuBtn.addEventListener('click', () => {
        editNhanSuList.appendChild(createNhanSuEditItem());
    });
    
    addTinTucBtn.addEventListener('click', () => {
        editTinTucList.appendChild(createTinTucEditItem());
    });
    
    
    // ========================================================== //
    // ============ LOGIC IMPORT/EXPORT DỮ LIỆU JSON ============ //
    // ========================================================== //

    // --- Hàm thu thập toàn bộ dữ liệu từ Bảng điều khiển ---
    function collectDashboardData() {
        const data = {
            thongTinChung: {
                tieuDeChinh: editMainTitle.value,
                tieuDePhu: editSubTitle.value
            },
            gioiThieu: editGioiThieuContent.value,
            vanKien: [],
            nhanSu: [],
            tinTuc: [],
            footer: editFooterContent.value
        };

        // Thu thập Văn kiện
        editVanKienList.querySelectorAll('.edit-item-container').forEach(item => {
            data.vanKien.push({
                ten: item.querySelectorAll('input')[0].value,
                duongDan: item.querySelectorAll('input')[1].value
            });
        });

        // Thu thập Nhân sự
        editNhanSuList.querySelectorAll('.edit-item-container').forEach(item => {
            data.nhanSu.push({
                hoTen: item.querySelectorAll('input')[0].value,
                chucVu: item.querySelectorAll('input')[1].value,
                hinhAnh: item.querySelectorAll('input')[2].value
            });
        });

        // Thu thập Tin tức
        editTinTucList.querySelectorAll('.edit-item-container').forEach(item => {
            data.tinTuc.push({
                tieuDe: item.querySelector('input').value,
                noiDung: item.querySelector('textarea').value
            });
        });

        return data;
    }

    // --- Hàm điền dữ liệu từ file JSON vào Bảng điều khiển ---
    function populateDashboardFromJson(data) {
        // 1. Xóa sạch các danh sách hiện có để tránh trùng lặp
        editVanKienList.innerHTML = '';
        editNhanSuList.innerHTML = '';
        editTinTucList.innerHTML = '';

        // 2. Điền thông tin chung
        editMainTitle.value = data.thongTinChung?.tieuDeChinh || '';
        editSubTitle.value = data.thongTinChung?.tieuDePhu || '';
        editGioiThieuContent.value = data.gioiThieu || '';
        editFooterContent.value = data.footer || '';

        // 3. Điền danh sách Văn kiện
        data.vanKien?.forEach(item => {
            const newItem = createVanKienEditItem(item.ten, item.duongDan);
            editVanKienList.appendChild(newItem);
        });

        // 4. Điền danh sách Nhân sự
        data.nhanSu?.forEach(item => {
            const newItem = createNhanSuEditItem(item.hinhAnh, item.hoTen, item.chucVu);
            editNhanSuList.appendChild(newItem);
        });
        
        // 5. Điền danh sách Tin tức
        data.tinTuc?.forEach(item => {
            const newItem = createTinTucEditItem(item.tieuDe, item.noiDung);
            editTinTucList.appendChild(newItem);
        });
    }

    // --- Sự kiện cho nút LƯU DỮ LIỆU (EXPORT) ---
    exportJsonBtn.addEventListener('click', () => {
        const data = collectDashboardData();
        const jsonData = JSON.stringify(data, null, 2); // null, 2 để format file JSON cho đẹp
        const blob = new Blob([jsonData], { type: 'application/json;charset=utf-8' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'daihoi_data.json';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
        
        alert('File dữ liệu "daihoi_data.json" đã được tạo và tải về!');
    });

    // --- Sự kiện cho nút TẢI DỮ LIỆU (IMPORT) ---
    importJsonBtn.addEventListener('click', () => {
        // Kích hoạt input file ẩn khi bấm nút
        importFileInput.click();
    });

    importFileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (!file) {
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                populateDashboardFromJson(data);
                alert('Dữ liệu đã được tải thành công vào Bảng điều khiển!');
            } catch (error) {
                alert('Lỗi: File JSON không hợp lệ hoặc bị lỗi. Vui lòng kiểm tra lại file.');
                console.error("Lỗi khi đọc file JSON:", error);
            }
        };
        reader.onerror = () => {
            alert('Đã xảy ra lỗi khi đọc file.');
        };
        reader.readAsText(file);

        // Reset input để có thể tải lại cùng một file nếu cần
        event.target.value = ''; 
    });


    // ========================================================== //
    // ============ LOGIC TẠO VÀ TẢI FILE HTML MỚI ============== //
    // ========================================================== //

    generateBtn.addEventListener('click', () => {
        // 1. Tạo một bản sao của tài liệu HTML hiện tại trong bộ nhớ
        const clonedDocument = document.cloneNode(true);

        // 2. Cập nhật các nội dung đơn giản trên bản sao
        clonedDocument.getElementById('main-title').textContent = editMainTitle.value;
        clonedDocument.getElementById('sub-title').textContent = editSubTitle.value;
        clonedDocument.getElementById('gioi-thieu-content').innerHTML = editGioiThieuContent.value;
        clonedDocument.getElementById('footer-content').innerHTML = editFooterContent.value;

        // 3. Cập nhật các danh sách phức tạp
        // --- Cập nhật Văn kiện ---
        const vanKienListClone = clonedDocument.getElementById('van-kien-list');
        vanKienListClone.innerHTML = ''; // Xóa nội dung cũ
        editVanKienList.querySelectorAll('.edit-item-container').forEach(item => {
            const text = item.querySelectorAll('input')[0].value;
            const link = item.querySelectorAll('input')[1].value;
            if(text.trim()) { // Chỉ thêm nếu có tên
                vanKienListClone.innerHTML += `
                    <div class="van-kien-item">
                        <span>${text}</span>
                        <a href="${link}" class="btn" download>Tải về</a>
                    </div>`;
            }
        });

        // --- Cập nhật Nhân sự ---
        const nhanSuListClone = clonedDocument.getElementById('nhan-su-list');
        nhanSuListClone.innerHTML = '';
        editNhanSuList.querySelectorAll('.edit-item-container').forEach(item => {
            const name = item.querySelectorAll('input')[0].value;
            const position = item.querySelectorAll('input')[1].value;
            const imgSrc = item.querySelectorAll('input')[2].value;
            if(name.trim()) {
                nhanSuListClone.innerHTML += `
                    <div class="nhan-su-card">
                        <img src="${imgSrc}" alt="Ảnh chân dung của ${name}">
                        <div class="nhan-su-info">
                            <h4>${name}</h4>
                            <p>${position}</p>
                        </div>
                    </div>`;
            }
        });

        // --- Cập nhật Tin tức ---
        const tinTucListClone = clonedDocument.getElementById('tin-tuc-list');
        tinTucListClone.innerHTML = '';
        editTinTucList.querySelectorAll('.edit-item-container').forEach(item => {
            const title = item.querySelector('input').value;
            const content = item.querySelector('textarea').value;
             if(title.trim()) {
                tinTucListClone.innerHTML += `
                     <article class="tin-tuc-item">
                        <h4>${title}</h4>
                        <p>${content}</p>
                    </article>`;
            }
        });
        
        // 4. Xóa Bảng quản trị và thẻ script ra khỏi file HTML cuối cùng
        clonedDocument.getElementById('admin-panel').remove();
        clonedDocument.querySelector('script').remove();

        // 5. Tạo và kích hoạt việc tải file
        const finalHtml = '<!DOCTYPE html>\n' + clonedDocument.documentElement.outerHTML;
        const blob = new Blob([finalHtml], { type: 'text/html;charset=utf-8' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'index_updated.html';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href); // Giải phóng bộ nhớ
        
        alert('File "index_updated.html" đã được tạo và đang được tải về!\nHãy đổi tên file thành "index.html" và tải lên hosting để cập nhật trang web.');
    });

});
