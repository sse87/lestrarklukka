const units = (() => {
  const sec = 1;
  const min = sec * 60;
  const hour = min * 60;
  return { sec, min, hour };
})();

export const parseTime = (diff: number) => {
  // save original diff as t
  const t = diff;
  // Hours
  const h = Math.floor(diff / units.hour);
  diff = diff % units.hour;
  // Minutes
  const m = Math.floor(diff / units.min);
  diff = diff % units.min;
  // Seconds
  const s = Math.floor(diff / units.sec);
  const ms = diff % units.sec;
  // Return all in one object
  return { h, m, s, ms, t };
};

const d2 = (n: number): string => `${n > 9 ? '' : '0'}${n}`;

export const formatTime = (time: number) => {
  const isNegative = time < 0;

  const parsedTime = parseTime(Math.abs(time));

  let formatedTime = isNegative ? '- ' : '';
  if (parsedTime.h > 0) formatedTime += `${d2(parsedTime.h)} : `;
  formatedTime += `${d2(parsedTime.m)} : ${d2(parsedTime.s)}`;

  return formatedTime;
};
