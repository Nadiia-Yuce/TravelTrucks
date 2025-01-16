import { createSelector } from "@reduxjs/toolkit";
import { selectEquipment, selectLocation } from "../filters/selectors.js";

export const selectCampers = (state) => state.campers.items;
export const selectCurrentCamper = (state) => state.campers.selected;
export const selectIsLoading = (state) => state.campers.isLoading;
export const selectError = (state) => state.campers.error;

//Фільтрація по локації
const matchesLocationFilter = (camperLocation, filterLocation) => {
  if (!filterLocation) {
    return true;
  }
  return camperLocation.toLowerCase().includes(filterLocation.toLowerCase());
  //includes() повертає буль (чи умова виконана), який далі буде викор. для умови в filter() в складному селекторі
};

//Фільтрація по еквіпментам
const matchesEquipmentFilter = (camper, equipment) => {
  return Object.keys(equipment).every((key) => {
    const filterValue = equipment[key];
    const camperValue = camper[key];

    if (typeof filterValue === "boolean") {
      return !filterValue || filterValue === camperValue;
    } else if (typeof filterValue === "string") {
      return filterValue === "" || filterValue === camperValue;
    }
    return true;
  });
  //every() теж вертає буль для подальшого викор. в filter()
};

//!Перевіряється
export const selectFilteredCampers = createSelector(
  [selectCampers, selectLocation, selectEquipment],
  (campers, location, equipment) => {
    const filteredCampers = campers.filter((camper) => {
      const matchesLocation = matchesLocationFilter(camper.location, location);
      const matchesEquipment = matchesEquipmentFilter(camper, equipment);
      //якщо обидва фільри задані
      if (location) {
        return matchesLocation && matchesEquipment;
      }
      //якщо хоча б один заданий
      return matchesEquipment;
    });
    return filteredCampers;
  }
);
