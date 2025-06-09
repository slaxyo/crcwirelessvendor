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

function getStatusLabel(status) {
  switch (status) {
    case 'Received': return '📦 Received';
    case 'In Progress': return '🔧 In Progress';
    case 'Waiting for Parts': return '⏳ Waiting';
    case 'Ready for Pickup': return '✅ Ready';
    case 'Picked Up': return '✔️ Picked Up';
    default: return status;
  }
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

      card.innerHTML = `
        <div class="card-header">
          <h4>${order.model || 'Unknown Model'} – ${order.name || 'No Name'}</h4>
          <span class="status-badge ${order.status.toLowerCase().replace(/ /g, '-')}">
            ${getStatusLabel(order.status)}
          </span>
        </div>
        <p><strong>Issue:</strong> ${issueText}</p>
        <p><strong>Phone:</strong> ${order.phone || 'N/A'}</p>
        <p><strong>Notes:</strong> ${order.notes || '—'}</p>
        <p><strong>Date Received:</strong> ${order.received_date || '—'}</p>
        <p><strong>Due Date:</strong> ${order.due_date || '—'}</p>
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

      // Buttons
      const payBtn = document.createElement('button');
      payBtn.textContent = '💵 Take Payment';
      payBtn.addEventListener('click', () => {
        takePayment(order.name, order.phone, issueText);
      });

      const printBtn = document.createElement('button');
      printBtn.textContent = '🧾 Reprint';
      printBtn.classList.add('reprint-btn');
      printBtn.addEventListener('click', () => {
        showReceiptPopup(order);
      });

      card.querySelector('.card-actions').appendChild(payBtn);
      card.querySelector('.card-actions').appendChild(printBtn);

      // Listeners
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

window.takePayment = (name, phone, issue) => {
  window.open('https://mapwireless.phppointofsale.com/index.php/sales', '_blank');
};

// Receipt Reprint Logic
window.showReceiptPopup = (order) => {
  const issues = Array.isArray(order.issues) ? order.issues.join(', ') : order.issues;

  document.getElementById("receiptCustomer").textContent = `
CRC Wireless - Customer Receipt
--------------------------------------
Name: ${order.name}
Phone: ${order.phone}
Device: ${order.model}
Issues: ${issues}
Status: ${order.status}
Amount: ${order.notes}
Date In: ${order.received_date || '—'}
Due Date: ${order.due_date || '—'}
Thank you for choosing CRC Wireless!
`;

  document.getElementById("receiptInternal").textContent = `
CRC Wireless - Internal Copy
-------------------------------
Name: ${order.name}
Phone: ${order.phone}
Password: ${order.password || 'N/A'}
Device: ${order.model}
Manufacturer: ${order.manufacturer || '—'}
Issues: ${issues}
Symptoms: ${order.symptoms || '—'}
Status: ${order.status}
Notes: ${order.notes || '—'}
Date In: ${order.received_date || '—'}
Due Date: ${order.due_date || '—'}
Created At: ${order.created_at || '—'}
`;

  document.getElementById("receiptModal").classList.remove("hidden");
};

loadOrders();
setTimeout(() => window.print(), 500);
