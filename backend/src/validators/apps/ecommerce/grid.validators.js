import { GridImage } from '../../../models/apps/ecommerce/grid.models'; // Adjust the path as necessary

// Validator for URL (simple regex pattern)
function validateURL(url) {
  const urlRegex = /^(https?):\/\/[^\s$.?#].[^\s]*$/;
  return urlRegex.test(url);
}

// Validator for non-empty string
function validateNonEmptyString(str) {
  return str.trim().length > 0;
}

// Custom validator for button action
function validateButtonAction(action) {
  // This could be a URL or a JavaScript function name
  const isValid = validateURL(action) || /^[a-zA-Z_]+[a-zA-Z0-9_]*$/.test(action);
  return isValid;
}

// Adding custom validators to the GridSchema
GridImage.schema.path('leftImage.imageUrl').validate({
  validator: validateURL,
  message: props => `${props.value} is not a valid URL!`
});

GridImage.schema.path('leftImage.title').validate({
  validator: validateNonEmptyString,
  message: 'Title cannot be empty!'
});

GridImage.schema.path('leftImage.description').validate({
  validator: validateNonEmptyString,
  message: 'Description cannot be empty!'
});

GridImage.schema.path('leftImage.buttonAction').validate({
  validator: validateButtonAction,
  message: props => `${props.value} is not a valid action!`
});

// Repeat validations for other images if necessary
// Copy & paste the validation setup for rightTopImage, rightBottomLeftImage, and rightBottomRightImage
