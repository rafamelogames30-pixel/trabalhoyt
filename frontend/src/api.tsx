import axios from "axios";
import { CompanyBalanceSheet, CompanyCashFlow, CompanyCompData, CompanyIncomeStatement, CompanyKeyMetrics, CompanyProfile, CompanySearch, CompanyTenK } from "./company";

interface SearchResponse {
  count: number;
  result: CompanySearch[];
}

interface IncomeStatementResponse {
  data: CompanyIncomeStatement[];
  symbol: string;
}

interface BalanceSheetResponse {
  data: CompanyBalanceSheet[];
  symbol: string;
}

interface CashFlowResponse {
  data: CompanyCashFlow[];
  symbol: string;
}

export const searchCompanies = async (query: string) => {
  try {
    const data = await axios.get<SearchResponse>(
      `/api/v1/search?q=${query}&token=${process.env.REACT_APP_API_KEY}`
    );
    return data;
  } catch (error: any) {
    if (error && error.response) {
      console.log("error message: ", error.message);
      return error.message;
    } else {
      console.log("unexpected error: ", error);
      return "An unexpected error has occurred.";
    }
  }
};

export const getCompanyProfile = async (query: string) => {
  try {
    const data = await axios.get<CompanyProfile>(
      `/api/v1/stock/profile2?symbol=${query}&token=${process.env.REACT_APP_API_KEY}`
    );
    return data;
  } catch (error: any) {
    console.log("Error message from API: ", error.message);
  }
};

export const getKeyMetrics = async (query: string) => {
  try {
    const data = await axios.get<CompanyKeyMetrics>(
      `/api/v1/stock/metric?symbol=${query}&metric=all&token=${process.env.REACT_APP_API_KEY}`
    );
    return data;
  } catch (error: any) {
    console.log("Error message from API: ", error.message);
  }
};

export const getIncomeStatement = async (query: string) => {
  try {
    const data = await axios.get<IncomeStatementResponse>(
      `/api/v1/stock/financials-reported?symbol=${query}&freq=annual&token=${process.env.REACT_APP_API_KEY}`
    );
    return data;
  } catch (error: any) {
    console.log("Error message from API: ", error.message);
  }
};

export const getBalanceSheet = async (query: string) => {
  try {
    const data = await axios.get<BalanceSheetResponse>(
      `/api/v1/stock/financials-reported?symbol=${query}&freq=annual&token=${process.env.REACT_APP_API_KEY}`
    );
    return data;
  } catch (error: any) {
    console.log("Error message from API: ", error.message);
  }
};

export const getCashflowStatement = async (query: string) => {
  try {
    const data = await axios.get<CashFlowResponse>(
      `/api/v1/stock/financials-reported?symbol=${query}&freq=annual&token=${process.env.REACT_APP_API_KEY}`
    );
    return data;
  } catch (error: any) {
    console.log("Error message from API: ", error.message);
  }
};

export const getCompData = async (query: string) => {
  try {
    const data = await axios.get<string[]>(
      `/api/v1/stock/peers?symbol=${query}&token=${process.env.REACT_APP_API_KEY}`
    );
    return data;
  } catch (error: any) {
    console.log("Error message from API: ", error.message);
  }
};

export const getTenK = async (query: string) => {
  try {
    const data = await axios.get<CompanyTenK[]>(
      `/api/v1/stock/filings?symbol=${query}&form=10-K&token=${process.env.REACT_APP_API_KEY}`
    );
    return data;
  } catch (error: any) {
    console.log("Error message from API: ", error.message);
  }
};