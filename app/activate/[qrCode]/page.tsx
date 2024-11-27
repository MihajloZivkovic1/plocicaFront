
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


  if (product.status.trim().toLowerCase() === 'active') {
    return permanentRedirect(`/profiles/${qrCode}`);
  }
  // if (product.status.trim().toLowerCase() === 'active') {
  //   return permanentRedirect(`/contact`);
  // }

  return (
    <div>
      <ActivationForm qrCode={qrCode} ></ActivationForm>
    </div>
  )

}
