export function formatDateTime(dateTimeString) {
  if (dateTimeString === '') { return '' };

  const months = [
    "January", 
    "February", 
    "March",
    "April", 
    "May", 
    "June", 
    "July", 
    "August", 
    "September", 
    "October", 
    "November", 
    "December"
  ];

  let dateTime = new Date(dateTimeString)
  let formattedDate =  months[dateTime.getMonth()] + ' ' + dateTime.getDate() + ", " + dateTime.getFullYear()
  
  return formattedDate;
};
