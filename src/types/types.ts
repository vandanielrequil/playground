type Tuple<T, N extends number, R extends unknown[] = []> = R["length"] extends N ? R : Tuple<T, N, [T, ...R]>;

type JSONValue = null | boolean | number | string | JSONValue[] | { [key: string]: JSONValue };
