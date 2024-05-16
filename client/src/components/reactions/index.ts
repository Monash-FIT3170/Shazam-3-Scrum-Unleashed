import Heart from "../../assets/Reactions/Heart.svg";
import Skull from "../../assets/Reactions/Skull.svg";
import PartyPopper from "../../assets/Reactions/PartyPopper.svg";
import Goat from "../../assets/Reactions/Goat.svg";
import Laughing from "../../assets/Reactions/Laughing.svg";
import { ReactionType } from "../../../../types/types";

export interface Reaction {
  svg: string;
  alt: string;
  type: ReactionType;
}

export const ReactionList: Array<Reaction> = [
  { svg: Heart, alt: "Heart Reaction", type: "HEART" },
  { svg: PartyPopper, alt: "PartyPopper Reaction", type: "PARTY_POPPER" },
  { svg: Skull, alt: "Skull Reaction", type: "SKULL" },
  { svg: Laughing, alt: "Laughing Reaction", type: "LAUGHING" },
  { svg: Goat, alt: "Goat Reaction", type: "GOAT" },
];
