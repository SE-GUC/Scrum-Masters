import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import isEmpty from '../../validations/is-empty'
import companyLogo from '../../img/logo-ex-7.png'

class ElectronicJournalItem extends Component {
  render () {
    const { electronicJournal } = this.props

    return (
      <div className='card card-body bg-light mb-3'>
        <div className='row'>
          <div className='col-2'>
            <img src={companyLogo} alt='' className='rounded-circle' />
          </div>
          <div className='col-lg-6 col-md-4 col-8'>
            <h3>{electronicJournal.companyName}</h3>
            <p>
              {isEmpty(electronicJournal.companyDescription) ? null : (
                <span>{electronicJournal.companyDescription}</span>
              )}
            </p>
            <Link to={`/electronicJournal/${electronicJournal._id}`} className='btn btn-info'>
                View Contract
            </Link>
          </div>
        </div>
      </div>
    )

  }
}

ElectronicJournalItem.propTypes = {
  electronicJournal: PropTypes.object.isRequired
}

export default ElectronicJournalItem
