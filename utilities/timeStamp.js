const MONTHS = [
  "Jan.",
  "Feb.",
  "Mar.",
  "Apr.",
  "May",
  "June",
  "July",
  "Aug.",
  "Sept.",
  "Oct.",
  "Nov.",
  "Dec.",
];

export const getTimeStamp = () => {
  const date = new Date();
  return `${
    MONTHS[date.getMonth()]
  } ${date.getDate()}, ${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
};
