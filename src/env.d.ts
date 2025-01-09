declare namespace App {
  interface Locals {
    session: import("@lib/session").Session | null;
    user: import("@lib/session").User | null;
  }
}
