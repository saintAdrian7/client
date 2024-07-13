import { ChangeEvent, useState } from "react";
import { AppBar, Toolbar, Button, ButtonGroup, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, ClickAwayListener, TextField, Box, Grid, Paper, CircularProgress, Typography } from "@mui/material"; 
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import CreateIcon from '@mui/icons-material/Create';
import SchoolIcon from '@mui/icons-material/School';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/Authconstants";
import axios from "axios";
import { Course } from "../../Context/CourseContextconstants";

export const MuiNavbar = () => {
    const { state, dispatch } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]); 
    const [loading, setLoading] = useState<boolean>(false);
    const [feedback, setfeedback] = useState('')
    const navigate = useNavigate();

    const setDisplayLogin = () => {
        dispatch({ type: 'SHOW MODAL' });
    };

    const handleLogout = () => {
        sessionStorage.removeItem("userId");
        localStorage.removeItem("token")
        dispatch({ type: 'LOGOUT' });
    };

    const handleSidebarToggle = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const handleCreateCourse = () => {
        navigate('/CreateCourse');
        setSidebarOpen(false); 
    };

    const handleMurphyAI = () => {
        navigate('/murphyAI');
        setSidebarOpen(false); 
    };

    const handleHome = () => {
        navigate('/Homepage');
        setSidebarOpen(false);
    };

    const handleSearch = () => {
        setShowSearch(true);
        setSidebarOpen(false);
    };

    const handleSearchClose = () => {
        setShowSearch(false);
    };

    const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value); 
    };

    const handleCourseClick = (courseId: string) => {
        navigate(`/CreateCourse/Course/${courseId}`);
        setShowSearch(false);
        setSearchResults([]);
    };

    const searchCourses = async () => {
        setLoading(true); 
        try {
            const response = await axios.get(`https://server-y9oe.onrender.com/Courses/courses/search?q=${searchQuery}`);
            setSearchResults(response.data);
            if(response.data.length === 0){
                setfeedback("No courses found")
            }else{
                setfeedback('')
            }
        } catch (error) {
            console.error("Error searching courses:", error);
        } finally {
            setLoading(false); 
        }
    };

    const courseColors = ['#E7690F', '#94B748', '#029EDC', '#FB667C'];

    return (
        <>
            <AppBar sx={{ backgroundColor: '#EB4A01' }}>
                <Toolbar className="top-nav-bar">
                    <IconButton className="hambuger-menu" edge="start" color="inherit" aria-label="menu" onClick={handleSidebarToggle} sx={{ zIndex: 1400 }}>
                        {sidebarOpen ? <CloseIcon /> : <MenuIcon />}
                    </IconButton>
                    <img src="https://tse4.mm.bing.net/th?id=OIG2.JQKfKP6cxFiMrZwI_m4J&pid=ImgGn" alt="logo" width="40px" />
                    <h1>EDU-Murphy</h1>
                    <ButtonGroup aria-label="text button group">
                        <IconButton color="inherit">
                            <AccountCircleIcon />
                        </IconButton>
                        {!state.loggedInUser && <Button variant="text" className="login-button" onClick={setDisplayLogin}>Login or SignUp</Button>}
                        {state.loggedInUser && <Button variant="text" className="login-button" onClick={handleLogout}>Log Out</Button>}
                    </ButtonGroup>
                </Toolbar>

                <Drawer anchor="left" open={sidebarOpen} onClose={() => setSidebarOpen(false)}>
                    <div className="sidebar">
                        <List>
                            <ListItem button onClick={handleHome}>
                                <ListItemIcon>
                                    <HomeIcon />
                                </ListItemIcon>
                                <ListItemText primary="Home" />
                            </ListItem>
                            <ListItem button onClick={handleSearch}>
                                <ListItemIcon>
                                    <SearchIcon />
                                </ListItemIcon>
                                <ListItemText primary="Search" />
                            </ListItem>
                            <ListItem button onClick={handleCreateCourse}>
                                <ListItemIcon>
                                    <CreateIcon />
                                </ListItemIcon>
                                <ListItemText primary="Create Course" />
                            </ListItem>
                            <ListItem button onClick={handleMurphyAI}>
                                <ListItemIcon>
                                    <SchoolIcon />
                                </ListItemIcon>
                                <ListItemText primary="Murphy AI" />
                            </ListItem>
                        </List>
                        <IconButton className="sidebar-close-icon" onClick={() => setSidebarOpen(false)}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                </Drawer>
            </AppBar>

            {showSearch && (
                <ClickAwayListener onClickAway={handleSearchClose}>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '70px',
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            backgroundColor: '#FABA14',
                            padding: '10px',
                            zIndex: 1300,
                            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <TextField
                            autoFocus
                            placeholder="Search..."
                            variant="outlined"
                            value={searchQuery}
                            onChange={handleSearchInputChange} 
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    searchCourses(); 
                                }
                            }}
                            sx={{
                                width: '80%',
                                maxWidth: '600px',
                            }}
                        />
                    </Box>
                </ClickAwayListener>
            )}

            {showSearch && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: '140px', 
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        backgroundColor: 'transparent',
                        padding: '10px',
                        zIndex: 1300,
                        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <Box
                        sx={{
                           
                            top:'20%',
                            width: '100%',
                            backgroundColor:'#FABA14'

                        }}
                    >
                        <IconButton
                            sx={{
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                zIndex: 1400,
                            }}
                            onClick={() => setSearchResults([])}
                        >
                            <CloseIcon />
                        </IconButton>
                        {loading ? ( 
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                                <CircularProgress />
                            </Box>
                        ) : searchResults.length > 0 ? (
                            <Grid container spacing={2}>
                                {searchResults.map((course: Course) => (
                                    <Grid item xs={12} sm={6} md={3} key={course._id}>
                                        <Paper
                                            sx={{
                                                padding: '10px',
                                                backgroundColor: courseColors[Math.floor(Math.random() * courseColors.length)],
                                                cursor: 'pointer',
                                                width: '295px',
                                                height: "210px",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                color: '#FFFFFF',
                                                fontFamily: 'inder',
                                                fontSize: '40px',
                                            }}
                                            onClick={() => handleCourseClick(course._id)}
                                        >
                                            <h3 className="search-title">{course.title}</h3>
                                        </Paper>
                                    </Grid>
                                ))}
                            </Grid>
                        ) : (
                            <Typography sx={{}} >
                                {feedback}
                            </Typography> 
                        )}
                    </Box>
                </Box>
            )}
        </>
    );
};
