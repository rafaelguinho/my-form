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
import axios from "axios";

const NewEditOrder = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const formRef = useRef<FormHandles>(null);

  useEffect(() => {
    if (!orderId) return;

    fetch(`http://localhost:5006/api/orders/${orderId}`)
      .then((response) => response.json())
      .then((data) => {
        formRef.current?.setFieldValue("crust", data.crust);
        formRef.current?.setFieldValue("flavor", data.flavor);
        formRef.current?.setFieldValue("size", data.size);
        formRef.current?.setFieldValue("tableNo", data.tableNo);
        formRef.current?.setFieldValue("id", data.id);

        console.log("Order", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [orderId]);

  const submit = async (data: Order) => {
    try {
      await schema.validate(data, {
        abortEarly: false,
      });
    } catch (error) {
      console.log(error);

      if (error instanceof yup.ValidationError) {
        error.inner.forEach((error) => {
          if (error.path) {
            formRef.current?.setFieldError(error.path, error.message);
          }
        });
      }

      return;
    }

    if (!data.id) {
      const newData = { ...data, id: 0 };

      try {
        await axios.post("http://localhost:5006/api/orders", newData);
        navigate("/");
      } catch (error) {
        console.error("Error:", error);
      }
      
    } else {
      console.log("Atualização");

      axios
        .put(`http://localhost:5006/api/orders/${data.id}`, data)
        .then(() => {
          navigate("/");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
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
