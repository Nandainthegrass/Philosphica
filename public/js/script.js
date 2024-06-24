let formEl = document.getElementById("signup-form");
let feedback = document.getElementById("signup-feedback");

formEl.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(formEl);

  const preferences = [];
  formData.getAll("preferences[]").forEach((pref) => {
    preferences.push(pref);
  });

  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    preferences: preferences,
  };
  console.log(data);

  try {
    const response = await fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      feedback.innerText = `Thank you for signing up!
                            Hope you'll enjoy the mail!`;
    } else if (response.status == 405) {
      feedback.textContent = `Email already exists!`;
    } else {
      feedback.textContent = "An error occured!";
    }
  } catch (error) {
    console.log("An error occured: ", error);
  }
});
