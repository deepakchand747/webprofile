const todayDateElement = document.getElementById("todayDate");
const holidayStatusElement = document.getElementById("holidayStatus");
const nextHolidayNameElement = document.getElementById("nextHolidayName");
const nextHolidayDateElement = document.getElementById("nextHolidayDate");
const countdownElement = document.getElementById("countdown");
const holidayListElement = document.getElementById("holidayList");

const today = new Date();
const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());

function formatFullDate(date) {
  return date.toLocaleDateString("en-FJ", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric"
  });
}

function formatShortDate(date) {
  return date.toLocaleDateString("en-FJ", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}

function getHolidayDate(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function getNextHoliday() {
  return holidays
    .map(h => ({
      ...h,
      jsDate: getHolidayDate(h.date)
    }))
    .filter(h => h.jsDate >= todayOnly)
    .sort((a, b) => a.jsDate - b.jsDate)[0];
}

function isTodayHoliday() {
  return holidays.some(h => {
    const holidayDate = getHolidayDate(h.date);
    return holidayDate.getTime() === todayOnly.getTime();
  });
}

function getTodayHolidayName() {
  const holiday = holidays.find(h => {
    const holidayDate = getHolidayDate(h.date);
    return holidayDate.getTime() === todayOnly.getTime();
  });

  return holiday ? holiday.name : null;
}

function renderToday() {
  todayDateElement.textContent = formatFullDate(todayOnly);

  if (isTodayHoliday()) {
    holidayStatusElement.textContent = `Today is ${getTodayHolidayName()}.`;
  } else {
    holidayStatusElement.textContent = "Today is not a Fiji public holiday.";
  }
}

function renderNextHoliday() {
  const nextHoliday = getNextHoliday();

  if (!nextHoliday) {
    nextHolidayNameElement.textContent = "No upcoming holiday found";
    nextHolidayDateElement.textContent = "";
    countdownElement.textContent = "";
    return;
  }

  const diffInMs = nextHoliday.jsDate - todayOnly;
  const diffInDays = Math.round(diffInMs / (1000 * 60 * 60 * 24));

  nextHolidayNameElement.textContent = nextHoliday.name;
  nextHolidayDateElement.textContent = formatFullDate(nextHoliday.jsDate);

  if (diffInDays === 0) {
    countdownElement.textContent = "It is today.";
  } else if (diffInDays === 1) {
    countdownElement.textContent = "1 day left.";
  } else {
    countdownElement.textContent = `${diffInDays} days left.`;
  }
}

function renderHolidayList() {
  const nextHoliday = getNextHoliday();

  holidayListElement.innerHTML = "";

  holidays
    .map(h => ({
      ...h,
      jsDate: getHolidayDate(h.date)
    }))
    .sort((a, b) => a.jsDate - b.jsDate)
    .forEach(holiday => {
      const item = document.createElement("div");
      item.className = "holiday-item";

      if (nextHoliday && holiday.id === nextHoliday.id) {
        item.classList.add("next");
      }

      item.innerHTML = `
        <div>
          <div class="holiday-name">${holiday.name}</div>
        </div>
        <div class="holiday-date">
          ${formatShortDate(holiday.jsDate)}<br>
          ${holiday.jsDate.toLocaleDateString("en-FJ", { weekday: "long" })}
        </div>
      `;

      holidayListElement.appendChild(item);
    });
}

renderToday();
renderNextHoliday();
renderHolidayList();