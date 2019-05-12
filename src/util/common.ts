export interface Dict<T> {
  [key: string]: T
}

export interface Func<A, B> {
  (arg: A): B
}

/**
 * Extend a type with another.
 * Allows adding properties or changing
 * the type of existing properties with
 * matching keys in the 2nd type.
 */
export type Extend<T, U> = {
  [P in keyof (T & U)]:
    P extends keyof U ? U[P] :
    P extends keyof T ? T[P] :
    never;
};

/**
 * Combines a list of css class names into
 * a space delimited css class string.
 */
export function classes(
  ...classNames: (string | undefined)[]
) {
  return classNames
    .filter(c => c != null)
    .join(' ');
}

/**
 * Switch expression. Takes an instance of a union
 * type with a 'type' discriminator property and
 * a map with keys for each discriminator value
 * mapped to mapping functions to transform input
 * to some output.
 *
 * e.g.
 *
 * type Planet =
 *  | { type: 'saturn', diameter: number }
 *  | { type: 'venus', color: string };
 *
 * declare const planet: Planet;
 *
 * const result: number | string = switchExp(planet)({
 *  saturn => p => p.diameter,
 *  venus => p => p.color
 * });
 */
export function switchExp<
  U extends { type: string }
>(value: U) {
  return function doSwitchExt<
    M extends { [P in U['type']]: (value: Extract<U, { type: P }>) => any }
  >(map: M): ReturnType<M[keyof M]> {
    return map[value.type as keyof M](value as any);
  };
}