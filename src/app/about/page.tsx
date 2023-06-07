import Content from './components/Content';
import Header from './components/Header';
import Team from './components/Team';
import Value from './components/Value';

export default function Page() {
  return (
    <div>
      <Header />
      <Content />
      {/* Image section */}
      <div className="mt-32 sm:mt-40 xl:mx-auto xl:max-w-7xl xl:px-8">
        <img
          src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
          alt=""
          className="aspect-[5/2] w-full object-cover xl:rounded-3xl"
        />
      </div>
      <Value />
      <Team />
    </div>
  );
}
