(() => {
  // Required parameters for the Twitch Auth process
  const TwitchAuth = {
    clientId: "[REDACTED]",
    redirectUri: "https://sh2aliyev.github.io/spywitch", // to run locally change to: http://localhost
  };

  // Create URL for Twitch authorization and append required parameters
  const authorizeUrl = new URL("https://id.twitch.tv/oauth2/authorize");
  authorizeUrl.searchParams.append("client_id", TwitchAuth.clientId);
  authorizeUrl.searchParams.append("redirect_uri", TwitchAuth.redirectUri);
  authorizeUrl.searchParams.append("response_type", "token");
  authorizeUrl.searchParams.append("scope", "chat:read");

  const openTwitchAuth = () => {
    window.open(authorizeUrl.toString(), "TwitchAuth");
  };

  const saveDataToStorage = (name, data) => {
    localStorage.setItem(name, data);
  };

  const getTokenFromStorage = () => {
    return localStorage.getItem("sTKN");
  };

  const updateUIForLoggedInUser = (username) => {
    document.getElementById("username").innerText = username;
    document.getElementById("s-login").classList.remove("active");
    document.getElementById("s-account").classList.add("active");
  };

  const updateUIForLoggedOutUser = () => {
    document.getElementById("s-account").classList.remove("active");
    document.getElementById("username").innerText = "";
    document.getElementById("s-login").classList.add("active");
  };

  const validateTokenAndGetData = async (token) => {
    const response = await fetch("https://id.twitch.tv/oauth2/validate", {
      headers: {
        Authorization: `OAuth ${token}`,
      },
    });

    const data = await response.json();
    return data.client_id === TwitchAuth.clientId ? data : false;
  };

  const authorizationHandler = () => {
    // Is this tab opened by JS?: This handler is designed to work only when a new tab is opened by JS. Otherwise it does nothing.
    if (window.opener) {
      // Grab token from the uri:
      const token = window.location.hash.split("&")[0].split("=")[1];
      if (token) {
        saveDataToStorage("sTKN", token);
        // Run sessionHandler function to check clientID and update UI if needed:
        window.opener.sessionHandler();
      } else {
        // If there is no token (e.g., user denied access):
        window.opener.console.error("Authorization failed.");
      }
      // Close current tab: (this is that newly created tab)
      window.close();
    }
    // Remove "load" listener:
    window.removeEventListener("load", authorizationHandler);
  };

  // "window.sessionHandler" because we need it in the global scope to be used inside the authorizationHandler function, as shown above.
  window.sessionHandler = async () => {
    const token = getTokenFromStorage();
    if (token) {
      try {
        const data = await validateTokenAndGetData(token);
        if (data) {
          saveDataToStorage("sUSR", data.login);
          saveDataToStorage("sCID", data.client_id);
          updateUIForLoggedInUser(data.login);
        } else {
          revokeAccess();
        }
      } catch (error) {
        console.error("Something went wrong.");
      }
    }
    window.removeEventListener("load", sessionHandler);
  };

  const revokeAccess = () => {
    updateUIForLoggedOutUser();
    localStorage.clear();
    location.reload();
  };

  // -----------------------------------

  // Click "Log in with Twitch"
  document.getElementById("login").addEventListener("click", openTwitchAuth);

  // Fire on page load:
  window.addEventListener("load", authorizationHandler);

  // Check session on page load:
  window.addEventListener("load", sessionHandler);

  // Click "Revoke Access":
  document.getElementById("revoke").addEventListener("click", revokeAccess);
})();
