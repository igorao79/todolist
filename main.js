function addTask() {
  let taskInput = document.getElementById('taskInput');
  let taskList = document.getElementById('taskList');

  if (taskInput.value.trim() !== '') {
      let li = document.createElement('li');
      let span = document.createElement('span');
      span.textContent = taskInput.value;

      let prioritySelect = document.createElement('select');
      prioritySelect.innerHTML = '<option value="low">Низкий</option><option value="medium">Средний</option><option value="high">Высокий</option>';
      prioritySelect.addEventListener('change', function() {
        setPriority(this);
      });

      let dueDateInput = document.createElement('input');
      dueDateInput.type = 'date';
      dueDateInput.addEventListener('change', function() {
        setDueDate(this);
      });

      li.appendChild(span);
      li.appendChild(prioritySelect);
      li.appendChild(dueDateInput);

      let checkButton = document.createElement('button');
      checkButton.className = 'checkBtn';
      checkButton.textContent = '✔';
      checkButton.addEventListener('click', function() {
        completeTask(this);
      });

      let removeButton = document.createElement('button');
      removeButton.className = 'removeBtn';
      removeButton.textContent = '❌';
      removeButton.addEventListener('click', function() {
        removeTask(this);
      });

      let moveToTopButton = document.createElement('button');
      moveToTopButton.className = 'moveToTopBtn';
      moveToTopButton.textContent = '📎';
      moveToTopButton.addEventListener('click', function() {
        moveToTop(this);
      });

      li.appendChild(checkButton);
      li.appendChild(removeButton);
      li.appendChild(moveToTopButton);

      taskList.appendChild(li);
      taskInput.value = '';
  }
}

function setPriority(select) {
  let li = select.parentNode;
  let priority = select.value;
  li.setAttribute('data-priority', priority);
}

function setDueDate(input) {
  let li = input.parentNode;
  let dueDate = input.value;
  li.setAttribute('data-due-date', dueDate);
}

function completeTask(button) {
  let li = button.parentNode;
  let span = li.querySelector('span');
  span.classList.toggle('completed');
  if (span.classList.contains('completed')) {
    span.style.textDecoration = 'line-through';
    span.style.fontWeight = 'normal';
  } else {
    span.style.textDecoration = 'none';
    span.style.fontWeight = 'bold';
  }
}

function removeTask(button) {
  let li = button.parentNode;
  li.remove();
}

function moveToTop(button) {
  let li = button.parentNode;
  let taskList = document.getElementById('taskList');
  taskList.insertBefore(li, taskList.firstChild);
}

async function getRandomFact() {
  try {
      const response = await fetch('https://uselessfacts.jsph.pl/random.json?language=en');
      const data = await response.json();

      const translationResponse = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ru&dt=t&q=${encodeURIComponent(data.text)}`);
      const translationData = await translationResponse.json();

      const translatedFact = translationData[0][0][0];
      return translatedFact;
  } catch (error) {
      console.error('Failed to fetch random fact:', error);
      return 'Не удалось загрузить факт';
  }
}

async function showRandomFact() {
  let factElement = document.getElementById('factText');
  factElement.textContent = await getRandomFact();
}

function updateDateTime() {
  let dateTimeElement = document.getElementById('dateTime');
  let currentDate = new Date();

  let days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
  let months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

  let day = days[currentDate.getDay()];
  let date = currentDate.getDate();
  let month = months[currentDate.getMonth()];
  let year = currentDate.getFullYear();
  let hours = currentDate.getHours();
  let minutes = currentDate.getMinutes();
  let seconds = currentDate.getSeconds();

  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;

  let formattedDate = `${day}, ${date} ${month} ${year} г. ${hours}:${minutes}:${seconds}`;
  dateTimeElement.textContent = formattedDate;
}

showRandomFact();

setInterval(updateDateTime, 1000);

updateDateTime();