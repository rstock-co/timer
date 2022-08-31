// get args,
const args = process.argv.slice(2);

// convert to milliseconds, filter out non numeric values and negative numbers
let alarms = args
  .map((arg) => Number(arg) * 1000)
  .filter((alarm) => !isNaN(alarm))
  .filter((alarm) => alarm > 0);

// sort
alarms.sort((a, b) => a - b);

// make array of intervals
const intervals = alarms.map((val, ind, arr) => {
    let nextVal = arr[ind + 1];
    if (ind === 0) return [val].concat([nextVal - val]);
    return nextVal - val;
  }).slice(0, -1).flat();

// main function 
const setAlarms = (intervals, i = 0) => {
  setTimeout(() => {
    if (i < intervals.length) {
      process.stdout.write('\x07');
      setAlarms(intervals, i + 1);
    }
  }, intervals[i]);
};

setAlarms(intervals);