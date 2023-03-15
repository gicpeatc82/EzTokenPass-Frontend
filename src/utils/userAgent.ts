export const isMobileDevice = () => {
  const mobileDevice = ['Android', 'webOS', 'iPhone', 'iPad', 'iPod', 'BlackBerry', 'Windows Phone'];
  return mobileDevice.some((device) => navigator.userAgent.match(device));
};
