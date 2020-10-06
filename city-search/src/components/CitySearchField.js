import React from 'react'

function CitySearchField(props){
    return(
      <div className="CitySearchField">
        <form onSubmit={props.submitCity}>
        <strong>City:  </strong>
        <input type="text" onChange={props.cityChanged} value={props.cityName}/>
        <p>You have entered: {props.cityName}</p>
        <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }

export default CitySearchField
