import React,{useState, useEffect, useRef} from 'react';
import './PageInscription.css';
import { Button, TextField } from '@material-ui/core';
import  Alert  from '@material-ui/lab/Alert';
import fire from './firebase/firebase';
import 'firebase/auth';
import {connect} from 'react-redux';
import { init, resetStat,setCurrentUser } from './react-redux/Reducer';
import { useHistory } from 'react-router-dom';

const Inscription = (props) => {
    const [nom,setnom] = useState('');
    const [prenom,setprenom] = useState('');
    const [user,setuser] = useState('');
    const [email,setemail] = useState('');
    const [confirmemail,setconfirmemail] = useState('');
    const [password,setpassword] = useState('');
    const [confirmpassword,setconfirmpassword] = useState('');
    const [error,seterror] = useState('');
    const [loading, setloading] = useState();
    let history = useHistory();

    let handleOnChange = ( email ) => {

        // don't remember from where i copied this code, but this works.
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
        if ( re.test(email) ) {
            // this is a valid email address
            // call setState({email: email}) to update the email
            // or update the data in redux store.
            return true
        }
        else {
            // invalid email, maybe show an error to the user.
            return false
        }
    }

    const clearInputs = () => {
        setemail('');
        setpassword('');
    }

    const handleLogIn = () => {
        fire
            .auth()
            .signInWithEmailAndPassword(email,password)
            .catch(err => {
                seterror(err.message)        })
    }

    const handleSignUp = async (e) => {
        e.preventDefault()
        if (password !== confirmpassword){
            return seterror('Mot de passe invalide')
        }
        if (email !== confirmemail || !handleOnChange(email)){
            return seterror('Email invalide')
        }

        try {
            seterror('');
            setloading(true);
            await fire
            .auth()
            .createUserWithEmailAndPassword(email,password)
            /*await fire.auth().onAuthStateChanged((user) => {
                if (user){
                    userName, userPassword, userNickName
                    props.init(user.email,  )
                }
            })*/
            //props.init(email, nom, password, prenom) 
            props.setCurrentUser(email)
            props.init(email,nom,password,prenom)
            history.push("/")
        } catch(err) {
            seterror('Creatin de compte invalide');
        }
        setloading(false);
    }


    const handleLogOut = () => {
        fire.auth().signOut();
    }

    const authListener = () => {
        fire.auth().onAuthStateChanged((user) => {
            if (user){
                setuser(user);
            }
        })
    }

    

    return (
        <div className="oui">
            <h1>INSCRIPTION</h1>
            {error &&  <Alert color="error">{error}</Alert>}
            <form id="form" className="non" onSubmit={handleSignUp}>
                <TextField id="NOM" label="NOM" variant="outlined" onChange={(e) => setnom(e.target.value)} required />
                <TextField id="PRENOM" label="PRENOM" variant="outlined" onChange={(e) => setprenom(e.target.value)} required/>
                <TextField id="e-mail" label="E-MAIL" type="email" variant="outlined" onChange={(e) => setemail(e.target.value)} required/>
                <TextField id="Ce-mail" label="CONFIRMER E-MAIL" variant="outlined" onChange={(e) => setconfirmemail(e.target.value)} required/>
                <TextField id="mdp" label="MOT DE PASSE" variant="outlined" onChange={(e) => setpassword(e.target.value)} required/>
                <TextField id="Cmdp" label="CONFIRMER MOT DE PASSE" variant="outlined" onChange={(e) => setconfirmpassword(e.target.value)} required/>
                <Button variant="contained" form="form" type="submit" id="connexion" onLoad={loading}>Je m'inscris !</Button>
            </form>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        state: state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        init: (userEmail, userName, userPassword, userNickName) => dispatch(init(userEmail, userName, userPassword, userNickName)),
        //resetState: () => dispatch(resetState()),
        setCurrentUser: (currentUser) => dispatch(setCurrentUser(currentUser)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Inscription);