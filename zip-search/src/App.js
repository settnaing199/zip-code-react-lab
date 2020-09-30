import React, { Component } from 'react';
import './App.css';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card} from 'react-bootstrap';



function City(props) {
return (<div>
    <Card className="Card" border="secondary" style={{width: '25em'}}>
      <Card.Header><strong>{props.cities.city} , {props.cities.state}</strong></Card.Header>
      <Card.Body>
        <Card.Text>
        <ul>
          <li>State: {props.cities.state}</li>
          <li>Location: {props.cities.locaton}</li>
          <li>Population (estimated): {props.cities.population}</li>
          <li>Total Wages: {props.cities.wage}</li>
      </ul>
        </Card.Text>
      </Card.Body>
    </Card>

    

</div>);
}

function ZipSearchField(props) {
  return (<div>
    <div className="ZipSearch">
      <strong>Zip code: </strong>
      <input type ="text" onChange={props.zipChanged} value={props.zipValue}/>
      <p>You entered:{props.zipValue} </p>
    </div>
    </div>);
}


class App extends Component {
  state = {
    userInputValue : "",
    OutputValue : [],
    notFound : true
  }
  handleZipChange(event){
    console.log(event.target.value);
    //if the length of zip code is 5 then fetch  the data
    if(event.target.value.length === 5){
      fetch("http://ctp-zip-api.herokuapp.com/zip/" + event.target.value).then( response => response.json())
      .then((data) => {
        this.setState({
          OutputValue : data.map(item => ({
              city: item.City,
              state: item.State,
              locaton: "(" + item.Lat + "," + item.Long + ")",
              population: item.EstimatedPopulation,
              wage: item.TotalWages
            })),
          notFound: false,
        });
        console.log(this.state.OutputValue);
      })
    } else{
      this.setState({notFound: true})
    }   
    this.setState({userInputValue: event.target.value})
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <ZipSearchField zipChanged={(e) => this.handleZipChange(e)} zipValue = {this.state.userInputValue}/>
        <div>
          {this.state.notFound === false ?
              this.state.OutputValue.map(c => (
                <City cities = {c}/>
            )) :
              <p className ="cityNotFound">Not Found</p>
          }
        
        </div>
      </div>
    );
  }
}

export default App;
