import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import { useState } from "react";
import * as Yup from 'yup';
import CryptoJS from 'crypto-js';
import { logIn } from "../features/login/loginSlice";
import { MyTextInput, MyPasswordInput } from "./registrationForm";

const initialState = {
    emailOrMobileNumber: "",
    password: ""
  };

const LoginForm = () => {
    const dispatch = useDispatch();
    const secretKey = process.env.REACT_APP_ENCRYPTION_KEY;
    const { accounts } = useSelector((store) => store.account);
    const [showError, setShowError] = useState(false);
    
    return (
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Login
                </h1>
                <Formik
                    initialValues={ initialState }
                    validationSchema={Yup.object({
                        emailOrMobileNumber: Yup.string().required('Required'),
                        password: Yup.string().required('Required')
                    })}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        let result = accounts.find(account => account.email === values.emailOrMobileNumber);
                        let isMatching = false;
                        if (!result){
                            result = accounts.find(account => account.mobileNumber === values.emailOrMobileNumber);
                        }
                        if (result){
                            const decryptedPassword = CryptoJS.AES.decrypt(result.password, secretKey).toString(CryptoJS.enc.Utf8);
                            isMatching = (values.password === decryptedPassword);
                        }
                        setSubmitting(false);
                        if (isMatching){
                            setShowError(false);
                            resetForm({
                                values: {
                                    ...initialState
                                }
                            });
                            dispatch(logIn(result));
                        }
                        else{
                            resetForm({
                                values: {
                                    ...values,
                                    password: ''
                                }
                            });
                            setShowError(true);
                        }
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form className="space-y-4 md:space-y-6">
                            <MyTextInput
                                label="Email/Mobile Number"
                                name="emailOrMobileNumber"
                                type="text"
                                placeholder="Enter email/mobile number"
                            />
                            <MyPasswordInput
                                label="Password"
                                name="password"
                                placeholder="Enter password"
                            />
                            {showError && (
                                <div className="text-red-600">Email/mobile or password didn't Match!</div>
                            )}
                            <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" disabled={ isSubmitting }>Login</button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
    }

export default LoginForm;