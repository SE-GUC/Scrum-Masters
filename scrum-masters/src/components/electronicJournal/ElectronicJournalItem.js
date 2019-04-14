import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import isEmpty from '../../validations/is-empty'
import companyLogo from '../../img/logo-ex-7.png'

class ElectronicJournalItem extends Component {
  format = date => {
    var d = date.getDate();
    var m = date.getMonth() + 1;
    var y = date.getFullYear();
    return '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
  }


  render () {
    const { electronicJournal } = this.props

    return (
      <div className='card card-body bg-light mb-3'>
        <div className='row'>
          <div className='col-2'>
            <img src={companyLogo} alt='' className='rounded-circle' />
          </div>
          <div className='col-lg-6 col-md-4 col-8'>
            <h3>Company Name: {electronicJournal.companyName}</h3>
            <h5>
              Company Description: {isEmpty(electronicJournal.companyDescription) ? null : (
                <span>{electronicJournal.companyDescription}</span>
              )}
            </h5>
            <h5>
              Company Establishment Date: { electronicJournal.companyAcceptanceDate.split('T')[0] }
            </h5>
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
