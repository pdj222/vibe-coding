const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

// 우측 상단 시계: 현재 시각과 날짜를 갱신한다
function updateClock() {
  const now = new Date();
  const pad = n => String(n).padStart(2, '0'); // 한 자리 숫자를 두 자리로 맞춤 (예: 5 -> 05)

  const h = pad(now.getHours());
  const m = pad(now.getMinutes());
  const s = pad(now.getSeconds());
  document.getElementById('time').textContent = `${h}:${m}:${s}`;

  const days = ['일', '월', '화', '수', '목', '금', '토'];
  const dateStr = `${now.getFullYear()}년 ${now.getMonth() + 1}월 ${now.getDate()}일 (${days[now.getDay()]})`;
  document.getElementById('date').textContent = dateStr;
}

updateClock(); // 초기 로드 시 바로 표시
setInterval(updateClock, 1000); // 1초마다 갱신

// 좌측 상단 달력: 이전/다음 달 이동이 가능하며, 실제 오늘 달을 볼 때만 오늘을 강조한다
const today = new Date();
let viewYear = today.getFullYear();
let viewMonth = today.getMonth();

function renderCalendar() {
  document.getElementById('calendar-title').textContent = `${viewYear}년 ${viewMonth + 1}월`;

  const firstWeekday = new Date(viewYear, viewMonth, 1).getDay(); // 보이는 달 1일의 요일 (0=일)
  const lastDate = new Date(viewYear, viewMonth + 1, 0).getDate(); // 보이는 달 마지막 날짜
  const isCurrentMonth = viewYear === today.getFullYear() && viewMonth === today.getMonth();

  const daysEl = document.getElementById('calendar-days');
  daysEl.innerHTML = ''; // 재호출 시 이전 달의 날짜 칸을 제거

  for (let i = 0; i < firstWeekday; i++) {
    daysEl.appendChild(document.createElement('span')); // 1일 이전 빈 칸
  }

  for (let d = 1; d <= lastDate; d++) {
    const cell = document.createElement('span');
    cell.textContent = d;
    if (isCurrentMonth && d === today.getDate()) cell.classList.add('today');
    daysEl.appendChild(cell);
  }
}

document.getElementById('calendar-prev').addEventListener('click', () => {
  viewMonth -= 1;
  if (viewMonth < 0) {
    // 1월에서 이전으로 가면 전년도 12월로 넘어감
    viewMonth = 11;
    viewYear -= 1;
  }
  renderCalendar();
});

document.getElementById('calendar-next').addEventListener('click', () => {
  viewMonth += 1;
  if (viewMonth > 11) {
    // 12월에서 다음으로 가면 다음년도 1월로 넘어감
    viewMonth = 0;
    viewYear += 1;
  }
  renderCalendar();
});

renderCalendar();

// 할 일 목록: todos 배열을 유일한 상태로 두고, 변경마다 저장 후 다시 그린다
const TODOS_STORAGE_KEY = 'todos';

function loadTodos() {
  try {
    // 저장된 값이 없거나 JSON 파싱에 실패하면 빈 목록으로 시작
    return JSON.parse(localStorage.getItem(TODOS_STORAGE_KEY)) || [];
  } catch {
    return []; // 저장된 값이 손상된 경우 빈 목록으로 시작
  }
}

function saveTodos() {
  localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos));
}

function renderTodos() {
  list.innerHTML = ''; // 매번 todos 배열을 기준으로 전체를 다시 그림

  todos.forEach(todo => {
    const li = document.createElement('li');
    li.className = 'todo-item' + (todo.completed ? ' completed' : '');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.addEventListener('change', () => {
      todo.completed = checkbox.checked;
      saveTodos();
      renderTodos();
    });

    const span = document.createElement('span');
    span.textContent = todo.text;

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = '✕';
    deleteBtn.addEventListener('click', () => {
      todos = todos.filter(t => t.id !== todo.id);
      saveTodos();
      renderTodos();
    });

    li.append(checkbox, span, deleteBtn);
    list.appendChild(li);
  });
}

let todos = loadTodos();
renderTodos();

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  todos.push({ id: Date.now(), text, completed: false }); // Date.now()로 항목마다 고유 id 부여
  saveTodos();
  renderTodos();

  input.value = '';
  input.focus();
});
