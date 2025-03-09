import { Box, Fade, IconButton, Modal } from "@mui/material";
import css from "./FiltersModal.module.css";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import FiltersForm from "../FiltersForm/FiltersForm.jsx";

export default function FiltersModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={css.container}>
      <button className={css.btn} type="button" onClick={() => setIsOpen(true)}>
        Add filters
      </button>

      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        aria-labelledby="Add filters for campers"
        closeAfterTransition
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={isOpen} timeout={300}>
          <Box className={css.modalBox}>
            <Box className={css.wrap}>
              <IconButton
                aria-label="close-button"
                onClick={() => setIsOpen(false)}
                className={css.close}
              >
                <CloseIcon />
              </IconButton>
              <FiltersForm onClick={() => setIsOpen(false)} />
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
