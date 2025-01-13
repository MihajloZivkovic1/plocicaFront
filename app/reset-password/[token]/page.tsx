'use client'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [tokenValid, setTokenValid] = useState<null | boolean>(null);

  const router = useRouter();
  const pathName = usePathname();
  const token = pathName.split("/reset-password/")[1];

  useEffect(() => {
    const checkToken = async () => {
      try {
        const response = await fetch("http://localhost:3000/users/validate-token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        const result = await response.json();
        if (result.valid) {
          setTokenValid(true);
        } else {
          setTokenValid(false);
        }
      } catch (error) {
        console.error("Token validation failed", error);
        setTokenValid(false);
      }
    };
    checkToken();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Šifre se ne poklapaju.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/users/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          password,
        }),
      });

      const result = await response.json();

      if (result.ok) {
        setSuccessMessage("Šifra je uspešno resetovana.");
        router.push("/login");
      } else {
        setErrorMessage(result.message || "Došlo je do greške.");
      }
    } catch (error) {
      setErrorMessage("Došlo je do greške prilikom resetovanja šifre.");
      console.error(error);
    }
  };

  if (tokenValid === null) {
    return <p>Provera tokena...</p>;
  }

  if (!tokenValid) {
    router.push("/not-found");
    return null;
  }

  return (
    <Card className="mx-auto max-w-sm mt-20">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
      </CardHeader>
      <CardContent>
        {successMessage && (
          <Alert className="mb-4">
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>{successMessage}</AlertDescription>
          </Alert>
        )}
        {errorMessage && (
          <Alert variant="destructive" className="mb-4">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="password">New Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter a new password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Confirm Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter a new password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <Button type="submit" className="w-full">
            Reset Password
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
