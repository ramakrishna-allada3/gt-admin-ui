function Pagination({ currentPage, pageCount, onPageBtnClick }) {
    const pageBtns = [];

    for (let counter = 1; counter < pageCount; counter++) {
        pageBtns.push(
            <button className={ (counter === currentPage ? "btn btn-light border border-primary" : "btn btn-primary") + " rounded-circle mx-2"} key={counter} onClick={() => onPageBtnClick(counter)}>
                {counter}
            </button>
        );
    }

    return (
        <div className="d-flex justify-content-center">
            {pageCount - 1 ? (
                <button
                    className="btn btn-primary rounded-circle mx-2"
                    disabled={!(currentPage - 1)}
                    onClick={() =>
                        onPageBtnClick((state) =>
                            state - 1 ? state - 1 : state
                        )
                    }
                >
                    {"<"}
                </button>
            ) : null}
            {pageBtns}
            {pageCount - 1 ? (
                <button
                    className="btn btn-primary rounded-circle mx-2"
                    disabled={currentPage === Math.floor(pageCount)}
                    onClick={() =>
                        onPageBtnClick((state) =>
                            state + 1 < pageCount ? state + 1 : state
                        )
                    }
                >
                    {">"}
                </button>
            ) : null}
        </div>
    );
}

export default Pagination;
