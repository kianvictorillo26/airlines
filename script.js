
// MGA elements NI SA HTML PARA MO GANA
const homeSection = document.getElementById('home');
const bookingSection = document.getElementById('booking');
const flightsSection = document.getElementById('flights');
const passengerSection = document.getElementById('passenger');
const summarySection = document.getElementById('summary');

const bookFlightBtn = document.getElementById('bookFlightBtn');
const progressContainer = document.getElementById('progressContainer');

const bookingForm = document.getElementById('bookingForm');
const flightList = document.getElementById('flightList');
const backToBookingBtn = document.getElementById('backToBooking');
const passengerForm = document.getElementById('passengerForm');
const summaryDetails = document.getElementById('summaryDetails');
const bookNowBtn = document.getElementById('bookNow');

// PARA NI SA PROGRESS DAPITA PARA MA LOCATE UG UNSA NA STAGE SA BOOKING PARA MA TRACK AND STEPS
const step1 = document.getElementById('step1');
const step2 = document.getElementById('step2');
const step3 = document.getElementById('step3');

// PARA SA BOOK FLIGHT NI NA BUTTON
bookFlightBtn.addEventListener('click', () => {
  homeSection.classList.remove('active');
  bookingSection.classList.add('active');

  // RELATED RA GIHAPON NI SA PROGRESS BAR 
  progressContainer.classList.add('active');

  // ACTIVATION NI
  step1.classList.add('active');
  step2.classList.remove('active');
  step3.classList.remove('active');
});

// PARA SA DATE NI REURN DATE KUNG ROUND TRIP AND PILION SA PASSENGER
const flightTypeSelect = document.getElementById('flightType');
const returnDateContainer = document.getElementById('returnDateContainer');
flightTypeSelect.addEventListener('change', () => {
  if (flightTypeSelect.value === 'round') {
    returnDateContainer.style.display = 'block';
  } else {
    returnDateContainer.style.display = 'none';
  }
});

// SUBMITT RA NI SA BOOKING FORM PARA SA MGA FLIGHTS
bookingForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const from = document.getElementById('from').value;
  const to = document.getElementById('to').value;
  const flightType = document.getElementById('flightType').value;
  const departDate = document.getElementById('departDate').value;
  const returnDate = document.getElementById('returnDate').value;
  const passengers = parseInt(document.getElementById('passengers').value);

  // ARRAY NI SA MGA FLIGHT NAKA STATIC RA NI NA DATA
  const flights = [
    {
      flightNo: '3B 1001',
      destination: `${from} → ${to}`,
      departDate: departDate,
      returnDate: flightType === 'round' ? returnDate : 'N/A',
      time: '08:00 AM',
      price: 2500,
      seats: 40,
      hours: 1.5,
      fareType: 'Promo Fare'
    },
    {
      flightNo: '3B 1002',
      destination: `${from} → ${to}`,
      departDate: departDate,
      returnDate: flightType === 'round' ? returnDate : 'N/A',
      time: '01:00 PM',
      price: 3200,
      seats: 25,
      hours: 2,
      fareType: 'Regular Fare'
    },
    {
      flightNo: '3B 1003',
      destination: `${from} → ${to}`,
      departDate: departDate,
      returnDate: flightType === 'round' ? returnDate : 'N/A',
      time: '06:45 PM',
      price: 2800,
      seats: 30,
      hours: 1.8,
      fareType: 'Promo Fare'
    }
  ];

  
  flightList.innerHTML = '';
  flights.forEach((flight) => {
    const card = document.createElement('div');
    card.classList.add('flight-card');

    // FLIGHT DETAILS NI CONNECT RANI SIYAS HTML 
    const infoDiv = document.createElement('div');
    infoDiv.classList.add('flight-info');

    infoDiv.innerHTML = `
      <p><strong>Flight No:</strong> ${flight.flightNo}</p>
      <p><strong>Departure:</strong> ${flight.departDate} - ${flight.time}</p>
      <p><strong>Return Date:</strong> ${flight.returnDate}</p>
      <p><strong>Destination:</strong> ${flight.destination}</p>
      <p><strong>Price:</strong> ₱${flight.price}</p>
      <p><strong>Seats Available:</strong> ${flight.seats}</p>
      <p><strong>Hours of Travel:</strong> ${flight.hours} hrs</p>
      <p><strong>Fare Type:</strong> ${flight.fareType}</p>
    `;

    const selectBtn = document.createElement('button');
    selectBtn.classList.add('select-btn');
    selectBtn.textContent = 'Select';
    selectBtn.addEventListener('click', () => {
      showPassengerForm(flight, passengers, from, to);
    });

    card.appendChild(infoDiv);
    card.appendChild(selectBtn);
    flightList.appendChild(card);
  });

  
  bookingSection.classList.remove('active');
  flightsSection.classList.add('active');
  step1.classList.add('active');
  step2.classList.add('active');
});


