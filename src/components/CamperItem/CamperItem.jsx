import css from "./CamperItem.module.css";

export default function CamperItem({ camper: { name, gallery } }) {
  // console.log(gallery[0].thumb);

  return (
    <>
      <img src={gallery[0].thumb} alt={`Camper: ${name}`} />
    </>
  );
}
