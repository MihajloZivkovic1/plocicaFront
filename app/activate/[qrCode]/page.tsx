
import React from 'react';
import ActivationForm from './activationForm';
import { permanentRedirect } from 'next/navigation';
import ProfileData from '@/app/profiles/[qrCode]/profileData';


async function fetchProductData(qrCode: string) {
  const res = await fetch(`http://localhost:3000/products/${qrCode}`);

  if (!res.ok) {
    throw new Error('Failed to fetch product data');
  }

  const productData = await res.json();
  return productData.product;
}

export default async function ActivatePage({ params }: { params: { qrCode: string } }) {
  const { qrCode } = await params

  const product = await fetchProductData(qrCode);
  console.log(product.status);

  if (product.status.trim().toLowerCase() === 'active') {
    return permanentRedirect(`/profiles/${qrCode}`);
  }

  return (
    <div>
      <h1>This is Activation Form that is sending data to server i hope..</h1>
      <h1>{qrCode}</h1>

      <ActivationForm qrCode={qrCode} ></ActivationForm>
    </div>
  )

}
