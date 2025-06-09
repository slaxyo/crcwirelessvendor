import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabase = createClient(
  'https://stgcknunpvlcndtwxdmc.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0Z2NrbnVucHZsY25kdHd4ZG1jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkwNTM2MTUsImV4cCI6MjA2NDYyOTYxNX0.H2JawYsroeA5Tnc_iIeGhRX0kLcUIk0bP3F7rK0JyX4'
);

const container = document.getElementById('workOrderContainer');
let allOrders = [];

async function loadOrders() {
  const { data, error } = await supabase.from('intake_forms').select('*');
  if (error) return console.error('Load error:', error);

  allOrders = data;
  renderOrders('All');
}

function renderOrders(filter) {
  container.innerHTML = '';

  allOrders
    .filter(order => filter === 'All' || order.status === filter)
    .forEach(order => {
      const issueText = Array.isArray(order.issues)
        ? order.issues.join(', ')
        : (typeof order.issues === 'string' ? order.issues : 'N/A');

      const card = document.createElement('div');
      card.className = 'work-order-card';
      card.dataset.status = order.status;

      // Create static inner content
      card.innerHTML = `
        <div class="card-header">
          <h4>${order.model || 'Unknown Model'} – ${order.name || 'No Name'}</h4>
          <span class="status-badge ${order.status.toLowerCase().replace(/ /g, '-')}">${order.status}</span>
        </div>
        <p><strong>Issue:</strong> ${issueText}</p>
        <p><strong>Phone:</strong> ${order.phone || 'N/A'}</p>
        <p><strong>Notes:</strong> ${order.notes || '—'}</p>
        <div class="card-actions">
          <select class="status-select">
            ${['Received', 'In Progress', 'Waiting for Parts', 'Ready for Pickup', 'Picked Up'].map(status => `
              <option value="${status}" ${order.status === status ? 'selected' : ''}>${status}</option>
            `).join('')}
          </select>
          <button class="edit-btn">✏️ Edit</button>
          <button class="delete-btn">🗑️ Delete</button>
        </div>
      `;

      // Add payment button separately (so we can attach event properly)
      const payBtn = document.createElement('button');
      payBtn.textContent = '💵 Take Payment';
      payBtn.addEventListener('click', () => {
        takePayment(order.name, order.phone, issueText);
      });

      // Attach button to .card-actions
      card.querySelector('.card-actions').appendChild(payBtn);

      // Hook up dropdown and action buttons
      card.querySelector('.status-select').addEventListener('change', (e) => {
        updateStatus(order.id, e.target.value);
      });

      card.querySelector('.edit-btn').addEventListener('click', () => {
        editOrder(order.id);
      });

      card.querySelector('.delete-btn').addEventListener('click', () => {
        deleteOrder(order.id);
      });

      container.appendChild(card);
    });
}

// Filter buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderOrders(btn.dataset.status);
  });
});

// Action Handlers
window.editOrder = (id) => {
  alert(`Edit functionality coming soon.\nOrder ID: ${id}`);
};

window.deleteOrder = async (id) => {
  if (!confirm('Are you sure you want to delete this work order?')) return;
  const { error } = await supabase.from('intake_forms').delete().eq('id', id);
  if (error) {
    alert('Delete failed.');
    console.error(error);
  } else {
    loadOrders();
  }
};

window.updateStatus = async (id, newStatus) => {
  const { error } = await supabase.from('intake_forms').update({ status: newStatus }).eq('id', id);
  if (error) {
    alert('Status update failed.');
    console.error(error);
  } else {
    loadOrders();
  }
};

window.takePayment = async (name, phone, issue) => {
  const payload = {
    first_name: name,
    phone_number: phone,
    comments: issue
  };

  const res = await fetch('https://crcwirelessvendor.vercel.app/api/send-to-pos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  const result = await res.json();
  if (res.ok) {
    alert('✅ Customer sent to POS!');
    console.log(result);
  } else {
    alert('❌ Failed to send to POS');
    console.error(result);
  }
};

loadOrders();
