// General
export const general = {
  // Process breaker (to stop the process in any phase):
  stopIf: (isOff) => {
    if (isOff) throw new Error("Process stopped");
  },

  getSearchMode: () => {
    const isManual = document.getElementById("manual").checked;
    return isManual ? "manual" : "auto";
  },

  isEmpty: (data) => {
    return data.length === 0;
  },

  getFromStorage: (key) => {
    return localStorage.getItem(key);
  },

  chunkArray: (array, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  },

  sleep: (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  },

  getTime: (withSeconds = true) => {
    const time = new Date();

    const hour = time.getHours().toString().padStart(2, "0");
    const minute = time.getMinutes().toString().padStart(2, "0");

    if (withSeconds) {
      const seconds = time.getSeconds().toString().padStart(2, "0");
      return `${hour}:${minute}:${seconds}`;
    }
    return `${hour}:${minute}`;
  },
};

// User:
export const user = {
  isLoggedIn: () => {
    const username = general.getFromStorage("sUSR");
    const clientId = general.getFromStorage("sCID");
    const token = general.getFromStorage("sTKN");

    return !!username && !!clientId && !!token;
  },
};

// Input
export const input = {
  getInputElements: () => {
    const usernamesElement = document.getElementById("usernames");
    const channelsElement = document.getElementById("channels");
    return { usernamesElement, channelsElement };
  },

  getSanitizedData: (usernames, channels) => {
    const sanitize = (inputData) => {
      const values = inputData
        .toLowerCase()
        .trim()
        .split(/[\s,]+/)
        .filter((value) => /^[a-z0-9][a-z0-9_]*$/.test(value));

      return [...new Set(values)];
    };

    return {
      usernames: sanitize(usernames),
      channels: sanitize(channels),
    };
  },
};

// User Interface
export const ui = {
  elements: {
    statusLogs: document.getElementById("status-logs"),
    spyBtn: document.getElementById("spy-btn"),
  },

  showInputError: (inputElement) => {
    inputElement.classList.add("error");
  },

  hideInputError: (inputElement) => {
    inputElement.classList.remove("error");
  },

  activateSpyButton: () => {
    ui.elements.spyBtn.setAttribute("status", "on");
    ui.elements.spyBtn.innerText = "Stop";
  },

  deactivateSpyButton: () => {
    ui.elements.spyBtn.setAttribute("status", "off");
    ui.elements.spyBtn.innerText = "Start";
  },

  blockSpyButton: () => {
    ui.elements.spyBtn.disabled = true;
  },

  unblockSpyButton: () => {
    ui.elements.spyBtn.disabled = false;
  },

  focusScroll: (parentElement) => {
    const isScrolledToBottom =
      parentElement.scrollHeight - parentElement.clientHeight <=
      parentElement.scrollTop + 100;
    if (isScrolledToBottom) {
      parentElement.scrollTop =
        parentElement.scrollHeight - parentElement.clientHeight;
    }
  },

  _createLog: (type, targetArea, message, channel = "") => {
    const li = document.createElement("li");

    switch (type) {
      case "chat":
        li.innerHTML = `<span class="l-time">${general.getTime(
          false
        )}</span><b> > </b><span class="l-channel">${channel}</span><b> / </b>`;

        const safeMessage = document.createElement("span");
        safeMessage.classList.add("l-message");
        safeMessage.innerText = message;

        li.append(safeMessage);
        break;
      case "status":
        li.innerHTML = `<span class="l-time">${general.getTime()}</span><b> > </b><span class="l-message">${message}</span>`;
        break;
      case "error":
        li.innerHTML = `<span class="l-time">${general.getTime()}</span><b> > </b><span class="l-error"> ✕ </span><span class="l-message">${message}.</span>`;
        break;
    }
    targetArea.append(li);
    ui.focusScroll(targetArea);
  },

  logStatus: (status) => {
    ui._createLog("status", ui.elements.statusLogs, status);
  },

  logError: (error) => {
    ui._createLog("error", ui.elements.statusLogs, error);
  },

  logChat: (msg) => {
    const { channel, user, message } = msg;

    // Alert:
    const tabBtn = document.getElementById("u_" + user);
    if (tabBtn.classList.contains("active") === false) {
      tabBtn.classList.add("alert");
    }

    // Chat tab:
    const tab = document.getElementById("c_" + user);

    ui._createLog("chat", tab, message, channel);
  },

  indicatorOn: (users, channels) => {
    const indicator = document.getElementById("i-status");
    indicator.classList.add("active");
    indicator.innerText = "Active";
    document.getElementById("i-users").innerText = users.length;
    document.getElementById("i-channels").innerText = channels.length;
  },

  indicatorOff: () => {
    const indicator = document.getElementById("i-status");
    indicator.classList.remove("active");
    indicator.innerText = "Not Activated";
    document.getElementById("i-users").innerText = 0;
    document.getElementById("i-channels").innerText = 0;
  },

  fillWatchTabs: (users) => {
    // tabs:
    document.getElementById("s-users").classList.add("active");
    const usersTab = document.getElementById("users");

    // messages:
    document.getElementById("s-chat").classList.add("active");
    const chatsTab = document.getElementById("chats");

    users.forEach((user) => {
      // tabs:
      const userTab = document.createElement("span");
      userTab.setAttribute("id", "u_" + user);
      userTab.innerText = user;
      usersTab.append(userTab);

      // messages:
      const chatTab = document.createElement("ul");
      chatTab.setAttribute("id", "c_" + user);
      chatsTab.append(chatTab);
    });
  },

  emptyWatchTabs: () => {
    document.getElementById("s-users").classList.remove("active");
    document.getElementById("users").innerText = "";

    document.getElementById("s-chat").classList.remove("active");
    document.getElementById("chats").innerText = "";
    document.getElementById("from").innerText = "";
  },
};

