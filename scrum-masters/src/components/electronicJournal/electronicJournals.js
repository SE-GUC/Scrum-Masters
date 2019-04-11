import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getElectronicJournals } from '../../globalState/actions/electronicJournalsActions'

class ElectronicJournals extends Component {
	componentDidMount() {
		// if(this.props.isLoggedIn)
		this.props.getElectronicJournals();
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
				<button onClick={this.getElectronicJournals}>get all ElectronicJournals</button>
				{electronicJournalsItems}
			</div>
		);
	}
}

ElectronicJournals.propTypes = {
	getElectronicJournals: PropTypes.func.isRequired,
	electronicJournals: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
	electronicJournals: state.electronicJournal.electronicJournals
})

export default connect(mapStateToProps, { getElectronicJournals })(
  ElectronicJournals
)
