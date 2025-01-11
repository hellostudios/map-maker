import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {useNavigate} from "react-router-dom";

export default function Nav({name}) {
    const navigate = useNavigate();

    const handleHome = (event) => {
        event.stopPropagation();
        navigate('/');
    }


    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Map: {name}
                    </Typography>
                    <Button color="inherit" onClick={handleHome}>Home</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}