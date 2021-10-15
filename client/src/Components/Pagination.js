import "./Styles/Pagination.css";

const Pagination = ({ dogsPerPage, totalDogs, paginate, currentPage }) => {
  const pageNumbers = []; // 1 2 3 4 5..

  for (let i = 1; i <= Math.ceil(totalDogs / dogsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="page_container">
      <ul>
        {pageNumbers.map((number) => (
          <button
            className={currentPage === number ? "page_number active" : "page_number"}
            onClick={() => paginate(number)}
            key={number}
          >
            <li key={number}>{number}</li>
          </button>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
