import * as yup from 'yup';

const datasSchema = yup.array().of(yup.object().shape({
  timeBegin: yup.number().min(0).integer().required(),
  timeEnd: yup.number().positive().integer().moreThan(yup.ref('timeBegin')).required(),
  data: yup.mixed().required(),
}))

export default datasSchema;