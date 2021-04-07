import React, {useState} from 'react';
import "./Pagemdpo.css";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import fire from './firebase/firebase';
import 'firebase/auth';
import  Alert  from '@material-ui/lab/Alert';
import { useHistory } from 'react-router-dom';
import {connect} from 'react-redux';
import {setCurrentSucceed} from './react-redux/Reducer';

const ResetPassword = (props) => {

    let history = useHistory();
    const [email, setemail] = useState('');
    const [error, seterror] = useState();
    
    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            await fire
            .auth()
            .sendPasswordResetEmail(email)
            props.setCurrentSucceed("Mail envoyé")
            history.push("/")
        } catch (e) {
            switch(e.code) {
                case 'auth/invalid-email' : 
                return seterror("Email incorrecte")
                default : 
                return seterror("Impossiblde de réinitialisé le mot de passe")
            }

        }
    } 

    return (
        <div id="main3">
            <p><h1>MOT DE PASSE OUBLIÉ</h1></p>
            {error && <Alert color="error">{error}</Alert>}
            <form id="label3" onSubmit={handleResetPassword}>
                <TextField id="E-MAIL" label="E-MAIL" variant="outlined" onChange={(e) => setemail(e.target.value)}/>
            <Button variant="contained" id="connexion" type="submit">Envoyer le mail de confirmation</Button>
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
        setCurrentSucceed : (currentSucceed) => dispatch(setCurrentSucceed(currentSucceed))
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (ResetPassword);      