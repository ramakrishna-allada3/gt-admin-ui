import React, { useState, useEffect } from "react";

function EditableTable({ data, columns }) {
    const [checkboxStates, setCheckboxStates] = useState({});

    useEffect(() => {
        console.log(checkboxStates);
    }, [checkboxStates]);

    function handleSelectAllState(e) {
        setCheckboxStates({ selectAll: e.target.checked });
        data.forEach((item, index) => setCheckboxStates(state => {return { ...state, [index]: e.target.checked }}));
    }

    function handleRowCheckboxState(e, index) {
        setCheckboxStates(state => {
            return { ...state, [index]: e.target.checked}
        });
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
                {data?.map((item, index) => (
                    <tr key={index}>
                        <th key={"checkbox" + index}>
                            <input type="checkbox"
                                checked={checkboxStates[index]} 
                                onChange={(e) => handleRowCheckboxState(e, index)}
                            />
                        </th>

                        {Object.values(item).map((value) => (
                            <td key={value}>{value}</td>
                        ))}

                        <td key={"actions" + index}>Edit and delete</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default EditableTable;
