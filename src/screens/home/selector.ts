import _ from "underscore";
import { createSelector } from "reselect";
import moment from "moment";

export const homeSelector = (state: any) => state.home;

export const countriesSelector = createSelector(homeSelector, (home) => {
  let options = home.countries || [];
  options = options.map((option: any) => {
    return { value: option.code, label: option.name, ...option };
  });
  return options;
});

export const citiesSelector = createSelector(homeSelector, (home) => {
  let options = home.cities || [];
  options = options.map((option: any) => {
    return { value: option.city, label: option.city, ...option };
  });
  return options;
});

export const barChartSelector = createSelector(homeSelector, (home) => {
  const measurements = home.measurements || [];
  const locationWise = _.groupBy(measurements, "locationId");
  const keys = Object.keys(locationWise);
  const charts = keys.map((key) => {
    let values = locationWise[key] || [];
    const parameters = _.uniq(values.map((value) => value.parameter)).sort(
      (a, b) => a - b
    );
    const headings = ["Time", ...parameters];
    const data = [headings];
    let location = "";
    values.forEach((pollution) => {
      location = pollution.location;
      const items = new Array(headings.length).fill(0);
      items[0] = new Date(pollution.date.local);
      //  moment(pollution.date.local).format("hh:mm:ss a");
      const index = headings.indexOf(pollution.parameter);
      items[index] = pollution.value;
      data.push(items);
    });
    return {
      location,
      locationId: key,
      data,
    };
  });
  return charts;
});
