// ===== 変数定義（すべてキャメルケース） =====
const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");

// ===== ローカルストレージからデータを読み込む関数 =====
function loadTasks() {
  // ローカルストレージから'tasks'というキーでデータを取得
  const savedTasks = localStorage.getItem("tasks");

  // データが存在する場合は、JSON形式から配列に変換して返す
  // 存在しない場合は、空の配列を返す
  return savedTasks ? JSON.parse(savedTasks) : [];
}

// ===== ローカルストレージにデータを保存する関数 =====
function saveTasks(tasks) {
  // 配列をJSON形式の文字列に変換してローカルストレージに保存
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ===== タスクを画面に表示する関数 =====
function renderTasks() {
  // 現在の表示をクリア
  taskList.innerHTML = "";

  // ローカルストレージからタスクを読み込む
  const tasks = loadTasks();

  // 各タスクをループで表示
  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    // 完了済みの場合はクラスを追加
    if (task.completed) {
      li.classList.add("completed");
    }

    // タスクのテキスト部分
    const span = document.createElement("span");
    span.textContent = task.text;
    span.addEventListener("click", () => toggleTask(index));

    // 削除ボタン
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "🗑️";
    deleteButton.className = "delete-button";
    deleteButton.addEventListener("click", () => deleteTask(index));

    li.appendChild(span);
    li.appendChild(deleteButton);
    taskList.appendChild(li);
  });
}

// ===== タスクを追加する関数 =====
function addTask() {
  const text = taskInput.value.trim();

  if (text === "") {
    alert("タスクを入力してください");
    return;
  }

  // 既存のタスクを読み込む
  const tasks = loadTasks();

  // 新しいタスクを追加
  tasks.push({
    text: text,
    completed: false,
  });

  // ローカルストレージに保存
  saveTasks(tasks);

  // 入力欄をクリア
  taskInput.value = "";

  // 画面を更新
  renderTasks();
}

// ===== タスクの完了状態を切り替える関数 =====
function toggleTask(index) {
  const tasks = loadTasks();
  tasks[index].completed = !tasks[index].completed;
  saveTasks(tasks);
  renderTasks();
}

// ===== タスクを削除する関数 =====
function deleteTask(index) {
  const tasks = loadTasks();
  tasks.splice(index, 1); // 指定した位置のタスクを削除
  saveTasks(tasks);
  renderTasks();
}

// ===== イベントリスナーの設定 =====
addButton.addEventListener("click", addTask);

// Enterキーでも追加できるようにする
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

// ===== ページ読み込み時に保存済みタスクを表示 =====
renderTasks();
