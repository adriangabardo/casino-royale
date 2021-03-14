import { Card } from "../Card";

/**
 * A combination determined by specific rulesets. Eg., royal flush.
 */
interface Combination {
  rank: number;
  highestCard: number;
}

/**
 * Array of specifically 5 cards
 */
type FiveCards = [Card, Card, Card, Card, Card];

export { Combination, FiveCards };
