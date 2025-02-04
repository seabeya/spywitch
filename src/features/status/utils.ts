function msToTime(milliseconds: number) {
  const remainder = milliseconds % (1000 * 60 * 60);

  const hours = Math.floor(milliseconds / (1000 * 60 * 60));
  const minutes = Math.floor(remainder / (1000 * 60));
  const seconds = Math.floor((remainder % (1000 * 60)) / 1000);

  let formattedTime = '';

  if (hours > 0) {
    formattedTime += `${hours.toString().padStart(2, '0')}:`;
  }

  formattedTime += `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return formattedTime;
}

export { msToTime };
