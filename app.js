   //######### TASKS ################################ 
    // DOM ELEMENTS
    const todoList = document.getElementById('todo-list');
    const saveButton = document.getElementById('save-btn');
    // DELETE TASKS DOM
    const deleteAllButton = document.getElementById('delete-all-btn');
    deleteAllButton.addEventListener('click', deleteAllTasks);
    // EXPORT DOM
    const exportButton = document.getElementById('export-btn');
    exportButton.addEventListener('click', exportTodoList);
       //PRINT
       function exportTodoList() {
        window.print();
        }
    // INPUT DOM
    const todoInput = document.getElementById('input');
    todoInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
       addTask();
        }
        });
      // FUNCTION TO ADD TASK
        function addTask() {
            const taskText = todoInput.value.trim();
            if (taskText !== '') {
                const taskElement = document.createElement('div');
                taskElement.className = 'todo-item';
                taskElement.innerHTML = `
          <input type="checkbox" class="toggle-task">
          <span>${taskText}</span>
          <span class="delete-btn">X</span>
        `;
                const deleteButton = taskElement.querySelector('.delete-btn');
                deleteButton.addEventListener('click', deleteTask);
    
                const toggleCheckbox = taskElement.querySelector('.toggle-task');
                toggleCheckbox.addEventListener('change', toggleTask);
    
                todoList.appendChild(taskElement);
                todoInput.value = '';
        // SAVE ADDED TASK
                saveTasks(); 
            }
        }
        //DELETE A SINGLE TASK
        function deleteTask(event) {
            const taskElement = event.target.parentNode;
            todoList.removeChild(taskElement);
            saveTasks(); 
        }
        // DELETE ALL TASKS!!!!
            function deleteAllTasks() {
            todoList.innerHTML = '';
            saveTasks(); 
        }
        //FUNCTION TO TOGGLE
        function toggleTask(event) {
            const taskElement = event.target.parentNode;
            taskElement.classList.toggle('completed');
            saveTasks();
        }
        //FUNCTION TO SAVE TASKS
        function saveTasks() {
            const tasks = [];
            const taskElements = document.getElementsByClassName('todo-item');
            for (let i = 0; i < taskElements.length; i++) {
                const taskText = taskElements[i].querySelector('span').textContent;
                const isCompleted = taskElements[i].classList.contains('completed');
                tasks.push({ text: taskText, completed: isCompleted });
            }
            localStorage.setItem('tasks', JSON.stringify(tasks));
            }

        //LOAD LOCAL
        function loadTasks() {
            const tasks = localStorage.getItem('tasks');
            if (tasks) {
                const parsedTasks = JSON.parse(tasks);
                parsedTasks.forEach((task) => {
                    const taskElement = document.createElement('div');
                    taskElement.className = 'todo-item';
                    taskElement.innerHTML = `
          <input type="checkbox" class="toggle-task">
          <span>${task.text}</span>
          <span class="delete-btn">X</span>
        `;
        // COMPLETED TASKS
                if (task.completed) {
                    taskElement.classList.add('completed');
                }
                const deleteButton = taskElement.querySelector('.delete-btn');
                deleteButton.addEventListener('click', deleteTask);

                const toggleCheckbox = taskElement.querySelector('.toggle-task');
                toggleCheckbox.addEventListener('change', toggleTask);

                todoList.appendChild(taskElement);
            });
          }
        }
    // LOAD SAVED TASKS
    loadTasks();
//
    //######### TIME ################################
    function callTime(){ // name function
         let NowDate=(new Date()).toDateString();
    // GET DATE
        let NowTime=(new Date()).toLocaleTimeString(); 
    // DOM
    document.getElementById('time').innerHTML=`${NowDate}-${NowTime}`;
      }
      // CALL FUNCTION in MS
    setInterval(function(){  callTime() }, 1000);
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
     // FUNCTION TO CLEAR NOTES
        function clearInput() {
            let textAreas = document.getElementsByClassName('userInput');
          for (let i = 0; i < textAreas.length; i++) {
            textAreas[i].value = '';
          }
          localStorage.removeItem('savedInput');
        }

        // FUNCTION TO SAVE NOTES
        function saveInput() {
        let textAreas = document.getElementsByClassName('userInput');
        let savedInput = '';
      
        for (let i = 0; i < textAreas.length; i++) {
          let userInput = textAreas[i].value;
          savedInput += userInput + '\n';
        }
        localStorage.setItem('savedInput', savedInput);
        }
        // CALL FUNCTION
        loadInput();
        // SAVE NOTES
        saveButton.addEventListener('click', saveInput);
//
//
// END OF SCRIPT // 
