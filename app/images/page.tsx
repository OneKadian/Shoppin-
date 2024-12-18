import Images  from '../components/imageCode';
 import React, { Suspense } from 'react';


export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Images />
    </Suspense>
  );
}