type Tuple<T, N extends number, R extends unknown[] = []> = R["length"] extends N ? R : Tuple<T, N, [T, ...R]>;
