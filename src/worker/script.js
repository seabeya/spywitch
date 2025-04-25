import { general, socket, tw, ui } from "./helper.js";
import { TwitchServices } from "./services.js";

// To handle the ws object outside of the start function:
let ws = null;

// To indicate global status:
let isOff = false;

export const start = async (data) => {
  isOff = false;

  try {
    const { usernames, channels } = data;
    const mode = general.getSearchMode();

    const services = new TwitchServices();

    // Main data:
    let finalUsers = [];
    let finalChannels = [];

    general.stopIf(isOff);
    ui.logStatus("Starting . . .");

    switch (mode) {
      case "auto": {
        // step 1:
        general.stopIf(isOff);
        ui.logStatus("Getting users data . . .");
        const usersData = await services.getProfilesInfo(usernames);

        // step 2:
        general.stopIf(isOff);
        ui.logStatus("Getting followings . . .");
        ui.blockSpyButton();
        const followings = await services.getFollowings(usersData.ids);
        ui.logStatus(`Found ${followings.length} channel(s) . . .`);

        // step 3:
        general.stopIf(isOff);
        ui.logStatus("Picking live channels . . .");
        const liveChannels = await services.getLiveChannels(followings);
        ui.logStatus(`Found ${liveChannels.length} live channel(s) . . .`);

        finalUsers = usersData.names;
        finalChannels = liveChannels;
        break;
      }

      case "manual": {
        general.stopIf(isOff);
        ui.logStatus("Getting users data . . .");
        const usersData = await services.getProfilesInfo(usernames);

        general.stopIf(isOff);
        ui.logStatus("Getting channels data . . .");
        const channelsData = await services.getProfilesInfo(channels);

        finalUsers = usersData.names;
        finalChannels = channelsData.names;
        break;
      }

      default:
        throw new Error("Invalid search mode");
    }

    // Final data check:
    if (general.isEmpty(finalUsers) || general.isEmpty(finalChannels)) {
      throw new Error("No data found");
    }

    general.stopIf(isOff);
    ui.logStatus(
      `Working on ${finalUsers.length} user(s) and ${finalChannels.length} channel(s) . . .`
    );

    // To fix websocket idle bug:
    ui.blockSpyButton();

    // WS connect:
    ws = new WebSocket("wss://irc-ws.chat.twitch.tv:443");

    ws.onopen = async () => {
      // Authenticate user:
      socket.authenticate(ws);

      // Join to the final channels:
      await socket.join(ws, finalChannels);

      // WS check:
      if (socket.isOff(ws)) return;

      ui.logStatus('<span class="l-success">✓</span> Connected!');
      ui.logStatus(
        'To see the chat logs, go to the <a href="#watch">Watch</a> tab.'
      );

      ui.indicatorOn(finalUsers, finalChannels);
      ui.emptyWatchTabs();
      ui.fillWatchTabs(finalUsers);

      const selectedUsers = new Set(finalUsers);

      ws.onmessage = (message) => {
        const msgData = tw.parseMessage(message.data);

        if (msgData) {
          if (
            msgData.command === "PRIVMSG" &&
            selectedUsers.has(msgData.user)
          ) {
            ui.logChat(msgData);
          } else if (msgData.command === "PING") {
            ws.send("PONG");
          }
        }
      };
    };

    ws.onclose = () => {
      ui.logError("Disconnected");
      stop();
    };
  } catch (error) {
    ui.logError(error.message);
    stop();
  }
};

export const stop = () => {
  if (socket.isOff(ws) === false) {
    ws.close();
  }
  ws = null;
  isOff = true;

  ui.indicatorOff();

  ui.deactivateSpyButton();
};
