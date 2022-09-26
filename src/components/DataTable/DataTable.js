import {DataGrid, GridToolbar} from "@mui/x-data-grid";

const DataTable = ({ tableData, columnSettings, ...props}) => {

    const styles = {
        tableContainer: {
            display: 'flex',
            height: '100%'
        }
    }

    return (
        <div style={styles.tableContainer} >
            <div style={{ flexGrow: 1 }}>
                <DataGrid
                    rows={tableData}
                    columns={columnSettings}
                    pageSize={props.pageSize ? props.pageSize : 10}
                    rowsPerPageOptions={props.rowPerPage ? [props.rowPerPage] : [10]}
                    disableSelectionOnClick
                    autoHeight
                    components={{
                        Toolbar: GridToolbar,
                    }}
                    {...props}
                />
            </div>
        </div>
    )
}

export default DataTable;