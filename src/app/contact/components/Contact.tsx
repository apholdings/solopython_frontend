'use client';

import Button from '@/components/Button';
import { ToastSuccess } from '@/components/toast/ToastSuccess';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';

export default function Contact() {
  const { data: session } = useSession();

  const [formData, setFormData] = useState({
    firstName: '',
    budget: '',
    phone: '',
    message: '',
    email: '',
  });

  const onChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { firstName, budget, phone, message, email } = formData;

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}/api/contacts/create/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.user?.accessToken}`,
      },
      body: JSON.stringify({
        name: firstName,
        budget,
        phone,
        message,
        email,
      }),
    });

    if (res.status === 200) {
      ToastSuccess('Message sent.');
      setFormData({
        firstName: '',
        budget: '',
        phone: '',
        message: '',
        email: '',
      });
    }
  };

  return (
    <div>
      <div className="relative isolate bg-white px-6 pb-24 lg:px-8">
        <div className="mx-auto max-w-xl lg:max-w-4xl">
          <h2 className="text-4xl font-circular-bold tracking-tight text-gray-900">
            Let’s talk about your project
          </h2>
          <p className="mt-2 font-circular-light text-2xl leading-8 text-gray-600">
            We help companies and individuals build out their brand guidelines.
          </p>
          <div className="mt-16 flex flex-col gap-16 sm:gap-y-20 lg:flex-row">
            <form onSubmit={onSubmit} className="lg:flex-auto">
              <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-semibold leading-6 text-gray-900"
                  >
                    Name
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="text"
                      name="firstName"
                      value={firstName}
                      onChange={onChange}
                      required
                      id="first-name"
                      autoComplete="given-name"
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-semibold leading-6 text-gray-900"
                  >
                    Email
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={onChange}
                      required
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="budget"
                    className="block text-sm font-semibold leading-6 text-gray-900"
                  >
                    Budget
                  </label>
                  <div className="mt-2.5">
                    <input
                      id="budget"
                      name="budget"
                      value={budget}
                      onChange={onChange}
                      type="text"
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-semibold leading-6 text-gray-900"
                  >
                    Telephone
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="text"
                      name="phone"
                      value={phone}
                      onChange={onChange}
                      id="website"
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                {/* <div className="sm:col-span-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold leading-6 text-gray-900"
                  >
                    Subject
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="text"
                      name="subject"
                      value={subject}
                      required
                      onChange={onChange}
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div> */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold leading-6 text-gray-900"
                  >
                    Message
                  </label>
                  <div className="mt-2.5">
                    <textarea
                      id="message"
                      name="message"
                      value={message}
                      required
                      onChange={onChange}
                      rows={4}
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                      defaultValue={''}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-10">
                <Button className="w-full" type="submit">
                  Let’s talk
                </Button>
              </div>
              <p className="mt-4 text-xl font-circular-light leading-6 text-gray-500">
                By submitting this form, I agree to the{' '}
                <Link href="/privacy" className="font-semibold text-blue-500">
                  privacy&nbsp;policy
                </Link>
                .
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
