import * as yup from 'yup';

export const createProfileSchema = yup
  .object({
    email: yup.string().email('Email is wrong').required('Email is required'),
    password: yup
      .string()
      .min(6, 'Password should be more 6 characters')
      .max(40, 'Password should be less 40 characters')
      .required('Password shouldn`t be empty'),
    username: yup
      .string()
      .min(3, 'Username should be more 3 characters')
      .max(20, 'Username should be less 20 characters')
      .required('Username is required'),
    repeat: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords must match')
      .required('Password shouldn`t be empty'),
  })
  .required();

export const loginProfileSchema = yup
  .object({
    email: yup.string().email('Email is wrong').required('Email is required'),
    password: yup
      .string()
      .min(6, 'Password should be more 6 characters')
      .max(40, 'Password should be less 40 characters')
      .required('Password shouldn`t be empty'),
  })
  .required();

export const editProfileSchema = yup
  .object({
    email: yup.string().email('Email is wrong').required('Email is required'),
    password: yup
      .string()
      .min(6, 'Password should be more 6 characters')
      .max(40, 'Password should be less 40 characters')
      .required('Password is required'),
    username: yup
      .string()
      .min(3, 'Username should be more 3 characters')
      .max(20, 'Username should be less 20 characters')
      .required('Username is required'),
    image: yup.string().required('Image should be less 20 characters'),
  })
  .required();

export const createPostSchema = yup
  .object({
    title: yup.string().required('This field should`t be empty'),
    description: yup.string().required('This field should`t be empty'),
    body: yup.string().required('This field should`t be empty'),
    tagList: yup.string().required('This field should`t be empty'),
  })
  .required();

export const editPostSchema = yup
  .object({
    title: yup.string().required('This field should`t be empty'),
    description: yup.string().required('This field should`t be empty'),
    body: yup.string().required('This field should`t be empty'),
    tagList: yup.string().required('This field should`t be empty'),
  })
  .required();
