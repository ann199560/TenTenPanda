import "./assets/scss/all.scss";
import 'bootstrap/dist/js/bootstrap.min.js';

// 下拉選單的 icon 變化效果
const dropdownEl = document.getElementById("productList");
const iconEl = document.getElementById("dropdownIcon");

dropdownEl.addEventListener("show.bs.dropdown", () => {
  iconEl.textContent = "keyboard_arrow_up";
});

dropdownEl.addEventListener("hide.bs.dropdown", () => {
  iconEl.textContent = "keyboard_arrow_down";
});

// Swiper 動畫效果
const swiper = new Swiper('.swiper', {
  // Optional parameters
  slidesPerView: "auto",
  loop: true,
  initialSlide: 3,
  centeredSlides: true,
  spaceBetween: 12,
  breakpoints: {
    992: {
      spaceBetween: 40,
    },
  },

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },
});


document.addEventListener('DOMContentLoaded', () => {
  const news = document.querySelector('.news');
  if (!news) return;

  const list = news.querySelector('.list-group');
  if (!list) return;

  // 滑鼠 hover
  list.addEventListener('mouseover', (e) => {
    const lab = e.target.closest('label[for^="n"]');
    if (!lab || !list.contains(lab)) return;
    news.setAttribute('data-hover', lab.htmlFor.replace('n','')); // "n3" -> "3"
  });

  // 鍵盤 focus（tab 鍵也有預覽）
  list.addEventListener('focusin', (e) => {
    const lab = e.target.closest('label[for^="n"]');
    if (!lab || !list.contains(lab)) return;
    news.setAttribute('data-hover', lab.htmlFor.replace('n',''));
  });

  // 滑出或失焦 → 還原成 :checked 那張
  list.addEventListener('mouseleave', () => news.removeAttribute('data-hover'));
  list.addEventListener('focusout',   () => news.removeAttribute('data-hover'));
});




// login 頁面 - go

// 只在 submit 時才套用驗證樣式
//const form_set = document.getElementById("loginForm");

/* 初始模式是預設狀態，開始善打出現錯誤格式時才亮紅匡 */
const inputs = document.querySelectorAll(".form-control");

inputs.forEach(input => {
  input.addEventListener("blur", function() {
    if (!input.checkValidity()) {
      input.classList.add("is-invalid");
      input.classList.remove("is-valid");
      console.log('1');
    } else if(input.checkValidity()) {
      input.classList.remove("is-invalid");
      input.classList.add("is-valid");
      console.log('2');
    }
  });
});

/* 資訊格式輸入完成才能點選按鈕- go */
const form = document.getElementById("loginForm");
const loginBtn = document.getElementById("loginBtn");

// 判斷是否在登入頁 再執行
if(document.getElementById("loginForm")!= null){
  function validateForm() {
    if (form.checkValidity()) {
      loginBtn.disabled = false; // 表單驗證通過 → 啟用
    } else {
      loginBtn.disabled = true; // 驗證未通過 → 保持禁用
    }
  }
  // 監聽整個表單內所有輸入
  form.addEventListener("input", validateForm);
  // 預設載入時先檢查一次
  validateForm();

  /* 登入登出狀態改變-go */
  const loginModal = document.getElementById('loginModal');
  // 監聽 Modal 顯示事件
  if (document.getElementById('loginModal')!=null){
    loginModal.addEventListener('shown.bs.modal', () => {
      // 1.5 秒後跳轉首頁
      setTimeout(() => {
        // 關閉 modal
        const modalInstance = bootstrap.Modal.getInstance(loginModal);
        modalInstance.hide();
        // 登入跳轉首頁
        localStorage.setItem("isLogin", "true"); // 存在 localStorage
        window.location.href = "index.html";
        updateUI();
      }, 1500); // 1500 毫秒 = 1.5 秒
    });
  }
}

  const logoutBtn = document.getElementById('logoutBtn');
  // 登出按鈕點擊
  logoutBtn.addEventListener("click", () => {
    localStorage.setItem("isLogin", "false");
    window.location.href = "index.html"; // 回首頁
    updateUI();
  });

  // 每次載入頁面時檢查狀態
  const user = document.getElementById('userHeader');
  const guest = document.getElementById('guestHeader');
  function updateUI() {
    let login_state = localStorage.getItem("isLogin") === "true";
    if(login_state){
      guest.style.display = "none";
      user.style.display = "block";
    }else if (login_state == false){
      guest.style.display = "block";
      user.style.display = "none";
    }
  }
  updateUI();
/* 登入登出狀態改變 - end */

// login 頁面 - end




// join 頁面 - go

  const nameInput = document.getElementById("nameInput");      // 姓名
  const phoneInput = document.getElementById("phoneInput");    // 電話
  const addressInput = document.getElementById("addressInput");// 地址
  const emailInput = document.getElementById("emailInput");    // Email
  const passwordInput = document.getElementById("passwordInput");
  const passwordReInput = document.getElementById("passwordReInput");
  const joinBtn = document.getElementById("joinBtn");
  const joinForm = document.getElementById("joinForm");
  const passwordError = document.getElementById("passwordError");

  // 驗證表單欄位
  function validateForm() {
    const nameValid = nameInput.checkValidity();      // 中文姓名
    const phoneValid = phoneInput.checkValidity();    // 手機/市話
    const addressValid = addressInput.checkValidity();// 地址
    const emailValid = emailInput.checkValidity();    // Email

    const pw = passwordInput.value.trim();
    const pwRe = passwordReInput.value.trim();
    let passwordValid = false;

    if (pw !== "" && pwRe !== "" && pw === pwRe) {
      passwordReInput.setCustomValidity("");
      passwordError.classList.add("d-none");
      passwordValid = true;
    } else {
      if (pw !== "" && pwRe !== "" && pw !== pwRe) {
        passwordReInput.setCustomValidity("兩次輸入的密碼不一致");
        passwordError.classList.remove("d-none");
      } else {
        passwordReInput.setCustomValidity("請輸入密碼");
        passwordError.classList.add("d-none");
      }
      passwordValid = false;
    }

    // 所有欄位皆正確 → 按鈕啟用
    if (nameValid && phoneValid && addressValid && emailValid && passwordValid) {
      joinBtn.disabled = false;
    } else {
      joinBtn.disabled = true;
    }
  }

  // 即時監聽輸入
  [nameInput, phoneInput, addressInput, emailInput, passwordInput, passwordReInput]
    .forEach(input => input.addEventListener("input", validateForm));

  // 表單送出時顯示 modal
  joinForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const modalEl = document.getElementById("loginModal");
    const modal = new bootstrap.Modal(modalEl);
    modal.show();

    // 1.5 秒後自動關閉並跳轉
    setTimeout(() => {
      modal.hide();
      window.location.href = "login.html";
    }, 1500);
  });


  // 切換眼睛密碼顯示/隱藏
  function setupToggle(inputId, toggleId) {
    const input = document.getElementById(inputId);
    const toggle = document.getElementById(toggleId);

    toggle.addEventListener("click", () => {
      if (input.type === "password") {
        input.type = "text";
        toggle.textContent = "visibility"; // 眼睛打開
      } else {
        input.type = "password";
        toggle.textContent = "visibility_off"; // 眼睛關閉
      }
    });
  }
  window.updateUI = updateUI;

  setupToggle("passwordInput", "togglePassword");
  setupToggle("passwordReInput", "togglePasswordRe");

// join 頁面 - end