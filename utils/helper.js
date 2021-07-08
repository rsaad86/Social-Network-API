//Gets and formats the date
function dateFormat(timestamp) {
  var dateObj = new Date(timestamp);
  return `${dateObj.toDateString()} at ${dateObj.getHours()}:${dateObj.getMinutes()}`;
}

module.exports = dateFormat;
