'use client';

import { ToastError } from '@/components/toast/ToastError';
import { ToastSuccess } from '@/components/toast/ToastSuccess';
import { useEffect, useState } from 'react';
import Button from '../Button';
import { newsletterSignup } from '@/utils/api/newsletterSignup';

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
    <div className="">
      <form onSubmit={handleSubscribe} className="mt-6 sm:flex sm:max-w-md lg:mt-0">
        <label htmlFor="email-address" className="sr-only">
          Email address
        </label>
        <input
          type="text"
          placeholder={placeholder}
          value={email}
          onChange={handleChange}
          className="pl-4 w-full min-w-0 font-circular-light appearance-none rounded-md border-0 bg-white px-3 py-1.5 text-base text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400  focus:ring-none focus:outline-none focus:border-none  sm:w-56 sm:text-sm sm:leading-6"
        />
        <div className="mt-4 sm:ml-4 sm:mt-0 sm:flex-shrink-0">
          <Button type="submit">Suscribete</Button>
        </div>
      </form>
    </div>
  );
}
