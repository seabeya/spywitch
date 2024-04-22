import { ChatUserstate, SubMethods, SubUserstate } from 'tmi.js';

import { ChatData } from '@/types';

export default abstract class HandleChat {
  abstract event({ uniqueId, event, user, channel, info, message }: ChatData): void;

  public onMessage(channel: string, tags: ChatUserstate, message: string) {
    this.event({
      uniqueId: tags['id'] as string,
      event: 'chat',
      user: tags['username'] as string,
      channel: channel.substring(1),
      info: null,
      message,
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
      event: 'sub',
      user: username,
      channel: channel.substring(1),
      info: 'Subscribed',
      message: null,
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
      event: 'resub',
      user: username,
      channel: channel.substring(1),
      info: `Resubscribed (${userstate['msg-param-cumulative-months'] || 'N/A'} months)`,
      message: message,
    });
  }

  public onCheer(channel: string, userstate: ChatUserstate, message: string) {
    this.event({
      uniqueId: userstate.id as string,
      event: 'cheer',
      user: userstate.username as string,
      channel: channel.substring(1),
      info: `Cheered (${userstate.bits || 'N/A'} bits)`,
      message: message,
    });
  }
}
