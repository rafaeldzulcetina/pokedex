/**
 * @interface User
 * Create the User entity with its respective properties
 * @property { String } id - identifier @example 1
 */
export interface User {
  id?: number;
  username: string;
  password: string;
}
