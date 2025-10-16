// ===== SCRIPT.JS =====

// Select key DOM elements
const homeSection = document.getElementById('home');
const bookingSection = document.getElementById('booking');
const flightsSection = document.getElementById('flights');
const passengerSection = document.getElementById('passenger');
const summarySection = document.getElementById('summary');

const bookFlightBtn = document.getElementById('bookFlightBtn');
const progressContainer = document.querySelector('.progress-container');

const bookingForm = document.getElementById('bookingForm');
const flightList = document.getElementById('flightList');
const backToBookingBtn = document.getElementById('backToBooking');
const passengerForm = document.getElementById('passengerForm');
const summaryDetails = document.getElementById('summaryDetails');
const bookNowBtn = document.getElementById('bookNow');

// Progress steps
const step1 = document.getElementById('step1');
const step2 = document.getElementById('step2');
const step3 = document.getElementById('step3');

// ===== STEP 1: Book Flight Button =====
bookFlightBtn.addEventListener('click', () => {
  // Hide home and show booking section
  homeSection.classList.remove('active');
  bookingSection.classList.add('active');

  // Show the progress bar
  progressContainer.classList.add('active');

  // Activate Step 1
  step1.classList.add('active');
  step2.classList.remove('active');
  step3.classList.remove('active');
});

// ===== STEP 2: Handle Booking Form Submission =====
bookingForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const from = document.getElementById('from').value;
  const to = document.getElementById('to').value;
  const flightType = document.getElementById('flightType').value;
  const departDate = document.getElementById('departDate').value;
  const returnDate = document.getElementById('returnDate').value;
  const passengers = document.getElementById('passengers').value;

  // Generate some sample flights
  const flights = [
    { flightNo: '5J 560', destination: to, price: 2000, time: '8:00 AM', date: departDate },
    { flightNo: '5J 561', destination: to, price: 2500, time: '1:00 PM', date: departDate },
    { flightNo: '5J 562', destination: to, price: 3000, time: '6:00 PM', date: departDate }
  ];

  // Display available flights
  flightList.innerHTML = '';
  flights.forEach((flight) => {
    const div = document.createElement('div');
    div.classList.add('flight-option');
    div.innerHTML = `
      <p><strong>${flight.flightNo}</strong> - ${flight.destination}</p>
      <p>${flight.date} - ${flight.time}</p>
      <p>₱${flight.price}</p>
      <button class="selectFlight">Select</button>
    `;
    div.querySelector('.selectFlight').addEventListener('click', () => {
      showPassengerForm(flight, passengers, from, to);
    });
    flightList.appendChild(div);
  });

  // Move to flight section
  bookingSection.classList.remove('active');
  flightsSection.classList.add('active');
  step1.classList.add('active');
  step2.classList.add('active');
});

// ===== GO BACK TO BOOKING =====
backToBookingBtn.addEventListener('click', () => {
  flightsSection.classList.remove('active');
  bookingSection.classList.add('active');
});

// ===== STEP 3: Passenger Form =====
function showPassengerForm(selectedFlight, passengers, from, to) {
  flightsSection.classList.remove('active');
  passengerSection.classList.add('active');
  step2.classList.add('active');

  passengerForm.innerHTML = ''; // Clear old form
  for (let i = 1; i <= passengers; i++) {
    passengerForm.innerHTML += `
      <div class="passenger">
        <h3>Passenger ${i}</h3>
        <label>Full Name:</label>
        <input type="text" id="name${i}" required>
        <label>Age:</label>
        <input type="number" id="age${i}" required>
      </div>
    `;
  }

  passengerForm.innerHTML += `<button type="submit" id="toSummaryBtn">Next</button>`;

  document.getElementById('toSummaryBtn').addEventListener('click', (e) => {
    e.preventDefault();
    showSummary(selectedFlight, passengers, from, to);
  });
}

// ===== STEP 4: Summary =====
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
    <p>Date: ${selectedFlight.date} - ${selectedFlight.time}</p>
    <p>Price: ₱${selectedFlight.price}</p>
    <h3>Passengers</h3>
    <ul>${passengerDetails}</ul>
  `;

  // ✅ Book Now SweetAlert confirmation
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

      // Reset progress
      step1.classList.remove('active');
      step2.classList.remove('active');
      step3.classList.remove('active');

      // Reset forms
      bookingForm.reset();
      passengerForm.innerHTML = '';
      summaryDetails.innerHTML = '';
    });
  });
}
