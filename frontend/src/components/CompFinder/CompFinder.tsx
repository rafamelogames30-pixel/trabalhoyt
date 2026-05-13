import React, { useEffect, useState } from 'react'
import { CompanyCompData } from '../../company';
import { getCompData } from '../../api';
import CompFinderItem from './CompFinderItem/CompFinderItem';

type Props = {
    ticker: string;
}

const CompFinder = ({ticker}: Props) => {
    const [companyData, setCompanyData] = useState<string[]>();
    useEffect(() => {
        const getComps = async () => {
            const value = await getCompData(ticker);
            setCompanyData(value?.data);
        }
        getComps();
    }, [ticker])
  return (
    <div className='inline-flex shadow-sm m-4 border-l border-gray-300 rounded-lg overflow-hidden'>
        {companyData?.map((ticker) => {
            return <CompFinderItem ticker={ticker} key={ticker} />
        })}
    </div>
  )
}

export default CompFinder