import React, { useState, useEffect, useContext } from "react";
import { StoreContext } from "../store";
import Pagination from "./Pagination";

function EditableTable({ data, columns, pageSize, rowKey }) {
    const pageCount = data?.length / pageSize + 1;
    const [, setStore] = useContext(StoreContext);
    const [checkboxStates, setCheckboxStates] = useState({ selectAll: false });
    const [currentPage, setCurrentPage] = useState(1);
    let paginatedData = {};

    (function () {
        let dataCounter = 0;
        for (let pageCounter = 1; pageCounter < pageCount; pageCounter++) {
            paginatedData[pageCounter] = [];
            for (
                let counter = 0;
                counter < pageSize && dataCounter < data.length;
                dataCounter++
            ) {
                paginatedData[pageCounter][counter] = data[dataCounter];
                counter++;
            }
        }
    })();

    useEffect(() => {
        console.log(checkboxStates);
    }, [checkboxStates]);

    function handleSelectAllState(e) {
        setCheckboxStates({ selectAll: e.target.checked });
        paginatedData?.[currentPage].forEach((item) =>
            setCheckboxStates((state) => {
                return { ...state, [item[rowKey]]: e.target.checked };
            })
        );
    }

    function handleRowCheckboxState(e, index) {
        setCheckboxStates((state) => {
            return { ...state, [index]: e.target.checked };
        });
    }

    function handleCommonDeleteClick() {
        let selectedValues = checkboxStates.selectAll
            ? paginatedData[currentPage].map((item) => item[rowKey])
            : paginatedData[currentPage]
                  .filter((item) => checkboxStates[item[rowKey]])
                  .map((item) => item[rowKey]);

        setStore((state) => {
            const users = state.users;
            const remainingUsers = users.filter(
                (user) => !selectedValues.includes(user.id)
            );

            return { ...state, users: remainingUsers };
        });

        setCheckboxStates((state) => {
            return { ...state, selectAll: false };
        });
    }

    return (
        <table>
            <thead>
                <tr>
                    <th key="select-all">
                        <input
                            type="checkbox"
                            checked={checkboxStates?.selectAll}
                            onChange={handleSelectAllState}
                        />
                    </th>

                    {columns.filter(column => column !== rowKey).map((column) => (
                        <th key={column}>
                            {column.replace(
                                column.charAt(0),
                                column.charAt(0).toUpperCase()
                            )}
                        </th>
                    ))}

                    <th key="actions">Actions</th>
                </tr>
            </thead>
            <tbody>
                {paginatedData?.[currentPage]?.map((item) => (
                    <tr key={item[rowKey]}>
                        <th key={"checkbox" + item[rowKey]}>
                            <input
                                type="checkbox"
                                checked={checkboxStates[item[rowKey]]}
                                onChange={(e) =>
                                    handleRowCheckboxState(e, item[rowKey])
                                }
                            />
                        </th>

                        {Object.keys(item).filter(key => key !== rowKey).map(key => (
                            <td key={item[key]}>{item[key]}</td>
                        ))}

                        <td key={"actions" + item[rowKey]}>
                            <button onClick={() => setStore(state => {
                                const users = state.users;
                                return { ...state, users: users.filter(user => !(user[rowKey] === item[rowKey])) }                                
                            })}>Delete</button>
                        </td>
                    </tr>
                ))}

                <tr>
                    <td>
                        <Pagination
                            currentPage={currentPage}
                            pageCount={pageCount}
                            onPageBtnClick={setCurrentPage}
                        />
                    </td>
                </tr>

                <tr>
                    <td>
                        <button
                            style={{ float: "left" }}
                            onClick={handleCommonDeleteClick}
                        >
                            Delete
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    );
}

export default EditableTable;
