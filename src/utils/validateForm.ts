export const validateForm = (formState: any, markers: any) => {
  let isValid = true;
  const newFormState = { ...formState };

  if (!formState.title.trim()) {
    newFormState.errors.titleError = "Title is required";
    isValid = false;
  }

  if (!formState.shortDescription.trim()) {
    newFormState.errors.shortDescriptionError = "Short description is required";
    isValid = false;
  } else if (formState.shortDescription.trim().length > 160) {
    newFormState.errors.shortDescriptionError = "Short description is too long";
    isValid = false;
  }

  if (!formState.fullDescription.trim()) {
    newFormState.errors.fullDescriptionError = "Full description is required";
    isValid = false;
  }

  if (!markers || markers.length < 2 || !Array.isArray(markers)) {
    newFormState.errors.markersError = "At least two point are required";
    isValid = false;
  }

  return { isValid, newFormState };
};
