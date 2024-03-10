function convertTimeTo12HourFormat(time24) {
  // Extract hours and minutes from the time string
  const [hours, minutes] = time24.split(":").map(Number);

  // Determine AM or PM
  const period = hours >= 12 ? "PM" : "AM";

  // Convert hours to 12-hour format
  const hours12 = hours % 12 || 12;

  // Construct the formatted time string
  const time12 = `${hours12}:${minutes.toString().padStart(2, "0")} ${period}`;

  return time12;
}

export default convertTimeTo12HourFormat;
