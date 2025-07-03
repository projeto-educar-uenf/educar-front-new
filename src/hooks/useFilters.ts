import {
  NumberParam,
  StringParam,
  useQueryParams,
  withDefault,
} from "use-query-params";

export const filtersConfig = {
  q: StringParam,
  page: withDefault(NumberParam, 1),
  documentType: StringParam,
  researchArea: StringParam,
  author: StringParam,
};

export const RESET_FILTERS = {
  q: undefined,
  page: 1,
  documentType: undefined,
  researchArea: undefined,
  author: undefined,
};

export default function useFilters() {
  return useQueryParams(filtersConfig);
}
