import { Box, Modal } from "@mui/material";
import css from "./FiltersModal.module.css";
import { useState } from "react";
import Filters from "../Filters/Filters.jsx";

export default function FiltersModal() {
  const [isOpen, setIsOpen] = useState(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (
    <div className={css.modal}>
      <button className={css.btn} type="button" onClick={() => setIsOpen(true)}>
        Add filters
      </button>
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        aria-labelledby="Add filters for campers"
      >
        <Box sx={style}>
          <h3>Add your filters:</h3>
          <Filters />
          <button
            type="button"
            className={css.btn}
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </button>
        </Box>
      </Modal>
    </div>
  );
}
