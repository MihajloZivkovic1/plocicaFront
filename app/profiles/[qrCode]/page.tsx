import React from 'react';
import { redirect } from 'next/navigation';
import { notFound } from 'next/navigation';
import ProfileData from './profileData';

async function fetchProductData(qrCode: string) {
  const res = await fetch(`http://localhost:3000/products/${qrCode}`, {
    cache: 'no-store'
  });

  console.log(res.status);
  if (res.status === 404) {
    notFound();
  }

  if (!res.ok) {
    throw new Error('Failed to fetch products data');
  }

  return res.json();
}

export default async function ProfilePage({ params }: { params: { qrCode: string } }) {
  const { qrCode } = params;

  let productData;
  try {
    productData = await fetchProductData(qrCode);
  } catch (error) {
    console.error('Error fetching product data:', error);
    notFound();
  }

  const { product } = productData;

  if (!product) {
    notFound();
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

