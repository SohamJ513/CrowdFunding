const url = "http://localhost:5000/api/auth/register";
const data = {
  name: "Soham",
  email: "soham@gmail.com",
  password: "Test@123",
  role: "admin"
};

async function registerUser() {
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.error("Error:", error);
  }
}

(async () => {
  await registerUser();
})();