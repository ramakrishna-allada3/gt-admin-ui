function EditableTable({ data }) {
    const columns = Object.keys(data[0]);

    return (
        <table>
            <thead>
                <tr>
                    <th key="select-all"><input type='checkbox' /></th>

                    {columns.map((column) => (
                        <th key={column}>{column.replace(column.charAt(0), column.charAt(0).toUpperCase())}</th>
                    ))}

                    <th key='actions'>Actions</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        <th key={'checkbox' + index}><input type='checkbox' /></th>

                        {Object.values(item).map((value) => (
                            <td key={value}>{value}</td>
                        ))}

                        <td key={'actions' + index}>Edit and delete</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default EditableTable;
