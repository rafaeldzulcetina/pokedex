/**
 * @interface Pokemon
 * Create the Pokemon entity with its respective properties
 * @property { String } id - identifier @example 1
 */
import { Sprites } from "@/app/modules/Pokedex/domain/Sprites";

export interface Pokemon {
  id: number;
  name: string;
  base_experience: number;
  sprites?: Sprites;
}
