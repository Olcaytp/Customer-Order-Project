const Pagination = ({ currentPage, ordersPerPage, totalOrders, paginate, nextPage, prevPage }) => {
    const pageNumbers = [];
  
    for (let i = 1; i <= Math.ceil(totalOrders / ordersPerPage); i++) {
      pageNumbers.push(i);
    }
  
    return (
      <nav className="my-4">
        <ul className="flex justify-center">
          <li className="mr-2">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`px-3 py-1 bg-blue-500 text-white rounded ${
                currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              Previous
            </button>
          </li>
          {pageNumbers.map(number => (
            <li key={number} className="mr-2">
              <button
                onClick={() => paginate(number)}
                className={`px-3 py-1 ${
                  currentPage === number
                    ? 'bg-blue-500 text-white rounded'
                    : 'bg-gray-200 text-gray-700 rounded hover:bg-blue-500 hover:text-white'
                }`}
              >
                {number}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={nextPage}
              disabled={currentPage === Math.ceil(totalOrders / ordersPerPage)}
              className={`px-3 py-1 bg-blue-500 text-white rounded ${
                currentPage === Math.ceil(totalOrders / ordersPerPage) ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    );
  };
  
  export default Pagination;
  