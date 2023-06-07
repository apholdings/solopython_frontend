const stats = [
  { label: 'Transactions every 24 hours', value: '44 million' },
  { label: 'Assets under holding', value: '$119 trillion' },
  { label: 'New users annually', value: '46,000' },
];

export default function Content() {
  return (
    <div className="mx-auto -mt-12 max-w-7xl px-6 sm:mt-0 lg:px-8 xl:-mt-8">
      <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our mission</h2>
        <div className="mt-6 flex flex-col gap-x-8 gap-y-20 lg:flex-row">
          <div className="lg:w-full lg:max-w-2xl lg:flex-auto">
            <p className="text-xl leading-8 text-gray-600">
              Aliquet nec orci mattis amet quisque ullamcorper neque, nibh sem. At arcu, sit dui mi,
              nibh dui, diam eget aliquam. Quisque id at vitae feugiat egestas ac. Diam nulla orci
              at in viverra scelerisque eget. Eleifend egestas fringilla sapien.
            </p>
            <div className="mt-10 max-w-xl text-base leading-7 text-gray-700">
              <p>
                Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis
                mauris semper sed amet vitae sed turpis id. Id dolor praesent donec est. Odio
                penatibus risus viverra tellus varius sit neque erat velit. Faucibus commodo massa
                rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris semper sed amet
                vitae sed turpis id.
              </p>
              <p className="mt-10">
                Et vitae blandit facilisi magna lacus commodo. Vitae sapien duis odio id et. Id
                blandit molestie auctor fermentum dignissim. Lacus diam tincidunt ac cursus in vel.
                Mauris varius vulputate et ultrices hac adipiscing egestas. Iaculis convallis ac
                tempor et ut. Ac lorem vel integer orci.
              </p>
            </div>
          </div>
          <div className="lg:flex lg:flex-auto lg:justify-center">
            <dl className="w-64 space-y-8 xl:w-80">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col-reverse gap-y-4">
                  <dt className="text-base leading-7 text-gray-600">{stat.label}</dt>
                  <dd className="text-5xl font-semibold tracking-tight text-gray-900">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
