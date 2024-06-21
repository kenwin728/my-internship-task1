import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, useField, useFormikContext } from "formik";
import { useState, useEffect } from "react";
import * as Yup from 'yup';
import "yup-phone-lite";
import { format } from 'date-fns';
import CryptoJS from 'crypto-js';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addAccount } from "../features/account/accountSlice";


export const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label htmlFor={props.id || props.name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
      <input className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="text-red-600">{meta.error}</div>
      ) : null}
    </div>
  );
};

const MyCheckbox = ({ children, ...props }) => {
  const [field] = useField({ ...props, type: 'checkbox' });
  return (
    <div className="flex items-start">
      <div className="flex items-center h-5">
        <input className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" type="checkbox" {...field} {...props} />
      </div>
      <div className="ml-3 text-sm">
        <label htmlFor={props.id || props.name} className="font-light text-gray-500 dark:text-gray-300">{ children }</label>
      </div>
    </div>
  );
};

export const MyPasswordInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const { values } = useFormikContext();
  const [showPassword, setShowPassword] = useState(values.showPassword || false);
  useEffect(() => {
    setShowPassword(values.showPassword);
  }, [values.showPassword]);
  return (
    <div>
      <label htmlFor={props.id || props.name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
      <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" {...field} {...props} type={showPassword ? 'text' : 'password'}/>
      {meta.touched && meta.error ? (
        <div className="text-red-600">{meta.error}</div>
      ) : null}
      <MyCheckbox name="showPassword">
        Show Password
      </MyCheckbox>
    </div>
  );
};

const DatePickerField = ({ label, ...props }) => {
  const [field, meta, {setValue}] = useField(props);
  return (
    <div>
      <label htmlFor={props.id || props.name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
      <DatePicker {...field} {...props} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" selected={field.value ? new Date(field.value) : null}
      onChange={(date) => {
        const formattedDate = format(date, 'MM/dd/yyyy');
        setValue(formattedDate);
      }}
      />
      {meta.touched && meta.error ? (
        <div className="text-red-600">{meta.error}</div>
      ) : null}
    </div>
  );
};

const MySelect = ({ label, ...props }) => {
   const [field, meta] = useField(props);
   return (
     <div>
       <label htmlFor={props.id || props.name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
       <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" {...field} {...props} />
       {meta.touched && meta.error ? (
         <div className="text-red-600">{meta.error}</div>
       ) : null}
     </div>
   );
 };

const RegistrationForm = ({ changeToLoginForm }) => {
  const dispatch = useDispatch();
  const secretKey = process.env.REACT_APP_ENCRYPTION_KEY;
  const { accounts } = useSelector((store) => store.account);
  const nameArray = accounts.map(item => item.accountName);
  const mobileNumberArray = accounts.map(item => item.mobileNumber);
  const emailArray = accounts.map(item => item.email);
  const addressArray = accounts.map(item => item.address);
  const genderArray = accounts.map(item => item.gender);
  const passwordArray = accounts.map(item => CryptoJS.AES.decrypt(item.password, secretKey).toString(CryptoJS.enc.Utf8));
  const birthDateArray = accounts.map(item => item.birthDate);
  
  return (
    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Register
        </h1>
        <Formik
          initialValues={{
            name: '',
            mobileNumber: '',
            email: '',
            address: '',
            gender: '',
            password: '',
            birthDate: ''
          }}
          validationSchema={Yup.object({
            name: Yup.string().notOneOf(nameArray, 'Name already used').required('Required'),
            mobileNumber: Yup.string().notOneOf(mobileNumberArray, 'Mobile number already used').phone("PH", "not valid mobile number").required('Required'),
            email: Yup.string().notOneOf(emailArray, 'Email already used').email('Invalid email address').required('Required'),
            address: Yup.string().notOneOf(addressArray, 'Address already used').required('Required'),
            gender: Yup.string().required('Required').notOneOf(genderArray, 'Gender already used').test('valid-gender', 'Invalid gender',
              function(value) {
                return ['Male', 'Female'].includes(value);
              }),
            password: Yup.string().notOneOf(passwordArray, 'Password already used').required('Required'),
            birthDate: Yup.string().notOneOf(birthDateArray, 'Birth Date already used').required('Required').test('unique-birth-date', 'Birth date already used',
              function(value) {
                return !birthDateArray.includes(value);
              })
          })}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            values.password = CryptoJS.AES.encrypt(values.password, secretKey).toString();
            dispatch(addAccount(values));
            setSubmitting(false);
            resetForm();
            changeToLoginForm();
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4 md:space-y-6">
              <MyTextInput
                label="Name"
                name="name"
                type="text"
                placeholder="Enter name"
              />
              <MyTextInput
                label="Mobile Number"
                name="mobileNumber"
                type="text"
                placeholder="Enter mobile number"
              />
              <MyTextInput
                label="Email Address"
                name="email"
                type="email"
                placeholder="Enter email"
              />
              <MyTextInput
                label="Address"
                name="address"
                type="text"
                placeholder="Enter address"
              />
              <MySelect label="Gender" name="gender">
                <option value="">Choose gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </MySelect>
              <MyPasswordInput
                label="Password"
                name="password"
                placeholder="Enter password"
              />
              <DatePickerField
                label="Birth Date"
                name="birthDate"
                placeholderText={'Please select a date'}
              />
              <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" disabled={ isSubmitting }>Register</button>
            </Form>
          )}
      
        </Formik>
      </div>
    </div>
  );
}

export default RegistrationForm;