export function enumToOptions(enumObj: any) {
  return Object.keys(enumObj)
    .filter(k => isNaN(Number(k)))
    .map(k => ({ label: k, value: enumObj[k] }));
}