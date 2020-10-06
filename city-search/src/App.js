import React from 'react';
import './App.css';
import CitySearchField from './components/CitySearchField';
import ZipCodes from './components/ZipCodes';


class App extends React.Component{
  state={
    userInput : "",
    zipCodes: [''],
    cityZipCodes: []
  }

  handleSubmit(e){
    fetch("http://ctp-zip-api.herokuapp.com/city/" + this.state.userInput)
      .then(response => response.json()).then(data => {
        this.setState({zipCodes : data})
      }).catch(this.setState({zipCodes: []}))

    e.preventDefault();
  }

  handleCityChange = (e) => {
    this.setState({userInput: e.target.value.toUpperCase()});
  }

  render(){
    console.log(this.state.zipCodes)
    return(
      <div className="App">
        <div className="App-header">
          <h2>Zip Codes Search By City</h2>
        </div>
        <CitySearchField cityChanged={this.handleCityChange} submitCity={e=> this.handleSubmit(e)} cityName={this.state.userInput}/>
        <div className="ZipCodes">      
          { (this.state.zipCodes.length > 0) ?
          this.state.zipCodes.map( (z, index) =>(
            <ZipCodes zip ={z} key={index}/>
          )) : <p> THIS CITY DOESN'T EXIST!</p>
        }
        <div>

         </div>
        </div>
      </div>
    )
  }
}
 

export default App;
