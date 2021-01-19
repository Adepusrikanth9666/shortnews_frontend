import React from "react";
import {getBitcoinArticles} from '../../api'
import { getArticles } from "../../api";
import ArticleList from "../Dashboard/ArticlesList";
import SearchBar from "../Dashboard/SearchBar";
import { Container, Header } from "semantic-ui-react";
import '../../App.css';
import '../../index.css';
// import SignUp from "../SignUp/SignUp";
import axios from 'axios';

class App extends React.Component {
  state = {
    articles: [],
    searchTopic: "Bitcoin",
    totalResults: "",
    loading: false,
    apiError: ""
  };

  searchForTopic = async topic => {
    if(topic.length===0){

      this.setState({searchTopic: "Article not Found"});

    }
    try {
      this.setState({ loading: true });
      const response = await getArticles(topic);
      this.setState({
        articles: response.articles,
        searchTopic: topic,
        totalResults: response.totalResults
      });
    } catch (error) {
      this.setState({ apiError: "Could not find any articles" });
    }
    this.setState({ loading: false });
  };
   componentDidMount () {
    if (!window.localStorage.getItem('login')) { this.props.history.push('/') }
    const login = JSON.parse(window.localStorage.getItem('login'))
    console.log(login.user.id)
    axios.get('http://localhost:7000/users/', {
      headers: { 'x-auth-token': login.token }
    })
      .then((response) => {
        const response =  getBitcoinArticles();
        this.setState({ articles: response.articles });
        console.log(response);
        try {
         
        } catch (error) {
          this.setState({ apiError: "Could not find any articles" });
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }
  

  render() {
    const {
      articles,
      apiError,
      loading,
      searchTopic,
      totalResults
    } = this.state;

    var style = {
      backgroundColor: "#F8F8F8",
      borderTop: "1px solid #E7E7E7",
      textAlign: "center",
      padding: "20px",
      // position: "fixed",
      left: "0",
      bottom: "0",
      height: "150px",
      width: "100%",
  };
   
    return (
      <>
    
      <div className='App'>
        
     
      <Container >
        
        <Header as="h1" style={{ textAlign: "center", paddingTop: 50}}>
          Search for a topic
        </Header>
        <SearchBar searchForTopic={this.searchForTopic} />
        {/* <p style={{ textAlign: "center" }}>
          Powered by <a href="https://newsapi.org/">NewsAPI.org</a>
        </p> */}
        {loading && (
          <p style={{ textAlign: "center" }}>Searching for articles...</p>
        )}
        {articles.length > 0 ? (
          <Header as="h2" style={{ textAlign: "center", margin: 20,color: "blue" }}>
            Found {totalResults} articles on "{searchTopic}"
            
          </Header>
        ):(
          <Header as="h2" style={{ textAlign: "center", margin: 20,color: "blue" }}>
           Articles Not found 
            
          </Header>
        )}
        {articles.length >0 && <ArticleList articles={articles} />}
        {apiError && <p>Could not fetch any articles. Please try again.</p>}
        
      </Container>

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

export default App;