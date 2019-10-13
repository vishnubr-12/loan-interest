import React, { Component } from 'react';
import { MdSend } from "react-icons/md";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import axios from "axios";
import "./Loan.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import uuid from "uuid/v4";
import List from "./List";

class Form extends Component {

    state = {
		id:uuid(),
		amount: 500,
		months: 6,
		interestRate: 0,
		monthlyPayment: 0,
		numPayments: 0,
		items: [],
		editItem: false
    };

Submit=e=>{
	
	e.preventDefault();
	const newItem = {
		id: this.state.id,
		title: this.state.amount,
		title1:this.state.months
	  };
  console.log(newItem);
	  const updatedItems = [...this.state.items, newItem];
	  localStorage.setItem('list',JSON.stringify({updatedItems}));
	  this.setState({
		items: updatedItems,
		id: uuid(),
		editItem: false
	  });
	  
}
clearList = () => {
    this.setState({
      items: []
    });
  };
  handleDelete = id => {
    const filteredItems = this.state.items.filter(item => item.id !== id);
    this.setState({
      items: filteredItems
    });
  };
  handleEdit = id => {
    const filteredItems = this.state.items.filter(item => item.id !== id);

    const selectedItem = this.state.items.find(item => item.id === id);

    console.log(selectedItem);

    this.setState({
      items: filteredItems,
	  amount: selectedItem.title,
	  months:selectedItem.title1,
      editItem: true,
      id: id
    });
  };
	componentDidMount() {
		
		axios
			.get(
				`https://ftl-frontend-test.herokuapp.com/interest?amount=${
					this.state.amount
				}&numMonths=${this.state.months}`
			)
			.then(res => {
				this.setState({
					interestRate: res.data.interestRate,
					monthlyPayment: res.data.monthlyPayment.amount,
					numPayments: res.data.numPayments
				});
			})
			.catch(e => console.log(e));
		console.log(this.state);
    }
    
        

	componentDidUpdate(prevProps, prevState) {
		if (
			this.state.amount !== prevState.amount ||
			this.state.months !== prevState.months
		) {
			axios
				.get(
					`https://ftl-frontend-test.herokuapp.com/interest?amount=${
						this.state.amount
					}&numMonths=${this.state.months}`
				)
				.then(res => {
					console.log(res.data);
					if (res.data.status && res.data.status === "error") {
						console.log("Error occurred");
					} else {
						this.setState({
							interestRate: res.data.interestRate,
							monthlyPayment: res.data.monthlyPayment.amount,
							numPayments: res.data.numPayments
						});
					}
				})
				.catch(e => console.log(e));
        }
	}

	formatAmountLabel = val => {
		return `$${val}`;
	};

	render() {
		return (
			<>
				 <Container  className="my-5">
            <Row >
            <Col sm = { 8 } >
				<div className="container w-100 card">
					<form onSubmit={this.Submit}>
						<div className="form-group">
							<label>Loan Amount</label><br/><br/><br/>
							<InputRange
								maxValue={5000}
								minValue={500}
								value={this.state.amount}
								onChange={amount => this.setState({ amount })}
								formatLabel={this.formatAmountLabel}
							/>
						</div>
						<div className="form-group my-5">
							<label>Loan Duration (in months)</label><br/><br/><br/>
							<InputRange
								maxValue={24}
								minValue={6}
								value={this.state.months}
								onChange={months => this.setState({ months })}
							/>
						</div>
                        <button type="submit"  className={
                       this.state.editItem
                      ? "btn btn-block btn-success mt-3 my-4"
                       : "btn btn-block btn-primary mt-3 my-4"
                     }
                     >
            {this.state.editItem ? "edit list" : "add list"}<MdSend className="btn-icon" /> </button>
					</form>
					</div>
                    </Col>
                    <Col sm = { 4 } >
                    <List items={this.state.items}
					 clearList={this.clearList}
					 handleDelete={this.handleDelete}
					 handleEdit={this.handleEdit}
					 />
                   </Col>  
                  </Row> 
             <Row className="my-4">
					<br />
					<div className="interest-details-wrapper">
						<h2><u>Interest Details: </u></h2>
						<p className="interest-data">
							<span className="interest-label">Interest Rate: </span>
							<span className="interest-display data-display">
								${this.state.interestRate}
							</span>
						</p>
						<p className="interest-data">
							<span className="interest-label">Monthly Payment:</span>{" "}
							<span className="payment-display data-display">
								${this.state.monthlyPayment}
							</span>
						</p>
						<p className="interest-data">
							<span className="interest-label">Number of Payments:</span>{" "}
							<span className="number-display data-display">
								{this.state.numPayments}
							</span>
						</p>
					</div>
				
				</Row>
				</Container>
			</>
		);
	}
}


export default Form;