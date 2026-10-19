import { cn } from "cn";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import GoogleButtonLogin from "./Button";
import { useState } from "react";
import { useAuth } from "@/auth/AuthContext";

const emptyForm = { username: "", email: "", fullName: "", password: "" };

export function LoginForm({ className, ...props }) {
  const { loginWithEmail, registerWithEmail } = useAuth();
  const [mode, setMode] = useState("login"); // login || register
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);

  const isRegister = mode === "register";

  function handleChange(event) {
    setForm({ ...form, [event.target.id]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);

    if (isRegister) {
      await registerWithEmail(form);
    } else {
      await loginWithEmail({
        username: form.username,
        password: form.password,
      });
    }

    setSubmitting(false);
  }

  function toggle(event) {
    event.preventDefault();
    setMode(isRegister ? "login" : "register");
  }

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={handleSubmit}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Enter your email below to login to your account
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            value={form.email}
            onChange={handleChange}
            required
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="username">username</FieldLabel>
          <Input
            id="username"
            type="text"
            placeholder="username"
            value={form.username}
            onChange={handleChange}
            required
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="fullName">fullName</FieldLabel>
          <Input
            id="fullName"
            type="fullName"
            placeholder="fullName"
            value={form.fullName}
            onChange={handleChange}
            required
          />
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input
            id="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </Field>
        <Field>
          <Button type="submit" disabled={submitting}>
            {isRegister ? "Sign up" : "Login"}
          </Button>
        </Field>
        <FieldSeparator>Or continue with</FieldSeparator>
        <Field>
          <GoogleButtonLogin />
          <FieldDescription className="text-center">
            {isRegister
              ? "Don't have an account yet? "
              : "Already have an account? "}
            <a
              href="#"
              onClick={toggle}
              className="underline underline-offset-4"
            >
              {isRegister ? "Sign up" : "Login"}
            </a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
