import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { ITEMS_PER_PAGE } from "../app/constant";

// eslint-disable-next-line react/prop-types, no-unused-vars
export default function Pagination({ handlePage, page, setPage, totalItems }) {
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);  
  return (
    <div className="flex items-center justify-between border-t mt-5 border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          onClick={() => handlePage(page > 1 ? page - 1 : page)}
          className={`
             ${
               page > 1
                 ? " pointer-events-auto"
                 : " pointer-events-none bg-slate-200"
             } 
            relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50`}
        >
          Previous
        </a>
        <a
          onClick={() => handlePage(page < totalPages ? page + 1 : page)}
          className={`
             ${
               page < totalPages
                 ? " pointer-events-auto"
                 : " pointer-events-none bg-slate-200"
             }
            relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50`}
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">
              {ITEMS_PER_PAGE * page - (ITEMS_PER_PAGE - 1)}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {page * ITEMS_PER_PAGE > totalItems
                ? totalItems
                : page * ITEMS_PER_PAGE}
            </span>{" "}
            of <span className="font-medium">{totalItems}</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <a
              onClick={() => handlePage(page > 1 ? page - 1 : page)}
              className={`
                ${
                  page > 1
                    ? " pointer-events-auto"
                    : " pointer-events-none bg-slate-200"
                } 
                relative inline-flex cursor-pointer items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0`}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </a>

            {Array.from({ length: totalPages }).map((el, index) => {
              return (
                <a
                  key={index}
                  onClick={() => handlePage(index + 1)}
                  aria-current="page"
                  className={`relative cursor-pointer border z-10 inline-flex items-center
                   ${
                     index + 1 === page
                       ? "bg-indigo-600 text-white"
                       : "text-indigo-600"
                   } px-4 py-2 text-sm font-semibold
                     focus:z-20 focus-visible:outline
                     focus-visible:outline-2 focus-visible:outline-offset-2
                      focus-visible:outline-indigo-600`}
                >
                  {index + 1}
                </a>
              );
            })}

            <a
              onClick={() => handlePage(page < totalPages ? page + 1 : page)}
              className={` ${
                page < totalPages
                  ? " pointer-events-auto"
                  : " pointer-events-none bg-slate-200"
              } relative inline-flex cursor-pointer items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0`}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}
