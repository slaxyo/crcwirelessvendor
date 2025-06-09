import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabase = createClient(
  'https://stgcknunpvlcndtwxdmc.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0Z2NrbnVucHZsY25kdHd4ZG1jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkwNTM2MTUsImV4cCI6MjA2NDYyOTYxNX0.H2JawYsroeA5Tnc_iIeGhRX0kLcUIk0bP3F7rK0JyX4'
);

const container = document.getElementById('workOrderContainer');
const statusButtons = document.querySelectorAll('.filter-btn');
let allOrders = [];
let currentSort = 'newest';
let currentFilter = 'All';

// === Load from Supabase ===
async function loadOrders() {
  const { data, error } = await supabase.from('intake_forms').select('*');
  if (error) return console.error('Load error:', error);
  allOrders = data;
  renderOrders(currentFilter, currentSort);
  updateStatusCounts();
}

// === Helpers ===
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

function updateStatusCounts() {
  const counts = {
    'Received': 0,
    'In Progress': 0,
    'Waiting for Parts': 0,
    'Ready for Pickup': 0,
    'Picked Up': 0,
  };

  for (const order of allOrders) {
    if (counts[order.status] !== undefined) {
      counts[order.status]++;
    }
  }

  statusButtons.forEach(btn => {
    const status = btn.dataset.status;
    if (status === 'All') {
      btn.innerHTML = `All (${allOrders.length})`;
    } else {
      const emoji = getStatusLabel(status).split(' ')[0];
      const label = status;
      const count = counts[status] || 0;
      btn.innerHTML = `${emoji} ${label} (${count})`;
    }
  });
}

// === Render UI ===
function renderOrders(filter, sortBy) {
  container.innerHTML = '';

  let filtered = allOrders.filter(order => filter === 'All' || order.status === filter);

  switch (sortBy) {
    case 'newest':
      filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      break;
    case 'oldest':
      filtered.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
      break;
    case 'status':
      filtered.sort((a, b) => (a.status || '').localeCompare(b.status || ''));
      break;
    case 'name':
      filtered.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
      break;
  }

  filtered.forEach(order => {
    const issueText = Array.isArray(order.issues)
      ? order.issues.join(', ')
      : (typeof order.issues === 'string' ? order.issues : 'N/A');

    const card = document.createElement('div');
    card.className = 'work-order-card';
    card.dataset.status = order.status;

    // === Overdue logic ===
    const today = new Date();
    const dueDate = new Date(order.due_date);
const isOverdue = order.due_date && !['Picked Up', 'Ready for Pickup'].includes(order.status) && dueDate < today;


    if (isOverdue) {
      card.classList.add('overdue');
    }

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


// === Listeners ===
statusButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    statusButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.status;
    renderOrders(currentFilter, currentSort);
  });
});

document.getElementById('sortSelect')?.addEventListener('change', (e) => {
  currentSort = e.target.value;
  renderOrders(currentFilter, currentSort);
});

// === Actions ===
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

window.printReceipts = () => {
  window.print();
};

loadOrders();
