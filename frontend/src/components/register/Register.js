import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { signup } from "../../auth/auth";
import "../login/login.css";

function Register() {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmission = (values) => {
    signup(values)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  };

  const SignUpSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(5, "Min 5 character long")
      .max(15, "should not exceed 15 characters")
      .required("Required"),
    lastName: Yup.string()
      .min(5, "Min 5 character long")
      .max(15, "should not exceed 15 characters")
      .required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .min(8, "Password is too short - should be 8 chars minimum.")
      .required("Required"),
    confirmPassword: Yup.string()
      .label("confirm password")
      .required()
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  return (
    <div>
      <div>
        <main class='sign-up'>
          <div class='sign-up__container'>
            <div class='sign-up__image'>
              <img
                src={require("../../assests/login-1.jpg")}
                alt='login'
                className='login-image'
              />
            </div>
            <div class='sign-up__content'>
              <header class='sign-up__header'>
                <h1 class='sign-up__title'>Sign up</h1>
                <p class='sign-up__descr'>
                  Welcome, Please Sign up your account.
                </p>
              </header>
              <div class='sign-up__form form'>
                <Formik
                  initialValues={{
                    firstName: "",
                    lastNameame: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                  }}
                  validationSchema={SignUpSchema}
                  onSubmit={(values) => {
                    handleSubmission(values);
                  }}
                >
                  {({ errors, touched }) => (
                    <Form method='post'>
                      <div class='form__row form__row--two'>
                        <div class='input form__inline-input'>
                          <div class='input__container'>
                            <Field
                              name='firstName'
                              className='input__field'
                              id='first-name'
                              placeholder='First Name'
                            />
                            <label class='input__label' for='first-name'>
                              First Name
                            </label>
                            {errors.firstName && touched.firstName ? (
                              <span className='error-sign'>
                                {errors.firstName}
                              </span>
                            ) : null}
                          </div>
                        </div>
                        <div class='input form__inline-input'>
                          <div class='input__container'>
                            <Field
                              name='lastName'
                              className='input__field'
                              id='last-name'
                              placeholder='Last Name'
                            />
                            <label class='input__label' for='last-name'>
                              Last Name
                            </label>
                            {errors.lastName && touched.lastName ? (
                              <span className='error-sign'>
                                {errors.lastName}
                              </span>
                            ) : null}
                          </div>
                        </div>
                      </div>
                      <div class='form__row'>
                        <div class='input'>
                          <div class='input__container'>
                            <Field
                              name='email'
                              className='input__field'
                              id='email'
                              placeholder='Email'
                            />
                            <label class='input__label' for='email'>
                              Email
                            </label>
                            {errors.email && touched.email ? (
                              <span className='error-sign'>{errors.email}</span>
                            ) : null}
                          </div>
                        </div>
                      </div>
                      <div class='form__row'>
                        <div class='input'>
                          <div class='input__container'>
                            <Field
                              name='password'
                              className='input__field'
                              id='password'
                              placeholder='Password'
                              type='password'
                            />
                            <label class='input__label' for='password'>
                              Password
                            </label>
                            {errors.password && touched.password ? (
                              <span className='error-sign'>
                                {errors.password}
                              </span>
                            ) : null}
                          </div>
                        </div>
                      </div>
                      <div class='form__row'>
                        <div class='input'>
                          <div class='input__container'>
                            <Field
                              name='confirmPassword'
                              className='input__field'
                              id='confirm-password'
                              placeholder='Confirm Password'
                            />
                            <label class='input__label' for='confirm-password'>
                              Confirm password
                            </label>
                            {errors.confirmPassword &&
                            touched.confirmPassword ? (
                              <span className='error-sign'>
                                {errors.confirmPassword}
                              </span>
                            ) : null}
                          </div>
                        </div>
                      </div>
                      <div class='form__row'>
                        <div class='input-checkbox'>
                          <div class='input-checkbox__container'>
                            <input
                              checked=''
                              class='input-checkbox__field'
                              id='agree'
                              required=''
                              tabindex='0'
                              type='checkbox'
                            />
                            <span class='input-checkbox__square'></span>
                            <label class='input-checkbox__label' for='agree'>
                              I agree with terms and conditions
                            </label>
                          </div>
                        </div>
                      </div>
                      <div class='form__row'>
                        <div class='component component--primary form__button'>
                          <button
                            class='btn btn--regular'
                            disabled=''
                            id='sign-up-button'
                            tabindex='0'
                            type='submit'
                          >
                            Sign up
                          </button>
                        </div>
                      </div>
                      <div class='form__row sign-up__sign'>
                        Already have an account? &nbsp;
                        <Link to='/login' className='link'>
                          Login.
                        </Link>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Register;
