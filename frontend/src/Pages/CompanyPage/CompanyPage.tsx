import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { CompanyProfile } from '../../company';
import { getCompanyProfile } from '../../api';
import Sidebar from '../../Components/Sidebar/Sidebar';
import CompanyDashboard from '../../Components/CompanyDashboard/CompanyDashboard';
import Tile from '../../Components/Tile/Tile';
import Spinner from '../../Components/Spinner/Spinner';
import CompFinder from '../../Components/CompFinder/CompFinder';
import TenKFinder from '../../Components/TenKFinder/TenKFinder';

interface Props {}

const CompanyPage = (props: Props) => {
  let { ticker } = useParams();
  const [company, setCompany] = useState<CompanyProfile>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getProfileInit = async () => {
      const baseTicker = ticker!.split('.')[0];
      const result = await getCompanyProfile(baseTicker);
      setCompany(result?.data);
      setLoading(false);
    }
    getProfileInit();
  }, [ticker])

  return (
    <>
      {loading ? (
        <Spinner />
      ) : company && company.ticker ? (
        <div className="w-full relative flex ct-docs-disable-sidebar-content overflow-x-hidden">
          <Sidebar />
          <CompanyDashboard ticker={ticker!}>
            <Tile title="Company Name" subTitle={company.name} />
            <Tile title="Industry" subTitle={company.finnhubIndustry} />
            <Tile title="Market Cap" subTitle={"$" + company.marketCapitalization.toString()} />
            <Tile title="Country" subTitle={company.country} />
            <CompFinder ticker={company.ticker} />
            <TenKFinder ticker={company.ticker} />
            <p className='bg-white shadow rounded text-medium text-gray-900 p-3 mt-1 m-4'>
              {company.name} is a {company.country}-based company operating in the {company.finnhubIndustry} industry.
              {company.marketCapitalization
                ? ` It has a market capitalization of ${company.marketCapitalization}.`
                : ""}
              {" "}The company provides products and services globally.
              {company.weburl ? ` More details at ${company.weburl}.` : ""}
            </p>
          </CompanyDashboard>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <p className="text-xl text-gray-500">No data available for <strong>{ticker}</strong>.</p>
        </div>
      )}
    </>
  )
}

export default CompanyPage