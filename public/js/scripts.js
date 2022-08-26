const nameInput = document.querySelector("#name-input");
const datetimeInput = document.querySelector("#datetime-input");
const formActionBtn = document.querySelector("#form-action-btn");
let selectedTaskId = "";

formActionBtn.value = "Add task";
const addTaskEventListener = () => {
    fetch(`/api/tasks`, {
        method: 'POST', headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: nameInput.value, datetime: datetimeInput.value})
    })
        .then(response => response.json())
        .then(body => {
            alert(body.message);
            location.reload();
        });
}

const editTaskEventListener = () => {
    fetch(`/api/tasks/${selectedTaskId}`, {
        method: 'PUT', headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: nameInput.value, datetime: datetimeInput.value})
    })
        .then(response => response.json())
        .then(body => {
            alert(body.message);
            location.reload();
        });
}

const deleteTaskEventListener = (id) => {
    fetch(`/api/tasks/${id}`, {
        method: 'DELETE', headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(body => {
            alert(body.message);
            location.reload();
        });
}

formActionBtn.addEventListener("click", addTaskEventListener);

document.querySelectorAll(".edit-btn").forEach(btn =>
    btn.addEventListener("click", () => {
        fetch(`/api/tasks/${btn.value}`, {method: 'GET'})
            .then(response => response.json())
            .then(body => {
                nameInput.value = body.name
                datetimeInput.value = body.datetime
                selectedTaskId = btn.value;
                formActionBtn.value = "Edit task";
                formActionBtn.removeEventListener("click", addTaskEventListener);
                formActionBtn.removeEventListener("click", editTaskEventListener)
                formActionBtn.addEventListener("click", editTaskEventListener)
            });
    })
)

document.querySelectorAll(".delete-btn").forEach(btn =>
    btn.addEventListener("click", () => deleteTaskEventListener(btn.value))
)
