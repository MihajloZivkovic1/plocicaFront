import React from 'react';
import ActivationForm from './activationForm';
import { permanentRedirect } from 'next/navigation';
import { notFound } from 'next/navigation';

async function fetchProductData(qrCode: string) {
  try {
    const res = await fetch(`http://localhost:3000/products/${qrCode}`, {
      cache: 'no-store'
    });

    if (res.status === 404) {
      notFound();
    }

    if (!res.ok) {
      throw new Error('Failed to fetch product data');
    }

    const productData = await res.json();
    return productData.product;
  } catch (error) {
    console.error('Error fetching product data:', error);
    notFound();
  }
}

export default async function ActivatePage({ params }: { params: Promise<{ qrCode: string }> }) {
  const { qrCode } = await params;

  console.log(qrCode);

  let product;
  try {
    product = await fetchProductData(qrCode);
  } catch (error) {
    console.error('Error in ActivatePage:', error);
    notFound();
  }

  if (!product) {
    notFound();
  }

  if (product.status.trim().toLowerCase() === 'active') {
    permanentRedirect(`/profiles/${qrCode}`);
  }

  return (
    <div>
      <ActivationForm qrCode={qrCode} />
    </div>
  );
}

