const supabase = createClient(
  'https://stgcknunpvlcndtwxdmc.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0Z2NrbnVucHZsY25kdHd4ZG1jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkwNTM2MTUsImV4cCI6MjA2NDYyOTYxNX0.H2JawYsroeA5Tnc_iIeGhRX0kLcUIk0bP3F7rK0JyX4'
);
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

// your Supabase + event listener code...

document.getElementById("intakeForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const submitButton = document.querySelector("#intakeForm button[type='submit']");
  submitButton.disabled = true;
  submitButton.textContent = "Submitting...";

  // Collect multiple-choice values (checkboxes)
  const getCheckedValues = (name) => {
    return Array.from(document.querySelectorAll(`input[name="${name}[]"]:checked`)).map(cb => cb.value);
  };

  // Collect radio values
  const getRadioValue = (name) => {
    const checked = document.querySelector(`input[name="${name}"]:checked`);
    return checked ? checked.value : null;
  };

  // Build the data object
  const data = {
    name: document.getElementById("name").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    password: document.getElementById("password").value.trim(),
    manufacturer: getRadioValue("manufacturer"),
    model: document.getElementById("model").value.trim(),
    carrier: getRadioValue("carrier"),
    issues: getCheckedValues("issue"),
    symptoms: document.getElementById("symptoms").value.trim(),
    status: document.getElementById("status").value,
    notes: document.getElementById("notes").value.trim(),
    created_at: new Date().toISOString()
  };

  if (!data.manufacturer || !data.carrier) {
    alert("Please select a manufacturer and carrier.");
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

  document.getElementById("confirmation").classList.remove("hidden");
  document.getElementById("intakeForm").reset();

  setTimeout(() => {
    document.getElementById("confirmation").classList.add("hidden");
  }, 4000);

  submitButton.disabled = false;
  submitButton.textContent = "Next";
});
