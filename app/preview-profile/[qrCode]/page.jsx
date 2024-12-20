import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowLeft, User, Eye } from 'lucide-react';
import ProfileData from "../../profiles/[qrCode]/profileData";
import Link from 'next/link';

export default function PreviewProfilePage({ params: paramsPromise }) {
  const params = React.use(paramsPromise);
  const { qrCode } = params;

  return (
    <div className="container mx-auto p-4 max-w-2xl mt-14">
      <Link href="/dashboard" passHref>
        <Button variant="outline" size="lg" className="mb-6 w-full sm:w-auto">
          <ArrowLeft className="mr-2 h-6 w-6" /> Back to Dashboard
        </Button>
      </Link>

      <Card className="mb-6">
        <CardHeader className="bg-primary text-primary-foreground">
          <Link href={`/profiles/${qrCode}`}>
            <CardTitle className="text-2xl flex items-center justify-center">
              <Eye className="mr-2" /> Preview Mode
            </CardTitle>
          </Link>

        </CardHeader>
        <CardContent className="text-center py-4">
          <p>Ovo je izgled vaseg profila nakog sto skenirate QR plocicu.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="bg-secondary">
          <CardTitle className="text-2xl flex items-center justify-center">
            <User className="mr-2" /> Profile Preview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ProfileData qrCode={qrCode} />
        </CardContent>
      </Card>
      <Link href="/dashboard" passHref>
        <Button variant="outline" size="lg" className="mb-6 w-full sm:w-auto mt-4">
          <ArrowLeft className="mr-2 h-6 w-6" /> Back to Dashboard
        </Button>
      </Link>
    </div>
  );
}

