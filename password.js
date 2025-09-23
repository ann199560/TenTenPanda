
document.addEventListener("DOMContentLoaded", () => {
  const emailInput = document.getElementById("emailFindInput");
  const letterBtn = document.getElementById("letterBtn");

  // 即時檢查 email 格式
  emailInput.addEventListener("input", () => {
    if (emailInput.checkValidity()) {
      letterBtn.disabled = false;
    } else {
      letterBtn.disabled = true;
    }
  });

  // Modal 出現後 → 延遲 1.5 秒跳轉
  const letterModal = document.getElementById("letterModal");
  letterModal.addEventListener("shown.bs.modal", () => {
    setTimeout(() => {
      window.location.href = "login.html";
    }, 1500);
  });
});