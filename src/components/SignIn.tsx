"use client";

import { actions } from "astro:actions";
import { navigate } from "astro:transitions/client";
import { Button } from "@ui/Button";

export const SignIn = () => (
  <Button
    onPress={async () => {
      const { data, error } = await actions.auth.login({ provider: "github" });
      if (!error) navigate(data.url);
    }}
    outline
    className="font-normal"
  >
    Sign In
  </Button>
);
