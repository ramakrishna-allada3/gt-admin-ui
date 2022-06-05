function Pagination({ pageCount }) {
    const pageBtns = [];

    for (let counter = 1; counter < pageCount + 0.1; counter++) {
        pageBtns.push(<button key={counter}>{counter}</button>);
    }

    return (
        <>
            <button>{"<"}</button>
            {pageBtns.map((pageBtn) => pageBtn)}
            <button>{">"}</button>
        </>
    );
}

export default Pagination;
