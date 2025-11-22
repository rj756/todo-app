// DOM要素を取得
const taskInput = document.getElementById('taskInput');
const addButton = document.getElementById('addButton');
const taskList = document.getElementById('taskList');

// タスクを追加する関数
function addTask() {
    const taskText = taskInput.value.trim();
    
    // 空文字チェック
    if (taskText === '') {
        alert('タスクを入力してください');
        return;
    }
    
    // リストアイテムを作成
    const li = document.createElement('li');
    li.className = 'task-item';
    li.textContent = taskText;
    
    // 削除ボタンを作成
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '削除';
    deleteBtn.className = 'delete-btn';
    deleteBtn.onclick = function() {
        li.remove();
    };
    
    // 完了機能（クリックで取り消し線）
    li.onclick = function(e) {
        if (e.target !== deleteBtn) {
            li.classList.toggle('completed');
        }
    };
    
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
    
    // 入力欄をクリア
    taskInput.value = '';
}

// ボタンクリックで追加
addButton.addEventListener('click', addTask);

// Enterキーでも追加
taskInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});