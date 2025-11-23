// DOM要素を取得
const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");

// タスクを追加する関数
function addTask() {
  console.log("addTask関数が呼ばれました");
  const taskText = taskInput.value.trim();

  // 空文字チェック
  if (taskText === "") {
    alert("何か入力しよう");
    return;
  }

  // リストアイテムを作成
  const li = document.createElement("li");
  li.className = "task-item";
  li.textContent = taskText;

  // 削除ボタンを作成
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "🗑️";
  deleteBtn.className = "delete-btn";
  deleteBtn.onclick = function () {
    li.remove();
  };

  // 完了機能（クリックで取り消し線）
  li.onclick = function (e) {
    if (e.target !== deleteBtn) {
      li.classList.toggle("completed");
    }
  };

  li.appendChild(deleteBtn);
  taskList.appendChild(li);

  // 入力欄をクリア
  taskInput.value = "";
}

// ボタンクリックで追加
addButton.addEventListener("click", addTask);

// Enterキーでも追加
taskInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});
