import React from 'react';
import { redirect } from 'next/navigation';
import ProfileData from './profileData';

async function fetchProductData(qrCode) {
  const res = await fetch(`http://localhost:3000/products/${qrCode}`, {
    cache: 'no-store'
  });
  if (!res.ok) {
    throw new Error('Failed to fetch products data');
  }
  return res.json();
}

export default async function ProfilePage({ params }) {
  const { qrCode } = await params;

  const productData = await fetchProductData(qrCode);
  const { product } = productData;


  if (!product) {
    return <div>Product not found for QR code: {qrCode}</div>;
  }


  if (product.status.trim().toLowerCase() === 'inactive') {
    return redirect(`/activate/${qrCode}`);
  }
  else if (product.status.trim().toLowerCase() !== 'active') {
    console.warn("Unexpected product status: ", product.status);
  }

  return (
    <div>
      <ProfileData qrCode={qrCode} />
    </div>
  );
}