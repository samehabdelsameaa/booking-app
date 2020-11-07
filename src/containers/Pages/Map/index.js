import React from "react";
import Map from "components/Map";
import { RadiobuttonGroup, CheckList, RatingCheckList } from "components/Forms";
import { Formik, Form, Field } from "formik";

export default class TestMap extends React.PureComponent {
  render() {
    return (
      // <Map
      //   city="Mekkah"
      //   lat={21.4233733}
      //   long={39.821831}
      //   zoom={15.5}
      //   landMarks={[
      //     {
      //       icon: "./assets/images/markers/marker.svg",
      //       id: 1,
      //       name: "Hilton Suites Makkah",
      //       price: 52,
      //       long: 39.824104,
      //       lat: 21.418344
      //     },
      //     {
      //       icon: "./assets/images/markers/marker.svg",
      //       id: 2,
      //       name: "Land Premium Hotel",
      //       price: 52,
      //       long: 39.8079991,
      //       lat: 21.430954
      //     }
      //   ]}
      // />
      <Formik
        initialValues={{ stay_time: "", facilities: "", comfort_level: "" }}
        onSubmit={async (values, actions) => {
          //todo:
          actions.setSubmitting(false);
        }}
        render={({ values, isSubmitting, setFieldValue, errors }) => (
          <Form noValidate className="form form-search fs">
            <Field
              title="Stay Time"
              name="stay_time"
              options={[
                { label: "1 night", value: "1_night" },
                { label: "3 night", value: "3_night" }
              ]}
              component={RadiobuttonGroup}
            />

            <Field
              title="Facilities"
              name="facilities"
              options={[
                { label: "Kitchen", value: "Kitchen" },
                { label: "TV", value: "tv" }
              ]}
              component={CheckList}
            />

            <Field
              title="Comfort Level"
              name="comfort_level"
              options={[
                { label: "Kitchen", value: 5 },
                { label: "TV", value: 3 },
                { label: "TV", value: 2 }
              ]}
              component={RatingCheckList}
            />
          </Form>
        )}
      />
    );
  }
}
