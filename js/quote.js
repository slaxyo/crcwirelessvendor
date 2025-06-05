const data = {
  iPhone: {
    "iPhone XR": { price: "$70 - $130", repairs: ["Screen Replacement", "Battery", "Charging Port", "Back Glass", "Water Damage"] },
    "iPhone 11": { price: "$70 - $150", repairs: ["Screen Replacement", "Battery", "Charging Port", "Back Glass", "Water Damage"] },
    "iPhone 11 Pro": { price: "$100 - $160", repairs: ["Screen Replacement", "Battery", "Charging Port", "Back Glass", "Water Damage"] },
    "iPhone 11 Pro Max": { price: "$110 - $170", repairs: ["Screen Replacement", "Battery", "Charging Port", "Back Glass", "Water Damage"] },
    "iPhone 12": { price: "$100 - $170", repairs: ["Screen Replacement", "Battery", "Charging Port", "Back Glass", "Water Damage"] },
    "iPhone 12 Mini": { price: "$95 - $160", repairs: ["Screen Replacement", "Battery", "Charging Port", "Back Glass", "Water Damage"] },
    "iPhone 12 Pro": { price: "$110 - $180", repairs: ["Screen Replacement", "Battery", "Charging Port", "Back Glass", "Water Damage"] },
    "iPhone 12 Pro Max": { price: "$120 - $190", repairs: ["Screen Replacement", "Battery", "Charging Port", "Back Glass", "Water Damage"] },
    "iPhone 13": { price: "$110 - $180", repairs: ["Screen Replacement", "Battery", "Charging Port", "Back Glass", "Water Damage"] },
    "iPhone 13 Mini": { price: "$105 - $170", repairs: ["Screen Replacement", "Battery", "Charging Port", "Back Glass", "Water Damage"] },
    "iPhone 13 Pro": { price: "$120 - $190", repairs: ["Screen Replacement", "Battery", "Charging Port", "Back Glass", "Water Damage"] },
    "iPhone 13 Pro Max": { price: "$130 - $200", repairs: ["Screen Replacement", "Battery", "Charging Port", "Back Glass", "Water Damage"] },
    "iPhone 14": { price: "$120 - $200", repairs: ["Screen Replacement", "Battery", "Charging Port", "Back Glass", "Water Damage"] },
    "iPhone 14 Plus": { price: "$130 - $210", repairs: ["Screen Replacement", "Battery", "Charging Port", "Back Glass", "Water Damage"] },
    "iPhone 14 Pro": { price: "$140 - $220", repairs: ["Screen Replacement", "Battery", "Charging Port", "Back Glass", "Water Damage"] },
    "iPhone 14 Pro Max": { price: "$150 - $240", repairs: ["Screen Replacement", "Battery", "Charging Port", "Back Glass", "Water Damage"] },
    "iPhone 15": { price: "$130 - $220", repairs: ["Screen Replacement", "Battery", "Charging Port", "Back Glass", "Water Damage"] },
    "iPhone 15 Plus": { price: "$140 - $230", repairs: ["Screen Replacement", "Battery", "Charging Port", "Back Glass", "Water Damage"] },
    "iPhone 15 Pro": { price: "$160 - $250", repairs: ["Screen Replacement", "Battery", "Charging Port", "Back Glass", "Water Damage"] },
    "iPhone 15 Pro Max": { price: "$170 - $270", repairs: ["Screen Replacement", "Battery", "Charging Port", "Back Glass", "Water Damage"] },
    "iPhone 16": { price: "$180 - $280", repairs: ["Screen Replacement", "Battery", "Charging Port", "Back Glass", "Water Damage"] },
    "iPhone 16 Plus": { price: "$190 - $290", repairs: ["Screen Replacement", "Battery", "Charging Port", "Back Glass", "Water Damage"] },
    "iPhone 16 Pro": { price: "$200 - $310", repairs: ["Screen Replacement", "Battery", "Charging Port", "Back Glass", "Water Damage"] },
    "iPhone 16 Pro Max": { price: "$210 - $320", repairs: ["Screen Replacement", "Battery", "Charging Port", "Back Glass", "Water Damage"] }
  },

  Samsung: {
    "Galaxy S10": { price: "$80 - $140", repairs: ["Screen Replacement", "Battery", "Charging Port", "Back Glass", "Water Damage"] },
    "Galaxy S10+": { price: "$90 - $150", repairs: ["Screen Replacement", "Battery", "Charging Port", "Back Glass", "Water Damage"] },
    "Galaxy S10e": { price: "$80 - $130", repairs: ["Screen Replacement", "Battery", "Charging Port", "Back Glass", "Water Damage"] },
    "Galaxy S20": { price: "$100 - $170", repairs: ["Screen Replacement", "Battery", "Charging Port", "Back Glass", "Water Damage"] },
    "Galaxy S20+": { price: "$110 - $180", repairs: ["Screen Replacement", "Battery", "Charging Port", "Back Glass", "Water Damage"] },
    "Galaxy S20 Ultra": { price: "$120 - $200", repairs: ["Screen Replacement", "Battery", "Charging Port", "Back Glass", "Water Damage"] },
    "Galaxy S20 FE": { price: "$95 - $160", repairs: ["Screen Replacement", "Battery", "Charging Port", "Back Glass", "Water Damage"] },
    "Galaxy S21": { price: "$110 - $180", repairs: ["Screen Replacement", "Battery", "Charging Port", "Back Glass", "Water Damage"] },
    "Galaxy S21+": { price: "$120 - $190", repairs: ["Screen Replacement", "Battery", "Charging Port", "Back Glass", "Water Damage"] },
    "Galaxy S21 Ultra": { price: "$130 - $210", repairs: ["Screen Replacement", "Battery", "Charging Port", "Back Glass", "Water Damage"] },
    "Galaxy S21 FE": { price: "$100 - $170", repairs: ["Screen Replacement", "Battery", "Charging Port", "Back Glass", "Water Damage"] },
    "Galaxy S22": { price: "$120 - $190", repairs: ["Screen Replacement", "Battery", "Charging Port", "Back Glass", "Water Damage"] },
    "Galaxy S22+": { price: "$130 - $200", repairs: ["Screen Replacement", "Battery", "Charging Port", "Back Glass", "Water Damage"] },
    "Galaxy S22 Ultra": { price: "$140 - $220", repairs: ["Screen Replacement", "Battery", "Charging Port", "Back Glass", "Water Damage"] },
    "Galaxy S23": { price: "$130 - $200", repairs: ["Screen Replacement", "Battery", "Charging Port", "Back Glass", "Water Damage"] },
    "Galaxy S23+": { price: "$140 - $210", repairs: ["Screen Replacement", "Battery", "Charging Port", "Back Glass", "Water Damage"] },
    "Galaxy S23 Ultra": { price: "$150 - $230", repairs: ["Screen Replacement", "Battery", "Charging Port", "Back Glass", "Water Damage"] },
    "Galaxy S24": { price: "$140 - $220", repairs: ["Screen Replacement", "Battery", "Charging Port", "Back Glass", "Water Damage"] },
    "Galaxy S24+": { price: "$150 - $230", repairs: ["Screen Replacement", "Battery", "Charging Port", "Back Glass", "Water Damage"] },
    "Galaxy S24 Ultra": { price: "$160 - $250", repairs: ["Screen Replacement", "Battery", "Charging Port", "Back Glass", "Water Damage"] },
    "Galaxy S25": { price: "TBD", repairs: ["TBD"] },
    "Galaxy S25+": { price: "TBD", repairs: ["TBD"] },
    "Galaxy S25 Ultra": { price: "TBD", repairs: ["TBD"] }
  },

  "Other Phone": {
    "Samsung (A Series | Please contact us)": { price: "ERROR | PLEASE CALL US: (404) 528-8830", repairs: ["Screen Replacement", "Battery", "Charging Port", "Water Damage"] }
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
