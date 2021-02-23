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
    default:
      return NoneResponses;
  }
}
