import Heart from "../../assets/reactions/Heart.svg";
import Skull from "../../assets/reactions/Skull.svg";
import PartyPopper from "../../assets/reactions/PartyPopper.svg";
import Goat from "../../assets/reactions/Goat.svg";
import Laughing from "../../assets/reactions/Laughing.svg";
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
