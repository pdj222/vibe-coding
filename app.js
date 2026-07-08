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

// 좌측 상단 달력: 이번 달 날짜를 그리고 오늘을 강조 표시한다
function renderCalendar() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const today = now.getDate();

  document.getElementById('calendar-title').textContent = `${year}년 ${month + 1}월`;

  const firstWeekday = new Date(year, month, 1).getDay(); // 이번 달 1일의 요일 (0=일)
  const lastDate = new Date(year, month + 1, 0).getDate(); // 이번 달 마지막 날짜

  const daysEl = document.getElementById('calendar-days');
  daysEl.innerHTML = ''; // 재호출 시 이전 달의 날짜 칸을 제거

  for (let i = 0; i < firstWeekday; i++) {
    daysEl.appendChild(document.createElement('span')); // 1일 이전 빈 칸
  }

  for (let d = 1; d <= lastDate; d++) {
    const cell = document.createElement('span');
    cell.textContent = d;
    if (d === today) cell.classList.add('today');
    daysEl.appendChild(cell);
  }
}

renderCalendar();

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  const li = document.createElement('li');
  li.className = 'todo-item';

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.addEventListener('change', () => {
    li.classList.toggle('completed', checkbox.checked);
  });

  const span = document.createElement('span');
  span.textContent = text;

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'delete-btn';
  deleteBtn.textContent = '✕';
  deleteBtn.addEventListener('click', () => {
    li.remove();
  });

  li.append(checkbox, span, deleteBtn);
  list.appendChild(li);

  input.value = '';
  input.focus();
});