// WebSocket
export const socket = {
  isOff: (ws) => {
    return ws ? ws.readyState !== WebSocket.OPEN : true;
  },

  authenticate: (ws) => {
    if (socket.isOff(ws)) return;

    ws.send(`PASS oauth:${general.getFromStorage("sTKN")}`);
    ws.send(`NICK ${general.getFromStorage("sUSR")}`);
  },

  _joinListChunkMaker: (channels) => {
    const chunkSize = 15;
    return channels
      .reduce((chunks, channel, index) => {
        const chunkIndex = Math.floor(index / chunkSize);
        chunks[chunkIndex] = [...(chunks[chunkIndex] || []), "#" + channel];
        return chunks;
      }, [])
      .map((chunk) => chunk.join(","));
  },

  _deChunkJoinListToLog: (chunk) => {
    return chunk
      .substring(1)
      .split(",#")
      .map((channel) => {
        return `<span class="l-channel">${channel}</span>`;
      })
      .join(", ");
  },

  join: async (ws, channels = []) => {
    const channelChunks = socket._joinListChunkMaker(channels);

    const len = channelChunks.length;
    for (let i = 0; i < len; i++) {
      if (socket.isOff(ws)) return;

      ws.send(`JOIN ${channelChunks[i]}`);
      ui.logStatus(socket._deChunkJoinListToLog(channelChunks[i]));
      ui.unblockSpyButton();

      // API join rate limit bypass:
      if (len > 1 && i !== len - 1) {
        await general.sleep(10000);
      }
    }
  },
};

// Twitch
export const tw = {
  apiRequest: async (url, query) => {
    const oauth = general.getFromStorage("sTKN");
    const clientId = general.getFromStorage("sCID");

    const headers = {
      Accept: "application/vnd.twitchtv.v5+json",
      Authorization: `Bearer ${oauth}`,
      "Client-ID": clientId,
    };

    let response = await fetch(`${url}?${query}`, { headers });
    response = await response.json();

    // Checking existing of data object (if data object exists that means response is successful)
    if (response.data) return response;

    // Default API errors:
    throw Error(`${response.error} - ${response.message}`);
  },

  buildQuery: (usernames = [], queryString) => {
    const params = new URLSearchParams();
    usernames.forEach((username) => params.append(queryString, username));
    return params.toString();
  },

  parseMessage: (rawMessage) => {
    const parts = rawMessage.split(" ");

    if (parts[0] === "PING") {
      return {
        command: "PING",
      };
    } else if (parts[1] !== "PRIVMSG") {
      return null;
    }

    const channel = parts[2].substring(1);
    const user = parts[0].slice(1).split("!")[0];

    let message = "";
    if (parts[3] === ":") {
      message = parts.slice(4).join(" ").slice(1);
    } else {
      message = parts.slice(3).join(" ").slice(1);
    }
    message = message.trim();

    return { command: "PRIVMSG", channel, user, message };
  },
};
