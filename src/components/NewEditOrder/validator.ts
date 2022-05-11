import * as yup from "yup";

const schema = yup.object().shape({
    crust: yup.string().required('Campo obrigatório'),
    flavor: yup.string().required(),
    size: yup.string().required(),
    tableNo: yup.number()
    .typeError('Precisa ser um número')
    .required('Campo obrigatório')
    .min(1, 'Menor mesa é 1')
    .max(28, 'Maior mesa é 28')
});

export default schema;