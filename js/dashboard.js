 const PASSWORD = "market2024";
    const COOKIE_KEY = "auth";
    const COOKIE_VALUE = PASSWORD;

    const SUPABASE_URL = "https://stgcknunpvlcndtwxdmc.supabase.co";
    const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0Z2NrbnVucHZsY25kdHd4ZG1jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkwNTM2MTUsImV4cCI6MjA2NDYyOTYxNX0.H2JawYsroeA5Tnc_iIeGhRX0kLcUIk0bP3F7rK0JyX4";
    const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

    const login = document.getElementById("login");
    const dashboard = document.getElementById("dashboard");
    const vendorStats = document.getElementById("vendorStats");

    window.onload = function () {
      const isAuthed = document.cookie
        .split("; ")
        .find((row) => row.startsWith(`${COOKIE_KEY}=`));
      if (isAuthed) {
        login.style.display = "none";
        dashboard.style.display = "block";
        loadVendors();
      }
    };

    function setAuthCookie() {
      document.cookie = `${COOKIE_KEY}=${COOKIE_VALUE}; path=/; max-age=86400`;
    }

    function checkPassword() {
      const input = document.getElementById("password").value;
      if (input === PASSWORD) {
        setAuthCookie();
        login.style.display = "none";
        dashboard.style.display = "block";
        loadVendors();
      } else {
        alert("Incorrect password.");
      }
    }

    async function loadVendors() {
      const { data, error } = await supabaseClient.from("vendors").select("*");
      if (error) return console.error("Load error:", error);

      const tbody = document.querySelector("#vendorTable tbody");
      tbody.innerHTML = "";

      let total = 0;
      let checkedIn = 0;

      data.forEach((v) => {
        total++;
        if (v.checkedIn) checkedIn++;

        const row = document.createElement("tr");
        row.innerHTML = `
          <td colspan="11">
            <div style="display: flex; justify-content: space-between; flex-wrap: wrap; gap: 8px; align-items: flex-start;">
              <div style="flex: 1;">
                <strong>${v.vendorName}</strong> — ${v.vendorType}<br>
                <small>Contact:</small> ${v.contactName} <br>  Phone: ${v.phone} <br> Email: ${v.email}<br>
                <small>Setup:</small> ${v.setupTime} <br> Power: ${v.power} <br> Table: ${v.table}<br>
                <small>Description:</small> ${v.description}<br>
                ${v.social ? `<small>Social:</small> ${v.social}<br>` : ""}
                <span class="note-toggle" onclick="this.nextElementSibling.style.display = this.nextElementSibling.style.display === 'block' ? 'none' : 'block'">Toggle Notes</span>
                <div class="hidden-note">${v.notes || ""}</div>
              </div>
              <div style="min-width: 140px; text-align: right;">
                <button onclick="toggleCheckIn(${v.id}, ${v.checkedIn})" ${v.checkedIn ? 'class="checked-in"' : ''}>${v.checkedIn ? "Checked In" : "Check In"}</button><br>
                <button onclick="editVendor(${v.id}, \`${v.vendorName}\`, \`${v.contactName}\`, \`${v.phone}\`, \`${v.email}\`, \`${v.notes || ""}\`)" style="margin-top: 6px;">Edit</button>
                <button onclick="deleteVendor(${v.id})">Delete</button>
              </div>
            </div>
          </td>
        `;
        tbody.appendChild(row);
      });

      vendorStats.textContent = `Total Vendors: ${total} | Checked In: ${checkedIn} | Not Checked In: ${total - checkedIn}`;
    }

    async function toggleCheckIn(id, currentStatus) {
      const { error } = await supabaseClient.from("vendors").update({ checkedIn: !currentStatus }).eq("id", id);
      if (error) return alert("Failed to update check-in status");
      loadVendors();
    }

    async function deleteVendor(id) {
      if (!confirm("Are you sure you want to delete this vendor?")) return;
      const { error } = await supabaseClient.from("vendors").delete().eq("id", id);
      if (error) return alert("Failed to delete.");
      loadVendors();
    }

    function editVendor(id, name, contact, phone, email, notes) {
      currentEditId = id;
      document.getElementById("editName").value = name;
      document.getElementById("editContact").value = contact;
      document.getElementById("editPhone").value = phone;
      document.getElementById("editEmail").value = email;
      document.getElementById("editNotes").value = notes;
      document.getElementById("editModal").style.display = "flex";
    }

    function closeEditModal() {
      document.getElementById("editModal").style.display = "none";
    }

    async function saveEdit() {
      const updatedData = {
        vendorName: document.getElementById("editName").value,
        contactName: document.getElementById("editContact").value,
        phone: document.getElementById("editPhone").value,
        email: document.getElementById("editEmail").value,
        notes: document.getElementById("editNotes").value
      };
      const { error } = await supabaseClient.from("vendors").update(updatedData).eq("id", currentEditId);
      if (error) return alert("Update failed");
      closeEditModal();
      loadVendors();
    }