function getNextTargetDate() {
  const now = new Date();

  const nextFriday = new Date(now);
  nextFriday.setDate(now.getDate() + ((5 - now.getDay() + 7) % 7)); // 5 = Friday
  nextFriday.setHours(18, 30, 0, 0);

  const nextSunday = new Date(now);
  nextSunday.setDate(now.getDate() + ((0 - now.getDay() + 7) % 7)); // 0 = Sunday
  nextSunday.setHours(9, 0, 0, 0);

  if (nextFriday > now && nextFriday < nextSunday) {
    return nextFriday;
  } else {
    return nextSunday;
  }
}

let targetDate = getNextTargetDate();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = targetDate.getTime() - now;

  if (distance <= 0) {
    targetDate = getNextTargetDate();
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  document.getElementById('days').textContent = days;
  document.getElementById('hours').textContent = String(hours).padStart(2, '0');
  document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
  document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

setInterval(updateCountdown, 1000);
updateCountdown();

function showSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'flex';
  }

function closeSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'none';
  }

   
document.getElementById("contactForm")
.addEventListener("submit", async function (e) {
  e.preventDefault();
  const formData = new FormData(e.target);

  const contactData = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    message: formData.get("message"),
  };

  try {
    const response = await fetch(
      "http://localhost:5000/api/contact",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactData),
      }
    );

    const result = await response.json();

    if (response.ok) {
      alert(result.message || "Message sent successfully!");
      e.target.reset(); 
    } else {
      alert(result.message || "Error sending message.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Failed to send message. Please try again.");
  }
});