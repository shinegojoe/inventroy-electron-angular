
export function isObjectEqual(obj1: any, obj2: any) {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  if (JSON.stringify(keys1.sort()) === JSON.stringify(keys2.sort())) {
    return true;
  } else {
    return false;
  }
}

export function checkIsSameKey<T>(res: Array<T>, newObj: T) {
  if(res.length > 0) {
    const x = res[0];
    const isSameInstance = isObjectEqual(x, newObj);
    expect(isSameInstance).toBe(true);
  }
}
