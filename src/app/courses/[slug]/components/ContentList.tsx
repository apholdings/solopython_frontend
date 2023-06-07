'use client';

import { IEpisode } from '@/interfaces/courses/Episode';
import { ISection } from '@/interfaces/courses/Section';
import CourseContentItem from './CourseContentItem';

interface Props {
  section: ISection;
  episodes: IEpisode[];
  hidden: boolean;
}

export default function ContentList({ section, episodes, hidden }: Props) {
  return (
    <div>
      <div className={hidden ? 'hidden' : 'border border-gray-300 dark:border-dark-second'}>
        {section && section.learning_objective && (
          <p className="p-4 text-sm ">{section.learning_objective}</p>
        )}
        {episodes ? (
          episodes.map((episode) => <CourseContentItem data={episode} key={episode.id} />)
        ) : (
          <div />
        )}
        <div className="mb-1" />
      </div>
    </div>
  );
}
