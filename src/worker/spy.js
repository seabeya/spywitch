import { user, general, input, ui } from "./helper.js";

// Check inputs:
const areInputsValid = () => {
  const { usernamesElement, channelsElement } = input.getInputElements();
  const { usernames, channels } = input.getSanitizedData(
    usernamesElement.value,
    channelsElement.value
  );
  const currentMode = general.getSearchMode();

  let isValid = true;

  switch (currentMode) {
    case "manual":
      if (general.isEmpty(channels)) {
        ui.showInputError(channelsElement);
        isValid = false;
      } else {
        ui.hideInputError(channelsElement);
      }

    // Don't need to break; here, because in manual search we need to check both of them.
    case "auto":
      if (general.isEmpty(usernames)) {
        ui.showInputError(usernamesElement);
        isValid = false;
      } else {
        ui.hideInputError(usernamesElement);
      }
      break;

    default:
      isValid = false;
      break;
  }

  return isValid;
};

// Get data from inputs:
const getInputs = () => {
  const { usernamesElement, channelsElement } = input.getInputElements();
  const { usernames, channels } = input.getSanitizedData(
    usernamesElement.value,
    channelsElement.value
  );

  return { usernames, channels };
};

// START:
const spyStart = async () => {
  if (user.isLoggedIn() === false) {
    location.href = "#setup";
    return;
  }

  if (areInputsValid() === false) return;

  ui.activateSpyButton();

  const { start } = await import("./script.js");
  start(getInputs());
};

// STOP:
const spyStop = async () => {
  const { stop } = await import("./script.js");
  stop();
};

// Commander:
export const spy = (currSpyStatus) => {
  switch (currSpyStatus) {
    case "on":
      spyStop();
      break;

    case "off":
      spyStart();
      break;

    default:
      console.error("Invalid spy status.");
      break;
  }
};
