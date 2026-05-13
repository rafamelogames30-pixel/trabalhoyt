import React from 'react'
import { CompanyTenK } from '../../../company'
import { Link } from 'react-router';

type Props = {
    tenK: CompanyTenK;
}

const TenKFinderItem = ({tenK}: Props) => {
    const fillingData = new Date(tenK.filedDate).getFullYear();
  return (
    <Link
        reloadDocument
        to={tenK.reportUrl}
        type='button'
        className='inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-500 border border-gray-200 rounded-lg mr-2 hover:bg-green-600 hover:text-white focus:z-10 focus:ring-2 focus:ring-green-700'
    > 10k - {tenK.symbol} - {fillingData} </Link>
  )
}

export default TenKFinderItem