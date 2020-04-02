export const time = (val: string) => {
  const date = new Date(val);
  let diff = (Date.now() - date.getTime()) / 1000 / 60; // minutes

  if (diff < 60) {
    const out = Math.floor(diff);
    return `${out} minute${out > 1 ? "s" : ""} ago`;
  } else if (diff / 60 < 24) {
    const out = Math.floor(diff / 60);
    return `${out} hour${out > 1 ? "s" : ""} ago`;
  }

  return `On ${date.toLocaleString()}`;
};

export const formatTemp = (temp: number) => `${temp}°C`;
export const formatHum = (hum: number) => `${hum}%`;
