// Load saved workouts and goals
document.addEventListener("DOMContentLoaded", () => {
    loadWorkouts();
    loadGoal();
});

// Add workout
function addWorkout() {
    let exercise = document.getElementById("exercise").value;
    let duration = document.getElementById("duration").value;
    let reps = document.getElementById("reps").value;

    if (exercise === "" || duration === "") {
        alert("Please enter exercise name and duration!");
        return;
    }

    let workout = { exercise, duration, reps };
    let workouts = JSON.parse(localStorage.getItem("workouts")) || [];
    workouts.push(workout);
    localStorage.setItem("workouts", JSON.stringify(workouts));

    document.getElementById("exercise").value = "";
    document.getElementById("duration").value = "";
    document.getElementById("reps").value = "";

    loadWorkouts();
}

// Load workouts
function loadWorkouts() {
    let workouts = JSON.parse(localStorage.getItem("workouts")) || [];
    let workoutList = document.getElementById("workoutList");
    workoutList.innerHTML = "";

    workouts.forEach((workout, index) => {
        let li = document.createElement("li");
        li.innerHTML = `
            ${workout.exercise} - ${workout.duration} min 
            ${workout.reps ? ` | ${workout.reps} reps` : ""}
            <button onclick="deleteWorkout(${index})">❌</button>
        `;
        workoutList.appendChild(li);
    });
}

// Delete workout
function deleteWorkout(index) {
    let workouts = JSON.parse(localStorage.getItem("workouts"));
    workouts.splice(index, 1);
    localStorage.setItem("workouts", JSON.stringify(workouts));
    loadWorkouts();
}

// Set fitness goal
function setGoal() {
    let goal = document.getElementById("goal").value;
    if (goal === "") {
        alert("Please enter a goal!");
        return;
    }
    localStorage.setItem("fitnessGoal", goal);
    loadGoal();
}

// Load fitness goal
function loadGoal() {
    let goal = localStorage.getItem("fitnessGoal");
    document.getElementById("goalDisplay").innerText = goal ? `🎯 Goal: ${goal}` : "No goal set";
}
