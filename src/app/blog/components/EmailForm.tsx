'use client';

import { ToastError } from '@/components/toast/ToastError';
import { ToastSuccess } from '@/components/toast/ToastSuccess';
import { newsletterSignup } from '@/utils/api/newsletterSignup';
import { useEffect, useState } from 'react';

export default function EmailForm() {
  const [placeholder, setPlaceholder] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    setPlaceholder('e.g yourname@email.com');
  }, []);

  const handleSubscribe = async (event: any) => {
    event.preventDefault();
    const emailInput = email;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailInput.trim() === '') {
      // Input is empty
      ToastError('Email is required.');
      return;
    }

    if (!emailRegex.test(emailInput)) {
      // Invalid email format
      ToastError('Invalid email format.');
      return;
    }

    // Handle subscription logic here
    const res = await newsletterSignup(email);
    if (res.status === 200) {
      ToastSuccess('Welcome to our newsletter! We are excited to have you on board.');
    } else {
      ToastError('Email already exists.');
    }
  };

  const handleChange = (event: any) => {
    setEmail(event.target.value);
  };

  return (
    <div className="mt-6">
      <form onSubmit={handleSubscribe}>
        <input
          type="text"
          placeholder={placeholder}
          value={email}
          onChange={handleChange}
          className="block w-full rounded-lg border-0 placeholder:text-base py-3.5 text-gray-900 shadow-sm   placeholder:text-gray-500 focus:ring-none focus:outline-none sm:text-sm sm:leading-6"
        />
        <button
          type="submit"
          className="w-full py-3 rounded-lg mt-2 bg-light-black hover:bg-black text-white font-circular-bold transition duration-300 ease-in-out scale-100 hover:scale-105"
        >
          Join our newsletter
        </button>
      </form>
    </div>
  );
}
