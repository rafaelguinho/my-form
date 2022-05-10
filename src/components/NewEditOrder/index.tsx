import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Order } from "../../server";
import Input from "../Input";
import Radio from "../Radio";
import Select from "../Select";
import schema from "./validator";
import * as yup from "yup";

const NewEditOrder = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const formRef = useRef<FormHandles>(null);

  useEffect(() => {
    if (!orderId) return;

    fetch(`http://localhost:5006/api/orders/${orderId}`)
      .then((response) => response.json())
      .then((data) => {

       /**TODO: CARREGAR OS DADOS NO FORMULÁRIO */
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [orderId]);

  const submit = async (data: Order) => {
    /**TODO: CHAMAR A VALIDAÇÃO E PASSAR OS ERROS PARA O FORM */

    if(!data.id){

      const newData = {...data, id: 0};
      fetch("http://localhost:5006/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      })
        .then(() => {
          navigate("/");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }else{
      console.log('Atualização')
    }

    
  };

  const radioOptions = [
    { id: "NORMAL", value: "NORMAL", label: "Normal" },
    { id: "THIN", value: "THIN", label: "Thin" },
  ];

  return (
    <Form ref={formRef} onSubmit={submit}>
      <Input type="hidden" name="id" />

      <h2>New order</h2>
      <Radio name="crust" label="Choose a crust" options={radioOptions} />
      <div>
        <label htmlFor="flavor">Flavor</label>
        <Input type="text" name="flavor" autoComplete="new-password" />
      </div>

      <Select label="Choose a size:" name="size">
        <option value=""></option>
        <option value="S"></option>
        <option value="M">Medium (6 pieces)</option>
        <option value="L">Larger (8 pieces)</option>
        <option value="XL">Extra-large (10 pieces)</option>
      </Select>

      <div>
        <label htmlFor="tableNo">Table No</label>
        <Input type="number" name="tableNo" autoComplete="new-password" />
      </div>

      <div className="button-container">
        <button type="submit">Save</button>
      </div>
    </Form>
  );
};

export default NewEditOrder;
