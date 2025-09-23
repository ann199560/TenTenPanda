

// join 頁面 - go

/* 初始模式是預設狀態，開始善打出現錯誤格式時才亮紅匡 */
const inputs = document.querySelectorAll(".form-control");

inputs.forEach(input => {
  input.addEventListener("blur", function() {
    if (!input.checkValidity()) {
      input.classList.add("is-invalid");
      input.classList.remove("is-valid");
    } else if(input.checkValidity()) {
      input.classList.remove("is-invalid");
      input.classList.add("is-valid");
    }
  });
});


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
    const modalEl = document.getElementById("joinModal");
    //const modal = new bootstrap.Modal(modalEl);
    //modal.show();

    // 1.5 秒後自動關閉並跳轉
    setTimeout(() => {
      modalEl.style.display = "none";
      window.location.href = "login.html";
    }, 1500);
  });


    document.addEventListener("DOMContentLoaded", function () {
    var swiper = new Swiper(".mySwiper", {
      loop: true,
      initialSlide: 0, // 強制從第一張開始
      slidesPerView: 1,   // ⭐ 每次只顯示一張
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
      },
      on: {
        afterInit: function () {
          this.slideToLoop(0, 0); // 初始化後跳到真正的第一張
        },
      },
    });
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

  setupToggle("passwordInput", "togglePassword");
  setupToggle("passwordReInput", "togglePasswordRe");

// join 頁面 - end