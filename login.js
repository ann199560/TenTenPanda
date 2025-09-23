
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
    } else if(input.checkValidity()) {
      input.classList.remove("is-invalid");
      input.classList.add("is-valid");
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
        loginModal.style.display = "none";
        // 登入跳轉首頁
        localStorage.setItem("isLogin", "true"); // 存在 localStorage
        window.location.href = "index.html";
      }, 1500); // 1500 毫秒 = 1.5 秒
    });
  }
}

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
// login 頁面 - end



