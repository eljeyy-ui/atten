document.getElementById("loginBtn").addEventListener("click", async () => {
    const email = document.getElementById("teacherEmail").value.trim();
    const password = document.getElementById("teacherPassword").value.trim();

    if (email !== "admin@gmail.com" || password !== "admin123") {
        alert("Invalid login credentials.");
        return;
    }

    document.getElementById("loginContainer").style.display = "none";
    document.getElementById("teacherDashboard").style.display = "block";

    loadStudents();
});

async function loadStudents() {
    try {
        const response = await fetch(`${API_URL}/students`);
        const students = await response.json();

        const tableBody = document.querySelector("#studentsTable tbody");
        tableBody.innerHTML = "";

        students.forEach(student => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${student.given_name} ${student.last_name}</td>
                <td>${student.student_number}</td>
                <td>${student.course}</td>
                <td>
                    <select class="attendance-select">
                        <option value="Present">Present</option>
                        <option value="Absent">Absent</option>
                    </select>
                </td>
            `;

            tableBody.appendChild(row);
        });

    } catch (err) {
        alert("Failed to load students.");
    }
}
;
