import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const supabase = createClient(
  'https://stgcknunpvlcndtwxdmc.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0Z2NrbnVucHZsY25kdHd4ZG1jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkwNTM2MTUsImV4cCI6MjA2NDYyOTYxNX0.H2JawYsroeA5Tnc_iIeGhRX0kLcUIk0bP3F7rK0JyX4'
);

document.getElementById("intakeForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const submitButton = document.querySelector("#intakeForm button[type='submit']");
  submitButton.disabled = true;
  submitButton.textContent = "Submitting...";

  // Helpers
  const getCheckedValues = (name) => {
    return Array.from(document.querySelectorAll(`input[name="${name}[]"]:checked`)).map(cb => cb.value);
  };

  const getRadioValue = (name) => {
    const checked = document.querySelector(`input[name="${name}"]:checked`);
    return checked ? checked.value : null;
  };

  // Collect form data
  const data = {
    name: document.getElementById("name").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    password: document.getElementById("password").value.trim(),
    manufacturer: getRadioValue("manufacturer"),
    model: document.getElementById("model").value.trim(),
    issues: getCheckedValues("issue"),
    received_date: document.getElementById("received_date").value,
due_date: document.getElementById("due_date").value,

    symptoms: document.getElementById("symptoms").value.trim(),
    status: document.getElementById("status").value,
    notes: document.getElementById("notes").value.trim(),
    created_at: new Date().toISOString()
  };

  // Basic validation
  if (!data.manufacturer) {
    alert("Please select a manufacturer.");
    submitButton.disabled = false;
    submitButton.textContent = "Next";
    return;
  }

  console.log("Form submitted:", data);

  const { error } = await supabase.from('intake_forms').insert([data]);

  if (error) {
    console.error('Supabase insert error:', error);
    alert('Something went wrong submitting the form. Please try again.');
    submitButton.disabled = false;
    submitButton.textContent = "Next";
    return;
  }

  // Success!
// Render the receipt
document.getElementById("receiptCustomer").textContent = `
CRC Wireless
-------------
Customer: ${data.name}
Phone: ${data.phone}
Model: ${data.model}
Issues: ${data.issues.join(', ')}
Status: ${data.status}
Notes: ${data.notes}
Received: ${data.received_date}
Due: ${data.due_date}
`;

document.getElementById("receiptCustomer").textContent = `
  CRC Wireless - Customer Receipt
  --------------------------------------
  Name: ${data.name}
  Phone: ${data.phone}
  Device: ${data.model}
  Issues: ${data.issues.join(', ')}
  Status: ${data.status}
  Amount: ${data.notes}
  Date In: ${data.received_date}
  Due Date: ${data.due_date}
  Thank you for choosing CRC Wireless!
`;

document.getElementById("receiptInternal").textContent = `
  CRC Wireless - Internal Copy
  -------------------------------
  Name: ${data.name}
  Phone: ${data.phone}
  Password: ${data.password || 'N/A'}
  Device: ${data.model}
  Manufacturer: ${data.manufacturer}
  Issues: ${data.issues.join(', ')}
  Symptoms: ${data.symptoms}
  Status: ${data.status}
  Amount/Notes: ${data.notes}
  Date In: ${data.received_date}
  Due Date: ${data.due_date}
  Created At: ${data.created_at}
`;

document.getElementById("receiptModal").classList.remove("hidden");

// Redirect after 10 seconds (enough to print)
setTimeout(() => {
  window.location.href = 'workorder.html';
}, 10000);


// Show modal
document.getElementById("receiptModal").classList.remove("hidden");

// Wait 6 seconds then redirect
setTimeout(() => {
  window.location.href = 'workorder.html';
}, 6000);

});
window.addEventListener("DOMContentLoaded", () => {
  const today = new Date().toISOString().split("T")[0];
  document.getElementById("received_date").value = today;
});
