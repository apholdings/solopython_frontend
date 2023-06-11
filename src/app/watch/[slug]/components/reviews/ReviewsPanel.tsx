'use client';

import StandardPagination from '@/components/pagination/StandardPagination';
import { ICourseDetail } from '@/interfaces/courses/CourseDetail';
import { IReview } from '@/interfaces/reviews/Review';
import { StarIcon } from '@heroicons/react/20/solid';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

interface ReviewsPanelProps {
  course: ICourseDetail;
  review: IReview | null;
  reviews: IReview[];
  setReviews: React.Dispatch<React.SetStateAction<IReview[]>>;
  setReview: React.Dispatch<React.SetStateAction<IReview | null>>;
  reviewsAvg: number;
  reviewsCounts: IReview[];
  setReviewsAvg: React.Dispatch<React.SetStateAction<number>>;
  reviewsTotalCount: number;
  setReviewsTotalCount: React.Dispatch<React.SetStateAction<number>>;
  setSelectedRating: React.Dispatch<React.SetStateAction<any>>;
  isOpenReview: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  reviewsCount: number;
  reviewsPageSize: number;
  reviewsCurrentPage: number;
  setReviewsCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function ReviewsPanel({
  course,
  review,
  reviews,
  setReviews,
  setReview,
  reviewsAvg,
  setReviewsAvg,
  reviewsTotalCount,
  setReviewsTotalCount,
  reviewsCounts,
  setSelectedRating,
  isOpenReview,
  setOpen,
  reviewsCount,
  reviewsPageSize,
  reviewsCurrentPage,
  setReviewsCurrentPage,
}: ReviewsPanelProps) {
  return (
    <div>
      <div className="mx-auto max-w-2xl py-12 px-4  sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-x-8 lg:px-12">
        <div className="lg:col-span-4">
          <h2 className="text-2xl font-bold tracking-tight dark:text-dark-txt text-gray-900">
            Customer Reviews
          </h2>

          <div className="mt-3 flex items-center">
            <div>
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <StarIcon
                    key={rating}
                    className={classNames(
                      reviewsAvg > rating ? 'text-yellow-500' : 'text-gray-300',
                      'h-5 w-5 flex-shrink-0',
                    )}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <p className="sr-only">{reviewsAvg && reviewsAvg.toFixed(1)} out of 5 stars</p>
            </div>
            <p className="ml-2 text-sm dark:text-dark-txt-secondary text-gray-900">
              Based on {reviewsTotalCount} reviews
            </p>
          </div>

          <div className="mt-6">
            <h3 className="sr-only">Review data</h3>

            <dl className="space-y-3">
              {reviewsCounts?.map((review) => (
                <div
                  key={review.rating}
                  className="flex cursor-pointer items-center text-sm dark:text-dark-txt-secondary"
                  onClick={() => setSelectedRating(review.rating)}
                >
                  <dt className="flex flex-1 items-center">
                    <p className="w-3 font-medium text-gray-900 dark:text-dark-txt-secondary">
                      {review.rating}
                      <span className="sr-only"> star reviews</span>
                    </p>
                    <div aria-hidden="true" className="ml-1 flex flex-1 items-center">
                      <StarIcon
                        className={classNames(
                          review.count > 0 ? 'text-yellow-500' : 'text-gray-300',
                          'h-5 w-5 flex-shrink-0',
                        )}
                        aria-hidden="true"
                      />

                      <div className="relative ml-3 flex-1">
                        <div className="h-3 rounded-full border border-gray-200 bg-gray-100" />
                        {review.count > 0 ? (
                          <div
                            className="absolute inset-y-0 rounded-full border border-almond-400 bg-yellow-400"
                            style={{
                              width: `calc(${review.count} / ${reviewsTotalCount} * 100%)`,
                            }}
                          />
                        ) : null}
                      </div>
                    </div>
                  </dt>
                  <dd className="ml-3 w-10 text-right text-sm tabular-nums dark:text-dark-txt-secondary text-gray-900">
                    {Math.round((review.count / reviewsTotalCount) * 100)}%
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-10">
            <p className="text-lg font-medium dark:text-dark-txt text-gray-900">
              {review ? 'Edit your review' : 'Leave a rating'}
            </p>
            <p className="mt-1 text-sm text-gray-600 dark:text-dark-txt-secondary">
              If you’ve used this product, share your thoughts with other customers
            </p>

            <button
              type="button"
              onClick={() => {
                setOpen(true);
              }}
              className="mt-6 inline-flex w-full items-center justify-center rounded-md border dark:border-none dark:text-white dark:bg-dark-primary  border-gray-300 bg-white py-2 px-8 text-sm font-medium text-gray-900 hover:bg-gray-50 sm:w-auto lg:w-full"
            >
              {review ? 'Edit your review' : 'Write a review'}
            </button>
          </div>
        </div>

        <div className="mt-16 lg:col-span-7 lg:col-start-6 lg:mt-0">
          <h3 className="sr-only">Recent reviews</h3>
          <div className="flow-root">
            <div className="-my-12 divide-y divide-gray-200">
              {reviews &&
                reviews.map((review) => (
                  <div key={review.id} className="py-12">
                    <div className="flex items-center">
                      <span className="inline-block h-12 w-auto overflow-hidden rounded-full bg-gray-100">
                        <img
                          className="inline-block h-10 w-10 rounded-full"
                          src={review.user.picture}
                          alt=""
                        />
                      </span>
                      <div className="ml-4">
                        <h4 className="text-sm font-bold dark:text-dark-txt text-gray-900">
                          {review.user.username}
                        </h4>
                        <div className="mt-1 flex items-center">
                          {[0, 1, 2, 3, 4].map((rating) => (
                            <StarIcon
                              key={rating}
                              className={classNames(
                                review?.rating > rating ? 'text-yellow-500' : 'text-gray-300',
                                'h-5 w-5 flex-shrink-0',
                              )}
                              aria-hidden="true"
                            />
                          ))}
                        </div>
                        <p className="sr-only">{review.rating} out of 5 stars</p>
                      </div>
                    </div>

                    <div
                      className="mt-4 space-y-6 text-base italic dark:text-dark-txt-secondary text-gray-600"
                      dangerouslySetInnerHTML={{ __html: review.comment }}
                    />
                  </div>
                ))}
            </div>
            <StandardPagination
              data={reviews}
              count={reviewsCount}
              pageSize={reviewsPageSize}
              currentPage={reviewsCurrentPage}
              setCurrentPage={setReviewsCurrentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
