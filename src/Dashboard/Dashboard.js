import React, { useState } from 'react';
import './Dashboard.css'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import fire from '../firebase/firebase'
import 'firebase/auth';
import {useHistory} from 'react-router-dom'
import DashboardCalendar from './DashboardCalendar';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  avatar: {
    height: '100%',
    width: '100%'
  },
}));



const Dashboard = () => {

    let history = useHistory();
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorEl2, setAnchorEl2] = useState(null);
    const classes = useStyles();

    const handleClick1 = (e) => {
        setAnchorEl(e.currentTarget)
    }

    const handleClose1 = (e) => {
        setAnchorEl(null)
    }

    const handleClick2 = (e) => {
        setAnchorEl2(e.currentTarget)
    } 

    const handleClose2 = (e) => {
        setAnchorEl2(null)
    }

    const handleLogOut = () => {
        fire.auth().signOut();
        history.push('/')
    }

    return (
        <div id="ouiii">
                <div id="container">
                    <div id="menu">
                        
                        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick1} id="menu-button"><MenuIcon/>Menu</Button>
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose1}
                            >
                                <MenuItem onClick={handleClose1}>Ajout créneau</MenuItem>
                                <MenuItem onClick={handleClose1}>Prendre rendez-vous</MenuItem>
                                <MenuItem onClick={handleClose1}>Ajout évènement</MenuItem>
                                <MenuItem onClick={handleClose1}>Manuel d'utilisation</MenuItem>
                                <MenuItem onClick={handleClose1}>Contact</MenuItem>
                            </Menu>
                        </div>
                    <div id="menu2">
                        <div id="profile">
                            <Button onClick={handleClick2}><Avatar src="/broken-image.jpg" className={classes.avatar} /></Button>
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl2}
                                keepMounted
                                open={Boolean(anchorEl2)}
                                onClose={handleClose2}
                            >
                                <MenuItem onClick={handleClose2}>Profil</MenuItem>
                                <MenuItem onClick={handleClose2}>Paramètres</MenuItem>
                            </Menu>
                        </div>
                        <Button id="menu-button2" onClick={handleLogOut}>Déconnexion</Button>
                    </div>
                </div>
            <DashboardCalendar/>
        </div>
    )
}

export default Dashboard;