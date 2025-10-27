:root {
    --primary-color: #0d47a1; /* Màu xanh đậm của Đoàn */
    --secondary-color: #1976d2; /* Màu xanh sáng hơn */
    --text-color: #333333;
    --light-gray: #f5f7fa;
    --white: #ffffff;
    --border-color: #e0e0e0;
    --box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    scroll-behavior: smooth;
}

body {
    /* Ưu tiên UTM Avo, nếu không có sẽ dùng Montserrat */
    font-family: 'UTM Avo', 'Montserrat', sans-serif;
    line-height: 1.7;
    color: var(--text-color);
    background-color: var(--white);
}

.container {
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 20px;
}

section {
    padding: 60px 0;
}

.section-bg {
    background-color: var(--light-gray);
}

h1, h2, h3, h4 {
    color: var(--primary-color);
    margin-bottom: 20px;
}

h3 {
    text-align: center;
    font-size: 2.2rem;
    text-transform: uppercase;
    font-weight: 700;
}

.btn {
    display: inline-block;
    background: var(--secondary-color);
    color: var(--white);
    padding: 10px 20px;
    border-radius: 5px;
    text-decoration: none;
    font-weight: 500;
    transition: background-color 0.3s ease, transform 0.2s ease;
}

.btn:hover {
    background: var(--primary-color);
    transform: translateY(-2px);
}


/* ========================================================== */
/* ======================== HEADER ========================== */
/* ========================================================== */
header {
    background: var(--white);
    padding: 15px 0;
    box-shadow: var(--box-shadow);
    position: sticky;
    top: 0;
    z-index: 1000;
    width: 100%;
}

header .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

header .logo img {
    height: 60px;
    cursor: pointer; /* Thêm con trỏ để gợi ý có thể click */
}

header .title-container {
    text-align: center;
    flex-grow: 1;
    padding: 0 20px; /* Thêm khoảng đệm để không bị dính vào logo và nav */
}

header h1 {
    /* Ưu tiên UTM Impact, nếu không có sẽ dùng font mặc định của h1 */
    font-family: 'UTM Impact', 'Montserrat', sans-serif;
    font-size: 1.8rem;
    margin: 0;
    text-transform: uppercase;
}

header h2 {
    font-size: 1.3rem;
    margin: 0;
    color: var(--secondary-color);
    font-weight: 500;
}

header nav a {
    color: var(--primary-color);
    text-decoration: none;
    margin: 0 15px;
    font-weight: 500;
    position: relative;
    padding-bottom: 5px;
    white-space: nowrap; /* Đảm bảo các mục menu không bị xuống dòng */
}

header nav a::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: var(--secondary-color);
    transition: width 0.3s ease-in-out;
}

header nav a:hover::after {
    width: 100%;
}


/* ========================================================== */
/* ===================== NỘI DUNG CHÍNH ===================== */
/* ========================================================== */

/* Giới thiệu */
#gioi-thieu-content p {
    margin-bottom: 15px;
    font-size: 1.1rem;
    text-align: justify;
}

/* Văn kiện */
.van-kien-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: var(--white);
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 15px;
    box-shadow: var(--box-shadow);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.van-kien-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.van-kien-item span {
    font-weight: 500;
    font-size: 1.1rem;
    margin-right: 20px;
}

/* Nhân sự */
.nhan-su-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 30px;
}

.nhan-su-card {
    background: var(--white);
    border-radius: 8px;
    overflow: hidden;
    text-align: center;
    box-shadow: var(--box-shadow);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.nhan-su-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
}

.nhan-su-card img {
    width: 100%;
    height: 280px;
    object-fit: cover;
    display: block;
}

.nhan-su-info {
    padding: 20px;
}

.nhan-su-info h4 {
    margin-bottom: 5px;
    font-size: 1.3rem;
}

.nhan-su-info p {
    color: var(--secondary-color);
    font-size: 1rem;
    margin: 0;
}

/* Tin tức */
.tin-tuc-item {
    background: var(--white);
    padding: 25px;
    border-radius: 8px;
    margin-bottom: 20px;
    box-shadow: var(--box-shadow);
}

.tin-tuc-item h4 {
    margin-bottom: 10px;
    font-size: 1.4rem;
}


/* ========================================================== */
/* ======================== FOOTER ========================== */
/* ========================================================== */
footer {
    background: var(--primary-color);
    color: var(--white);
    text-align: center;
    padding: 30px 0;
}

footer p {
    margin: 5px 0;
}


/* ========================================================== */
/* ====================== ADMIN PANEL ======================= */
/* ========================================================== */

.hidden {
    display: none !important;
}

#admin-panel {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 2000;
    display: flex;
    justify-content: center;
    align-items: center;
}

/* Form đăng nhập */
#login-form-container {
    background: var(--white);
    padding: 40px;
    border-radius: 8px;
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

#login-form-container h3 {
    text-align: center;
    font-size: 1.8rem;
}

#login-form-container input {
    padding: 12px;
    margin-bottom: 15px;
    border: 1px solid var(--border-color);
    border-radius: 5px;
    font-size: 1rem;
}

