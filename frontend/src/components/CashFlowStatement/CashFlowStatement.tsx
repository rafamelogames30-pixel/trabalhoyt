import React, { useEffect, useState } from 'react'
import { CompanyCashFlow } from '../../company';
import { useOutletContext } from 'react-router';
import { getCashflowStatement } from '../../api';
import Table from '../Table/Table';
import Spinner from '../Spinner/Spinner';
import { formatLargeMonetaryNumber } from '../../Helpers/NumberFormatting';

type Props = {}

const findValue = (cf: any[], ...concepts: string[]) => {
  for (const concept of concepts) {
    const found = cf.find(i => i.concept === concept);
    if (found?.value !== undefined && found.value !== null) return found.value;
  }
  return undefined;
};

const config = [
  {
    label: "Date",
    render: (company: CompanyCashFlow) => company.endDate,
  },
  {
    label: "Operating Cashflow",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(findValue(company.report.cf,
        "us-gaap_NetCashProvidedByUsedInOperatingActivities",
        "us-gaap_NetCashProvidedByUsedInOperatingActivitiesContinuingOperations"
      )),
  },
  {
    label: "Investing Cashflow",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(findValue(company.report.cf,
        "us-gaap_NetCashProvidedByUsedInInvestingActivities",
        "us-gaap_NetCashProvidedByUsedInInvestingActivitiesContinuingOperations"
      )),
  },
  {
    label: "Financing Cashflow",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(findValue(company.report.cf,
        "us-gaap_NetCashProvidedByUsedInFinancingActivities",
        "us-gaap_NetCashProvidedByUsedInFinancingActivitiesContinuingOperations"
      )),
  },
  {
    label: "Cash At End of Period",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(findValue(company.report.cf,
        "us-gaap_CashCashEquivalentsRestrictedCashAndRestrictedCashEquivalentsPeriodIncreaseDecreaseIncludingExchangeRateEffect",
        "us-gaap_CashAndCashEquivalentsPeriodIncreaseDecrease"
      )),
  },
  {
    label: "CapEX",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(findValue(company.report.cf,
        "us-gaap_PaymentsToAcquirePropertyPlantAndEquipment"
      )),
  },
  {
    label: "Issuance Of Stock",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(findValue(company.report.cf,
        "us-gaap_ProceedsFromIssuanceOfCommonStock"
      )),
  },
  {
    label: "Free Cash Flow",
    render: (company: CompanyCashFlow) => {
      const operating = findValue(company.report.cf,
        "us-gaap_NetCashProvidedByUsedInOperatingActivities",
        "us-gaap_NetCashProvidedByUsedInOperatingActivitiesContinuingOperations"
      );
      const capex = findValue(company.report.cf,
        "us-gaap_PaymentsToAcquirePropertyPlantAndEquipment"
      );
      if (operating === undefined || capex === undefined) return undefined;
      return formatLargeMonetaryNumber(operating - capex);
    },
  },
];

const CashFlowStatement = (props: Props) => {
    const ticker = useOutletContext<string>();
    const [cashflowData, setCashflow] = useState<CompanyCashFlow[]>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchCashFlow = async () => {
            const baseTicker = ticker.split('.')[0];
            const result = await getCashflowStatement(baseTicker);
            setCashflow(result?.data?.data);
            setLoading(false);
        }
        fetchCashFlow();
    }, []);

    return (
        <>
            {loading ? (
                <Spinner />
            ) : cashflowData && cashflowData.length > 0 ? (
                <Table config={config} data={cashflowData} />
            ) : (
                <p className="text-gray-500 p-4">No cash flow data available.</p>
            )}
        </>
    )
}

export default CashFlowStatement