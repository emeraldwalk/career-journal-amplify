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