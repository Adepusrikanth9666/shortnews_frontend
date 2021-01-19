import React,{Component} from "react";
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import "./SignIn.css";

export default class SignIn extends Component {

    constructor(props) {

        super(props);

        this.state = {

            email:"",
            password:"",
            message:""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validate = this.validate.bind(this);

        
    }

    handleChange(e){
        console.log(e.target.name,e.target.value);
        this.setState({[e.target.name]:e.target.value});
    }

    validate(){

        const {email,password} = this.state;
        if(!email||!password) {

            window.alert("*Please enter the mandatory fields");
            return ;

        }
        if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))) {
            window.alert('Please enter a valid email')
            return
        }
        return true

    }

    handleSubmit(){

        const {email,password} = this.state;

        console.log(email,password);
        if(this.validate()){

            axios.post('http://localhost:7000/users/login', {
                email,
                password
            })
            .then((response) => {
                console.log(response.status)
                if (response.status === 200) {
                window.localStorage.setItem('login', JSON.stringify(response.data))
                this.props.history.push('/dashboard')
                }
            })
            .catch((error) => {
                if(error.response.status===400){
                    this.setState({message:"User account does not exist"});
                    console.log(this.state.message);
                    
                }
                if(error.response.status===401){

                    this.setState({message:"Invalid Credentials"});
                    console.log(this.state.message);

                }
                console.log(error.response.status)
            });
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

        const {email,password,message} = this.state;

        return(

            <div id="sign-in"  >
                <div className="transbox">
                <div><h3>{message}</h3></div>
                <div><h1>Sign In</h1></div>
                <div className='form-field'>
                <div>Email* :</div>
                <TextField id="outlined-basic" label="Email" variant="outlined" type="text" name="email" value={email} onChange={this.handleChange} />
                </div>
                {/* password */}
                <div className='form-field'>
                    <div>Password* :</div>
                    
                    <TextField id="outlined-basic" label="Password" variant="outlined"  type="password" name="password" value={password} onChange={this.handleChange} />
                </div>
                <div className='form-field1'>
                    <div className='right-adjust' style={{marginRight:20}}><Button variant="outlined" color="primary" onClick={this.handleSubmit} onClick={() => this.props.history.push('/signup')} >Sign Up</Button></div>
                    <div><Button variant="outlined" color="primary" onClick={this.handleSubmit}>Submit</Button></div>
                </div>

                <div className="footer1" style={style}>
            <div className="copyRight">&copy; Copy right 2021 - Short News </div>
            <div className="createdBy"> Created By: Adepu Srikanth</div>
           <div className="follow"> follow us : <a href="https://www.linkedin.com/in/srikanth-adepu-14318617b/" >LinkedIn-SrikanthAdepu</a> </div>
            </div>
            </div>

            </div>
            

            
        );
    }
}
