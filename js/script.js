document.addEventListener("DOMContentLoaded", function(event) { 

    function updateStatus() {
        if (this.checked) {
            var checkBoxId = this.id.replace("cb_", "").replace("_checked", "");
            var span = document.getElementById("span_" + checkBoxId);
            span.className = "checked";
            this.id = checkBoxId + "_checked";
            task = localStorage.getItem(checkBoxId);
            localStorage.setItem(this.id, task);
            localStorage.removeItem(checkBoxId);
        } else {
            var checkBoxId = this.id.replace("cb_", "");
            var checkBoxId2 = checkBoxId.replace("_checked", "");
            var span = document.getElementById("span_" + checkBoxId2);
            span.className = "";
            task = localStorage.getItem(checkBoxId);
            localStorage.setItem(checkBoxId2,task);
            localStorage.removeItem(checkBoxId);
        }
    }
    function renameTask() {
        this.addEventListener("click", function(event) {
            event.stopPropagation();
        })
        var modal = document.createElement("div");
        var body = document.getElementsByTagName("body");
        var modalInput = document.createElement("input");
        var taskBefore = this.innerText;
        var sotrageItem = this.id.replace("span_", "");
        modalInput.setAttribute('type', 'text');
        modalInput.setAttribute('value', taskBefore);
        modalInput.className = "modal-input";
        modalInput.focus();
        body[0].className ="modal-open";
        modal.className = "modal animated fadeIn";
        body[0].appendChild(modal);
        modal.appendChild(modalInput);
        modalInput.focus();
        modalInput.select();

       
        modalInput.addEventListener("click", function(event) {
            event.stopPropagation();
        })
        
        modalInput.addEventListener("keyup", function(event){
            if (event.which == 13) {
                taskBefore = modalInput.value;
                console.log(taskBefore);
                console.log(sotrageItem);
                document.getElementById("span_" + sotrageItem).innerText = modalInput.value;
                localStorage[sotrageItem] = modalInput.value;
                body[0].className = "";
                modalInput.style.display = "none";
            }
        }); 

        modalInput.addEventListener("keyup", function(event){
            if (event.which == 27 || event.which == 13) {
                body[0].className = "";
                modal.removeChild(modalInput);
            }
        });

        body[0].addEventListener("click", function() {
            console.log("click");
            body[0].className = "";
            modalInput.style.display = "none";
        })
        /*
        if(modalInput === document.activeElement) {
            console.log("active");
        }

        var renameText = prompt("Type a task to be replaced by:");
        if (!renameText || renameText == " " || renameText == "") {
                return false;
            }
        this.innerText = renameText;*/
    }
    function removeTask() {
        var taskToRemove = this.parentNode;
        var todoList = document.getElementById("sortable");
        var btnClear = document.getElementById("clearStorage");
        taskToRemove.className = 'animated rotateOutDownRight';
        setTimeout(function (){
            taskToRemove.style.display = "none";
        }, 1000); // How long do you want the delay to be (in milliseconds)? 
        localStorage.removeItem(this.id);
        if (localStorage.length == 0) {
            btnClear.style.display = 'none';
        } else {
            btnClear.style.display = 'inline-block';
        }
    }
    function addTaskEnterFunction(event) {
        if (event.which == 13) {
            addTaskFunction();
        }
    }
    function addTaskFunction() {
        if (inputTask.value == "" || inputTask.value == " ") {
            return false;
        } else {
        var date = new Date();
        var id = "" + date.getHours() + date.getMinutes() + date.getSeconds() + date.getMilliseconds();
        var listItem = document.createElement("li");
        var checkBox = document.createElement("input");
        var span = document.createElement("span");
        var removeIcon = document.createElement("i");
        var todoList = document.getElementById("sortable");
        var btnClear = document.getElementById("clearStorage");

        listItem.className = "create";
        listItem.id = "li_"+ id;

        checkBox.type = "checkBox";
        checkBox.id = "cb_"+ id;
        checkBox.addEventListener("click", updateStatus);

        span.id = "span_" + id;
        span.innerText = inputTask.value;
        span.addEventListener("click", renameTask);

        removeIcon.className = "fa fa-times";
        removeIcon.id = id;
        removeIcon['aria-hidden'] = "true";
        removeIcon.addEventListener("click", removeTask);

        localStorage.setItem(id, inputTask.value);
        todoList.appendChild(listItem);
        listItem.appendChild(checkBox);
        listItem.appendChild(span);
        listItem.appendChild(removeIcon);
        inputTask.focus();
        inputTask.select();
        btnClear.style.display = 'inline-block';
        }
    }
    function clearList() {
        var todoList = document.getElementById("sortable");
        todoList.innerHTML = "";
        localStorage.clear();
        btnClear.style.display = 'none';
        inputTask.focus();
        inputTask.select();
    }
    var btnAdd = document.getElementById("addTask");
    var inputTask = document.getElementById("task");
    var btnClear = document.getElementById("clearStorage");

    btnAdd.addEventListener("click", addTaskFunction);
    inputTask.addEventListener("keyup", addTaskEnterFunction);
    inputTask.focus();
    btnClear.addEventListener("click", clearList);
    btnClear.style.display = 'none';
    
    for (var i = 0; i < localStorage.length; i++) {
        var id = localStorage.key(i);
        var id_elements = id.replace("_checked","");
        var btnClear = document.getElementById("clearStorage");
        var listItem = document.createElement("li");
        var checkBox = document.createElement("input");
        var span = document.createElement("span");
        var removeIcon = document.createElement("i");
        var todoList = document.getElementById("sortable");

        btnClear.style.display = 'inline-block';

        listItem.className = "create animated bounceInUp";
        listItem.id = "li_"+ id_elements;

        checkBox.type = "checkBox";
        checkBox.id = "cb_"+ id;
        checkBox.addEventListener("click", updateStatus);

        span.id = "span_" + id_elements;
        span.innerText = localStorage.getItem(id);
        span.addEventListener("click", renameTask);

        for (var j = 0; j < id.length; j++) {
            if (id[j] == "d"){
                checkBox.checked = true;
                span.className="checked";
            }
        }

        removeIcon.className = "fa fa-times";
        removeIcon.id = id;
        removeIcon['aria-hidden'] = "true";
        removeIcon.addEventListener("click", removeTask);

        todoList.appendChild(listItem);
        listItem.appendChild(checkBox);
        listItem.appendChild(span);
        listItem.appendChild(removeIcon);
    }
});

