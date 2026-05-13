import React from 'react'
import { Link } from 'react-router';

type Props = {
    ticker: string;
}

const CompFinderItem = ({ticker}: Props) => {
  return (
    <Link
        to={`/company/${ticker}/company-profile`}
        type="button"
        className='inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-r border-gray-300 first:border-l first:rounded-l-lg last:rounded-r-lg hover:bg-gray-100 hover:text-gray-900 focus:z-10'
    >
        {ticker}
    </Link>
  )
}

export default CompFinderItem