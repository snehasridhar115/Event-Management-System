import React from 'react';
import style from './Styles/AddEvent.css';
import DatePicker from 'react-datepicker';
import axios from 'axios';
// import moment from 'moment';

class AddEvent extends React.Component {

    constructor() {
      super();
      this.state = {
        error: false,
        startDate: new Date(),
        Name: null,
        time: null,
        venue: null,
        uid: null,
	date: null
      }
      //this.handleChange = this.handleChange.bind(this);
    }
  
    handleChange=(event) => {
        event.preventDefault();
        const { name, value } = event.target;
        console.log(name);
        this.setState({[name]: value});
    }
    handleSubmit=(event) => {
        event.preventDefault();
        var opts={
        "e_type":this.state.Name,
        "e_time":this.state.time,
        "e_venue":this.state.venue,
        "e_date":this.state.date,
	"uid":this.state.uid
          };
        console.log(opts);
        axios.post('http://127.0.0.1:5000/addevent',opts)
            .then(res => {
              console.log(res);
              console.log(res.data);
        if(res.data.success==true)
          window.location.replace('http://127.0.0.1:3000/Userhome')
        else
          this.setState({
            error: true
          })
            }).catch(error => {
              console.log(error);
            })
    }
	
    render() {
    return (
        <div>
            <div class="SubHeader">
              <h2 class="Heading">Add New Event</h2>
            </div>

            <form class="Component" onSubmit={this.handleSubmit}>

                <div class="Field">
                <text class="Label" value="">User Id: </text>
                <input class='uid' name='uid'  onChange={this.handleChange} />
                </div>

                <div class="Field">
                <text class="Label">Event name: </text>
                <input class="Input" class='Name' name='Name'  onChange={this.handleChange} />
                </div>
 
                <div class="Field">
                <text class="Label">Date: </text>
		<input class="Input" class='date' name='date' onChange={this.handleChange} />
                </div>

                <div class="Field">
                <text class="Label">Time Slot: </text>
                <input class="Input" class='time' name='time' onChange={this.handleChange} />
                </div>

                <div class="Field">
                <text class="Label">Venue: </text>
                <input class="Input" class='venue' name='venue'  onChange={this.handleChange} />
                </div>

                <div class="Field">
                <button class="Button" class="Submit">Submit</button>
                </div>
                {this.state.error && <div class="Error">The slot which you selected is not available. Please select a different date.</div>} 

            </form>
        </div>
    );
    }
  }

export default AddEvent;
