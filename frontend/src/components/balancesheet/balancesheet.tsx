import React, { useEffect, useState } from 'react'
import { CompanyBalanceSheet } from '../../company';
import { useOutletContext } from 'react-router';
import { getBalanceSheet } from '../../api';
import RatioList from '../RatioList/RatioList';
import Spinner from '../Spinner/Spinner';
import { formatLargeMonetaryNumber } from '../../Helpers/NumberFormatting';

type Props = {}

const config = [
  {
    label: <div className="font-bold">Total Assets</div>,
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.report.bs.find(i => i.concept === "us-gaap_Assets")?.value),
  },
  {
    label: "Current Assets",
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.report.bs.find(i => i.concept === "us-gaap_AssetsCurrent")?.value),
  },
  {
    label: "Total Cash",
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.report.bs.find(i => i.concept === "us-gaap_CashAndCashEquivalentsAtCarryingValue")?.value),
  },
  {
    label: "Property & Equipment",
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.report.bs.find(i => i.concept === "us-gaap_PropertyPlantAndEquipmentNet")?.value),
  },
  {
    label: "Intangible Assets",
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.report.bs.find(i => i.concept === "us-gaap_FiniteLivedIntangibleAssetsNet")?.value),
  },
  {
    label: "Long Term Debt",
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.report.bs.find(i => i.concept === "us-gaap_LongTermDebtNoncurrent")?.value),
  },
  {
    label: <div className="font-bold">Total Liabilities</div>,
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.report.bs.find(i => i.concept === "us-gaap_Liabilities")?.value),
  },
  {
    label: "Current Liabilities",
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.report.bs.find(i => i.concept === "us-gaap_LiabilitiesCurrent")?.value),
  },
  {
    label: "Stakeholder's Equity",
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.report.bs.find(i => i.concept === "us-gaap_StockholdersEquity")?.value),
  },
  {
    label: "Retained Earnings",
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.report.bs.find(i => i.concept === "us-gaap_RetainedEarningsAccumulatedDeficit")?.value),
  },
];

const BalanceSheet = (props: Props) => {
    const ticker = useOutletContext<string>();
    const [balanceSheet, setBalanceSheet] = useState<CompanyBalanceSheet>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const getData = async () => {
            const baseTicker = ticker.split('.')[0];
            const value = await getBalanceSheet(baseTicker);
            setBalanceSheet(value?.data?.data?.[0]);
            setLoading(false);
        };
        getData();
    }, []);

    return (
        <>
            {loading ? (
                <Spinner />
            ) : balanceSheet ? (
                <RatioList config={config} data={balanceSheet} />
            ) : (
                <p className="text-gray-500 p-4">No balance sheet data available.</p>
            )}
        </>
    )
}

export default BalanceSheet