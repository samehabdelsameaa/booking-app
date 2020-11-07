import React, { Component } from 'react';
import { Trans } from '@lingui/macro';
import { DropdownList } from "components/Forms";
import { Formik, Form, Field } from 'formik';

class CountriesLookUpForm extends Component {
    render() {
        const { isoCountries, setNationalityAndResidence, nationality, countryOfResidence } = this.props;

        return (
            <div className="t-form">
                <Formik
                    initialValues={{
                        nationality: nationality,
                        countryOfResidence: countryOfResidence
                    }}
                >
                    {({ values, errors, touched, setFieldValue, ...props }) => (
                        <Form className="form fs tf" >
                            <div className="grid grid--space-def">
                                <div className="gcell gcell--12 gcell--sm-6 gcell--ms-4">
                                    <Field
                                        name="nationality"
                                        value={values.nationality}
                                        component={NationalitySelect}
                                        placeholder="nationality"
                                        options={isoCountries}
                                        setCountry={value => setNationalityAndResidence('nationality', value)}
                                    />
                                </div>
                                <div className="gcell gcell--12 gcell--sm-6 gcell--ms-4">
                                    <Field
                                        name="countryOfResidence"
                                        value={values.countryOfResidence}
                                        component={CountriesSelect}
                                        placeholder="country of residence"
                                        options={isoCountries}
                                        setCountry={value => setNationalityAndResidence('countryOfResidence', value)}
                                    />
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        )
    }
}

export default CountriesLookUpForm;



class CountriesSelect extends Component {
    state = { _countriesOfResidence: [] };

    componentDidMount() {
        this.setState({ _countriesOfResidence: this.props.options });
    }

    render() {
        const {
            field: { name, value: selectedValue },
            form: { setFieldValue },
            options,
            setCountry
        } = this.props;
        const { _countriesOfResidence } = this.state;
        const selectedObj = options.find(a => a.twoCode == selectedValue);

        return (
            <DropdownList
                initialValue={""}
                render={({ dropdownOpen }, toggleDropdown, setSelected) => (
                    <div className={`form-group t-form__group ${dropdownOpen ? 'open' : ''}`} onClick={toggleDropdown}>
                        <span className="form-group__label fs-label"><Trans id="country_of_residence"> Country Of Residence </Trans></span>
                        <div className="form-group__wrap t-form__wrap" >
                            <input
                                type="text"
                                className="form-group__input tf-input t-form__input"
                                required
                                placeholder="Country"
                                value={selectedObj ? selectedObj.shortName : selectedValue}
                                onChange={e => {
                                    if (!dropdownOpen) toggleDropdown();

                                    let filteredCountries =
                                        options &&
                                        options.filter(a => {
                                            return (
                                                a.shortName
                                                    .toLowerCase()
                                                    .startsWith(e.target.value.toLowerCase()) ||
                                                a.twoCode
                                                    .toLowerCase()
                                                    .startsWith(e.target.value.toLowerCase())
                                            );
                                        });
                                    this.setState({ _countriesOfResidence: filteredCountries });
                                    setFieldValue(name, e.target.value);
                                }}
                            />
                            <span className="t-form__icon">
                                <svg width="20" height="28">
                                    <use href="#search"></use>
                                </svg>
                            </span>
                        </div>
                        <div className="tf-results">
                            {
                                _countriesOfResidence && _countriesOfResidence.map(({ shortName, twoCode }, i) => (
                                    <div
                                        className="tf-results__item"
                                        key={i}
                                        value={twoCode}
                                        onClick={(e) => {
                                            setSelected(e);
                                            setFieldValue(name, shortName);
                                            setCountry(twoCode)
                                        }
                                        }>
                                        <div className="tf-results__place">
                                            <span className="tf-results__icon">
                                                <svg width="17" height="17">
                                                    <use href="#location"></use>
                                                </svg>
                                            </span>
                                            <span className="tf-results__group">
                                                <span className="tf-results__code">
                                                    {shortName}
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                )}
            />
        );
    }
}


class NationalitySelect extends Component {
    state = { _nationalities: [] };

    componentDidMount() {
        this.setState({ _nationalities: this.props.options });
    }

    render() {
        const {
            field: { name, value: selectedValue },
            form: { setFieldValue },
            options,
            setCountry
        } = this.props;
        const { _nationalities } = this.state;
        const selectedObj = options.find(a => a.twoCode == selectedValue);
        return (
            <DropdownList
                initialValue={""}
                render={({ dropdownOpen }, toggleDropdown, setSelected) => (
                    <div className={`form-group t-form__group ${dropdownOpen ? 'open' : ''}`} onClick={toggleDropdown}>
                        <span className="form-group__label fs-label"><Trans id="nationality"> Nationality </Trans></span>
                        <div className="form-group__wrap t-form__wrap" >
                            <input
                                type="text"
                                className="form-group__input tf-input t-form__input"
                                required
                                placeholder="Country"
                                value={selectedObj ? selectedObj.shortName : selectedValue}
                                onChange={e => {
                                    if (!dropdownOpen) toggleDropdown();

                                    let filteredCountries =
                                        options &&
                                        options.filter(a => {
                                            return (
                                                a.shortName
                                                    .toLowerCase()
                                                    .startsWith(e.target.value.toLowerCase()) ||
                                                a.twoCode
                                                    .toLowerCase()
                                                    .startsWith(e.target.value.toLowerCase())
                                            );
                                        });
                                    this.setState({ _nationalities: filteredCountries });
                                    setFieldValue(name, e.target.value);
                                }}
                            />
                            <span className="t-form__icon">
                                <svg width="20" height="28">
                                    <use href="#search"></use>
                                </svg>
                            </span>
                        </div>
                        <div className="tf-results">
                            {
                                _nationalities && _nationalities.map(({ shortName, twoCode }, i) => (
                                    <div
                                        className="tf-results__item"
                                        key={i}
                                        value={twoCode}
                                        onClick={(e) => {
                                            setSelected(e);
                                            setFieldValue(name, shortName);
                                            setCountry(twoCode)
                                        }
                                        }>
                                        <div className="tf-results__place">
                                            <span className="tf-results__icon">
                                                <svg width="17" height="17">
                                                    <use href="#users"></use>
                                                </svg>
                                            </span>
                                            <span className="tf-results__group">
                                                <span className="tf-results__code">
                                                    {shortName}
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                )}
            />
        );
    }
}
