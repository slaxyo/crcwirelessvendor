const data = {
  iPhone: {
    "iPhone 11": { price: "$90 - $150", repairs: ["Screen Replacement", "Battery", "Charging Port", "Back Glass", "Water Damage"] },
    "iPhone 12": { price: "$100 - $170", repairs: ["Screen Replacement", "Battery", "Charging Port", "Back Glass", "Water Damage"] },
    "iPhone 13": { price: "$110 - $180", repairs: ["Screen Replacement", "Battery", "Charging Port", "Back Glass", "Water Damage"] },
    "iPhone 14": { price: "$120 - $200", repairs: ["Screen Replacement", "Battery", "Charging Port", "Back Glass", "Water Damage"] }
  },
  Samsung: {
    "Galaxy S20": { price: "$80 - $160", repairs: ["Screen Replacement", "Battery", "Charging Port", "Water Damage"] },
    "Galaxy S21": { price: "$90 - $170", repairs: ["Screen Replacement", "Battery", "Charging Port", "Water Damage"] },
    "Galaxy S22": { price: "$100 - $180", repairs: ["Screen Replacement", "Battery", "Charging Port", "Water Damage"] }
  },
  "Other Phone": {
    "Generic Android": { price: "$60 - $140", repairs: ["Screen Replacement", "Battery", "Charging Port", "Water Damage"] }
  },
  Laptop: {
    "Windows Laptop": { price: "$70 - $200", repairs: ["Screen", "Battery", "Keyboard", "Software", "Other"] },
    "MacBook Air": { price: "$100 - $250", repairs: ["Screen", "Battery", "Keyboard", "Trackpad", "Software"] },
    "MacBook Pro": { price: "$120 - $300", repairs: ["Screen", "Battery", "Keyboard", "Trackpad", "Software"] }
  },
  Desktop: {
    "Windows Desktop": { price: "$80 - $300", repairs: ["Power Supply", "Hard Drive", "Software", "Other"] },
    "iMac": { price: "$100 - $320", repairs: ["Screen", "Power Supply", "Software", "Other"] }
  }
};

const deviceTypeSelect = document.getElementById('device-type');
const modelSelect = document.getElementById('model');
const repairSelect = document.getElementById('repair');
const priceDisplay = document.getElementById('price-display');

deviceTypeSelect.addEventListener('change', () => {
  const brand = deviceTypeSelect.value;
  modelSelect.innerHTML = '<option value="">-- Select Model --</option>';
  repairSelect.innerHTML = '<option value="">-- Select Repair --</option>';
  repairSelect.disabled = true;
  priceDisplay.textContent = '';

  if (data[brand]) {
    modelSelect.disabled = false;
    Object.keys(data[brand]).forEach(model => {
      const option = document.createElement('option');
      option.value = model;
      option.textContent = model;
      modelSelect.appendChild(option);
    });
  } else {
    modelSelect.disabled = true;
  }
});

modelSelect.addEventListener('change', () => {
  const brand = deviceTypeSelect.value;
  const model = modelSelect.value;
  repairSelect.innerHTML = '<option value="">-- Select Repair --</option>';
  priceDisplay.textContent = '';

  if (data[brand] && data[brand][model]) {
    const repairs = data[brand][model].repairs;
    repairSelect.disabled = false;
    repairs.forEach(repair => {
      const option = document.createElement('option');
      option.value = repair;
      option.textContent = repair;
      repairSelect.appendChild(option);
    });
  } else {
    repairSelect.disabled = true;
  }
});

repairSelect.addEventListener('change', () => {
  const brand = deviceTypeSelect.value;
  const model = modelSelect.value;

  if (data[brand] && data[brand][model]) {
    priceDisplay.textContent = `Estimated Price: ${data[brand][model].price}`;
  } else {
    priceDisplay.textContent = '';
  }
});
