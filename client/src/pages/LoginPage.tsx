import React from "react";
import keycloak from "../lib/keycloak";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

export const LoginPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Welcome to BookVerse
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground mb-6">
            Please log in to continue
          </p>
          <Button
            onClick={() =>
              keycloak.login({
                redirectUri: `${window.location.origin}/books`,
              })
            }
            className="w-full"
          >
            Login with Keycloak
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
