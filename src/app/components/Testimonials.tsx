'use client';

import Slider from 'react-slick';

export default function Testimonials() {
  const carouselSettings = {
    dots: false,
    infinite: true,
    speed: 19000,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 1000,
    cssEase: 'linear',
  };

  const testimonials = [
    {
      body: 'Laborum quis quam. Dolorum et ut quod quia. Voluptas numquam delectus nihil. Aut enim doloremque et ipsam.',
      author: {
        name: 'Leslie Alexander',
        handle: 'lesliealexander',
        imageUrl:
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
    },
    {
      body: 'Aut reprehenderit voluptatem eum asperiores beatae id. Iure molestiae ipsam ut officia rem nulla blanditiis.',
      author: {
        name: 'Lindsay Walton',
        handle: 'lindsaywalton',
        imageUrl:
          'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
    },
    {
      body: 'Voluptas quos itaque ipsam in voluptatem est. Iste eos blanditiis repudiandae. Earum deserunt enim molestiae ipsum perferendis recusandae saepe corrupti.',
      author: {
        name: 'Tom Cook',
        handle: 'tomcook',
        imageUrl:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
    },
    {
      body: 'Molestias ea earum quos nostrum doloremque sed. Quaerat quasi aut velit incidunt excepturi rerum voluptatem minus harum.',
      author: {
        name: 'Leonard Krasner',
        handle: 'leonardkrasner',
        imageUrl:
          'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
    },
    {
      body: 'Integer id nunc sit semper purus. Bibendum at lacus ut arcu blandit montes vitae auctor libero. Hac condimentum dignissim nibh vulputate ut nunc. Amet nibh orci mi venenatis blandit vel et proin. Non hendrerit in vel ac diam.',
      author: {
        name: 'Brenna Goyette',
        handle: 'brennagoyette',
        imageUrl:
          'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=1024&h=1024&q=80',
        logoUrl: 'https://tailwindui.com/img/logos/savvycal-logo-gray-900.svg',
      },
    },
  ];

  return (
    <>
      <div className="bg-white px-6 pt-20 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex space-x-4 items-center justify-center">
            <h2 className="text-4xl font-circular-medium tracking-tight text-gray-900 sm:text-5xl">
              Real People.
            </h2>
            <h2 className="text-4xl font-circular-medium text-blue-500 tracking-tight sm:text-5xl">
              Real Results.
            </h2>
          </div>
          <p className="mt-6 text-lg font-circular-book leading-8 text-gray-600">
            When you learn on SoloPython, you’re joining 50,000+ serious experts, entrepreneurs and
            creators around the world — you know, people like you.
          </p>
        </div>
      </div>
      <div className="relative isolate  pt-4 overflow-hidden">
        <Slider {...carouselSettings}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className="overflow-hidden rounded-lg  p-4">
              <figure
                key={testimonial.author.handle}
                className="rounded-2xl bg-white p-6 border border-gray-900 shadow-lg ring-1 ring-gray-900/5"
              >
                <figcaption className="mb-6 flex items-center gap-x-4">
                  <img
                    className="h-10 w-10 rounded-full bg-gray-50"
                    src={testimonial.author.imageUrl}
                    alt=""
                  />
                  <div>
                    <div className="font-semibold">{testimonial.author.name}</div>
                    <div className="text-gray-600">{`@${testimonial.author.handle}`}</div>
                  </div>
                </figcaption>
                <blockquote className="text-gray-900">
                  <p>{`“${testimonial.body}”`}</p>
                </blockquote>
              </figure>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}
