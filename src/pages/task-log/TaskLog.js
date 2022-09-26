import {useEffect, useState} from "react";
import {deleteTaskLog, getTaskLog} from "../../apis/task";
import {toast} from "react-toastify";
import DataTable from "../../components/DataTable/DataTable";
import Box from "@mui/material/Box";
import {Button} from "@mui/material";


const columns = [
    {
        field: 'line',
        headerName: 'Line',
        width: 100
    },
    {
        field: 'content',
        headerName: 'Details',
        flex: 1
    }
];

const TaskLog = () => {
    const [logs, setLogs] = useState([]);

    useEffect(() => {

        getTaskLog().then((res) => {
            setLogs(res.data.data);
        }).catch((error) => {
            toast.error(error.response.data.message);
        })
    }, []);


    const handleRemoveLog = () => {
        deleteTaskLog().then((res) => {
            toast.success("Log cleared");
            setLogs([]);
        }).catch((error) => {
            toast.error(error.response.data.message);
        })
    }

    return (
        <>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <h2>Task Logs</h2>
                <Button variant="contained" color="error" onClick={handleRemoveLog} >Delete Log</Button>
            </Box>

            <DataTable
                tableData={logs}
                columnSettings={columns}
                getRowId={(row) => row.line}
                density="compact"
                pageSize={25}
                rowPerPage={25}
                initialState={{
                    sorting: {
                        sortModel: [
                            {
                                field: 'line',
                                sort: 'desc'
                            }
                        ]
                    }
                }}
            />
        </>
    )
}

export default TaskLog;