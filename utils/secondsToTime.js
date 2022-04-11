export default function secondsToTime(time) {
  if (!time || isNaN(time)) {
    return '--:--';
  }
  let m = Math.floor((time % 3600) / 60)
      .toString()
      .padStart(1, '0'),
    s = Math.floor(time % 60)
      .toString()
      .padStart(2, '0');
  return `${m}:${s}`;
}
