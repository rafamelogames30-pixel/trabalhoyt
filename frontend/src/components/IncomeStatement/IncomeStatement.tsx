import React, { useEffect, useState } from 'react'
import { CompanyIncomeStatement } from '../../company';
import { useOutletContext } from 'react-router';
import { getIncomeStatement } from '../../api';
import Table from '../Table/Table';
import Spinner from '../Spinner/Spinner';
import { formatLargeMonetaryNumber } from '../../Helpers/NumberFormatting';

type Props = {}

const findIC = (ic: any[], ...concepts: string[]) => {
  for (const concept of concepts) {
    const found = ic.find(i => i.concept === concept);
    if (found?.value !== undefined && found.value !== null) return found.value;
  }
  return undefined;
};

const configs = [
  {
    label: "Date",
    render: (company: CompanyIncomeStatement) => company.endDate,
  },
  {
    label: "Revenue",
    render: (company: CompanyIncomeStatement) =>
      formatLargeMonetaryNumber(findIC(company.report.ic,
        "us-gaap_RevenueFromContractWithCustomerExcludingAssessedTax",
        "us-gaap_Revenues",
        "us-gaap_SalesRevenueNet",
        "us-gaap_RevenueFromContractWithCustomerIncludingAssessedTax"
      )),
  },
  {
    label: "Cost Of Revenue",
    render: (company: CompanyIncomeStatement) =>
      formatLargeMonetaryNumber(findIC(company.report.ic,
        "us-gaap_CostOfGoodsAndServicesSold",
        "us-gaap_CostOfRevenue",
        "us-gaap_CostOfGoodsSold"
      )),
  },
  {
    label: "Gross Profit",
    render: (company: CompanyIncomeStatement) =>
      formatLargeMonetaryNumber(findIC(company.report.ic,
        "us-gaap_GrossProfit"
      )),
  },
  {
    label: "Research & Development",
    render: (company: CompanyIncomeStatement) =>
      formatLargeMonetaryNumber(findIC(company.report.ic,
        "us-gaap_ResearchAndDevelopmentExpense",
        "us-gaap_ResearchAndDevelopmentExpenseExcludingAcquiredInProcessCost"
      )),
  },
  {
    label: "Selling & Marketing",
    render: (company: CompanyIncomeStatement) =>
      formatLargeMonetaryNumber(findIC(company.report.ic,
        "us-gaap_SellingAndMarketingExpense",
        "us-gaap_MarketingExpense",
        "us-gaap_SellingExpense"
      )),
  },
  {
    label: "General & Administrative",
    render: (company: CompanyIncomeStatement) =>
      formatLargeMonetaryNumber(findIC(company.report.ic,
        "us-gaap_GeneralAndAdministrativeExpense",
        "us-gaap_SellingGeneralAndAdministrativeExpense"
      )),
  },
  {
    label: "Operating Income",
    render: (company: CompanyIncomeStatement) =>
      formatLargeMonetaryNumber(findIC(company.report.ic,
        "us-gaap_OperatingIncomeLoss",
        "us-gaap_IncomeLossFromContinuingOperationsBeforeIncomeTaxesExtraordinaryItemsNoncontrollingInterest"
      )),
  },
  {
    label: "Non-Operating Income",
    render: (company: CompanyIncomeStatement) =>
      formatLargeMonetaryNumber(findIC(company.report.ic,
        "us-gaap_NonoperatingIncomeExpense",
        "us-gaap_OtherNonoperatingIncomeExpense",
        "us-gaap_InterestAndOtherIncome"
      )),
  },
  {
    label: "Net Income",
    render: (company: CompanyIncomeStatement) =>
      formatLargeMonetaryNumber(findIC(company.report.ic,
        "us-gaap_NetIncomeLoss",
        "us-gaap_ProfitLoss",
        "us-gaap_NetIncomeLossAvailableToCommonStockholdersBasic"
      )),
  },
];

const IncomeStatement = (props: Props) => {
    const ticker = useOutletContext<string>();
    const [incomeStatement, setIncomeStatement] = useState<CompanyIncomeStatement[]>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const incomeStatementFetch = async () => {
            const baseTicker = ticker.split('.')[0];
            const result = await getIncomeStatement(baseTicker);
            setIncomeStatement(result?.data?.data);
            setLoading(false);
        };
        incomeStatementFetch();
    }, []);

    return (
        <>
            {loading ? (
                <Spinner />
            ) : incomeStatement && incomeStatement.length > 0 ? (
                <Table config={configs} data={incomeStatement} />
            ) : (
                <p className="text-gray-500 p-4">No income statement data available.</p>
            )}
        </>
    )
}

export default IncomeStatement