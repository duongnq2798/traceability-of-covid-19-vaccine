import React from 'react';
import { Table } from 'antd';

const TableComponent = (props) => {
    const {dataSource, columns} = props;
    console.log(dataSource)
    return (
        <React.Fragment>
            <Table dataSource={dataSource} columns={columns}  {...props} />
        </React.Fragment>
    )
}

export default TableComponent;