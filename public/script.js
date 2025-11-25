function goBack() {
    window.location.href = 'index.html';
}

// Submit student registration
async function submitRegistration() {
    const name = document.getElementById('studentName').value;
    const number = document.getElementById('studentNumber').value;
    const yearSection = document.getElementById('yearSection').value;
    const photoFile = document.getElementById('studentPhoto').files[0];

    if (!name || !number || !yearSection) {
        alert("Please fill in all required fields");
        return;
    }

    let photoData = "";
    if (photoFile) {
        const reader = new FileReader();
        reader.onload = async function (e) {
            photoData = e.target.result;
            await registerStudent(name, number, yearSection, photoData);
        };
        reader.readAsDataURL(photoFile);
    } else {
        await registerStudent(name, number, yearSection, "");
    }
}

async function registerStudent(name, number, yearSection, photo) {
    const student = {
        last_name: name.split(" ").slice(-1).join(" "),
        given_name: name.split(" ")[0],
        middle_name: "",
        extension: "",
        student_number: number,
        year_section: yearSection,
        email: ""
    };

    try {
        const response = await fetch("https://attendance-87vv.onrender.com/students", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(student)
        });

        if (!response.ok) throw new Error("Failed to save student");

        alert("Student registered successfully!");
        window.location.href = "index.html";

    } catch (err) {
        console.error(err);
        alert("Error saving student: " + err.message);
    }
}
