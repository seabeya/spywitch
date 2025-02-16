import { EventData } from '@/system/types';
import { ChatUserstate, SubGiftUserstate, SubMethods, SubMysteryGiftUserstate, SubUserstate } from 'tmi.js';

abstract class Adapter {
  abstract event({ uid, name, user, channel, message, extra }: EventData): void;

  public onMessage(channel: string, tags: ChatUserstate, message: string) {
    this.event({
      uid: tags['id'] as string,
      name: 'chat',
      user: tags['username']?.toLowerCase() as string,
      channel: channel.substring(1),
      message: message,
      extra: null,
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
      uid: userstate.id!,
      name: 'sub',
      user: username.toLowerCase(),
      channel: channel.substring(1),
      message: null,
      extra: 'Subscribed',
    });
  }

  public onResub(channel: string, username: string, _months: number, message: string | null, userstate: SubUserstate) {
    this.event({
      uid: userstate.id!,
      name: 'resub',
      user: username.toLowerCase(),
      channel: channel.substring(1),
      message: message,
      extra: `Resubscribed (${userstate['msg-param-cumulative-months'] || 'N/A'} months)`,
    });
  }

  public onCheer(channel: string, userstate: ChatUserstate, message: string) {
    this.event({
      uid: userstate.id!,
      name: 'cheer',
      user: userstate.username?.toLowerCase() as string,
      channel: channel.substring(1),
      message: message,
      extra: `Cheered (${userstate.bits || 'N/A'} bits)`,
    });
  }

  public onSubgift(
    channel: string,
    username: string,
    _streakMonths: number,
    recipient: string,
    _methods: SubMethods,
    userstate: SubGiftUserstate,
  ) {
    this.event({
      uid: userstate.id!,
      name: 'subgift',
      user: username.toLowerCase(),
      channel: channel.substring(1),
      message: null,
      extra: `Subgifted (to ${recipient})`,
    });
  }

  public onSubmysterygift(
    channel: string,
    username: string,
    numbOfSubs: number,
    _methods: SubMethods,
    userstate: SubMysteryGiftUserstate,
  ) {
    this.event({
      uid: userstate.id!,
      name: 'subgift',
      user: username.toLowerCase(),
      channel: channel.substring(1),
      message: null,
      extra: `Subgifted (${numbOfSubs} subs)`,
    });
  }
}

export default Adapter;
