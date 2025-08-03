export const validateId = (id: number): string => {
  if (id > 0 && id < 10) {
    return `N° 00${id}`;
  } else if (id >= 10 && id < 100) {
    return `N° 0${id}`;
  } else {
    return `N° ${id}`;
  }
};
