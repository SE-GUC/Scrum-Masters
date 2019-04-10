import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { Link } from 'react-router-dom'
import { getElectronicJournals } from '../../globalState/actions/electronicJournalsActions'

class electronicJournals extends Component {
  componentDidMount() {
		// if(this.props.isLoggedIn)
		this.props.getElectronicJournals();
	}

  render() {
			const electronicJournal = this.props.electronicJournals.map((book, index) => {
				return (
					<div key={index}>
						<h3>{book.title}</h3>
						<p>{book.author}</p>
					</div>
				);
			});
			return (
				<div>
					<h1> Posts </h1>
					<button onClick={this.logout}>Logout</button>
					{bookItems}
				</div>
			);
		

		return (
				<div>
					<h1> Please login to view books </h1>
					<button onClick={this.login}>Login</button>
				</div>
		)
	}

electronicJournals.defaultProps = {
  showActions: true
}

const mapStateToProps = state => ({
  getElectronicJournals: PropTypes.func.isRequired,
  electronicJournals: PropTypes.array.isRequired
})

export default connect(mapStateToProps, { getElectronicJournals })(
  electronicJournals
)
