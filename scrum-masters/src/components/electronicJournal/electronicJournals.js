import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getElectronicJournals } from '../../globalState/actions/electronicJournalsActions'

class ElectronicJournals extends Component {

	componentWillReceiveProps(nextProps) { 
		if (nextProps.errors) {
			this.setState({errors: nextProps.errors})
		}
	}

	onSubmit = e => {
		e.preventDefault()

		this.props.getElectronicJournals(this.props.history)
	}

	render() {
			const electronicJournalsItems = this.props.electronicJournals.map((electronicJournal, index) => {
				return (
					<div key={index}>
						<h3>{electronicJournal.companyName}</h3>
						<p>{electronicJournal.companyDescription}</p>
					</div>
				)
			})
		return (
			<div>
				<h1> ElectronicJournals </h1>
				<button className="btn btn-info mt-4" onClick={this.onSubmit}>get all ElectronicJournals</button>
				{electronicJournalsItems}
			</div>
		);
	}
}

ElectronicJournals.propTypes = {
	getElectronicJournals: PropTypes.func.isRequired,
	electronicJournals: PropTypes.array.isRequired,
	errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	electronicJournals: state.electronicJournal.electronicJournals,
	errors: state.errors
})

export default connect(mapStateToProps, { getElectronicJournals })(
  withRouter(ElectronicJournals)
)
