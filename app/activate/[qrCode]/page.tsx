import React from 'react';
import ActivationForm from './activationForm';
import { permanentRedirect } from 'next/navigation';

async function fetchProductData(qrCode: string) {
  const res = await fetch(`https://plocicaapi.onrender.com/products/${qrCode}`);

  if (!res.ok) {
    throw new Error('Failed to fetch product data');
  }

  const productData = await res.json();
  return productData.product;
}

export default async function ActivatePage({ params }: { params: Promise<{ qrCode: string }> }) {

  const { qrCode } = await params;


  console.log(qrCode);


  const product = await fetchProductData(qrCode);


  if (product.status.trim().toLowerCase() === 'active') {
    permanentRedirect(`/profiles/${qrCode}`);
  }

  return (
    <div>
      <ActivationForm qrCode={qrCode} />
    </div>
  );
}
