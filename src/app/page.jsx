'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Card from './Components/Card';

export default function Home() {
  const [username, setUsername] = useState();

  return (
    <main className='flex min-h-screen flex-col items-center p-24'>
      <input
        type='text'
        placeholder='Enter username'
        value={username}
        className='text-black p-[10px] rounded-md px-3 py-2 inline-flex border items-center justify-center text-lg font-medium'
        onChange={(e) => setUsername(e.target.value)}
      />
      <Card username={username} setUsername={setUsername} />
    </main>
  );
}