#login-form-container button {
    padding: 12px;
    border: none;
    border-radius: 5px;
    background-color: var(--primary-color);
    color: var(--white);
    font-size: 1.1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

#login-form-container button:hover {
    background-color: #0b3a82;
}

#login-error {
    color: #d32f2f;
    text-align: center;
    margin-top: 10px;
}

/* Bảng điều khiển */
#dashboard {
    background: var(--light-gray);
    width: 95%;
    max-width: 1200px;
    height: 90vh;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

.dashboard-header, .dashboard-footer {
    padding: 20px;
    background: var(--white);
    flex-shrink: 0;
}

.dashboard-header {
    border-bottom: 1px solid var(--border-color);
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.dashboard-header h2{
    margin: 0;
}
.dashboard-header p{
    margin: 0;
    color: #757575;
}

.dashboard-content {
    padding: 20px;
    overflow-y: auto;
    flex-grow: 1;
}

.dashboard-section {
    background: var(--white);
    padding: 25px;
    border-radius: 8px;
    margin-bottom: 20px;
    border: 1px solid var(--border-color);
}

.dashboard-section h3 {
    font-size: 1.5rem;
    padding-bottom: 15px;
    border-bottom: 1px solid var(--border-color);
}

.dashboard-section label {
    display: block;
    margin: 15px 0 5px;
    font-weight: 500;
}

.dashboard-section input[type="text"],
.dashboard-section input[type="url"],
.dashboard-section textarea {
    width: 100%;
    padding: 10px;
    font-size: 1rem;
    border: 1px solid var(--border-color);
    border-radius: 5px;
    font-family: 'UTM Avo', 'Montserrat', sans-serif;
}

.dashboard-section textarea {
    resize: vertical;
    min-height: 100px;
}

.btn-add {
    background: #28a745;
    color: white;
    padding: 8px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 15px;
}
.btn-add:hover{
    background: #218838;
}

.btn-remove {
    background: #dc3545;
    color: white;
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 0.9rem;
}
.btn-remove:hover {
    background: #c82333;
}

.edit-item-container {
    padding: 15px;
    border: 1px dashed var(--border-color);
    border-radius: 5px;
    margin-bottom: 15px;
    display: grid;
    gap: 10px;
}

.edit-item-container.van-kien-edit { grid-template-columns: 1fr auto auto; align-items: center; }
.edit-item-container.nhan-su-edit { grid-template-columns: 1fr 1fr; }
.edit-item-container.tin-tuc-edit { grid-template-columns: 1fr; } /* Thay đổi để textarea rộng hơn */
.edit-item-container.tin-tuc-edit .btn-remove { margin-top: 10px; }


.dashboard-footer {
    text-align: center;
    border-top: 1px solid var(--border-color);
    display: flex;
    justify-content: center;
    align-items: center;
}

.dashboard-footer button {
    width: 100%;
    max-width: 500px;
    padding: 15px;
    font-size: 1.2rem;
    font-weight: 700;
    cursor: pointer;
    color: var(--white);
    border: none;
    border-radius: 5px;
    transition: background-color 0.3s ease;
}

#generate-html-btn {
    background: var(--primary-color);
}

#generate-html-btn:hover {
    background: #0b3a82;
}

#export-json-btn:hover {
    filter: brightness(0.9);
}


/* ========================================================== */
/* ===================== RESPONSIVE ========================= */
/* ========================================================== */

@media (max-width: 992px) {
    header .container {
        flex-direction: column;
        gap: 15px;
    }

    header nav {
        margin-top: 10px;
    }
}

@media (max-width: 768px) {
    h3 { font-size: 1.8rem; }
    header h1 { font-size: 1.4rem; }
    header h2 { font-size: 1.1rem; }
    header nav a { margin: 0 10px; }

    /* === MỚI: Canh lề trái cho văn bản để dễ đọc trên mobile === */
    #gioi-thieu-content p {
        text-align: left;
    }

    .nhan-su-grid {
        grid-template-columns: 1fr 1fr;
    }

    .edit-item-container {
        grid-template-columns: 1fr !important;
    }

    /* === MỚI: Sửa giao diện Bảng điều khiển trên mobile === */
    .dashboard-header {
        flex-direction: column; /* Xếp chồng các mục */
        align-items: flex-start; /* Canh lề trái */
        gap: 10px;
    }

    .dashboard-header h2 {
        font-size: 1.4rem;
    }

    .dashboard-content, .dashboard-section {
        padding: 15px; /* Giảm padding để có thêm không gian */
    }
}

@media (max-width: 580px) {
    /* === MỚI: Xếp chồng 2 nút ở cuối Bảng điều khiển === */
    .dashboard-footer {
        flex-direction: column;
        gap: 15px;
    }

    .dashboard-footer button {
        font-size: 1rem;
    }
}

@media (max-width: 480px) {
    header .title-container {
        text-align: center;
    }
    
    header nav {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }
    
    header nav a {
        margin: 5px 10px;
    }

    .nhan-su-grid {
        grid-template-columns: 1fr;
    }
    
    /* === MỚI: Điều chỉnh Văn kiện trên màn hình rất nhỏ === */
    .van-kien-item {
        flex-direction: column;
        gap: 15px;
        text-align: center;
    }
}
