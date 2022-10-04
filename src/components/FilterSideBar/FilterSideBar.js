import Drawer from "@mui/material/Drawer";

const FilterSideFar = ({isOpen, handleClose, drawerElements, ...props}) => {
    return (
        <Drawer
            anchor="right"
            open={isOpen}
            onClose={handleClose}
        >
            {drawerElements}
        </Drawer>
    )
}

export default FilterSideFar;