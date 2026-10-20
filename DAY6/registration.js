const storageKey = "day6Registrants";

function loadRegistrants() {
  const savedRegistrants = localStorage.getItem(storageKey);

  if (savedRegistrants === null) {
    return [];
  }

  const registrants = JSON.parse(savedRegistrants);
  if (!Array.isArray(registrants)) {
    throw new Error("Saved registration data is not in the expected format.");
  }

  return registrants;
}

const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(registerForm);
    const registrant = {
      firstName: formData.get("firstName").trim(),
      lastName: formData.get("lastName").trim(),
      email: formData.get("email").trim()
    };

    try {
      const registrants = loadRegistrants();
      registrants.push(registrant);
      localStorage.setItem(storageKey, JSON.stringify(registrants));
      window.location.href = "bootstraptemplate.html";
    } catch (error) {
      console.error("Could not save the registration.", error);
      window.alert("Your registration could not be saved. Please try again.");
    }
  });
}

const registrantRows = document.getElementById("registrantRows");

if (registrantRows) {
  try {
    const registrants = loadRegistrants();

    if (registrants.length === 0) {
      const row = registrantRows.insertRow();
      const cell = row.insertCell();
      cell.colSpan = 4;
      cell.textContent = "No registrations yet.";
    } else {
      registrants.forEach((registrant, index) => {
        const row = registrantRows.insertRow();
        [index + 1, registrant.firstName, registrant.lastName, registrant.email]
          .forEach((value, columnIndex) => {
            const cell = document.createElement(columnIndex === 0 ? "th" : "td");
            if (columnIndex === 0) {
              cell.scope = "row";
            }
            cell.textContent = String(value);
            row.appendChild(cell);
          });
      });
    }
  } catch (error) {
    console.error("Could not load registrations.", error);
    const row = registrantRows.insertRow();
    const cell = row.insertCell();
    cell.colSpan = 4;
    cell.textContent = "Registration data could not be loaded.";
  }
}
