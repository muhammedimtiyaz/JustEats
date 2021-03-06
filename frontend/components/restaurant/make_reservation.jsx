import React, { Component } from "react";
import IconChart from "react-icons/lib/io/arrow-graph-up-right";
import IconBookmark from "react-icons/lib/fa/bookmark-o";
import IconFullBookmark from "react-icons/lib/fa/bookmark";

class MakeReservation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      partySize: 2,
      date: 0,
      time: "7:30 PM"
    }

    this.numBookings = this.numBookings.bind(this);
  }

  numBookings() {
    let bookings = Math.floor(Math.random() * 100) + 10;
    return `Booked ${bookings} times today`
  }

  onPartySizeChange(e) {
    this.setState({ partySize: e.target.value })
  }

  partySizeLoop(){
    var options = [];

    for (let i = 1; i <= 20; i++) {
      options.push(<option value={i} key={i}>For {i}</option>);
    }

    return options;
  }

  partySizeOptions() {
    return (
      <select className="select-size"
        onChange={this.onPartySizeChange.bind(this)}
        value={this.state.partySize}>
        {this.partySizeLoop()}
      </select>
    )
  }

  onDateChange(e) {
    this.setState({ date: e.target.value })
  }

  dateOptions() {
    let dateArr =["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    return (
      <select className="select-date"
        onChange={this.onDateChange.bind(this)}
        value={this.state.date}>
        {dateArr.map((date, idx) => (
          <option value={idx} key={idx}>{date}</option>
        ))}
      </select>
    )
  }

  onTimeChange(e) {
    this.setState({ time: e.target.value })
  }

  timeOptions() {
    return (
      <select className="select-time"
        onChange={this.onTimeChange.bind(this)}
        value={this.state.time}>
        <option value="5:30 PM">5:30 PM</option>
        <option value="5:45 PM">5:45 PM</option>
        <option value="6:00 PM">6:00 PM</option>
        <option value="6:15 PM">6:15 PM</option>
        <option value="6:30 PM">6:30 PM</option>
        <option value="6:45 PM">6:45 PM</option>
        <option value="6:50 PM">6:50 PM</option>
        <option value="7:00 PM">7:00 PM</option>
        <option value="7:15 PM">7:15 PM</option>
        <option value="7:30 PM">7:30 PM</option>
        <option value="7:45 PM">7:45 PM</option>
        <option value="7:50 PM">7:50 PM</option>
        <option value="8:00 PM">8:00 PM</option>
        <option value="8:15 PM">8:15 PM</option>
        <option value="8:30 PM">8:30 PM</option>
        <option value="8:45 PM">8:45 PM</option>
        <option value="9:00 PM">9:00 PM</option>
        <option value="9:15 PM">9:15 PM</option>
        <option value="9:30 PM">9:30 PM</option>
        <option value="9:45 PM">9:45 PM</option>
        <option value="10:00 PM">10:00 PM</option>
        <option value="10:15 PM">10:15 PM</option>
        <option value="10:30 PM">10:30 PM</option>
        <option value="10:45 PM">10:45 PM</option>
        <option value="11:00 PM">11:00 PM</option>
      </select>
    )
  }

  getDate() {
    let date = new Date();
    let currentDay = date.getDay();
    let distance = (this.state.date + 7 - currentDay) % 7;

    date.setDate(date.getDate() + distance);
    return date;
  }

  processAndCreateReservation() {
    let reservation = {
      'party_size': parseInt(this.state.partySize),
      'points': 125,
      'date': this.getDate()
    };

    this.props.createReservation(this.props.restaurant.id, reservation);
  }

  isRestaurantReserved() {
    return Object.values(this.props.reservations).filter(restaurant => parseInt(restaurant.restaurantId) === this.props.restaurant.id).length > 0
  }

  isRestaurantInFavorites() {
    return Object.keys(this.props.favorites).filter(restaurantId => parseInt(restaurantId) === this.props.restaurant.id).length > 0
  }

  getReservationId() {
    let reservations = Object.values(this.props.reservations).filter(restaurant => parseInt(restaurant.restaurantId) === this.props.restaurant.id);

    return reservations.length === 0 ? '' : reservations[0].id
  }

  render() {
    return (
      <div>
        <div className="reservation-container">
          <div className="reservation-header">
            Make a reservation
          </div>
          <div className="reservation-size">
            Party Size
          </div>
          {this.partySizeOptions()}
          <div className="reservation-options">
            <div className="left-reservation-date">
              Date
            </div>
            {this.dateOptions()}
            <div className="right-reservation-time">
              Time
            </div>
            {this.timeOptions()}
          </div>
          {this.isRestaurantReserved() ?
              <button
                onClick={() => this.props.deleteReservation(this.getReservationId())}
                className="btn-submit-reservation">
                Reserved
              </button>
          :
              <button
                onClick={() => this.processAndCreateReservation()}
                className="btn-submit-reservation">
                Reserve a Table
              </button>
          }
          <div className="bookingAmt">
            {<IconChart size={20}/>} {this.numBookings()}
          </div>
      </div>
      {this.isRestaurantInFavorites() ?
        <button
          onClick={() => this.props.removeFavorite(this.props.restaurant.id) }
          className="btn-favorite">
          {<IconFullBookmark className="favorite-icon" size={18} color={"#da3743"}/>}  Remove from Favorites
        </button>
      :
        <button
          onClick={() => this.props.addFavorite(this.props.restaurant.id) }
          className="btn-favorite">
          {<IconBookmark className="favorite-icon" size={18}/>}  Save to Favorites
        </button>
      }
    </div>
    )
  }
}

export default MakeReservation;
