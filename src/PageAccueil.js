import {React, useEffect, useState} from 'react';
import 'react-nice-dates/build/style.css'
import './PageAccueil.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { DatePickerCalendar } from 'react-nice-dates'
import { fr } from 'date-fns/locale'
import {Link, useHistory} from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import {connect} from 'react-redux';
import fire from './firebase/firebase';
import 'firebase/auth';
import { setCurrentError, setCurrentSucceed } from './react-redux/Reducer';
import useInterval from './react-hooks/useInterval';
import CircularProgress from '@material-ui/core/CircularProgress';



const PageAccueil = (props) => {

const [email, setEmail] = useState();
const [password, setPassword] = useState();
const [error,seterror] = useState('');
let history = useHistory();
const date = new Date();
const [succeed, setsucceed] = useState(props.state.currentSucceed);
const [loading, setloading] = useState(false);

console.log(props.state)

const handleLogIn = async (e) => {
    e.preventDefault()
    try {
        seterror('')
        setloading(true);
        await fire
                .auth()
                .signInWithEmailAndPassword(email, password)
        history.push("/Dashboard")
    } catch(e) {
        console.log(e.code)
        switch(e.code) {
            case 'auth/too-many-requests':
                seterror("Veuillez réessayer dans quelques minutes")
            case 'auth/wrong-password' : 
               seterror("Mot de passe incorrect")
            case 'auth/invalid-email' :
              seterror("Email incorrecte")
            case 'auth/user-disabled' : 
              seterror("Utilisateur indisponible")
            case 'auth/user-not-found' : 
              seterror("Utilisateur inexistant")
        } 
    }
    setloading(false)          
}

useInterval(() => {
    setsucceed("")
},2500);


return(
    <div className="main1">
        <div className="titre"><p><h1>BOOKERIST</h1></p></div>
        <div className="body">
            <div className="input">
                {error && <Alert color="error">{error}</Alert>}
                {succeed && <Alert color="success">{succeed}</Alert>}
                <form className="label1" id="form" onSubmit={handleLogIn}>
                    <TextField id="login" label="Login (e-mail)" onChange={(e) => setEmail(e.target.value)} />
                    <TextField className="mdp"  label="Mot de passe" onChange={(e) => setPassword(e.target.value)}/>
               {loading ? <div id="connexionLoading"><CircularProgress color="inherit" /></div> :  <Button variant="contained" form="form" id="connexion" type="submit" >Connexion</Button>}
                </form>
                <Link to="/Mot_de_passe_oublié">mot de passe oublié ?</Link>

                <div className="Inscription"><Link to="/Inscription"><Button variant="contained" id="inscription" >Inscription</Button></Link></div>
            </div>
            <div className="divcalendar">
            <DatePickerCalendar date={date}  locale={fr}/>
            </div>
        </div>
    </div>
)

}


const mapStateToProps = (state) => {
    return {
        state: state,
    }
}

/* const mapDispatchToProps = (dispatch) => {
    return {
    }
} */

export default connect(mapStateToProps) (PageAccueil);