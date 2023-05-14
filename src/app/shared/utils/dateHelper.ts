


function formatDate(x: string) {
  const xs = x.split("T");
  const newDate = xs[0];
  return newDate;

}

export function getOffsetDateStr(date: Date) {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const offset = new Date().getTimezoneOffset() / 60;
  // console.log('Time zone:', timeZone);
  // console.log('Offset:', offset, 'hours');
  const x = new Date(date);
  console.log(x);
  // date.setUTCHours(date.getUTCHours() - offset);
  x.setUTCHours(date.getUTCHours() - offset);

  const x1 = x.toISOString();
  // console.log(x1);
  const newDate = formatDate(x1);
  // console.log("new: ", newDate);
  return newDate;

}

export function getOffsetDate() {
  const date = new Date();
  const offset = new Date().getTimezoneOffset() / 60;
  date.setUTCHours(date.getUTCHours() - offset);
  return date;
}
