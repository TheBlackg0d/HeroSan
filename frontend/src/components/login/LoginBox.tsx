import { ArrowRight, SquareTerminal } from "lucide-react";
import { CardContent, CardFooter, CardHeader } from "../ui/card";

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Link } from "@tanstack/react-router";

export function LoginBox() {
  return (
    <section className="w-full bg-surface-container-low rounded-xl shadow-xl p-space-xl flex flex-col relative overflow-hidden backdrop-blur-md">
      <Header />
      <CardContent className="mb-space-xl">
        <LoginForm />
      </CardContent>
      <LoginFooter />
    </section>
  );
}

function LoginFooter() {
  return (
    <CardFooter className="mt-space-lg pt-space-md bg-surface-container-lowest/40 -mx-space-xl -mb-space-xl px-space-xl pb-space-lg flex flex-col items-center gap-space-xs">
      <p className="font-body-sm text-body-sm text-outline text-center">
        Don't have an account ?
        <Link
          to="/register"
          className="text-primary hover:text-primary-fixed transition-colors font-medium ml-1"
        >
          create an account
        </Link>
      </p>
    </CardFooter>
  );
}

function LoginForm() {
  return (
    <form className="flex flex-col gap-space-md">
      <div className="flex flex-col gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="john.doe@email.com" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="pasword">Pasword</Label>
          <Input id="pasword" type="pasword" />
        </div>
        <Button className="text-headline-sm!">
          Sign in <ArrowRight />
        </Button>
      </div>
    </form>
  );
}

function Header() {
  return (
    <CardHeader className="flex flex-col items-center text-center mb-space-lg">
      <Logo />
      <LogoHeadline />
      <h1 className="font-headline-sm text-headline-sm text-on-surface mt-space-xs">
        Sign in to your instance
      </h1>
      <p className="font-body-sm text-body-sm text-outline mt-0.5 max-w-[320px]">
        Self-hosted clusters runtime &amp; continious deployment engine
      </p>
    </CardHeader>
  );
}

function Logo() {
  return (
    <div className="relative mb-space-md">
      <div className="w-12 h-12 rounded-xl bg-surface-container-highest flex items-center justify-center shadow-inner">
        <SquareTerminal size={26} color="#3b82f6" />
        <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-surface-container-low flex items-center justify-center">
          <span className="w-2 h-2 rounded-full bg-tertiary shadow-[0_0_8px_#4edea3"></span>
        </div>
      </div>
    </div>
  );
}

function LogoHeadline() {
  return (
    <div className="flex items-center gap-space-xs mb-space-xs">
      <span className="font-headline-md text-headline-md text-on-surface font-semibold tracking-tight">
        Herosan
      </span>
      <span className="px-space-xs py-0.5 rounded bg-surface-container-highest text-outline font-code-sm text-code-sm uppercase tracking-tight">
        v2.4.0
      </span>
    </div>
  );
}
