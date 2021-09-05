var n = 0;
var val = localStorage.getItem("value");
if (val == null) {
  val = 1;
  localStorage.setItem("value", val);
}

var dt = new Object();

for (let i = 1; i < val; i++) {
  let storedli = localStorage.getItem(i);
  if (storedli != null) {
    let tasks = document.querySelector(".tasks ol");
    let childli = document.createElement("li");
    childli.innerHTML = storedli;
    tasks.appendChild(childli);
    let ttime = new Date(childli.querySelector(".taskdt").innerText);
    let ctime = new Date();
    if (
      ttime < ctime &&
      childli.querySelector(".mark").value == "Mark as Done"
    ) {
      childli.querySelector("#message").innerText = "You forget me";
      childli.querySelector("#message").style.color = "#d90429";
    }
    dt[n++] = ttime;
  }
}

document.querySelector("#click").onclick = function () {
  if (
    document.querySelector("#input").value.length == 0 ||
    document.querySelector("#time").value.length == 0
  ) {
    if (document.querySelector("#input").value.length == 0) {
      alert("Please Enter a Task");
    } else if (document.querySelector("#time").value.length == 0) {
      alert("Please Enter the date and time");
    }
    return;
  } else {
    let ttime = new Date(document.querySelector("#time").value);
    dt[n++] = ttime;
    var ctime = new Date();
    var msg = "<br>";
    if (ttime < ctime) {
      msg = "You forgot me";
    }
    let hours = ttime.getHours();
    let am_pm = "AM";
    if (hours == 0) {
      hours = 12;
    }
    if (hours > 12) {
      hours = hours - 12;
      am_pm = "PM";
    }

    let tasks = document.querySelector(".tasks ol");
    let childli = document.createElement("li");
    val++;

    childli.innerHTML = `
          <div class="task">
            <div class="tasktext">
              <span>${document.querySelector("#input").value}</span>
              <br>
              <span id="message" style="color:#d90429">${msg}</span>
            </div>
            <div class="taskdt">
              <span style="color: #f550d1">${
                ttime.getMonth() + 1
              }/${ttime.getDate()}/${ttime.getFullYear()}</span><br/>
              <span style="color: #f550d1">${hours}:${ttime.getMinutes()} ${am_pm}</span>
            </div>
            <div class="taskdone">
              <button class="mark">
                  Mark as Done
              </button>
              <button class="del">
              <img 
                src="https://cdn3.iconfinder.com/data/icons/google-material-design-icons/48/ic_delete_48px-512.png"
                alt="delete"
              />
              </button>
            </div>
          </div>
    `;
    tasks.appendChild(childli);
    let storedli = childli.innerHTML;
    localStorage.setItem(val - 1, storedli);
    localStorage.setItem("value", val);

    document.querySelector("#input").value = null;
    document.querySelector("#time").value = null;
  }
  location.reload();
};

//DELETE
var current_tasks = document.querySelectorAll(".del");
for (let i = 0; i < current_tasks.length; i++) {
  current_tasks[i].onclick = function () {
    this.parentElement.parentElement.parentElement.remove();
    localStorage.removeItem(i + 1);
    val--;
    localStorage.setItem("value", val);
    for (var j = i + 1; j < val; j++) {
      let storedli2 = localStorage.getItem(j + 1);
      localStorage.setItem(j, storedli2);
    }
    localStorage.removeItem(j);
  };
}

//MARK AND UNMARK
var buttons = document.querySelectorAll(".mark");
for (let i = 0; i < buttons.length; i++) {
  buttons[i].onclick = function () {
    let message = this.parentElement.parentElement.querySelector("#message");
    if (this.innerText == "Unmark") {
      let ctime = new Date();
      if (dt[i] < ctime) {
        message.innerText = "You forgot me";
        message.style.color = "#d90429";
        this.innerText = "Mark as Done";
      } else {
        message.innertext = "";
        message.innerHTML = "<br>";
        this.innerText = "Mark as Done";
      }
    } else {
      message.innerText = "Task Accomplished";
      message.style.color = "#560bad";
      this.innerText = "Unmark";
    }
    let updated = this.parentElement.parentElement.parentElement.innerHTML;
    localStorage.setItem(i + 1, updated);
  };
}