backToBookingBtn.addEventListener('click', () => {
  flightsSection.classList.remove('active');
  bookingSection.classList.add('active');
});


// MOSTLY KAY MGA VALIDATION RANI SA PASSENFGER FORM UG ABOUT RAS PASSENGER FORM
function showPassengerForm(selectedFlight, passengers, from, to) {
  flightsSection.classList.remove('active');
  passengerSection.classList.add('active');
  step2.classList.add('active');

  passengerForm.innerHTML = '';

  for (let i = 1; i <= passengers; i++) {
    const passengerDiv = document.createElement('div');
    passengerDiv.classList.add('passenger');

    const title = document.createElement('h3');
    title.textContent = `Passenger ${i}`;

    const nameLabel = document.createElement('label');
    nameLabel.textContent = 'Full Name:';
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.id = `name${i}`;
    nameInput.required = true;

    const ageLabel = document.createElement('label');
    ageLabel.textContent = 'Age:';
    const ageInput = document.createElement('input');
    ageInput.type = 'number';
    ageInput.id = `age${i}`;
    ageInput.required = true;
    ageInput.min = 0;

    passengerDiv.append(title, nameLabel, nameInput, ageLabel, ageInput);
    passengerForm.appendChild(passengerDiv);
  }

  const nextBtn = document.createElement('button');
  nextBtn.type = 'submit';
  nextBtn.id = 'toSummaryBtn';
  nextBtn.textContent = 'Next';
  passengerForm.appendChild(nextBtn);

  // VALIDATION NANI
  nextBtn.addEventListener('click', (e) => {
    e.preventDefault();

    let isValid = true;
    for (let i = 1; i <= passengers; i++) {
      const name = document.getElementById(`name${i}`).value.trim();
      const age = document.getElementById(`age${i}`).value.trim();

      if (name === '' || age === '') {
        isValid = false;
        break;
      }
    }

    if (!isValid) {
      Swal.fire({
        title: 'Incomplete Information!',
        text: 'Please fill out all passenger names and ages before proceeding.',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
    } else {
      showSummary(selectedFlight, passengers, from, to);
    }
  });
}


// MOA NI SA RESIBO OR SA KATUNG SUMMARY TONG KINALASAN NA
function showSummary(selectedFlight, passengers, from, to) {
  passengerSection.classList.remove('active');
  summarySection.classList.add('active');
  step3.classList.add('active');

  let passengerDetails = '';
  for (let i = 1; i <= passengers; i++) {
    const name = document.getElementById(`name${i}`).value;
    const age = document.getElementById(`age${i}`).value;
    passengerDetails += `<li>${name}, Age ${age}</li>`;
  }

  summaryDetails.innerHTML = `
    <h3>Flight Details</h3>
    <p><strong>${from}</strong> to <strong>${to}</strong></p>
    <p>Flight No: ${selectedFlight.flightNo}</p>
    <p>Departure: ${selectedFlight.departDate} - ${selectedFlight.time}</p>
    <p>Return Date: ${selectedFlight.returnDate}</p>
    <p>Price: ₱${selectedFlight.price}</p>
    <p>Seats Available: ${selectedFlight.seats}</p>
    <p>Hours of Travel: ${selectedFlight.hours} hrs</p>
    <p>Fare Type: ${selectedFlight.fareType}</p>
    <h3>Passengers</h3>
    <ul>${passengerDetails}</ul>
  `;

  // KATU NING SA SWEET ALERT AKONG GI GAMIT GI COPY RANI NAKO SA SWEET ALERT 
  bookNowBtn.addEventListener('click', () => {
    Swal.fire({
      title: 'Processing...',
      text: 'Please wait while we confirm your booking.',
      icon: 'info',
      showConfirmButton: false,
      timer: 2000
    }).then(() => {
      Swal.fire({
        title: 'Booking Confirmed!',
        text: 'Your flight has been successfully booked.',
        icon: 'success',
        confirmButtonText: 'OK'
      });

      summarySection.classList.remove('active');
      homeSection.classList.add('active');

      
      step1.classList.remove('active');
      step2.classList.remove('active');
      step3.classList.remove('active');

    
      bookingForm.reset();
      passengerForm.innerHTML = '';
      summaryDetails.innerHTML = '';
    });
  });
}
// PALIHUG KO STUDY ANI TANAN GAW KAY MEDYO LISOD NI SALAMAT UG GOODLUCK!!!