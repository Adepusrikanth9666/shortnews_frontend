import React,{Component} from "react";
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import '../SignUp/Signup.css';



export default class SignUp extends Component {

    constructor(props){

        super(props);

        this.state= {
            email:"",
            password:"",
            confirmPassword:"",
            message:""
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
            .then((response)=>{
                this.props.history.push('/dashboard');
                console.log(response+"register");

            })
            .catch((error)=>{
                if(error.response.status===400){

                    this.setState({message:"User already exist"})
                
                    console.log(error.message);
                    console.log(this.state.message);

                }
               
            })
            console.log("valid it is signedup")
        }
    }
    
    render(){
        var style = {
            backgroundColor: "#F8F8F8",
            borderTop: "1px solid #E7E7E7",
            textAlign: "center",
            padding: "20px",
            position: "fixed",
            left: "0",
            bottom: "0",
            height: "130px",
            width: "100%",
        };

        const {email,password,confirmPassword,message} = this.state;

        return(

            <>
        
            <div id="sign-up">
                <div><h3>{message}</h3></div>
                <div><h1>Sign Up </h1></div>
                <div className="form-field">
                    <div>Email* :</div>
                    <TextField id="outlined-basic" label="Email" variant="outlined" type="text" name="email" value={email} onChange={this.handleChange} />

                </div>
                <div className="form-field">
                    <div>Password* :</div>
                    <TextField id="outlined-basic" label="Password" variant="outlined"  type="password" name="password" value={password} onChange={this.handleChange} />


                </div>
                <div className="form-field">
                    <div>Confirm Password* :</div>
                    <TextField id="outlined-basic" label="Confirm password" variant="outlined" type="password" name="confirmPassword" value={confirmPassword} onChange={this.handleChange} />


                </div>
                <div className="form-field1">
                    <div className='right-adjust' style={{marginRight:20}}><Button variant="outlined" color="primary" onClick={this.handleSubmit} onClick={() => this.props.history.push('/')} >Sign In</Button></div>
                    <div><Button variant="outlined" color="primary" onClick={this.handleSubmit}>Submit</Button></div>
                </div>
                <div className="footer1" style={style}>
                    <div className="copyRight">&copy; Copy right 2021 - Short News </div>
                    <div className="createdBy"> Created By: Adepu Srikanth</div>
                    <div className="follow"> follow us : <a href="https://www.linkedin.com/in/srikanth-adepu-14318617b/" >LinkedIn-SrikanthAdepu</a> </div>
                </div>
               
            </div>

        
            </>


        );
    }

} 