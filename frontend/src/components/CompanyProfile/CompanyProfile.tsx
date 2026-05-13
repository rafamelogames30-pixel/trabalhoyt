import React, { useEffect, useState } from 'react'
import { CompanyKeyMetrics } from '../../company';
import { useOutletContext } from 'react-router-dom';
import { getKeyMetrics } from '../../api';
import RatioList from '../RatioList/RatioList';
import Spinner from '../Spinner/Spinner';
import { formatLargeNonMonetaryNumber, formatRatio } from '../../Helpers/NumberFormatting';
import StockComment from '../StockComment/StockComment';

type Props = {}

const tableConfig = [
  {
    label: "Market Cap",
    render: (company: CompanyKeyMetrics) =>
      formatLargeNonMonetaryNumber(company.metric.marketCapitalization),
    subTitle: "Total value of all a company's shares of stock",
  },
  {
    label: "Current Ratio",
    render: (company: CompanyKeyMetrics) =>
      formatRatio(company.metric.currentRatioTTM),
    subTitle: "Measures the companies ability to pay short term debt obligations",
  },
  {
    label: "Return On Equity",
    render: (company: CompanyKeyMetrics) =>
      formatRatio(company.metric.roeTTM),
    subTitle: "Return on equity is the measure of a company's net income divided by its shareholder's equity",
  },
  {
    label: "Return On Assets",
    render: (company: CompanyKeyMetrics) =>
      formatRatio(company.metric.assetTurnoverTTM),
    subTitle: "Return on assets is the measure of how effective a company is using its assets",
  },
  {
    label: "Free Cashflow Per Share",
    render: (company: CompanyKeyMetrics) =>
      formatRatio(company.metric.cashFlowPerShareTTM),
    subTitle: "Return on assets is the measure of how effective a company is using its assets",
  },
  {
    label: "Book Value Per Share TTM",
    render: (company: CompanyKeyMetrics) =>
      formatRatio(company.metric.bookValuePerShareAnnual),
    subTitle: "Book value per share indicates a firm's net asset value (total assets - total liabilities) on per share basis",
  },
  {
    label: "Dividend Yield TTM",
    render: (company: CompanyKeyMetrics) =>
      formatRatio(company.metric.currentDividendYieldTTM),
    subTitle: "Shows how much a company pays each year relative to stock price",
  },
  {
    label: "Capex Per Share TTM",
    render: (company: CompanyKeyMetrics) =>
      formatRatio(company.metric.capexCagr5Y),
    subTitle: "Capex is used by a company to aquire, upgrade, and maintain physical assets",
  },
  {
    label: "Graham Number",
    render: (company: CompanyKeyMetrics) =>
      formatRatio(company.metric.bookValuePerShareAnnual),
    subTitle: "This is the upperbound of the price range that a defensive investor should pay for a stock",
  },
  {
    label: "PE Ratio",
    render: (company: CompanyKeyMetrics) =>
      formatRatio(company.metric.peBasicExclExtraTTM),
    subTitle: "This is the upperbound of the price range that a defensive investor should pay for a stock",
  },
];

const CompanyProfile = (props: Props) => {
  const ticker = useOutletContext<string>();
  const [companyData, setCompanyData] = useState<CompanyKeyMetrics>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getCompanyKeyMetrics = async () => {
        const baseTicker = ticker.split('.')[0];
        const value = await getKeyMetrics(baseTicker);
        setCompanyData(value?.data);
        setLoading(false);
    };
    getCompanyKeyMetrics();
  }, []);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : companyData ? (
        <>
          <RatioList data={companyData} config={tableConfig} />
          <StockComment stockSymbol={ticker} />
        </>
      ) : (
        <p className="text-gray-500 p-4">No profile data available.</p>
      )}
    </>
  )
}

export default CompanyProfile