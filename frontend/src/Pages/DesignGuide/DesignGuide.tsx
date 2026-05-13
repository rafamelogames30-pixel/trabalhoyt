import React from 'react'
import Table from '../../Components/Table/Table'
import RatioList from '../../Components/RatioList/RatioList'
import { testIncomeStatementData } from '../../Components/Table/testData';

type Props = {};

const tableConfig = [
  {
    label: "Market Cap",
    render: (company: any) => company.marketCapTTM,
    subTitle: "Total value of all a company's shares of stock",
  },
]

const DesignGuide = (props: Props) => {
  return (
    <>
        <h1>Finshark Design Page</h1>
        <h2>Thi is FinShark's Design page. This is where we will house various design aspects of the app</h2>
        <RatioList data={testIncomeStatementData} config={tableConfig}/>
        <Table data={testIncomeStatementData} config={tableConfig}/>
    </>
  )
}

export default DesignGuide