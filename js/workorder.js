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
      // Safely format issues whether it's array, string, or null
      const issueText = Array.isArray(order.issues)
        ? order.issues.join(', ')
        : (typeof order.issues === 'string' ? order.issues : 'N/A');

      const card = document.createElement('div');
      card.className = 'work-order-card';
      card.dataset.status = order.status;

      card.innerHTML = `
        <div class="card-header">
          <h4>${order.model || 'Unknown Model'} – ${order.name || 'No Name'}</h4>
          <span class="status-badge ${order.status.toLowerCase().replace(/ /g, '-')}">${order.status}</span>
        </div>
        <p><strong>Issue:</strong> ${issueText}</p>
        <p><strong>Phone:</strong> ${order.phone || 'N/A'}</p>
        <p><strong>Notes:</strong> ${order.notes || '—'}</p>
        <div class="card-actions">
          <select onchange="updateStatus('${order.id}', this.value)">
            ${['Received', 'In Progress', 'Waiting for Parts', 'Ready for Pickup', 'Picked Up'].map(status => `
              <option value="${status}" ${order.status === status ? 'selected' : ''}>${status}</option>
            `).join('')}
          </select>
          <button onclick="editOrder('${order.id}')">✏️ Edit</button>
          <button onclick="deleteOrder('${order.id}')">🗑️ Delete</button>
          <button onclick="takePayment('${order.name}', '${order.phone}', \`${issueText}\`)">💵 Take Payment</button>
        </div>
      `;
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

window.takePayment = (name, phone, issue) => {
  const url = new URL('https://mapwireless.phppointofsale.com');
  url.searchParams.set('customer', name);
  url.searchParams.set('phone', phone);
  url.searchParams.set('issue', issue);
  window.open(url.toString(), '_blank');
};

// Start
loadOrders();
