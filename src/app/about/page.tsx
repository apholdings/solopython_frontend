import Link from 'next/link';
import Content from './components/Content';
import Header from './components/Header';
import Team from './components/Team';
import Value from './components/Value';
import Button from '@/components/Button';

export default function Page() {
  return (
    <div>
      <Header />
      {/* Image section */}
      <div className="pt-12 xl:mx-auto xl:max-w-7xl xl:px-8">
        <img
          src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
          alt=""
          className="aspect-[5/2] w-full object-cover xl:rounded-md shadow-neubrutalism-md shadow-blue-100"
        />
      </div>

      <div className="grid-cols-12 py-12 my-20 grid bg-blue-100 bg-opacity-30">
        <div className="lg:p-16 p-12 col-span-6">
          <h1 className="text-xl lg:text-5xl tracking-wide leading-relaxed font-circular-medium">
            Kajabi’s industry-leading{' '}
            <span className="font-circular-medium text-blue-500">all-in-one platform</span> makes it
            simple to create a successful business online.
          </h1>
        </div>
        <div className="p-12 col-span-6 space-y-4">
          <p className=" font-circular-light text-xl">
            Since launching in 2010, Kajabi has empowered over 50,000 knowledge entrepreneurs in 120
            countries to serve 60 million students and make over $4 billion in sales.
          </p>
          <p className="hidden lg:flex font-circular-light text-xl">
            By putting all the pieces of a successful business in one convenient platform, Kajabi
            let’s knowledge entrepreneurs (like you!) get started and grow faster. As Kajabi CEO
            Ahad Khan explains, “Kajabi helps serious business owners get unstuck and just keep
            going.”
          </p>
        </div>
      </div>

      <div className="bg-white px-6  lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-xl font-circular-medium leading-7 text-blue-500">Our mission</p>
          <h2 className="mt-2 text-2xl font-circular-medium tracking-tight text-gray-900 sm:text-4xl">
            Empower knowledge entrepreneurs who are serious about their business to achieve success
            online.
          </h2>
        </div>
      </div>

      <div className=" bg-white space-y-8 lg:p-16 p-1 px-4 py-5 sm:px-6 mt-24 max-w-5xl">
        <h3 className="text-5xl font-circular-medium leading-6 text-gray-900">
          It’s all about the people
        </h3>
        <p className="mt-1 text-xl text-gray-900 font-circular-light">
          From our very first hires, the entire Kajabi team has always been focused on fanatically
          serving our customers. We believe the only way to be successful is to truly listen and
          create the products and features our customers need.{' '}
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-6 lg:gap-8 px-6 lg:px-12">
        <div className="group shadow-neubrutalism-lg shadow-blue-100 border-2 border-gray-900 aspect-h-1 aspect-w-2 overflow-hidden rounded-lg sm:aspect-h-1 sm:aspect-w-1 sm:row-span-2">
          <img
            src="https://tailwindui.com/img/ecommerce-images/home-page-03-featured-category.jpg"
            alt="Two models wearing women's black cotton crewneck tee and off-white cotton crewneck tee."
            className="object-cover object-center"
          />
          <div
            aria-hidden="true"
            className="bg-gradient-to-b from-transparent to-black opacity-50"
          />
        </div>
        <div className="group shadow-neubrutalism-lg shadow-blue-100 border-2 border-gray-900 aspect-h-1 aspect-w-2 overflow-hidden rounded-lg sm:aspect-none sm:relative sm:h-full">
          <img
            src="https://tailwindui.com/img/ecommerce-images/home-page-03-category-01.jpg"
            alt="Wooden shelf with gray and olive drab green baseball caps, next to wooden clothes hanger with sweaters."
            className="object-cover object-center sm:absolute sm:inset-0 sm:h-full sm:w-full"
          />
          <div
            aria-hidden="true"
            className="bg-gradient-to-b from-transparent to-black opacity-50 sm:absolute sm:inset-0"
          />
        </div>
        <div className="group shadow-neubrutalism-lg shadow-blue-100 border-2 border-gray-900 aspect-h-1 aspect-w-2 overflow-hidden rounded-lg sm:aspect-none sm:relative sm:h-full">
          <img
            src="https://tailwindui.com/img/ecommerce-images/home-page-03-category-02.jpg"
            alt="Walnut desk organizer set with white modular trays, next to porcelain mug on wooden desk."
            className="object-cover object-center sm:absolute sm:inset-0 sm:h-full sm:w-full"
          />
          <div
            aria-hidden="true"
            className="bg-gradient-to-b from-transparent to-black opacity-50 sm:absolute sm:inset-0"
          />
        </div>
      </div>

      <div className=" bg-white space-y-8 lg:p-16 p-1 px-4 py-5 sm:px-6 max-w-5xl">
        <p className="mt-1 text-lg text-gray-900 font-circular-light">
          Now, we’ve grown to over 100 team members working out of our headquarters in Irvine,
          California. By staying humble and focused on bringing the heart to tech, we’re encouraging
          more online business owners to make their impact every day.Interested in joining our team?
          View open positions.
        </p>
      </div>

      <div className="w-full border border-gray-100" />

      <div className="bg-white">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-circular-medium tracking-tight text-blue-500 sm:text-5xl">
              Try SoloPython free for 14 days.
            </h2>
            <p className="mx-auto mt-6 max-w-4xl font-circular-book text-2xl leading-8 text-gray-500">
              Since we’re both serious about your business, let’s make it official.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/price">
                <Button className="py-4 px-8 text-xl">Start free trial</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
