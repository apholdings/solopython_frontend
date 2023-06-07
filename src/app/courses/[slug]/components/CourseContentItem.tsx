import { IEpisode } from '@/interfaces/courses/Episode';
import { PlayIcon } from '@heroicons/react/20/solid';

interface Props {
  data: IEpisode;
}

export default function CourseContentItem({ data }: Props) {
  return data ? (
    <div className="border-t dark:border-dark-second hover:dark:bg-dark-third flex w-full items-center justify-between  px-3 py-3">
      <div className="flex ">
        <div className="mr-4 flex items-center justify-center">
          <div className="flex h-3 w-3 items-center justify-center rounded-full bg-gray-700 text-white">
            <PlayIcon className="h-1.5 w-auto" aria-hidden="true" />
          </div>
        </div>
        <div>
          <p className="md:text-md font-regular text-sm text-gray-700 dark:text-dark-txt">
            {data.title}
          </p>
        </div>
      </div>

      <div>
        <p className="inline-flex text-sm dark:text-dark-txt-secondary">{data.length}</p>
      </div>
    </div>
  ) : (
    <div />
  );
}
