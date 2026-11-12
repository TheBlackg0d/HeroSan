import { ArrowRight, SquareTerminal } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { Link } from "@tanstack/react-router";

export function RegisterBox() {
  return (
    <Card className="w-full bg-surface-container-lowest/90 backdrop-blur-md shadow-2xl rounded-xl p-space-xl transition-all duration-300">
      <CardHeader className="flex flex-col items-start pb-space-lg">
        <BrandIdentifierSection />
        <LoginHeader />
      </CardHeader>
      <CardContent>
        <RegistrationForm />
      </CardContent>
      <CardFooter className="text-center t-space-xs">
        <p className="font-body-sm! text-on-surface-variant">
          Already have an account
          <Link
            to="/login"
            className="text-primary hover:text-primary-fixed-dim font-medium hover:underline underline-offset-2 transition-colors ml-1"
          >
            Sign-in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}

function RegistrationForm() {
  return (
    <form>
      <div className="flex flex-col gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="john.doe@email.com" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="pasword">Pasword</Label>
          <Input id="pasword" type="pasword" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="confirm-pasword">Confirm Pasword</Label>
          <Input id="confirm-pasword" type="pasword" />
        </div>
        <div className="flex gap-2">
          <Checkbox id="terms" />
          <Label htmlFor="terms">
            AI agree to the{" "}
            <span className="text-primary">Terms of Sevice</span> and{" "}
            <span className="text-primary">Privacy Policy</span>
          </Label>
        </div>
        <Button className="font-headline-sm!">
          Create account <ArrowRight />
        </Button>
      </div>
    </form>
  );
}

function LoginHeader() {
  return (
    <div className="flex flex-col gap-1">
      <CardTitle className="font-headline-lg! text-on-surface">
        Creat Your Acccount
      </CardTitle>
      <CardDescription className="font-body-sm! text-on-surface-variant">
        Deploy and orchestrate bare-metal &amp; coud clusters in minutes.
      </CardDescription>
    </div>
  );
}
function BrandIdentifierSection() {
  return (
    <div className="flex items-center justify-between pb-space-lg w-full">
      <div className="flex items-center gap-space-sm">
        <div className="w-7 h-7 rounded-lg bg-surface-container flex items-center justify-center text-primary shadow-sm">
          <SquareTerminal size={16} color="#3b82f6" />
        </div>
        <span className="font-headline-sm text-on-surface">Herosan</span>
      </div>
      <div className="flex items-center gap-1.5 px-space-sm py-0.5 rounded bg-surface-container-high text-outline">
        <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
        <span className="font-code-sm text-on-surface-variant">v2.4.0</span>
      </div>
    </div>
  );
}
