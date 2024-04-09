import Image from 'next/image';
import { fetchFilteredInvoices, fetchMoviesByQuery } from '@/app/lib/data';

export default async function MoviesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const movies = await fetchMoviesByQuery(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">{/* Placeholder for mobile view */}</div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Title
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Release Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Popularity
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Overview
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {movies?.map((movie) => (
                <tr className="w-full border-b border-gray-100 last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
                  {/* Title and Poster */}
                  <td className="relative overflow-hidden whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center">
                        <Image
                          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                          className="rounded-md"
                          width={28}
                          height={28}
                          alt={movie.title}
                        />
                      </div>
                      <div className="h-6 w-24 rounded bg-gray-100">
                        {movie.title}
                      </div>
                    </div>
                  </td>

                  {/* Release Date */}
                  <td className="whitespace-nowrap px-3 py-3">
                    <div className="h-6 w-16 rounded bg-gray-100">
                      {new Date(movie.release_date).toDateString()}
                    </div>
                  </td>
                  {/* Popularity */}
                  <td className="whitespace-nowrap px-3 py-3">
                    <div className="h-6 w-16 rounded bg-gray-100">
                      {movie.popularity}
                    </div>
                  </td>
                  {/* Overview */}
                  <td className="whitespace-nowrap px-3 py-3">
                    <div className="h-6 w-16 rounded bg-gray-100">
                      <p>{movie.overview}</p>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
