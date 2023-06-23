import axios from "axios";
import { useState, useEffect } from "react";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "./UserTable.css";
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';



function UserTable() {

    const [allUsers, setAllUsers] = useState([]);
    const [dialogVisible, setDialogVisible] = useState(false);

    useEffect(() => {
        getAllUsers();
    }, []);

    function getAllUsers() {
        axios.get("http://users-management-api.ap-south-1.elasticbeanstalk.com/getUser")
            .then(res => {
                console.log("res", res)
                setAllUsers(res.data);
            })
            .then(() => console.log("all users", allUsers))
            .catch(err => console.log(err));
    }

    const dialogFooterTemplate = () => {
        return <Button label="Ok" icon="pi pi-check" onClick={() => setDialogVisible(false)} />;
    };
    return (
        <div className="table-container">

            <h2> All Registered Users</h2>

            <Button label="Show" icon="pi pi-external-link" onClick={() => setDialogVisible(true)} />
            <Dialog header="Flex Scroll" visible={dialogVisible} style={{ width: '75vw' }} maximizable
                modal contentStyle={{ height: '300px' }} onHide={() => setDialogVisible(false)} footer={dialogFooterTemplate}>

                <DataTable sortField="name" sortOrder={1} value={allUsers} tableStyle={{ maxWidth: '50rem', margin: "0 auto" }}>
                    <Column field="name" sortable={true} header="name"></Column>
                    <Column field="phone" filter filterPlaceholder="Search by phone" header="phone"></Column>
                    <Column field="email" sortable header="email"></Column>
                </DataTable>
            </Dialog>
        </div>
    );
}

export default UserTable;




