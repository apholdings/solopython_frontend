import ConfettiContainer from './components/ConfettiContainer';
import CreditCardPayment from './components/CreditCardPayment';
import OrderItems from './components/OrderItems';
import OrderSummary from './components/OrderSummary';
import PaymentMethod from './components/PaymentMethod';

export default function Page() {
  return (
    <ConfettiContainer>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
        <div className="mx-auto max-w-7xl">
          {/* Content goes here */}
          <div className="grid-cols-0 grid  md:grid-cols-2">
            <div className="col-span-1 dark:bg-dark-bg bg-white">
              <div className=" py-4 sm:flex ">
                <div className="font-recife-bold text-2xl leading-6" />
              </div>

              <div className=" pt-6  sm:flex ">
                <h3 className="font-recife-bold text-4xl leading-6 dark:text-dark-txt text-gray-900">
                  Checkout
                </h3>
              </div>

              <div className=" pt-12 pb-6 sm:flex ">
                <h3 className="text-2xl font-black leading-6 dark:text-dark-txt text-gray-900">
                  Payment Method
                </h3>
              </div>

              <div className="pr-8">
                <PaymentMethod />
              </div>

              <div className=" pt-14 pb-6 sm:flex ">
                <h3 className="text-2xl font-black leading-6 dark:text-dark-txt text-gray-900">
                  Order Items
                </h3>
              </div>
              <div className="pr-8 pb-8">
                <OrderItems />
              </div>
            </div>
            <div className="col-span-1 items-center justify-center dark:bg-dark-second bg-gray-100 text-center">
              <div className="sticky top-0 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className=" mt-0 py-3 sm:flex ">
                  <div className="font-recife-bold text-2xl leading-6 " />
                </div>
                <div className=" py-6 sm:flex">
                  <h3 className="text-2xl font-black leading-6 dark:text-dark-txt text-gray-900">
                    Summary
                  </h3>
                </div>
                <OrderSummary />
                <CreditCardPayment />
                <div className="pb-8" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ConfettiContainer>
  );
}
