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
