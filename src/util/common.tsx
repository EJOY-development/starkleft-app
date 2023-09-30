// format ##:##:##
export function toRelativeTime(diffMilli: number) {
  let diffSec = Math.floor(diffMilli / 1000);
  const second = diffSec % 60;
  diffSec = Math.floor(diffSec / 60);
  const minute = diffSec % 60;
  diffSec = Math.floor(diffSec / 60);
  const hour = diffSec;

  let text = "";
  if (hour > 0) text += `${hour}`.padStart(2, "0") + ":";
  text += `${minute}`.padStart(2, "0") + ":";
  text += `${second}`.padStart(2, "0");

  return text;
}

export function fastInterval(func: Function, milli: number | undefined) {
  func();
  return setInterval(func, milli);
}
