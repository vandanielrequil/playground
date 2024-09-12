export const isKeyOf = <T extends object>(key: any, obj: T): key is keyof T => key in obj;

export const isValueInUnionArray = <T extends string>(value: string, unionArray: readonly T[])
  : value is T => unionArray.includes(value as T);
