function Pagination({ currentPage, pageCount, onPageBtnClick }) {
    const pageBtns = [];

    for (let counter = 1; counter < pageCount; counter++) {
        pageBtns.push(
            <button key={counter} onClick={() => onPageBtnClick(counter)}>
                {counter}
            </button>
        );
    }

    return (
        <>
            {pageCount - 1 ? (
                <button
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
            {pageBtns.map((pageBtn) => pageBtn)}
            {pageCount - 1 ? (
                <button
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
        </>
    );
}

export default Pagination;
