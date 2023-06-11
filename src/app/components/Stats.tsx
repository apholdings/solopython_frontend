const stats = [
  { id: 2, name: 'Views', value: '10M+' },
  { id: 1, name: 'Subscribers', value: '120K+' },
  { id: 3, name: 'Customers', value: '100K+' },
];

export default function Stats() {
  return (
    <div className="bg-blue-500  py-24 sm:py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12 space-y-2">
          <h1 className="justify-center text-white flex text-4xl lg:text-5xl font-circular-bold">
            Businesses use Python
          </h1>
          <p className="justify-center leading-snug flex text-4xl lg:text-5xl font-circular-medium">
            to do and earn more
          </p>
        </div>
        <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.id} className="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt className="font-circular-bold leading-7 text-white">{stat.name}</dt>
              <dd className="order-first text-4xl font-circular-medium tracking-tight text-white sm:text-6xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
