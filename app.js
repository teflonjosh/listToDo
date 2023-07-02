// ------JavaScript File for Page----//
//
//######### PRINT################################
// EXPORT DOM
    const exportor = document.getElementById('printBut');
    exportor.addEventListener('click', exportTodoList);
//PRINT
    function exportTodoList() {
      window.print();
    }
//
//######### TASKS ################################
// DOM TASKS
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
// ADD
    const addTaskBtn = document.getElementById('add-task-btn');
    addTaskBtn.addEventListener('click', addTask);
// FUNCTION TO ADD 
    function addTask() {
      const taskText = taskInput.value.trim();
      if (taskText !== '') {
        const taskItem = document.createElement('li');
        taskItem.classList.add('task-item');
        const toggleCheckbox = document.createElement('input');
        toggleCheckbox.type = 'checkbox';
        toggleCheckbox.addEventListener('change', toggleTaskCompletion);
        const taskTextSpan = document.createElement('span');
        taskTextSpan.innerText = taskText;
        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'x';
        deleteBtn.addEventListener('click', deleteTask);
        taskItem.appendChild(toggleCheckbox);
        taskItem.appendChild(taskTextSpan);
        taskItem.appendChild(deleteBtn);
        taskList.appendChild(taskItem);
        taskInput.value = '';
      }
    }
// FUNCTION TO TOGGLE
    function toggleTaskCompletion(event) {
      const taskElement = event.target.parentNode;
      const taskText = taskElement.querySelector('span');
      taskText.classList.toggle('completed');
//
      const toggleCheckbox = event.target;
      if (toggleCheckbox.checked) {
        taskElement.classList.add('completed');
      } else {
        taskElement.classList.remove('completed');
      }
    }
// FUNCTION TO DELETE SINGLE TASK
    function deleteTask(event) {
      const taskItem = event.target.parentNode;
      taskList.removeChild(taskItem);
    }
// DELETE ALL
    const deleteAll = document.getElementById('deleteTodo');
    deleteAll.addEventListener('click', deleteAllTasks);
// FUNCTION TO DELETE ALL
    function deleteAllTasks() {
      taskList.innerHTML = '';
    }
// SAVE
    const saveBut = document.getElementById('saveBut');
    saveBut.addEventListener('click', saveTask);
// FUNCTION TO SAVE
    function saveTask() {
      const tasks = [];
      const taskItems = taskList.querySelectorAll('.task-item');
      taskItems.forEach((item) => {
        tasks.push({
          text: item.querySelector('span').innerText,
          completed: item.querySelector('input[type="checkbox"]').checked,
        });
      });
      localStorage.setItem('savedTasks', JSON.stringify(tasks));
      alert('Current Task List Has Been Saved. Please Select LOAD to Review Saved Tasks.');
    }
// LOAD
    const loadBut = document.getElementById('load');
    loadBut.addEventListener('click', loadTask);
// FUNCTION TO LOAD 
    function loadTask() {
      const savedTasks = localStorage.getItem('savedTasks');
      if (savedTasks) {
        const tasks = JSON.parse(savedTasks);
        taskList.innerHTML = '';
//
        tasks.forEach((task) => {
          const taskItem = document.createElement('li');
          taskItem.classList.add('task-item');
          const toggleCheckbox = document.createElement('input');
          toggleCheckbox.type = 'checkbox';
          toggleCheckbox.addEventListener('change', toggleTaskCompletion);
          const taskTextSpan = document.createElement('span');
          taskTextSpan.innerText = task.text;
          const deleteBtn = document.createElement('button');
          deleteBtn.innerText = 'x';
          deleteBtn.addEventListener('click', deleteTask);
          if (task.completed) {
            taskTextSpan.classList.add('completed');
            toggleCheckbox.checked = true;
          }
//
          taskItem.appendChild(toggleCheckbox);
          taskItem.appendChild(taskTextSpan);
          taskItem.appendChild(deleteBtn);
          taskList.appendChild(taskItem);
        });
        alert('Previously Saved Tasks Have Been Successfully Loaded.');
      } else {
        alert('No Previously Saved Tasks Located. Please Review Workflow and Try Again.');
      }
    }
//
//######### TIME ################################
    function callTime() { // name function
      let NowDate = (new Date()).toDateString();
// GET DATE
      let NowTime = (new Date()).toLocaleTimeString();
// DOM
      document.getElementById('time').innerHTML = `${NowDate}-${NowTime}`;
    }
// CALL FUNCTION in MS
    setInterval(function () { callTime() }, 1000);
//
//################ CALENDAR ####################
    let today = new Date();
    let formattedDate = today.toISOString().split('T')[0];
    document.getElementById("date").value = formattedDate;

    function saveInput() {
      let textAreas = document.getElementsByClassName('userInput');
      let savedInput = '';

      for (let i = 0; i < textAreas.length; i++) {
        let userInput = textAreas[i].value;
        savedInput += userInput + '';
      }

      localStorage.setItem('savedInput', savedInput);
    }
//
//################ NOTE INPUT ####################  
    function loadInput() {
      var savedInput = localStorage.getItem('savedInput');
      if (savedInput) {
        let textAreas = document.getElementsByClassName('userInput');
        let savedLines = savedInput.split('\n');
        for (let i = 0; i < textAreas.length; i++) {
          textAreas[i].value = savedLines[i];
        }
      }
    }
// DELETE NOTES
    const clearNote = document.getElementById('clear-notes');
    clearNote.addEventListener('click', clearInput);
// FUNCTION TO CLEAR NOTES
    function clearInput() {
      let textAreas = document.getElementsByClassName('userInput');
      for (let i = 0; i < textAreas.length; i++) {
        textAreas[i].value = '';
      }
      localStorage.removeItem('savedInput');
    }
// SAVE NOTES
    const saveIn = document.getElementById('save-input');
    saveIn.addEventListener('click', saveInput);
// FUNCTION TO SAVE NOTES
    function saveInput() {
      let textAreas = document.getElementsByClassName('userInput');
      let savedInput = '';

      for (let i = 0; i < textAreas.length; i++) {
        let userInput = textAreas[i].value;
        savedInput += userInput + '\n';
      }
      localStorage.setItem('savedInput', savedInput);
      alert('Current Notes Input Has Been Saved');
    }
// CALL FUNCTION
    loadInput();
// LOADING 
    const loadNotes = document.getElementById('onLoad');
    loadNotes.addEventListener('load', loadInput);
//
//--END OF SCRIPT--//         
