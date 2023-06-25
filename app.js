   const todoInput = document.getElementById('input');
        const todoList = document.getElementById('todo-list');
        const saveButton = document.getElementById('save-btn');
        //
        const deleteAllButton = document.getElementById('delete-all-btn');
    deleteAllButton.addEventListener('click', deleteAllTasks);
        //
        const exportButton = document.getElementById('export-btn');
    exportButton.addEventListener('click', exportTodoList);
        // Load tasks 
        loadTasks();
        // Function to add a new task
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
    
                saveTasks(); // Save 
            }
        }
        //delete a task
        function deleteTask(event) {
            const taskElement = event.target.parentNode;
            todoList.removeChild(taskElement);
            saveTasks(); // Save 
        }
        // DELETE ALL TASKS!!!!
            function deleteAllTasks() {
            todoList.innerHTML = '';
            saveTasks(); // Save 
        }
        //toggle a task
        function toggleTask(event) {
            const taskElement = event.target.parentNode;
            taskElement.classList.toggle('completed');
            saveTasks(); // Save tasks to local storage
        }
        //Function to SAVE 
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
        //Export Tasks
        function exportTodoList() {
        window.print();
        }
        //load tasks from local storage
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
        // Event listener for INPUT
        todoInput.addEventListener('keypress', function (event) {
          if (event.key === 'Enter') {
            addTask();
          }
        });
 
    //######### Script for TIME #########################################################################################
    function callTime(){ // name function
         let NowDate=(new Date()).toDateString();
    // GET DATE
        let NowTime=(new Date()).toLocaleTimeString(); 
    // insert to DOM
    document.getElementById('time').innerHTML=`${NowDate}-${NowTime}`;
      }
      // setInterval to CALL FUNCTION in MS
    setInterval(function(){  callTime() }, 1000);
    //################ Calender Date ######################################################################################
        let today = new Date();
        let formattedDate = today.toISOString().split('T')[0];
        document.getElementById("date").value = formattedDate;
     
        function saveInput() {
          let textAreas = document.getElementsByClassName('userInput');
          let savedInput = '';
    
          for (var i = 0; i < textAreas.length; i++) {
            let userInput = textAreas[i].value;
            savedInput += userInput + '\n';
          }
    
          localStorage.setItem('savedInput', savedInput);
        }
    
        function loadInput() {
          var savedInput = localStorage.getItem('savedInput');
          if (savedInput) {
            let textAreas = document.getElementsByClassName('userInput');
            let savedLines = savedInput.split('\n');
            for (var i = 0; i < textAreas.length; i++) {
              textAreas[i].value = savedLines[i];
            }
          }
        }
    
        function clearInput() {
            let textAreas = document.getElementsByClassName('userInput');
          for (var i = 0; i < textAreas.length; i++) {
            textAreas[i].value = '';
          }
          localStorage.removeItem('savedInput');
        }
