document.getElementById("studentForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const lastName = document.getElementById("studentLastName").value.trim();
    const givenName = document.getElementById("studentGivenName").value.trim();
    const middleName = document.getElementById("studentMiddleName").value.trim();
    const extension = document.getElementById("studentExtension").value.trim();
    const studentNumber = document.getElementById("studentNumber").value.trim();
    const course = document.getElementById("yearSection").value.trim();
    const email = document.getElementById("studentEmail").value.trim();

    // Clear errors
    document.querySelectorAll(".field-error").forEach(el => el.textContent = "");

    // Validate required fields
    let hasError = false;

    if (!lastName) {
        document.getElementById("lastNameError").textContent = "Last name is required.";
        hasError = true;
    }
    if (!givenName) {
        document.getElementById("givenNameError").textContent = "Given name is required.";
        hasError = true;
    }
    if (!studentNumber) {
        document.getElementById("studentNumberError").textContent = "Student number is required.";
        hasError = true;
    }
    if (!course) {
        document.getElementById("yearSectionError").textContent = "Course/Year/Section required.";
        hasError = true;
    }
    if (!email) {
        document.getElementById("emailError").textContent = "Email is required.";
        hasError = true;
    }

    if (hasError) return;

    try {
        const response = await fetch(`${API_URL}/students`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                lastName,
                givenName,
                middleName,
                extension,
                studentNumber,
                course,
                email
            })
        });

        const data = await response.json();

        if (response.ok) {
            alert("Student registered successfully!");
            document.getElementById("studentForm").reset();
        } else {
            alert("Error: " + data.error);
        }

    } catch (error) {
        alert("Failed to connect to the server. Please try again.");
    }
});
