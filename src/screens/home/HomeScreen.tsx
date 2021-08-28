import { Button, Col, Container, Form, Row } from "react-bootstrap";
import {
  barChartSelector,
  citiesSelector,
  countriesSelector,
} from "./selector";
import {
  getCitiesAction,
  getCountriesAction,
  getPollutionDataAction,
} from "./reducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Flatpickr from "react-flatpickr";
import { LineChart } from "../../components/LineChart";
import Select from "react-select";
import { jsonToQueryString } from "../../utils/rest.util";
import moment from "moment";

const defaultValues = {
  country: null,
  city: null,
};

export function HomeScreen() {
  const dispatch = useDispatch();
  const countries: any[] = useSelector(countriesSelector);
  const cities: any[] = useSelector(citiesSelector);
  const charts: any[] = useSelector(barChartSelector);

  const [country, setCountry] = useState<any>(null);
  const [city, setCity] = useState<any>(null);
  const [selectedDate, setDate] = useState(new Date());
  const [errors, setErrors] = useState<any>(defaultValues);

  useEffect(() => {
    dispatch(getCountriesAction());
  }, []);

  function getPollutionData(queries: any = {}) {
    const query = jsonToQueryString(queries);
    dispatch(getPollutionDataAction(query));
  }

  function onCountryChange(option: any) {
    const queries = {
      limit: 100,
      page: 1,
      sort: "asc",
      order_by: "city",
      country_id: option.value,
    };
    const query = jsonToQueryString(queries);
    dispatch(getCitiesAction(query));
    setCity(null);
    setCountry(option);
    setErrors(defaultValues);
  }

  function onCityChange(option: any) {
    setCity(option);
    setErrors(defaultValues);
  }

  function onSubmit() {
    let valid = true;
    const newErrors = { ...errors };
    if (country === null) {
      newErrors["country"] = "Please select a country";
      valid = false;
    }
    if (city === null) {
      newErrors["city"] = "Please select a city";
      valid = false;
    }
    setErrors(newErrors);
    if (valid) {
      const queries = {
        date_from: moment(selectedDate).startOf("day").toISOString(),
        date_to: moment(selectedDate).endOf("day").toISOString(),
        limit: 100,
        page: 1,
        offset: 0,
        sort: "desc",
        radius: 1000,
        order_by: "datetime",
        country_id: city!.country,
        city: city!.city,
      };
      getPollutionData(queries);
    }
  }

  return (
    <Container className="home-screen">
      <Row>
        <Col sm="12" lg="3" md="3">
          <div>
            <Form.Label>Country</Form.Label>
            <Select
              className="basic-single"
              classNamePrefix="select"
              isSearchable
              name="countries"
              placeholder="Please select country"
              options={countries}
              onChange={onCountryChange}
              value={country}
            />
            <small className="text-danger form-text">{errors["country"]}</small>
          </div>
        </Col>
        <Col sm="12" lg="3" md="3">
          <div>
            <Form.Label>Location</Form.Label>
            <Select
              className="basic-single"
              classNamePrefix="select"
              placeholder="Please select city"
              isSearchable
              name="cities"
              options={cities}
              onChange={onCityChange}
              value={city}
            />
            <small className="text-danger form-text">{errors["city"]}</small>
          </div>
        </Col>
        <Col sm="12" lg="3" md="3">
          <div>
            <Form.Label>Date</Form.Label>
            <Flatpickr
              className="form-control"
              onChange={(dates: any) => {
                console.log(dates);
                setDate(dates[0]);
              }}
              value={selectedDate}
              name="date"
              id="date"
              placeholder="Please choose a date"
              required
              options={{ dateFormat: "d-m-y", maxDate: new Date() }}
            />
          </div>
        </Col>

        <Col sm="12" lg="3" md="3" className="align-self-center">
          <Button variant="outline-primary" onClick={onSubmit}>
            Get data
          </Button>
        </Col>
      </Row>
      <Row className="mt-2">
        {charts.length > 0 && <div  className="mb-2">Pollution data of different locations</div>}
        {charts.map((chart) => {
          return (
            <Col sm="12" lg="12" md="12" className="mb-2" key={chart.values}>
              <LineChart {...chart} />
            </Col>
          );
        })}
        {charts.length === 0 && <div>Data not available</div>}
      </Row>
    </Container>
  );
}
