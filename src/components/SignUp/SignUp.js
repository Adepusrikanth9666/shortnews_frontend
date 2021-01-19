import React,{Component} from "react";
import axios from 'axios';
import '../SignUp/Signup.css';

export default class SignUp extends Component {

    constructor(props){

        super(props);

        this.state={
            email:"",
            password:"",
            confirmPassword:""
        }
        this.handleChange =this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validate = this.validate.bind(this);


    }
    handleChange(e){
        console.log(e.target.name,e.target.value);
        this.setState({[e.target.name]:e.target.value});
    }
    
    validate(){
        const {email, password, confirmPassword} = this.state;
        if(!email||!password||!confirmPassword){
            window.alert("*Please enter the mandaatory fields");
            return;
        }
        if(!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))){
            window.alert("Please enter a valid Email");
            return;
        }
        if(!(password===confirmPassword)){

            window.alert("Password does not match");
            return;
        }
        return true;
    }

    handleSubmit(){

        if(this.validate()){
            
            const {email,password} = this.state;
            axios.post('http://localhost:7000/users/register', {
                email,
                password
            })
            .then(function(response){
                console.log(response);

            })
            .catch(function(error){
                console.log(error);
            })
            console.log("valid it is signedup")
        }
    }

    

    render(){

        const {email,password,confirmPassword} = this.props;

        return(

            <div id="sign-up">
                <div><h1>Sign Up</h1></div>
                <div className="form-field">
                    <div>Email :</div>
                    <input type="text" name="email" value={email} onChange={this.handleChange} />

                </div>
                <div className="form-field">
                    <div>Password :</div>
                    <input type="password" name="password" value={password} onChange={this.handleChange} />


                </div>
                <div className="form-field">
                    <div>Confirm Password :</div>
                    <input type="password" name="confirmPassword" value={confirmPassword} onChange={this.handleChange} />


                </div>
                <div className="form-field">
                    <button onClick={()=>this.props.history.push('/')} className="righr-adjust">Sign In</button>
                    <button onClick={this.handleSubmit}>Submit</button>
                </div>
            </div>
        );
    }

} 