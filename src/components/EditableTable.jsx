import React, { useState, useEffect, useContext } from "react";
import { StoreContext } from "../store";
import Pagination from "./Pagination";

function EditableTable({ data, columns, pageSize, rowKey }) {
    const [store, setStore] = useContext(StoreContext);
    const [checkboxStates, setCheckboxStates] = useState({});

    useEffect(() => {
        console.log(checkboxStates);
    }, [checkboxStates]);

    function handleSelectAllState(e) {
        setCheckboxStates({ selectAll: e.target.checked });
        data.forEach((item) =>
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
        const values = data;
        if (checkboxStates.selectAll) {
            values.length = 0;
        }
        else {
            Object.keys(checkboxStates).forEach(key => {
                if (checkboxStates[key] && key !== 'selectAll') {
                    values.splice(key, 1);
                }
            });
        }

        // console.log({data});
        setStore(state => {
            return { ...state, users: values }
        });

        // render(state => !state);
    }

    return (
        <table>
            <thead>
                <tr>
                    <th key="select-all">
                        <input
                            type="checkbox"
                            value={checkboxStates["selectAll"]}
                            onChange={handleSelectAllState}
                        />
                    </th>

                    {columns.map((column) => (
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
                {data?.map((item) => (
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

                        {Object.values(item).map((value) => (
                            <td key={value}>{value}</td>
                        ))}

                        <td key={"actions" + item[rowKey]}>Edit and delete</td>
                    </tr>
                ))}

                <tr>
                    <td>
                        <Pagination pageCount={data?.length / pageSize} />
                    </td>
                </tr>

                <tr>
                    <td>
                        <button style={{ float: "left" }} onClick={handleCommonDeleteClick}>
                            Delete
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    );
}

export default EditableTable;
