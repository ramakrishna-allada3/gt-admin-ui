import React, { useState, useEffect, useContext } from "react";
import { StoreContext } from "../store";
import Pagination from "./Pagination";

function EditableTable({ data, columns, pageSize, rowKey }) {
    const pageCount = data?.length / pageSize + 1;
    const [, setStore] = useContext(StoreContext);
    const [checkboxStates, setCheckboxStates] = useState({ selectAll: false });
    const [editStates, setEditStates] = useState({});
    const [editData, setEditData] = useState(
        JSON.parse(
            JSON.stringify(
                data?.reduce((final, cur, index) => {
                    return { ...final, [index + 1]: cur };
                }, {})
            )
        )
    );
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

    // useEffect(() => {
    //     console.log({ checkboxStates, editStates, editData });
    // }, [checkboxStates, editStates, editData]);

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

    function handleEditClick(item) {
        setEditStates((state) => {
            return { ...state, [item[rowKey]]: true };
        });
    }

    function handleChange(item, key, value) {
        console.log({ item, key, value });
        console.log(item[rowKey]);
        setEditData((state) => {
            const editItem = state[item[rowKey]];
            console.log({ editItem });
            editItem[key] = value;
            return { ...state, [item[rowKey]]: editItem };
        });
    }

    function handleSaveClick(item) {
        setEditStates((state) => {
            return { ...state, [item[rowKey]]: false };
        });

        setStore((store) => {
            const savedUserData = store.users.reduce((users, user) => {
                user =
                    user[rowKey] === item[rowKey]
                        ? editData[item[rowKey]]
                        : user;
                return [...users, user];
            }, []);

            const savedFilterData = store.filteredUsers.reduce(
                (users, user) => {
                    user =
                        user[rowKey] === item[rowKey]
                            ? editData[item[rowKey]]
                            : user;
                    return [...users, user];
                },
                []
            );

            console.log({ savedUserData });
            return {
                ...store,
                users: [...savedUserData],
                filteredUsers: [...savedFilterData],
            };
        });
    }

    function handleCancelClick(item) {
        setEditStates((state) => {
            return { ...state, [item[rowKey]]: false };
        });
    }

    function handleDeleteClick(item) {
        setStore((state) => {
            const users = state.users;
            const filteredUsers = state.filteredUsers;
            return {
                ...state,
                users: users.filter((user) => !(user[rowKey] === item[rowKey])),
                filteredUsers: filteredUsers.filter(
                    (user) => !(user[rowKey] === item[rowKey])
                ),
            };
        });
    }

    function handleCommonDeleteClick() {
        let selectedValues = checkboxStates.selectAll
            ? paginatedData[currentPage].map((item) => item[rowKey])
            : paginatedData[currentPage]
                  ?.filter((item) => checkboxStates[item[rowKey]])
                  ?.map((item) => item[rowKey]);

        setStore((state) => {
            const users = state.users;
            const remainingUsers = users?.filter(
                (user) => !selectedValues.includes(user.id)
            );

            const remainingFilteredUsers = state.filteredUsers?.filter(
                (user) => !selectedValues.includes(user.id)
            );

            return {
                ...state,
                users: remainingUsers,
                filteredUsers: remainingFilteredUsers,
            };
        });

        setCheckboxStates((state) => {
            return { ...state, selectAll: false };
        });
    }

    return (
        <>
            <table
                className="table border"
                style={{ marginBottom: 0, width: "1000px" }}
            >
                <thead className="table-light">
                    <tr>
                        <th key="select-all">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                checked={checkboxStates?.selectAll}
                                onChange={handleSelectAllState}
                            />
                        </th>

                        {columns
                            .filter((column) => column !== rowKey)
                            .map((column) => (
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
                                    className="form-check-input"
                                    checked={checkboxStates[item[rowKey]]}
                                    onChange={(e) =>
                                        handleRowCheckboxState(e, item[rowKey])
                                    }
                                />
                            </th>

                            {Object.keys(item)
                                .filter((key) => key !== rowKey)
                                .map((key) => (
                                    <td key={item[key]}>
                                        {editStates[item[rowKey]] ? (
                                            <input
                                                className="form-control"
                                                value={
                                                    editData[item[rowKey]][key]
                                                }
                                                onChange={(e) => {
                                                    handleChange(
                                                        item,
                                                        key,
                                                        e.target.value
                                                    );
                                                    e.target.focus();
                                                }}
                                            />
                                        ) : (
                                            item[key]
                                        )}
                                    </td>
                                ))}

                            <td key={"actions" + item[rowKey]}>
                                {!editStates[item[rowKey]] ? (
                                    <>
                                        <span
                                            className="px-2"
                                            style={{ cursor: "pointer" }}
                                            onClick={() =>
                                                handleEditClick(item)
                                            }
                                        >
                                            <i className="bi bi-pencil-square"></i>
                                        </span>
                                        <span
                                            className="px-2"
                                            style={{ cursor: "pointer" }}
                                            onClick={() =>
                                                handleDeleteClick(item)
                                            }
                                        >
                                            <i className="bi bi-trash text-danger"></i>
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <span
                                            style={{ cursor: "pointer" }}
                                            className="text-success px-2"
                                            onClick={() =>
                                                handleSaveClick(item)
                                            }
                                        >
                                            <i className="bi bi-check-circle-fill"></i>
                                        </span>
                                        <span
                                            style={{ cursor: "pointer" }}
                                            className="text-danger px2"
                                            onClick={() =>
                                                handleCancelClick(item)
                                            }
                                        >
                                            <i className="bi bi-x-circle-fill"></i>
                                        </span>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="border border-top-0 p-2 mb-2">
                {pageCount > 0 ? (
                    <Pagination
                        currentPage={currentPage}
                        pageCount={pageCount}
                        onPageBtnClick={setCurrentPage}
                    />
                ) : null}
            </div>

            {data.length > 0 ? (
                <button
                    className="btn btn-danger"
                    style={{ float: "left" }}
                    onClick={handleCommonDeleteClick}
                >
                    Delete
                </button>
            ) : null}
        </>
    );
}

export default EditableTable;
