export async function fetchQuestionAnswers(
  session,
  question_id,
  page,
  pageSize,
  maxPageSize,
  orderBy,
  filterBy,
  search,
) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_API_URL}/api/courses/episode/questions/answers/list/?p=${page}&page_size=${pageSize}&max_page_size=${maxPageSize}&order_by=${orderBy}&filter_by=${filterBy}&search=${search}&question=${question_id}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `JWT ${session?.user.accessToken}`,
      },
    },
  );
  const data = await res.json();
  return data;
}
