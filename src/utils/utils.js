export const DatesToString = (date) => {
  const monthArray = [
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
    "December",
  ];
  let dateArr;
  if (date.length > 10) {
    const dateTrimmed = date.slice(0, 11);
    dateArr = dateTrimmed.split("-");
  } else {
    dateArr = date.split("-");
  }
  const monthInNumber = Number(dateArr[1]) - 1;

  const month = monthArray[monthInNumber];

  return `Joined ${month} ${dateArr[0]}`;
};

export const getCount = (arr) => {
  if (arr.length > 1000) {
    return `${(arr.length / 1000).toFixed(1)}k`;
  } else {
    return arr.length;
  }
};
