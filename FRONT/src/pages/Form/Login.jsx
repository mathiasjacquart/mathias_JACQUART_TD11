import  { useState, useContext } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signin } from "../../apis/users";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal/Modal";
import { UserContext } from "../../context/UserContext";

export default function Login() {
  const [feedback, setFeedback] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { setConnectedUser } = useContext(UserContext);

  // schéma de validation
  const schema = yup.object({
    username: yup.string().required("Le champ est obligatoire"),
    password: yup.string().required("Le mot de passe est obligatoire"),
  });

  //   valeurs par défaut
  const defaultValues = {
    username: "",
    password: "",
  };

  //   méthodes utilisées par useForm et options : resolver fait le lien entre le formulaire et le schéma
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  //   fonction de validation de formulaire
  async function submit(values) {
    handleResetFeedback();
    console.log(values);
    try {
      const response = await signin(values);
      console.log(response);
      if ( !response.message) {
        localStorage.setItem("user", JSON.stringify(response));
        setConnectedUser(response.user);
        setFeedback("Connexion réussie");
        reset(defaultValues);
        setShowModal(true);
      } else {
        setFeedback(response.message);
        setShowModal(true);
      }
    } catch (error) {
      console.error(error);
    }
  }

  function handleResetFeedback() {
    setFeedback(null);
  }

  function handleCloseModal() {
    setShowModal(false);
    if (status === 200) {
      navigate("/");
    }
  }

  return (
    <div className="f-center container">
      <form onSubmit={handleSubmit(submit)}>
        <div className="d-flex flex-column mb-10">
          <label htmlFor="username" className="mb-10">
            Pseudo
          </label>
          <input
            {...register("username")}
            type="username"
            id="username"
            className="mb-10"
          />
          {errors.username && <p className="text-error">{errors.username.message}</p>}
        </div>

        <div className="d-flex flex-column mb-10">
          <label htmlFor="password" className="mb-10">
            Mot de passe
          </label>
          <input
            {...register("password")}
            type="password"
            id="password"
            className="mb-10"
          />
          {errors.password && (
            <p className="text-error">{errors.password.message}</p>
          )}
        </div>
          <div className="d-flex justify-content-center">
            <button className="btn btn-primary">Submit</button>
          </div>

      </form>
      {showModal && (
        <Modal onClose={handleCloseModal} feedback={feedback}>

        </Modal>
      )}
    </div>
  );
}
