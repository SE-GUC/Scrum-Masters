import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getElectronicJournals } from '../../globalState/actions/electronicJournalsActions'
import Spinner from '../common/Spinner'
import ElectronicJournalItem from './ElectronicJournalItem'

class ElectronicJournals extends Component {
  componentDidMount () {
    this.props.getElectronicJournals()
  }

	render() {
      const { electronicJournals, loading } = this.props.electronicJournal
      let electronicJournalItems

      if (electronicJournals === null || loading) {
        electronicJournalItems = <Spinner />
      } else {
        if(electronicJournals.length > 0) {
          electronicJournalItems = electronicJournals.map((electronicJournal) => (
            <ElectronicJournalItem key={electronicJournal._id} electronicJournal={electronicJournal} />
          ))
       } else {
          electronicJournalItems = <h4>No electronicJournals found...</h4> 
        }
      }

		return (
      <div className='electronicJournals'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <h1 className='display-4 text-center'>Electronic Journals</h1>
              <p className='lead text-center'>
                View all established companies
              </p>
              {electronicJournalItems}
            </div>
          </div>
        </div>
      </div>
    )
	}
}

ElectronicJournals.propTypes = {
	getElectronicJournals: PropTypes.func.isRequired,
	electronicJournal: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	electronicJournal: state.electronicJournal
})

export default connect(mapStateToProps, { getElectronicJournals })(
  withRouter(ElectronicJournals)
)
