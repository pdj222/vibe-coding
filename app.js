const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

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
