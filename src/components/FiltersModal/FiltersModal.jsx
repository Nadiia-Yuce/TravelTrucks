import { Box, Fade, IconButton, Modal } from "@mui/material";
import css from "./FiltersModal.module.css";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import FiltersForm from "../FiltersForm/FiltersForm.jsx";

export default function FiltersModal() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    document.querySelector("#root")?.removeAttribute("aria-hidden");
    setIsOpen(false);
  };

  return (
    <div className={css.container}>
      <button className={css.btn} type="button" onClick={() => setIsOpen(true)}>
        Add filters
      </button>

      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="Add filters for campers"
        closeAfterTransition
        slotProps={{
          backdrop: {
            timeout: 400,
          },
        }}
      >
        <Fade in={isOpen} timeout={200}>
          <Box className={css.modalBox} tabIndex={-1}>
            <Box className={css.wrap}>
              <IconButton
                aria-label="close-button"
                onClick={handleClose}
                className={css.close}
              >
                <CloseIcon />
              </IconButton>
              <FiltersForm onClick={handleClose} />
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
