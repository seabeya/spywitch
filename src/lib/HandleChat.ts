import { ChatUserstate, SubMethods, SubUserstate } from 'tmi.js';

export type ChatData = {
  uniqueId: string;
  user: string;
  channel: string;
  message: string;
  type: null | string;
};

export default abstract class HandleChat {
  abstract event({ uniqueId, user, channel, message, type }: ChatData): void;

  public onMessage(channel: string, tags: ChatUserstate, message: string) {
    this.event({
      uniqueId: tags['id'] as string,
      user: tags['username'] as string,
      channel: channel.substring(1),
      message,
      type: null,
    });
  }

  public onSubscription(
    channel: string,
    username: string,
    _method: SubMethods,
    _message: string,
    userstate: SubUserstate,
  ) {
    this.event({
      uniqueId: userstate.id as string,
      user: username,
      channel: channel.substring(1),
      message: '',
      type: 'Subscribed',
    });
  }

  public onResub(
    channel: string,
    username: string,
    _months: number,
    message: string | null,
    userstate: SubUserstate,
    _method: SubMethods,
  ) {
    this.event({
      uniqueId: userstate.id as string,
      user: username,
      channel: channel.substring(1),
      message: message !== null ? message : '',
      type: `Resubscribed (${userstate['msg-param-cumulative-months'] || 'N/A'} months)`,
    });
  }

  public onCheer(channel: string, userstate: ChatUserstate, message: string) {
    this.event({
      uniqueId: userstate.id as string,
      user: userstate.username as string,
      channel: channel.substring(1),
      message: message !== null ? message : '',
      type: `Cheered (${userstate.bits || 'N/A'} bits)`,
    });
  }
}
