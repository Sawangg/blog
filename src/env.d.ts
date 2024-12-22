/// <reference path="../.astro/actions.d.ts" />
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
declare namespace App {
  interface Locals {
    session: import("@lib/session").Session | null;
    user: import("@lib/session").User | null;
  }
}
