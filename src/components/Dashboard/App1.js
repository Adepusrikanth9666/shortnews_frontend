import React from "react";
import { NEWS_API_KEY } from "../../config";
import { getArticles } from "../../api";
import ArticleList from "../Dashboard/ArticlesList";
import SearchBar from "../Dashboard/SearchBar";
import { Container, Header } from "semantic-ui-react";

import { IconButton } from '@material-ui/core';

import '../../App.css';
import '../../index.css';
import Logo from "../Logo/Logo";

class App extends React.Component {
  constructor(){

    super();
    this.state = {
      articles: [],
      searchTopic: "Bitcoin",
      totalResults: "",
      loading: false,
      apiError: ""
    
    };
  }
  

  searchForTopic = async topic => {
    if(topic.length===0){
      window.alert("please enter the search bar")
      return;

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
  
    const login = JSON.parse(window.localStorage.getItem('login'));
    
    const getBitcoinArticles = async () => {
     
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=bitcoin&sortBy=publishedAt&apiKey=${NEWS_API_KEY}`
      );
       const json = await response.json();
       this.setState({
        articles: json.articles,
        searchTopic: "bitcoin",
        totalResults: response.totalResults
      });
      return json;
    };
    const response = getBitcoinArticles();
   
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
      left: "0",
      bottom: "0",
      height: "150px",
      width: "100%",
  };
   
    return (
      <>
      <div><Logo /></div> 
      <div className='App'>
     
     
      <Container >
       
        
        <Header as="h1" style={{ textAlign: "center", paddingTop: 50,marginTop:50}}>
          Search for a topic
        </Header>
        <SearchBar searchForTopic={this.searchForTopic} />
        
        {loading && (
          <p style={{ textAlign: "center"  }}>Searching for articles...</p>
        )}
        {articles && (
          <Header as="h4" style={{ textAlign: "center", margin: 20 }}>
            Found articles on "{searchTopic}"
          </Header>
        )}
        {articles  && <ArticleList articles={articles} />}
        {apiError && <p>Could not fetch any articles. Please try again.</p>}
        
      </Container>

      <div className="footer1" style={style}>
                
               <div className="copyRight">&copy; Copy right 2021 - Short News </div>
               <div className="createdBy"> Created By: Adepu Srikanth</div>
              <div className="follow"> follow us : <a href="https://www.linkedin.com/in/srikanth-adepu-14318617b/" > <IconButton  /> LinkedInIcon-SrikanthAdepu</a> </div>
            </div>
      </div>
      </>
      
    );
  }
}

export default App;