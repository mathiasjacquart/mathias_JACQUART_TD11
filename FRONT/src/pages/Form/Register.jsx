import  { useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signup } from "../../apis/users";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal/Modal";

export default function Register() {
  const [feedback, setFeedback] = useState(null);
  const [status, setStatus] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [gender, setGender] = useState('');

  // schéma de validation
  const schema = yup.object({
    username: yup
      .string()
      .required("Le champ est obligatoire"),
    password: yup
      .string()
      .required("Le mot de passe est obligatoire")
      .min(5, "trop court"),
    confirmPassword: yup
      .string()
      .required("Vous devez confirmer votre mot de passe")
      .oneOf([yup.ref("password"), ""], "Les mots ne correspondent pas"),
    gender: yup
      .string()
      .required("Vous devez sélectionner votre genre"),
  });

  // valeurs par défaut
  const defaultValues = {
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  };

  // méthodes utilisées par useForm et options : resolver fait le lien entre le formulaire et le schéma
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

  // fonction de validation de formulaire
  async function submit(values) {
    handleResetFeedback();
    console.log(values);
    try {
      const response = await signup(values);
      console.log(response);
      setFeedback(response.message);
      setStatus(response.status);
      setShowModal(true);
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
      navigate("/login");
      reset(defaultValues);
    }
  }

  return (
    <div className="d-flex f-center container">
      <form onSubmit={handleSubmit(submit)}>
        <div className="d-flex flex-column mb-10">
          <label htmlFor="username" className="mb-10">
            Pseudo
          </label>
          <input
            {...register("username")}
            type="text"
            id="username"
            className="mb-10"
          />
          {errors.username && (
            <p className="text-error">{errors.username.message}</p>
          )}
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
        <div className="d-flex flex-column mb-10">
          <label htmlFor="confirmPassword" className="mb-10">
            Confirmation de mot de passe
          </label>
          <input
            {...register("confirmPassword")}
            type="password"
            id="confirmPassword"
            className="mb-10"
          />
          {errors.confirmPassword && (
            <p className="text-error">{errors.confirmPassword.message}</p>
          )}
        </div>
        <div className="d-flex flex-column mb-10">
          <div className="d-flex flex-row mb-10">
            <label htmlFor="female" className="mr-10">
              Femme
            </label>
            <input
              {...register("gender")}
              type="radio"
              id="female"
              value="Femme"
              checked={gender === "Femme"}
              onChange={(e) => setGender(e.target.value)}
              className="mr-15"
            />
            <label htmlFor="male" className="mr-10">
              Homme
            </label>
            <input
              {...register("gender")}
              type="radio"
              id="male"
              value="Homme"
              checked={gender === "Homme"}
              onChange={(e) => setGender(e.target.value)}
            />
          </div>
          {errors.gender && (
            <p className="text-error">{errors.gender.message}</p>
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
