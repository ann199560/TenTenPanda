document.addEventListener("DOMContentLoaded", () => {
  const editBtn = document.getElementById("editBtn");
  const saveBtn = document.getElementById("saveBtn");
  const cancelBtn = document.getElementById("cancelBtn");
  const inputs = document.querySelectorAll("input");

  // 點擊修改 → 啟用輸入框、隱藏修改按鈕
  editBtn.addEventListener("click", () => {
    inputs.forEach((input) => (input.disabled = false));
    editBtn.classList.add("invisible");
    saveBtn.classList.remove("d-none");
    cancelBtn.classList.remove("d-none");
  });

  // 點擊取消 → 還原 disabled、還原修改按鈕
  cancelBtn.addEventListener("click", () => {
    inputs.forEach((input) => (input.disabled = true));
    editBtn.classList.remove("invisible");
    saveBtn.classList.add("d-none");
    cancelBtn.classList.add("d-none");
  });

  // 點擊儲存
  saveBtn.addEventListener("click", () => {
    inputs.forEach((input) => (input.disabled = true));
    editBtn.classList.remove("invisible");
    saveBtn.classList.add("d-none");
    cancelBtn.classList.add("d-none");
  });
});
