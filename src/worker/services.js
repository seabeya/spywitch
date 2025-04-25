import { tw, general, ui } from "./helper.js";

export class TwitchServices {
  /*
   * Internal Helpers
   */
  async #subProfilesInfo(usernames = []) {
    const query = tw.buildQuery(usernames, "login");
    const response = await tw.apiRequest(
      "https://api.twitch.tv/helix/users",
      query
    );

    const profilesData = response.data;

    if (general.isEmpty(profilesData)) {
      return null;
    }

    // I need these data separate. ids for next actions, names for UI.
    const ids = profilesData.map((profile) => profile.id);
    const names = profilesData.map((profile) => profile.login);

    return { ids, names };
  }

  async #followingsPerUser(id) {
    const result = [];

    let active = true;
    let paginationKey = "";
    // Api has 100 items return limit.
    // We are getting the full data chunk by chunk size of 100:
    do {
      const response = await tw.apiRequest(
        "https://api.twitch.tv/helix/users/follows",
        `from_id=${id}&first=100&after=${paginationKey}`
      );
      const followingsDataChunk = response.data;

      if (general.isEmpty(followingsDataChunk)) {
        return null;
      }

      // Save current chunk of received data:
      followingsDataChunk.forEach((channel) => {
        if (channel.to_login) result.push(channel.to_login);
      });

      // Is there any more data?
      if (response?.pagination?.cursor) {
        paginationKey = response.pagination.cursor;
      } else {
        active = false;
      }
    } while (active);

    return result;
  }

  async #subLiveChannels(channels = []) {
    const result = [];

    const query = tw.buildQuery(channels, "user_login");
    const response = await tw.apiRequest(
      "https://api.twitch.tv/helix/streams",
      query
    );

    const liveChannelsData = response.data;

    if (general.isEmpty(liveChannelsData)) {
      return null;
    }

    // Saving:
    liveChannelsData.forEach((channel) => {
      if (channel.user_login) result.push(channel.user_login);
    });

    return result;
  }

  /*
   * Main Services
   */
  async getProfilesInfo(usernames = []) {
    // Set user input limit:
    if (usernames.length > 500) {
      throw new Error("Input limit exceeded. The maximum limit is 500");
    }

    let ids = [];
    let names = [];

    // Chunk the user input size of 100:
    const usernameChunks = general.chunkArray(usernames, 100);

    // Load data chunk by chunk:
    for (let i = 0; i < usernameChunks.length; i++) {
      const subResult = await this.#subProfilesInfo(usernameChunks[i]);

      if (subResult === null) continue;

      ids = ids.concat(subResult.ids);
      names = names.concat(subResult.names);
    }

    if (general.isEmpty(ids) || general.isEmpty(names)) {
      throw new Error("No data found");
    }

    return { ids, names };
  }

  async getFollowings(ids = []) {
    let channels = [];

    // Load one by one:
    for (let i = 0; i < ids.length; i++) {
      const subResult = await this.#followingsPerUser(ids[i]);

      if (subResult === null) continue;

      channels = channels.concat(subResult);
    }

    if (general.isEmpty(channels)) {
      throw new Error("No data found");
    }

    ui.unblockSpyButton();

    return [...new Set(channels)];
  }

  async getLiveChannels(channels = []) {
    let liveChannels = [];

    const channelsChunks = general.chunkArray(channels, 100);

    // Load chunk by chunk:
    for (let i = 0; i < channelsChunks.length; i++) {
      const subResult = await this.#subLiveChannels(channelsChunks[i]);

      if (subResult === null) continue;

      liveChannels = liveChannels.concat(subResult);
    }

    if (general.isEmpty(liveChannels)) {
      throw new Error("There are no live channels right now");
    }

    return liveChannels;
  }
}
