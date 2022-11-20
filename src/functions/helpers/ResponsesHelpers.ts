import { Actor } from '../../interfaces/Actor';
import { IResponses } from '../../interfaces/Responses';
import {
  GimResponses,
  MakeResponses,
  SlipResponses,
  NoneResponses,
} from '../../strings/Responses';

export function generateResponse(responses: string[]): string {
  if (responses.length === 0) {
    return '';
  }
  const index = Math.floor(Math.random() * responses.length);
  return responses[index];
}

export function getResponsesByActor(activeActor: Actor): IResponses {
  switch (activeActor) {
    case Actor.Gimcrack:
      return GimResponses;
    case Actor.Slipshod:
      return SlipResponses;
    case Actor.Makeshift:
      return MakeResponses;
    case Actor.None:
      return NoneResponses;

    default:
      throw new Error('unreachable case');
  }
}

export function actorResponseRange(actor: Actor, timestamp: number): boolean {
  const modul0 = timestamp % 100;

  switch (actor) {
    case Actor.Gimcrack:
      return modul0 <= 5;
    case Actor.Slipshod:
      return modul0 <= 10 && modul0 > 5;
    default:
      return modul0 > 10;
  }
}
